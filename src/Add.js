import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import LocationComponent from "./LocationComponent";
import DateTimePicker from "@mui/lab/DateTimePicker";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

function Add() {
  const [user, loadingAuth, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [imgurl, setImgurl] = React.useState("");
  const [source, setSource] = React.useState("");
  const [latlng, setLatlng] = React.useState([]);
  const [date, setDate] = React.useState(new Date());

  const submitEvent = async () => {
    setLoading(true);
    try {
      const res = await addDoc(collection(db, "events"), {
        title,
        desc,
        imgurl,
        source,
        latlng,
        date: date.unix(),
        author: auth.currentUser.uid,
      });
      console.log(res);
      alert("Added with success");
    } catch (err) {
      console.error(err);
      alert("An error occured while adding data");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, loading]);

  return (
    <div className="dashboard">
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3, maxWidth: 400 }}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={8}>
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              size="200"
              onClick={() => navigate("/")}
            >
              <Close />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                id="title"
                aria-describedby="my-helper-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <FormHelperText id="my-helper-title">
                Insert a brief title.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel htmlFor="desc">Description</InputLabel>
              <Input
                id="desc"
                aria-describedby="my-helper-desc"
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
              />
              <FormHelperText id="my-helper-desc">
                [Optional] Insert a brief description.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl>
              <InputLabel htmlFor="imgurl">Image Url</InputLabel>
              <Input
                id="imgurl"
                aria-describedby="my-helper-imgurl"
                value={imgurl}
                onChange={(event) => setImgurl(event.target.value)}
              />
              <FormHelperText id="my-helper-imgurl">
                [Optional] Insert an url to an image.
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <FormControl>
              <InputLabel htmlFor="source">Source Url</InputLabel>
              <Input
                id="source"
                aria-describedby="my-helper-source"
                value={source}
                onChange={(event) => setSource(event.target.value)}
              />
              <FormHelperText id="my-helper-source">
                Insert an url to the source.
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl>
                  <InputLabel htmlFor="lat">Latitude</InputLabel>
                  <Input
                    id="lat"
                    aria-describedby="my-helper-lat"
                    value={latlng[0]}
                    onChange={(event) =>
                      setLatlng([event.target.value, latlng[1]])
                    }
                    type="number"
                    inputProps={{ step: 0.005 }}
                  />
                  <FormHelperText id="my-helper-lat">
                    Insert the latitude.
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <InputLabel htmlFor="lng">Longitude</InputLabel>
                  <Input
                    id="lng"
                    aria-describedby="my-helper-lng"
                    value={latlng[1]}
                    onChange={(event) =>
                      setLatlng([latlng[0], event.target.value])
                    }
                    type="number"
                    inputProps={{ step: 0.005 }}
                  />
                  <FormHelperText id="my-helper-lng">
                    Insert the longitude.
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <LocationComponent latlng={latlng} setLatlng={setLatlng} />
          </Grid>
          <Grid item xs={8}>
            <DateTimePicker
              label="Date&Time picker"
              value={date}
              onChange={setDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={8}>
            <Button variant="contained" onClick={submitEvent}>
              Submit Event
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || loadingAuth}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Add;
