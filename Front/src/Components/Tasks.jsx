import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { FaTrash } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/taskSlice.js';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Tasks({ task }) {

    const dispatch = useDispatch();

    const [title, setTitle] = useState(task.title);
    const [content, setContent] = useState(task.content);
    const [deadline, setDeadline] = useState(task.deadline);
    const [priority, setPriority] = useState(task.priority);
    const [strikeThrough, setStrikeThrough] = useState(task.completed);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editTask = async (id) => {

        const data = {
            title: title,
            content: content,
            deadline: deadline,
            priority: priority
        }
        dispatch(updateTask({ id, data }));
        setShow(false);
    }

    const removeTask = (id) => {
        dispatch(deleteTask(id));
    }

    useEffect(() => {
        const data = {
            completed: strikeThrough
        }
        const id = task._id;
        dispatch(updateTask({ id, data }));
    }, [strikeThrough]);
    

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4 style={{ textDecorationLine: strikeThrough ? 'line-through' : 'none', width: '50%' }}>{title}</h4>
                <p style={{ textAlign: 'right' }}>Due date: {new Date(deadline).toLocaleDateString()}</p>
            </div>
            <p>Priority: <span style={{color: priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'green', fontWeight: 'bold' }}>{priority}</span></p>
            <div className='relativeDiv d-flex justify-content-around align-items-center'>
                <Form.Check type="checkbox" checked={strikeThrough} onChange={() => setStrikeThrough((prev) => !prev)} />
                <p style={{ textDecorationLine: strikeThrough ? 'line-through' : 'none' }}>{content}</p>
                <FaTrash className='trash' onClick={() => removeTask(task._id)} />
            </div>
            <div className='dateOfCreation'>
                {
                    task?.createdAt ? (
                        <p>{moment(task.createdAt).fromNow()}</p>
                    ) : (
                        <p>just now</p>
                    )
                }
            </div>
            <div className='d-flex justify-content-between align-items-baseline'>
                <Button variant="primary" onClick={handleShow}>Update task</Button>
                {strikeThrough ? <p className='statusText' style={{ textAlign: 'right', color: 'green', fontWeight: 'bold' }}>Status : Completed</p> : <p className='statusText' style={{ textAlign: 'right', color: 'orange', fontWeight: 'bold' }}>Status : Pending</p>}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='addTask'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />

                        <Form.Label>Priority: Please write High, Medium or Low </Form.Label>
                        <Form.Control type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />

                        <Form.Label>Deadline</Form.Label>
                        <input
                            value={deadline}
                            className="form-control"
                            type="datetime-local"
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={() => editTask(task._id)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Tasks;
