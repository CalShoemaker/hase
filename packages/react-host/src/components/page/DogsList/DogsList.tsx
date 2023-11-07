import { Link, useParams } from '@tanstack/react-router';
import React, { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { IDog, IDogs, selectDogs } from '../../../store/slices/dogs.slice';
import { Grid, Input } from '@mui/material';
import { Widget } from '../../ui/Widget';

export const DogsList = (props:any) => {
  //const data = useSelector(selectDogs);

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>

      <Grid container spacing={3}>
        {props.dogs && (props.dogs as IDog[]).map(({title, facts, id, statistics}) => (
          <Grid item xs={12} key={title}  md={4} lg={3}>
            <Link from='/' to={"/dogs/$dogId"} params={{ dogId: id }}>
              <Widget>
                  <p>{ title }</p>
                  {/* <img src={(image.data.message) as string} /> */}
                  <p>{ statistics && Object.keys(statistics).map(key =>(<li key={key}>{key}: {(statistics as any)[key]}</li>))}</p>
              </Widget>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Suspense>
  );
}

export default DogsList