import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { Suspense } from "react";
import hase from "../../../images/app/hase.webp";
import { Link } from "@tanstack/react-router";

// TODO: Abstract sx={{}} everywhere into theme
export const Home = () => {
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Container sx={{ py: 10, height: "100vh", width: 400 }}>
        <Paper sx={{ background: "#fff" }} elevation={5}>
          <Card>
            <CardMedia sx={{ height: 170 }}>
              <img
                alt="Hase Susskartoffel"
                src={hase}
                width={150}
                style={{ margin: "30px auto", display: "block" }}
              />
            </CardMedia>
            <CardContent>
              <Typography variant="h4">Hase Süßkartoffel</Typography>
              <Typography variant="h6">
                [ˈhaːzə]{" "}
                <span style={{ display: "inline-block", width: 20 }}></span>
                [zeusːcar:tof':el]
              </Typography>
              <Typography variant="body1" color="text.primary" py={1}>
                <em>Wissen, wie der Hase läuft.</em> <br />{" "}
                <strong>To know which way the wind blows.</strong>
              </Typography>
              <Divider variant="middle" />
              <Typography variant="h5" color="text.primary" py={2}>
                Play with <strong>Hase</strong> to find dogs!
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/dogs" style={{ display: "block", width: "100%" }}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{ color: "#fff", width: "100%" }}
                >
                  Let Hase &nbsp;<em>Fetch Dogs</em>&nbsp; for You
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Paper>
      </Container>
    </Suspense>
  );
};

export default Home;
