import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

function Add() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [imgurl, setImgurl] = React.useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  return (
    <div className="dashboard">
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
    </div>
  );
}
export default Add;
