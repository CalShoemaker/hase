import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { Suspense } from "react";
import hase from "../../../images/app/hase.webp";
import { Link } from "@tanstack/react-router";
export const Home = () => {
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Container sx={{ py: 10, height: "100vh", width: 400 }}>
        <Paper sx={{ background: "#fff" }} elevation={5}>
          <Card>
            <CardMedia sx={{ height: 240 }}>
              <img
                src={hase}
                width={200}
                style={{ margin: "50px auto", display: "block" }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h4">
                Hase Süßkartoffel
              </Typography>
              <Typography variant="h6">
                [ˈhaːzə]{" "}
                <span style={{ display: "inline-block", width: 20 }}></span>
                [zeusːcar:tof':el]
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/dogs">Search Dogs</Link>
            </CardActions>
          </Card>
        </Paper>
      </Container>
    </Suspense>
  );
};

export default Home;
