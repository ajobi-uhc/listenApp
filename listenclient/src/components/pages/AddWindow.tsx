import React, { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { addWindowAPI } from "../utils/addWindowAPI";
import { Formik } from "formik";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Signer } from "@solana/web3.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import defaultImage from "../../assets/default-placeholder.png";

export interface AddWindowProps {
  wallet: anchor.Wallet;
  connection: anchor.web3.Connection;
  program: anchor.Program;
}
//Select image -> select music -> select mint



export const AddWindow = (props: AddWindowProps) => {
  const [currentImageURL, setCurrentImageURL] = useState(
    ""
  );

  const [currentAudio, setCurrentAudio] = useState("")


  const onImageChange = (event:any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setCurrentImageURL(URL.createObjectURL(img))

    }
  }

  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    //@ts-ignore
    audioEl.play()
  }


  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <img
          height="240"
          width="240"
          src={currentImageURL}
          alt=""
        />
        <Button onClick = {playAudio}> Play audio </Button>
        <audio className="audio-element">
          <source src={currentAudio}></source>
        </audio>
        <CardContent>
          <Typography />
        </CardContent>
        <CardActions>
          <input type="file" name="myImage" onChange={onImageChange} />
        </CardActions>
      </Card>
    </div>
  );
};
