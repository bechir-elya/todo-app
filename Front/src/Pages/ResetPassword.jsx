import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match !');
        } else {
            try {
                const token = searchParams.get('token');
                const response = await axios.post('http://localhost:1520/resetpassword', {token, password});
                setMessage(response.data.message);
            } catch (error) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <>
            <main className='resetPasswordPage'>
                <Container>
                    <h2 style={{ textAlign: 'center', marginBottom: '3%' }}>Reset password</h2>
                    <Form className='passForm' onSubmit={handleOnSubmit}>
                        <Form.Label>Please enter your new password</Form.Label>
                        <Form.Control type="password" style={{ marginBottom: '2%' }} value={password} onChange={(e) => setPassword(e.target.value)} />

                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" style={{ marginBottom: '2%' }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Button variant="primary" type="submit" style={{ display: 'block', margin: 'auto', marginTop: '3%' }}>Reset password</Button>
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

export default ResetPassword