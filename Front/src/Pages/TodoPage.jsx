import Tasks from '../Components/Tasks';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchTask, selectAllTasks } from '../features/taskSlice.js';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


function TodoPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let decoded;

    const allTasks = useSelector(selectAllTasks);

    const token = Cookies.get('token');

    let userId = null;

    if (token) {
        decoded = jwtDecode(token);
        userId = decoded?.userId;
    }

    useEffect(() => {
        if (!token) {
            navigate('/');
        }

        dispatch(fetchTask(userId));
    }, [dispatch, token])


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('');
    const [errorPriority, setErrorPriority] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {

        if (priority.length === 0) {
            setErrorPriority('');
            setError(true);
        } else if (priority !== 'High' && priority !== 'Medium' && priority !== 'Low') {
            setErrorPriority('Priority must be High, Medium, or Low');
            setError(true);
        } else {
            setErrorPriority('');
            setError(false);
        }
    }, [priority]);


    const newTask = () => {
        const data = {
            title: title,
            content: content,
            deadline: deadline,
            priority: priority,
            userId: userId
        }
        dispatch(addTask(data));

        setTitle('');
        setContent('');
        setPriority('');
        setDeadline(''); 
    }

    return (
        <>
            <main className="todoPage d-flex justify-content-center">
                <section className='addSection'>
                    <Form className='addTask'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />

                        <Form.Label>Priority: Please write High, Medium or Low</Form.Label>
                        <Form.Control type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
                        <span style={{display: 'block', marginBottom: '3%', color: 'red', fontWeight: 'bold'}}>{errorPriority}</span>

                        <Form.Label>Deadline</Form.Label>
                        <input
                            className="form-control"
                            type="datetime-local"
                            onChange={(e) => setDeadline(e.target.value)}
                        />

                        <Button variant="primary" onClick={newTask} disabled={error ? true : false}>Add</Button>
                    </Form>
                </section>


                <section className='todoSection'>
                    <div className='todoList'>
                        <h3 style={{ marginBottom: '3%' }}>Your tasks</h3>
                        {allTasks && allTasks.map((task, index) => (
                            <div className='todoDiv p-3 mb-4' key={index}>
                                <Tasks task={task} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}

export default TodoPage