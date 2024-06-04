import { useEffect, useState } from 'react';
import registrationpic from '../assets/img/User-Registration.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaGoogle } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import axios from 'axios';
import { toast } from 'react-toastify';
import FileInput from '../Components/ProfilePic';


function Register() {

    const [username, setUsername] = useState('');
    const [errorUsername, setErrorUsername] = useState('');

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [image, setImage] = useState('');

    const [error, setError] = useState(true);


    useEffect(() => {
        if (username.length < 6 && username.length > 0) {
            setErrorUsername('Username must be at least 6 characters.');
            setError(true);
        } else if (username.length >= 6) {
            setErrorUsername('');
            setError(false);
        } else {
            setError(true);
            setErrorUsername('');
        }

        if (!email.match(mailFormat)) {
            if (email.length > 0) {
                setErrorEmail('Invalid email.');
            } else {
                setErrorEmail('');
            }
            setError(true);
        } else {
            setError(false);
            setErrorEmail('');
        }

        if (password.length < 8 && password.length > 0) {
            setErrorPassword('Password must be 8 characters minimum with at least 1 lower case, 1 upper case, 1 number and 1 symbol.');
            setError(true);
        } else if (password.length >= 8) {
            setErrorPassword('');
            setError(false);
        }
    }, [username, email, password]);



    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:1520/register', formData);
            setUsername('');
            setEmail('');
            setPassword('');
            setImage('');
            toast.success('Your account has been created, you can now log in ! 💪', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <main className="registerPage d-flex justify-content-center">
                <img src={registrationpic} alt="registration pic" />

                <section className='registerForm'>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Control type="text" placeholder="Full name" style={{ borderColor: username.length < 6 && username.length > 0 ? 'red' : username.length >= 6 ? 'green' : username.length == 0 ? 'none' : 'none' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                        <span>{errorUsername}</span>
                        <Form.Control type="email" placeholder="Email address" style={{ borderColor: !email.match(mailFormat) && email.length > 0 ? 'red' : email.match(mailFormat) ? 'green' : 'none' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span>{errorEmail}</span>
                        <Form.Control type="password" placeholder="Password" style={{ borderColor: password.length < 8 && password.length > 0 ? 'red' : password.length >= 8 ? 'green' : 'none' }} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span>{errorPassword}</span>
                        <div>
                            <FileInput setImage={setImage} />
                            {image && <p>Selected file: {image.name}</p>}
                        </div>
                        <Button variant="primary" type="submit" disabled={error ? true : false} >Register</Button>
                    </Form>

                    <div className='or'>
                        <p>Or</p>
                    </div>

                    <div>
                        <button><FaGoogle className='googleIcon' /> Continue with Google Account</button>
                        <button><FaFacebookF className='facebookIcon' /> Continue with Facebook</button>
                        <button><FaXTwitter className='xIcon' /> Continue with X</button>
                        <button><FaLinkedinIn className='linkedinIcon' /> Continue with LinkedIn</button>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Register