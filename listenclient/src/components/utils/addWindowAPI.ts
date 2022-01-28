import React from "react";
import * as anchor from "@project-serum/anchor";
import { awaitTransactionSignatureConfirmation } from "./awaitSignatureConfirmation";
import {
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { NodeWallet } from "@project-serum/anchor/dist/provider";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
    PublicKey,
  sendAndConfirmTransaction,
  Signer,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import myIDL from "./idl.json"
import addWindow from "./listenProgram/addWindowCall";
import addWindowCall from "./listenProgram/addWindowCall";
export const addWindowAPI = async (
  wallet: anchor.Wallet,
  connection: anchor.web3.Connection,
  program:anchor.Program,
  prizeMint: anchor.web3.PublicKey,
  userTokenAccount: anchor.web3.PublicKey
) => {

 
const sig = await addWindowCall(wallet,connection,program,prizeMint,userTokenAccount);

const status = await awaitTransactionSignatureConfirmation(
    sig,
    3000,
    connection,
    "singleGossip",
    false
  );

  console.log(status)

//   console.log(signature);
};
