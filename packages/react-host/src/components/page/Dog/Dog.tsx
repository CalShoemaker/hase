import { Link, useParams } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectDogById } from '../../../store/slices/dogs.slice';
import { Typography } from '@mui/material';

export const Dog = () => {

  const { dogId } = useParams({ from:'/Dogs/Dog' });
  const { title, statistics, facts } = useSelector(selectDogById(dogId!));

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <>
        <Typography
          variant='h6'
        >
          <Link to='/dogs'>Dogs</Link> | { title }
        </Typography>

        <p>{ statistics && Object.keys(statistics).map(key =>(<li key={key}>{key}: {(statistics as any)[key]}</li>))}</p>
        <p>{ facts && Object.keys(facts).map(key =>(<li key={key}>{key}: {(facts as any)[key]}</li>))}</p>
      </>
    </Suspense>
  );
}

export default Dog