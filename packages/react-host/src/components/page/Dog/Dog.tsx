import { useParams } from "@tanstack/react-router";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { selectDogById } from "../../../store/slices/dogs.slice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const imgSrc = (uri: string) => {
  try {
    return require("../../../images/" + uri);
  } catch (e) {
    return require("../../../images/app/dachshund-profile.png");
  }
};

// TODO: Refactor limit with folder length
const useDynamicDogs = (id: string) => {
  let imgs = [] as object[];
  for (let i = 1; i <= 9; i++) {
    imgs.push({ id: id + "/_" + i + ".jpg" });
  }
  return imgs;
};

const ratingStack = (ratings: any) => {
  return (              
    <Stack direction="column" spacing={1} textAlign={"left"}>
      { ratings.map((rating: any, r: number) => (
          <span key={r}>
            <Typography component="legend">
              {rating.title}
            </Typography>
            <Rating
              name="read-only"
              value={rating.stars}
              readOnly
            />
          </span>
      ))}
    </Stack>
  )
}

const tagsStack = (tags: any) =>{
  return (
    <Stack direction="row" spacing={1} flexWrap={"wrap"}>
      {tags.map((item: any, i: number) => (
          <Chip
            color="primary"
            sx={{ flexFlow: "wrap" }}
            key={i}
            label={item ? item : ""}
          />
        ))}
    </Stack>
  )
}

const heroStack = (id: string, facts: any) => {
  return (
    <Stack style={{maxWidth:'50%'}}>
      <img alt={id} src={ imgSrc(id + "/_1.jpg") } />
      {Object.keys(facts).map((key) => (
          <Typography
            key={key}
            sx={{ whiteSpace: "normal", textAlign: "left", my: 1 }}
          >
            <strong>{ key }:</strong> {(facts as any)[key]}
          </Typography>
        ))}
    </Stack>
  )
}

const pStack = (p:Array<any>) => {
  return (
    <Typography>
      {p.map(
        (content: any, p: number) => (
          <p key={p}>
            { content }
          </p>
        ),
      )}
    </Typography>
  )
}

const chipsStack = (statistics: string) => {
  return (
    <Stack direction="row" spacing={1}>
      { Object.keys(statistics).map((key) => (
          <Chip
            key={key}
            color="info"
            // icon={<FaceIcon />}
            label={(statistics as any)[key] || ''}
          />
        ))}
    </Stack>
  )
}

const accordionsStack = (accordions: any[]) => {
  return (
    <Stack direction="column" spacing={2}>
      { accordions.map((accordion: any, a: number) => (
        <Accordion key={a}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"panel-" + a + "-content"}
            id={"panel-" + a + "-header"}
          >
            <Typography variant="h5">{ accordion.title }</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" spacing={10}>
              { ratingStack(accordion.characteristics.rating) }
              { pStack(accordion.characteristics.content) }
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  )
}

const imageStack = (imgs:Array<any>) => {
  return (
    <ImageList cols={3}>
      {imgs.map((item: any) => (
        <ImageListItem key={item.id}>
          <img alt={item.id} src={imgSrc(item.id)} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export function Dog() {
  const { dogId } = useParams({ from: "/Dogs/Dog" });
  const { title, statistics, facts, id, tags, special } = useSelector(
    selectDogById(dogId!),
  );
  const [imgs] = useState(useDynamicDogs(id));

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Paper sx={{ padding:5 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h2">{title}</Typography>
          <Divider variant="middle" />
          { tags ? tagsStack(tags) : '' }
          <Divider variant="middle" />
          <Stack direction="row" spacing={3}>
            { heroStack(id, facts) }
            { special?.cards && special?.cards[0].rating ? ratingStack(special?.cards[0].rating) : '' }
          </Stack>
        </Stack>
        <Divider variant="middle" sx={{ my:5 }} />
        { special?.cards && special?.cards[0].accordions ? accordionsStack(special.cards[0].accordions) : '' }
        <Divider variant="middle" sx={{ my:5 }} />
        { imgs ? imageStack(imgs) : '' }
      </Paper>
    </Suspense>
  );
}

export default Dog;