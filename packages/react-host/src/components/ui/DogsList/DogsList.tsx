"Use Server";
import { Link } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { IDog, IStatistics } from "../../../store/slices/dogs.slice";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import Masonry from '@mui/lab/Masonry';

const imgSrc = (id: string) => {
  try {
    return require("../../../images/" + id + "/_1.jpg");
  } catch (e) {
    return require("../../../images/app/dachshund-profile.png");
  }
};

// TODO: Refactor any type
// TODO: Legit loading component.
export const DogsList = (props: any) => {
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Masonry spacing={1} columns={3}>
        {props.dogs &&
          (props.dogs as IDog[]).map(({ title, id, statistics }) => (
            <Card sx={{ position:'relative'  }} elevation={0} key={title}>
              <CardContent color="transparent" sx={{ 
                backdropFilter:"blur(20px)", 
                position:'absolute', 
                bottom:0, 
                width:'100%', 
                p:1, 
                fontWeight:'bolder', 
                background:'rgba(250,250,250,0.5)' 
              }}>
                <Typography gutterBottom variant="h5" color="transparent" sx={{ color:'#111'}} mx={2}>
                  {title}
                </Typography>
              </CardContent>
              <CardMedia sx={{ overflow: "hidden" }}>
                <Link from="/" to={"/dogs/$dogId"} params={{ dogId: id }}>
                  <img alt={id} src={imgSrc(id)} width={"100%"} />
                </Link>
              </CardMedia>
            </Card>
          ))}
      </Masonry>
    </Suspense>
  );
};

export default DogsList;
