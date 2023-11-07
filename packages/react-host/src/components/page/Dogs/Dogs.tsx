import { Outlet, useParams } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectDogById } from '../../../store/slices/dogs.slice';
import Dashboard from '../../feature/Dashboard';
import DogsList from '../DogsList';

export const Dogs = () => {
  const { dogId } = useParams({ from:'/Dogs/Dog' });

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Dashboard>
        { dogId ? <Outlet /> : <DogsList /> }
      </Dashboard>
    </Suspense>
  );
}

export default Dogs
