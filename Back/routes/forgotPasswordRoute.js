import { Router } from "express";
import { forgotPassword, resetPassword } from "../controllers/forgotPassword.js";

const router = Router();

router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);

export default router;