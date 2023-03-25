import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid, TextField} from "@mui/material";
import TaskCard from "./Atoms/TaskCard";
import data from './MockData/tasks.json';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    addTask,
    deleteTask,
    getAllTasks,
} from './Actions/taskActions';
import axios from "axios";
import { BASE_URL } from './Const.js';

export default function Home(props) {
    const [taskCollection, setTaskCollection] = useState(data)
    const [newTask, setNewTask] = useState("");
    const state = useSelector((state) => state);
    const currentDate = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'short'};
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
    const dispatch = useDispatch();

    const loadTasks = () => async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/task`);
            dispatch(getAllTasks(res.data));
        } catch (e) {
            console.log('error');
        }
    };

    loadTasks()
    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/task`);
                dispatch(getAllTasks(res.data));
            } catch (e) {
                console.log('error');
            }
        };
        getTasks();
    }, []);

    async function handleClick(id) {
        const newTasks = taskCollection.tasks.filter((task) => task.id !== id);
        setTaskCollection({tasks: newTasks}); // update the task collection state
        const res = await axios.delete(`${BASE_URL}/task/${id}`);
        if (res.status == "200") {
            toast.success("Successfully deleted!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
            dispatch(deleteTask(id));
        }
    }

    // Function for handle new task
    async function handleAddTask() {

        if(newTask == ""){
            toast.error("Empty field not allowed!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
        }

        const newTaskObject = {
            content: newTask,
            completed: 0
        };
        const res = await axios.post(`${BASE_URL}/task`, newTaskObject);

        if (res.status == "201") {
            toast.success("Successfully created!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
            dispatch(addTask(newTaskObject));
            setNewTask("")
        } else {
            toast.error("Something went wrong!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
        }

    }

    return (
        <Grid container>
            <Grid item xs={12} md={2} xl={3}/>
            <Grid item xs={12} md={8} xl={6}>
                <Card sx={{maxWidth: 1000}} style={{marginTop: 100, marginBottom: 50}}>
                    <CardContent style={{textAlign: 'center'}}>
                        <Card>
                            <CardContent style={{textAlign: 'center'}}>
                                <Typography gutterBottom variant="h3" component="div">
                                    {formattedDate}
                                </Typography>
                            </CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {state.tasks.length ? state.tasks.length : 0} tasks
                            </Typography>
                        </Card>

                        {/*Here I map the all tasks with reusable component taskCard */}
                        {state && state.tasks.map((task, index) => (
                            <TaskCard key={task.id} id={task.id} task={task.content} completed={task.completed}
                                      onClick={() => handleClick(task.id)} />
                        ))}

                    </CardContent>
                    <CardActions style={{justifyContent: 'center', alignItems: 'center', padding: 30}}>
                        <TextField fullWidth style={{display: 'block'}} value={newTask} id="standard-basic"
                                   label="Add todo" variant="standard"
                                   onChange={(event) => setNewTask(event.target.value)}/>
                        <Button style={{
                            display: 'block',
                            borderRadius: '50%',
                            border: 1,
                            borderWidth: 1,
                            backgroundColor: "#ec042b",
                            color: "white"
                        }} onClick={handleAddTask} size="large">+</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={2} xl={6}/>
        </Grid>
    );
}
