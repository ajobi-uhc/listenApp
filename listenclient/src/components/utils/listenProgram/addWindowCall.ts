import React from "react";
import * as anchor from "@project-serum/anchor";
import myIDL from "../idl.json";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
//93RCT6cHRKx3Jvg11u1Hsk8mkbd6pYrWMzQ5ibETpcWN, AKL1nTizsSgeZGQTTGzvtcSYufDUeow5Jm1zdo3DkdkU
const addWindowCall = async (
  wallet: anchor.Wallet,
  connection: anchor.web3.Connection,
  program:anchor.Program,
  prizeMint: anchor.web3.PublicKey,
) => {
  let programId = new anchor.web3.PublicKey(
    "6m1znDkNEAt3mzEpnigtxUGv2XVm1sN6UBdopWXdFK3u"
  );

  let [userTokenAccount, userTokenbump] = await anchor.web3.PublicKey.findProgramAddress(
    [wallet.publicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), prizeMint.toBuffer() ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  )
  console.log("got token account", userTokenAccount.toBase58())
  let [program_signer_pubkey, signer_bump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("signer")],
      programId
    );

  let [all_windows, all_windows_bump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("start")],
      programId
    );

  console.log("prize mint", prizeMint.toBase58());
  let ata = anchor.web3.Keypair.generate();
  let newWindowName = "begin";

  // const provider = new anchor.Provider(connection, wallet, {
  //   preflightCommitment: "recent",
  // });

  // //@ts-ignore
  // const program = new anchor.Program(myIDL, programId, provider);

 return  await program.rpc.addWindow(
    signer_bump,
    newWindowName,
    all_windows_bump,
    {
      accounts: {
        admin: wallet.publicKey,
        programSigner: program_signer_pubkey,
        redeemable: userTokenAccount,
        redeemableMint: prizeMint,
        programRedeemableHolder: ata.publicKey,
        windowList: all_windows,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [ ata ],
    }
  )
  
  // sig.feePayer =  provider.wallet.publicKey;
  // let blockhashObj = await provider.connection.getRecentBlockhash();
  // sig.recentBlockhash =  blockhashObj.blockhash;
  // //@ts-ignore
  // sig.sign(wallet);
  // const signedTransaction = await provider.wallet.signTransaction(sig);
  // var test = signedTransaction.serialize();
  // const transactionId = await provider.connection.sendRawTransaction(test);
};

export default addWindowCall;
