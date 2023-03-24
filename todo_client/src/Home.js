import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FormControl, FormHelperText, Grid, InputLabel, TextField} from "@mui/material";
import {Input} from "@mui/icons-material";

export default function Home() {
    return (
        <Grid container>
        <Grid item xs={12} md={2} xl={3}/>
        <Grid item xs={12} md={8} xl={6}>


        <Card sx={{ maxWidth: 1000 }}>

            <CardContent style={{textAlign:'center'}}>
                <Typography gutterBottom variant="h3" component="div">
                    Wednesday, 7th Nov
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    3 tasks
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography><Typography gutterBottom variant="h5" component="div">
                    with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography><Typography gutterBottom variant="h5" component="div">
                    with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography><Typography gutterBottom variant="h5" component="div">
                    with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>

            </CardContent>
            <CardActions style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextField style={{ display: 'block' }} id="standard-basic" label="Add todo" variant="standard" />
                <Button  style={{ display: 'block', borderRadius: '50%',border:1, borderWidth:1, backgroundColor:"#ec042b", color:"white" }} size="large" >+</Button>

            </CardActions>
        </Card>
        </Grid>
            <Grid item xs={12} md={2} xl={6}/>
        </Grid>
    );
}
