import { Link, useParams } from '@tanstack/react-router';
import React, { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDogById } from '../../../store/slices/dogs.slice';
import { ImageList, ImageListItem, Paper, Typography } from '@mui/material';

const useDynamicDogs = (id:string) => {
  let imgs = [] as object[];
  let root = '../../../images/';

  for(let i=1; i<= 10; i++){
    let img;
    try{
      img = require(root + id + '/_' + i + '.jpg')
    } catch (e) {
      img = '';
    }
    imgs.push({ id: root + id + '/_' + i + '.jpg', img})
  }
  return imgs;
}

export function Dog(){
  const { dogId } = useParams({ from:'/Dogs/Dog' });
  const { title, statistics, facts, id } = useSelector(selectDogById(dogId!));
  const [imgs, setImgs] = useState(useDynamicDogs(id));

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Paper>
          <Typography
            variant='h6'
          >
          { title }
          </Typography>
          <ul>{ statistics && Object.keys(statistics).map(key =>(<li key={key}>{key}: {(statistics as any)[key]}</li>))}</ul>
          <ul>{ facts && Object.keys(facts).map(key =>(<li key={key}>{key}: {(facts as any)[key]}</li>))}</ul>

          <ImageList sx={{  }} cols={3} >
          {imgs.map((item:any) => (
            <ImageListItem key={item.img}>
              <img
                src={item.img}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Suspense>
  );
}

export default Dog