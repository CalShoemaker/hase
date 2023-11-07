import React, { Suspense } from 'react';

export const About: React.FC = () => {
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <div>Hello from About!</div>
    </Suspense>
  );
}

export default About