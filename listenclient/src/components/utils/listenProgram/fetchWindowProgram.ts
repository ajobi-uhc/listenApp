import React from "react";
import * as anchor from "@project-serum/anchor";
import myIDL from "../idl.json";

export const fetchWindowProgram = async (
  wallet: anchor.Wallet,
  connection: anchor.web3.Connection
) => {
  const listenProgramId = new anchor.web3.PublicKey(
    "6m1znDkNEAt3mzEpnigtxUGv2XVm1sN6UBdopWXdFK3u"
  );

  const provider = new anchor.Provider(connection, wallet, {
    preflightCommitment: "recent",
  });

  //@ts-ignore
  const newProg = new anchor.Program(myIDL, listenProgramId, provider);

  let windowList = await newProg.account.windowList.all()

  return {
      newProg,
      windowList
  }
 

};
