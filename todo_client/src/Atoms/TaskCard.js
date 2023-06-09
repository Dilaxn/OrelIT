import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {FormControl, Grid, Input, InputLabel} from "@material-ui/core";
import {useEffect, useState} from "react";
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {addTask} from "../Actions/taskActions";
import {useDispatch} from "react-redux";
import {LOAD_TASKS_SUCCESS, UPDATE_TASK} from "../actionTypes";
import axios from "axios";
import {toast} from "react-toastify";
import {BASE_URL} from "../Const";

const updateSuccess = (payload) => ({ type: 'UPDATE_TASK', payload });

export default function TaskCard(props) {
    const dispatch = useDispatch();

    const [editedTask, setEditedTask] = useState(props.task);
    useEffect(() => {
       setCompleted(props.completed)
    }, []);
const done = props.completed
    const [editIndex, setEditIndex] = useState(-1);
    const [completed, setCompleted] = useState(props.completed);
    const [id, setId] = useState(props.id);

    function handleEditClick() {
        setEditIndex(props.index);
    }

    async function editFinished() {
        setEditIndex(-1);
        const newTaskObject = {
            id: id,
            content: editedTask,
            completed: completed
        };

        const res = await axios.put(`${BASE_URL}/task/`+ props.id, {
            content: editedTask
        });
        if (res.status == "200") {
            toast.success("Successfully updated!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
            dispatch({type: UPDATE_TASK, payload: newTaskObject});
        } else {
            toast.error("Something went wrong!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
        }
        // dispatch(addTask(newTaskObject));
        dispatch({type: UPDATE_TASK, payload: newTaskObject});
    }

    async function handleComplete() {
        const res = await axios.put(`${BASE_URL}/task/`+ props.id,{
            completed: !completed
        });
        if(res.status == "200"){
            setCompleted(!completed);
        }
        else
        {
            toast.error("Something went wrong!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
            });
        }

    }

    const handleTaskChange = (event) => {
        setEditedTask(event.target.value);
    };

    return (
        <Card style={{marginTop:20}}>
            <CardContent style={{textAlign:'center'}}>
                {editIndex === props.index ? (
                    <Grid container>

                    <Grid item xs={9} style={{textAlign:'left'}}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="edit-task">Edit Task</InputLabel>
                            <Input id="edit-task" defaultValue={props.task} onChange={
                                handleTaskChange
                            }  />
                        </FormControl>
                    </Grid>
                        <Grid item xs={3}>
                            <Typography gutterBottom variant="h5" component="div" style={{textDecoration: completed ? 'line-through' : 'none'}}>
                                <IconButton onClick={editFinished}>
                                    <CheckIcon />
                                </IconButton>
                            </Typography>

                        </Grid>
                    </Grid>
                    ) :(
                <Grid container>
                    <Grid item xs={3}>
                        <IconButton onClick={props.onClick}>
                            <DeleteIcon />
                        </IconButton>
                        {/*cannot update when the task completed*/}
                        { !completed ?   <IconButton onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton> : null}
                    </Grid>
                    <Grid item xs={6}>
                <Typography gutterBottom variant="h5" component="div" style={{textDecoration: completed ? 'line-through' : 'none'}}>
                    {props.task}
                </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography gutterBottom variant="h5" component="div" style={{textDecoration: done ? 'line-through' : 'none'}}>
                            <IconButton onClick={handleComplete}>
                                <CheckIcon style={{color:completed ? 'red' : 'grey'}}/>
                            </IconButton>
                        </Typography>

                    </Grid>
                </Grid>
                    )}
            </CardContent>
        </Card>
    );
}
