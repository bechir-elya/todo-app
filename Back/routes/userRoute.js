import { Router } from "express";
import { getUser, login, register, updateUser } from "../controllers/userController.js";
import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({storage: storage});

const router = Router();

router.post('/register', upload.single('image'), register);

router.post('/login', login);

router.get('/userprofile/:id', getUser);

router.put('/updateuser/:id', upload.single('image'), updateUser);

export default router;