import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FormControl, FormHelperText, Grid, InputLabel, TextField} from "@mui/material";
import {Input} from "@mui/icons-material";
import TaskCard from "./Atoms/TaskCard";
import data from './MockData/tasks.json';
import {useEffect, useState} from "react";

export default function Home() {
const [taskCollection,setTaskCollection] = useState(data)
    const [newTask, setNewTask] = useState("");

    // useEffect(() => {
    //     setTaskCollection(data);
    // }, []);

    function handleClick(id) {
        console.log("Task card clicked!", id);
        const newTasks = taskCollection.tasks.filter((task) => task.id !== id);
        setTaskCollection({ tasks: newTasks }); // update the task collection state
        console.log(newTasks);
    }
    function handleClick2(index) {
        console.log("Task card 222 clicked!", index);
        const newTasks = [...taskCollection.tasks]; // create a new array copy
        newTasks.splice(index, 1); // remove the task at the specified index
        setTaskCollection({ tasks: newTasks }); // update the task collection state
    }

    // Function for handle new task
    function handleAddTask() {
        const newTaskObject = {
            content: newTask,
            completed: false
        };
        setTaskCollection(prevState => {
            return { tasks: [...prevState.tasks, newTaskObject] };
        });
        setNewTask("");
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

                {taskCollection &&  taskCollection.tasks.map((task, index) => (
                    <TaskCard key={task.id} task={task.content} completed={task.completed}  onClick={() => handleClick(task.id)} onClick2={() => handleClick2(task.id)}/>
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
