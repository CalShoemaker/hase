import { useParams } from '@tanstack/react-router';
import React, { Suspense, useEffect, useState } from 'react';
type Dog = {
  facts?: object;
  title: string;
  id: string;
  tags: string[];
  statistics: object;

}

const useDogData = () =>{

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dogId } = useParams({ from:'/Dogs' });
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/dogs?id=${dogId}`
        )
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        console.log(actualData)
        setData(actualData);
        setError(null);
      } catch(err:any) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }  
    }
    getData()
  }, [])

  return {data, loading, error}
}

export const Dogs = () => {
  const { data, loading, error} = useDogData();

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <>
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        {data && (data as Dog[]).map(({title, facts, id, statistics}) => (
          <div key={id}>
            { title }
            <p>{ statistics && Object.keys(statistics).map(key =>(<li key={key}>{key}: {(statistics as any)[key]}</li>))}</p>
            <p>{ facts && Object.keys(facts).map(key =>(<li key={key}>{key}: {(facts as any)[key]}</li>))}</p>
          </div>
        ))}
      </>
    </Suspense>
  );
}

export default Dogs