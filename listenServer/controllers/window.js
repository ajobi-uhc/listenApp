const myIDL = require("../utils/idl.json");
const anchor = require("@project-serum/anchor");
const {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} = require("@solana/spl-token");
const TOKEN_METADATA_PROGRAM_ID = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
const LISTEN_PROGRAM = "6m1znDkNEAt3mzEpnigtxUGv2XVm1sN6UBdopWXdFK3u";
const connection = new anchor.web3.Connection(
  anchor.web3.clusterApiUrl("devnet"),
  "confirmed"
);

const provider = anchor.Provider.local("https://api.devnet.solana.com");

const program = new anchor.Program(myIDL, LISTEN_PROGRAM, provider);
module.exports = class WindowController {
  program;
  connection;

  constructor(program, connection) {
    this.program = program;
    this.connection = connection;
  }

  async initialize() {
    const ownerWallet = anchor.web3.Keypair.fromSecretKey(
      new Uint8Array(
        JSON.parse(
          require("fs").readFileSync(
            "/Users/aryajakkli/.config/solana/id.json",
            "utf8"
          )
        )
      )
    );

    console.log("program id", this.program.programId);

    let [all_windows, all_windows_bump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("start")],
        this.program.programId
      );

    console.log(all_windows.toBase58());

    // const tx1 = await this.program.rpc.initialize( all_windows_bump, {
    //   accounts: {
    //     allWindows: all_windows,
    //     creator: ownerWallet.publicKey,
    //     systemProgram: anchor.web3.SystemProgram.programId,
    //   },
    //   signers: [ownerWallet],
    // });

    // return all_windows
  }

  async apiAddWindows(userWallet, prizeMint, prizeTokenAccount) {
    let newWindowName = "begin";

    let [program_signer_pubkey, signer_bump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("signer")],
        this.program.programId
      );

    let [all_windows, all_windows_bump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("start")],
        this.program.programId
      );

    console.log("prize mint", prizeMint.toBase58());
    let ata = anchor.web3.Keypair.generate();

    let newInstruction = this.program.instruction.addWindow(
      signer_bump,
      newWindowName,
      all_windows_bump,
      {
        accounts: {
          admin: userWallet,
          programSigner: program_signer_pubkey,
          redeemable: prizeTokenAccount,
          redeemableMint: prizeMint,
          programRedeemableHolder: ata.publicKey,
          windowList: all_windows,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [ata],
      }
    );

    return newInstruction;
  }
};
