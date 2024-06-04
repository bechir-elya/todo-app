import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdDashboard } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import { VscGraphLine } from "react-icons/vsc";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { MdFreeCancellation } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import Table from 'react-bootstrap/Table';
import { selectAllTasks, fetchTask, selectPendingCount, selectCompletedCount, selectCanceledCount, fetchDeletedItem, selectOverdueCount } from '../features/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allTasks = useSelector(selectAllTasks);
    const pendingCount = useSelector(selectPendingCount);
    const completedCount = useSelector(selectCompletedCount);
    const canceledCount = useSelector(selectCanceledCount);
    const overdueCount = useSelector(selectOverdueCount);

    const token = Cookies.get('token');
    let userId = null;

    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded?.userId;
    }

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        dispatch(fetchTask(userId));
        dispatch(fetchDeletedItem())
    }, [dispatch, token]);

    useEffect(() => {
        console.log('Counts:', { pendingCount, completedCount, canceledCount });
    }, [pendingCount, completedCount, canceledCount]);
    

    return (
        <>
            <Row>
                <Col lg='3' className='colMenu'>
                    <div className='menuLinks'>
                        <Link><MdDashboard className='menuIcons' /> Dashboard</Link>
                    </div>
                    <div className='menuLinks'>
                        <Link><BsPersonWorkspace className='menuIcons' /> Workspaces</Link>
                    </div>
                    <div className='menuLinks'>
                        <Link><FaTasks className='menuIcons' /> Tasks</Link>
                    </div>
                    <div className='menuLinks'>
                        <Link><FaCalendarDays className='menuIcons' /> Meetings</Link>
                    </div>
                    <div className='menuLinks'>
                        <Link><LuClipboardEdit className='menuIcons' /> Notes</Link>
                    </div>
                    <div className='menuLinks'>
                        <Link><VscGraphLine className='menuIcons' /> Statistics</Link>
                    </div>
                </Col>

                <Col lg='9' className='colDashboard mt-4'>
                    <h3 style={{ marginBottom: '2%' }}>DASHBOARD</h3>
                    <Row>
                        <Col>
                            <div className='tasksStatusDiv' style={{ borderTopColor: '#5eba6c' }}>
                                <h5>Completed tasks</h5>
                                <p className='taskCount'>{completedCount}</p>
                                <div className='d-flex justify-content-between'>
                                    <p>Task count</p>
                                    <FaCheckCircle style={{ color: '#5fbb76', fontSize: '20px' }} />
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='tasksStatusDiv' style={{ borderTopColor: '#345ff0' }}>
                                <h5>Pending tasks</h5>
                                <p className='taskCount'>{pendingCount}</p>
                                <div className='d-flex justify-content-between'>
                                    <p>Task count</p>
                                    <MdOutlinePendingActions style={{ color: '#5f7ee9', fontSize: '20px' }} />
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='tasksStatusDiv' style={{ borderTopColor: '#ec8c24' }}>
                                <h5>Overdue tasks</h5>
                                <p className='taskCount'>{overdueCount}</p>
                                <div className='d-flex justify-content-between'>
                                    <p>Task count</p>
                                    <IoWarning style={{ color: '#e5902a', fontSize: '20px' }} />
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='tasksStatusDiv' style={{ borderTopColor: '#eb3c26' }}>
                                <h5>Canceled tasks</h5>
                                <p className='taskCount'>{canceledCount}</p>
                                <div className='d-flex justify-content-between'>
                                    <p>Task count</p>
                                    <MdFreeCancellation style={{ color: '#e93c2e', fontSize: '20px' }} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='tasksOverview'>
                            <h5>Recently Added Tasks Overview</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Task Name</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTasks.map(task => (
                                        <tr key={task._id}>
                                            <td>{task.title}</td>
                                            <td>{new Date(task.deadline).toLocaleDateString()}</td>
                                            <td>{task.priority === 'High' ? <FcHighPriority /> : task.priority === 'Medium' ? <FcMediumPriority /> : <FcLowPriority />}</td>
                                            <td>{task.completed ? 'Completed' : 'Pending'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;
