import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { AddWindow } from "./AddWindow";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Account, Signer } from "@solana/web3.js";
import Display from "./Display";
import { AnyRecord } from "dns";
import Grid from '@mui/material/Grid';
import { WindowCard } from "./UI/WindowCard";

export interface ExploreWindowsProps {
  connection: anchor.web3.Connection;
  program: anchor.Program;
  windows: any;
  wallet: anchor.Wallet;
}


export const ExploreWindows =  (props: ExploreWindowsProps) => {

  const[isAddingWindow, setIsAddingWindow] = useState(false)




  return (
    <>
  {isAddingWindow ? (
    <AddWindow 
    
    connection = {props.connection}
    wallet = {props.wallet}
    program = {props.program}
    
    
    />
  ) : (
    <>
<Button onClick = {()=>setIsAddingWindow(true)}  > Add a window </Button>


<Grid sx={{ flexGrow: 1, marginTop:"105px" }} container spacing={2}>
  <Grid item xs={12}>
    <Grid container justifyContent="center" spacing={14}>

      {

      props.windows.map((value:any) => (
        <Grid key={value.creator} item>
          <WindowCard
            windows = {props.windows}
          />
        </Grid>


      ))}
    </Grid>
  </Grid>

</Grid>
</>
  )}
    
    </>

  );
};
