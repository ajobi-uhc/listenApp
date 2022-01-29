import React, { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { addWindowAPI } from "../utils/addWindowAPI";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Signer } from "@solana/web3.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import defaultImage from "../../assets/default-placeholder.png";
import ReactAudioPlayer from "react-audio-player";
import SubmitMintForm from "./UI/MintForm";

export interface AddWindowProps {
  wallet: anchor.Wallet;
  connection: anchor.web3.Connection;
  program: anchor.Program;
}
//Select image -> select music -> select mint

export const AddWindow = (props: AddWindowProps) => {
  const [currentImageURL, setCurrentImageURL] = useState("");

  const [currentAudio, setCurrentAudio] = useState("");

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setCurrentImageURL(URL.createObjectURL(img));
    }
  };

  const onAudioChange = (event: any) => {
    if (event.target.files) {
      const urlObject = URL.createObjectURL(event.target.files[0]);
      let audioElement = document.getElementsByClassName("audio-element")[0];
      //@ts-ignore
      setCurrentAudio(urlObject);
  
    }
  };


  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <img height="240" width="240" src={currentImageURL} alt="" />
      
        <ReactAudioPlayer src={currentAudio} autoPlay = {true} />

        <CardContent>
          <Typography />
        </CardContent>
        <CardActions>
          <input type="file" name="myImage" onChange={onImageChange} />
          <input type="file" name="muAudio" onChange={onAudioChange} />
         
        </CardActions>
      </Card>
      <SubmitMintForm 
      
      connection = {props.connection}
      program = {props.program}
      wallet=  {props.wallet}
      musicFile = {currentAudio}
      imageFile = {currentImageURL}
      
      />
     
    </div>
  );
};
