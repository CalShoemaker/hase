import React, { Suspense } from 'react';

export const Home = () => {
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <div>Hello from Home!</div>
    </Suspense>
  );
}

export default Home