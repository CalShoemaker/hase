"Use Server";
import { Link } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { IDog } from '../../../store/slices/dogs.slice';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const imgSrc = (id:string) => { 
  try { return require('../../../images/'+id+'/_1.jpg') }
  catch (e){
    return require('../../../images/app/dachshund-profile.png')
  }
}

export const DogsList = (props:any) => {
  //const data = useSelector(selectDogs);
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
     
      <Grid container spacing={3}>
        {props.dogs && (props.dogs as IDog[]).map(({title, facts, id, statistics}) => (
          <Grid item xs={12} key={title}  md={4} lg={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 250, overflow:'hidden' }}
              >
                <Link from='/' to={"/dogs/$dogId"} params={{ dogId: id }}>
                  <img src={imgSrc(id)} width={'100%'} /> 
                </Link>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  { title }
                </Typography>
                <Typography component='div' color="text.secondary">
                  <ul>{ statistics && Object.keys(statistics).map(key =>(<li key={key}>{key}: {(statistics as any)[key]}</li>))}</ul>
                </Typography>
              </CardContent>
              <CardActions>
                <Link from='/' to={"/dogs/$dogId"} params={{ dogId: id }}>Learn More</Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Suspense>
  );
}

export default DogsList