import React, { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Account, Signer } from "@solana/web3.js";
import { AnyRecord } from "dns";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export const WindowCard = (windows: any) => {

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography />
      </CardContent>
      <CardActions>
        <Button size="small">Start Listening</Button>
      </CardActions>
    </Card>
  );
};
