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
  Container,
  Divider,
  ImageList,
  ImageListItem,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
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

export function Dog() {
  const { dogId } = useParams({ from: "/Dogs/Dog" });
  const { title, statistics, facts, id, tags, special } = useSelector(
    selectDogById(dogId!),
  );

  const [imgs] = useState(useDynamicDogs(id));

  // TODO: Refactor any types with types from store slice
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Paper>
        <Divider component="div" role="presentation">
          <Stack direction="column" spacing={2}>
            <Typography variant="h2">{title}</Typography>
            <Divider variant="middle" />
            {/* <Stack direction="row" spacing={1}>
              {statistics &&
                Object.keys(statistics).map((key) => (
                  <Chip
                    key={key}
                    color="info"
                    icon={<FaceIcon />}
                    label={(statistics as any)[key] || ''}
                  />
                ))}
            </Stack> */}
            <Stack direction="row" spacing={1} flexWrap={"wrap"}>
              {tags &&
                tags.map((item: any, i: number) => (
                  <Chip
                    color="primary"
                    sx={{ flexFlow: "wrap" }}
                    key={i}
                    label={item ? item : ""}
                  />
                ))}
            </Stack>
            <Divider variant="middle" />
            <Stack direction="row" spacing={3}>
              <Stack>
                <img src={imgSrc(id + "/_1.jpg")} />
                {facts &&
                  Object.keys(facts).map((key) => (
                    <Typography
                      key={key}
                      sx={{ whiteSpace: "normal", textAlign: "left", my: 1 }}
                    >
                      <strong>{key}:</strong> {(facts as any)[key]}
                    </Typography>
                  ))}
              </Stack>
              <Stack direction="column" spacing={1} textAlign={"left"}>
                {special &&
                  special.cards &&
                  special.cards.map((card: any, c: number) => (
                    <React.Fragment key={c}>
                      {card.rating &&
                        card.rating.map((rating: any, r: number) => (
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
                    </React.Fragment>
                  ))}
              </Stack>
            </Stack>
          </Stack>
        </Divider>
        <Stack direction="column" padding={2} spacing={2}>
          {special &&
            special.cards &&
            special.cards.map((card: any, c: number) => (
              <React.Fragment key={c}>
                {card.accordions &&
                  card.accordions.map((accordion: any, a: number) => (
                    <Accordion key={a}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel-" + a + "-content"}
                        id={"panel-" + a + "-header"}
                      >
                        <Typography variant="h5">{accordion.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack direction="row" spacing={10}>
                          <Typography>
                            {accordion.characteristics.rating &&
                              accordion.characteristics.rating.map(
                                (rating: any, z: number) => (
                                  <React.Fragment key={z}>
                                    <Typography component="legend">
                                      {rating.title}
                                    </Typography>
                                    <Rating
                                      name="read-only"
                                      value={rating.stars}
                                      readOnly
                                    />
                                  </React.Fragment>
                                ),
                              )}
                          </Typography>
                          <Typography>
                            {accordion.characteristics.content &&
                              accordion.characteristics.content.map(
                                (content: any, p: number) => (
                                  <React.Fragment key={p}>
                                    {content}
                                  </React.Fragment>
                                ),
                              )}
                          </Typography>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </React.Fragment>
            ))}
        </Stack>
        <ImageList cols={3}>
          {imgs.map((item: any) => (
            <ImageListItem key={item.id}>
              <img src={imgSrc(item.id)} />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Suspense>
  );
}

export default Dog;
