import { useParams } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectDogById } from '../../../store/slices/dogs.slice';

export const Dogs = () => {

  const { dogId } = useParams({ from:'/Dogs' });
  const { title, statistics, facts } = useSelector(selectDogById(dogId!));

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <>
        { title }
        <p>{ statistics && Object.keys(statistics).map(key =>(<li key={key}>{key}: {(statistics as any)[key]}</li>))}</p>
        <p>{ facts && Object.keys(facts).map(key =>(<li key={key}>{key}: {(facts as any)[key]}</li>))}</p>
      </>
    </Suspense>
  );
}

export default Dogs