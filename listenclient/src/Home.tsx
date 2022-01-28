import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";
import Display from "./components/pages/Display";
import { LAMPORTS_PER_SOL, Signer } from "@solana/web3.js";

import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import {
  ExploreWindows,
  ExploreWindowsProps,
} from "./components//pages/ExploreWindows";
import { fetchWindowProgram } from "./components/utils/listenProgram/fetchWindowProgram";

export interface ComponentProps {
  connection: anchor.web3.Connection;
  wallet: anchor.Wallet;
}

export interface HomeProps {
  connection: anchor.web3.Connection;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [windows, setWindows] = useState<[]>();
  const [program, setProgram] = useState<anchor.Program>();

  const wallet = useAnchorWallet();

  const refreshListenState = () => {
    (async () => {
      if (wallet) {
        const { newProg, windowList } = await fetchWindowProgram(
          wallet as anchor.Wallet,
          props.connection
        );

        
        setWindows(windowList[0].account.allWindows)
        console.log(windows)
        setProgram(newProg)
      }
    })();
  };

  useEffect(refreshListenState, [wallet, props.connection]);

  return (
    <main>
      {!wallet ? (
        <Display />
      ) : (
    
        program && windows && (
          <>
          <Button onClick = {refreshListenState}> Refresh listen state  </Button>
          {windows.map((eachWindow)=>{
            <li> {eachWindow} </li>
          })}
          <ExploreWindows
            connection={props.connection}
            program={program}
            windows = {windows}
            wallet={wallet as anchor.Wallet}
          />
          </>
        )
      )}
    </main>
  );
};

export default Home;
