import User from "../model/userModel.js";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Route to handle "forgot password" request
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    await user.save();


    //Send email with reset token
    const resetUrl = `http://localhost:5173/resetPassword?token=${resetToken}`;
    var transporter = createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.HOTMAIL_USERNAME,
            pass: process.env.HOTMAIL_PASSWORD
        },
        logger: true,
        debug: true
    });


    var mailOptions = {
        from: process.env.HOTMAIL_USERNAME,
        to: email,
        subject: 'Reset password',
        html: `<h1>Reset Password</h1><h2>Click on the link to reset your password</h2><h3>${resetUrl}</h3>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Failed to send email', error: error.toString() });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'A link to reset your password has been sent to your email.' });
        }
    });

    res.status(200).json({ message: 'A link to reset your password has been sent to your email. Sometimes you can receive it in your spams.' });

}



//  Route to handle password reset request
const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    // Verify reset token
    console.log('token: ', token);
    const user = await User.findOne({ resetToken: token });

    if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
}



export { forgotPassword, resetPassword };