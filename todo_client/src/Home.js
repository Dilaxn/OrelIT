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
import { LOAD_TASKS_SUCCESS, LOAD_TASKS_FAIL } from './actionTypes';

import { connect } from 'react-redux';
import {
    addTask,
    updateTask,
    deleteTask,
    completeTask,
} from './Actions/taskActions';
import axios from "axios";

const loadAllAddressSuccess = (payload) => ({ type: 'LOAD_TASKS_SUCCESS', payload });
const loadAllAddressFail = () => ({ type: 'LOAD_ALL_ADDRESS_FAIL' });

export default function Home(props) {
const [taskCollection,setTaskCollection] = useState(data)
    const [newTask, setNewTask] = useState("");
    const state = useSelector((state) => state);
    console.log("store", state);

    const dispatch = useDispatch();

const loadTasks = () => async (dispatch) => {
        try {
            const res = await axios.get('http://localhost:5000/api/task');
            dispatch({ type: LOAD_TASKS_SUCCESS, payload: res.data });
        } catch (e) {
            console.log('error');
            dispatch({ type: LOAD_TASKS_FAIL });
        }
    };

loadTasks()
    useEffect(() => {
        const getTasks = async () => {
            try {
                console.log('okkk');
                const res = await axios.get('http://localhost:5000/api/task');
                console.log(res.data);
                dispatch(loadAllAddressSuccess(res.data));
            } catch (e) {
                console.log('error');
                dispatch(loadAllAddressFail());
            }
        };
        getTasks();
    }, []);

    async function handleClick(id) {
        console.log("Task card clicked!", id);
        const newTasks = taskCollection.tasks.filter((task) => task.id !== id);
        setTaskCollection({tasks: newTasks}); // update the task collection state
        console.log(newTasks);
        const res = await axios.delete('http://localhost:5000/api/task/'+ id);
        if(res.status == "200"){
            console.log("Successfully deleted")
            dispatch(deleteTask(id));
        }
    }
    function handleClick2(index) {
        console.log("Task card 222 clicked!", index);
        const newTasks = [...taskCollection.tasks]; // create a new array copy
        newTasks.splice(index, 1); // remove the task at the specified index
        setTaskCollection({ tasks: newTasks }); // update the task collection state
    }

    // Function for handle new task
    async function handleAddTask() {
        const newTaskObject = {
            content: newTask,
            completed: 0
        };
        const res = await axios.post('http://localhost:5000/api/task',newTaskObject);
        if (res.status == "201") {
            console.log("Successfully created!")
            dispatch(addTask(newTaskObject));
        }
        else {
            console.log("res cre", res)
        }

    }

    return (
        <Grid container>
        <Grid item xs={12} md={2} xl={3}/>
        <Grid item xs={12} md={8} xl={6}>


        <Card sx={{ maxWidth: 1000 }} style={{marginTop:100, marginBottom:50}}>

            <CardContent style={{textAlign:'center'}}>
                <Card >
                <CardContent style={{textAlign:'center'}}>
                <Typography gutterBottom variant="h3" component="div">
                    Wednesday, 7th Nov
                </Typography>
                    </CardContent>
                </Card>
                <Typography gutterBottom variant="h6" component="div">
                    3 tasks
                </Typography>

                {/*Here I map the all tasks with reusable component taskCard */}

                {state &&  state.tasks.map((task, index) => (
                    <TaskCard key={task.id} id={task.id} task={task.content} completed={task.completed}  onClick={() => handleClick(task.id)} onClick2={() => handleClick2(task.id)}/>
                ))}


            </CardContent>
            <CardActions style={{ justifyContent: 'center', alignItems: 'center', padding:30 }}>
                <TextField fullWidth style={{ display: 'block' }} id="standard-basic" label="Add todo" variant="standard" onChange={(event) => setNewTask(event.target.value)} />
                <Button  style={{ display: 'block', borderRadius: '50%',border:1, borderWidth:1, backgroundColor:"#ec042b", color:"white" }} onClick={handleAddTask} size="large" >+</Button>

            </CardActions>
        </Card>
        </Grid>
            <Grid item xs={12} md={2} xl={6}/>
        </Grid>
    );
}
