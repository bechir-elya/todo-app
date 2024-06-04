import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:1520/forgotpassword', { email });
            console.log(response);
            setMessage(response.data.message);
            console.log(response.data.message);
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
            console.log(error.response.data.message);
        }

    }

    return (
        <>
            <main className='forgotPasswordPage'>
                <Container>
                    <h2 style={{ textAlign: 'center', marginBottom: '3%' }}>Forgot password</h2>
                    <Form className='passForm' onSubmit={handleOnSubmit}>
                        <Form.Label>Please enter your email</Form.Label>
                        <Form.Control type="email" style={{ marginBottom: '2%' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            You will receive a link to reset your password.
                        </Form.Text>
                        <Button variant="primary" type="submit" style={{ display: 'block', margin: 'auto', marginTop: '3%' }}>Send link</Button>
                    </Form>

                    {
                        message && <div className='linkMessage p-3 shadow-lg'>
                            <p>
                                {message}
                            </p>
                        </div>
                    }
                    {
                        error && <div className='errorMessage p-3 shadow-lg'>
                            <p>
                                {error}
                            </p>
                        </div>
                    }
                </Container>
            </main>
        </>
    )
}

export default ForgotPassword