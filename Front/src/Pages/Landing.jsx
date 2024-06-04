import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toDoList from '../assets/img/to-do-list.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


function Landing() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:1520/login', { email, password });
            Cookies.set('token', response.data, { expires: 2 });
            navigate('/todopage');
        } catch (error) {
            setError(error.response.data);
        }
    }



    return (
        <>
            <main className="homePage d-flex justify-content-around">
                <img src={toDoList} alt="todo list" />

                <section>
                    <div className="or">
                        <p>Login with your email</p>
                    </div>
                    <div className="loginForm">
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Control type="email" value={email} placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <div style={{marginBottom: '3%'}}>
                                <Link to={'forgotpassword'} target="_blank">Forgot your password ?</Link>
                            </div>
                            <Button variant="primary" type="submit">LOGIN</Button>
                            <p style={{fontWeight: 'bold', color: 'red'}}>{error}</p>
                        </Form>
                        <p><b>Don't have an account ? <Link to={'register'} target="_blank">Register here</Link></b></p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Landing