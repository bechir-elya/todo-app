import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FileInput from '../Components/ProfilePic';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/userSlice';
import { message } from '../features/userSlice';


function UserProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const info = useSelector(message);
    const { id } = useParams();
    const [user, setUser] = useState({
        username: '',
        email: '',
    });
    const [image, setImage] = useState('');
    const token = Cookies.get("token");


    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);


    useEffect(() => {
        const retrieveUser = async () => {
            try {
                const response = await axios.get(`http://localhost:1520/userprofile/${id}`);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        retrieveUser()
    }, [id]);

    
    const handleChange = (e) => {
        const {value, name} = e.target;
        setUser((prev) => ({...prev, [name] : value}));
    } 

    console.log(user);

    const editUser = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('username', user.username);
        formData.append('email', user.email);
        formData.append('image', image);

        dispatch(updateUser({id, formData}));
       
        setTimeout(() => {
            location.reload();
        }, 2000);
        
    }

    return (
        <>
            <main className='profilePage'>
                <Container>
                    <Row>
                        <Col className='colImg'>
                            <div className='avatar'>
                                <img src={`http://localhost:1520/uploads/${user?.image}`} alt='Profile' />
                            </div>
                        </Col>
                        <Col className='colForm'>
                            <div>
                                <h3>Manage Account Details</h3>
                                <h5>To change your Username, Email Address or Password, adjust the details below.</h5>
                                <Form onSubmit={editUser}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name='username' placeholder="Normal text" value={user.username} onChange={handleChange} />

                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name='email' placeholder="name@example.com" value={user.email} onChange={handleChange} />

                                    <div className='picUpload'>
                                        <FileInput setImage={setImage} />
                                        {image && <p>Selected file: {image.name}</p>}
                                    </div>

                                    <Button variant="primary" type='submit'>Update Profile</Button>
                                    <p style={{marginTop: '2%', color: 'green', fontWeight: 'bold'}}>{info}</p>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default UserProfile