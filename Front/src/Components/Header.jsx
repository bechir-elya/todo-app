import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";


function Header() {

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [userConnected, setUserConnected] = useState();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    
    const token = Cookies.get('token');
    let decoded;

    useEffect(() => {
        if (!token) {
            setUserConnected(false);
        } else {
            decoded = jwtDecode(token);
            setUserName(decoded.user);
            setImage(decoded.image);
            setUser(decoded.userId);
            setUserConnected(true);
        }
    })
    
    const logOut = () => {
        Cookies.remove('token');
        navigate('/');
    }

    return (
        <>
            <header>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href={userConnected ? "/todopage" : "/"}>My Todo App</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="links justify-content-end">
                            <Link to={'/'} style={{ display: userConnected ? 'none' : 'inline-block' }}>Login</Link>
                            <Link to={'register'} style={{ display: userConnected ? 'none' : 'inline-block' }}>Register</Link>
                            <p className='userName' style={{display: userConnected ? 'inline-block' : 'none'}}>Welcome, <b>{userName}</b></p>
                            <Link to={'dashboard'} style={{ display: userConnected ? 'inline-block' : 'none' }}>Dashboard</Link>
                            <Link to={'/'} style={{ display: userConnected ? 'inline-block' : 'none' }} onClick={logOut}>Logout</Link>
                            <Link to={`userprofile/${user}`} className='profilePic' style={{display: userConnected ? 'inline-block' : 'none'}}>{image ? <img src={`http://localhost:1520/uploads/${image}`} alt="Profile" /> : <FaUserCircle />}</Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default Header