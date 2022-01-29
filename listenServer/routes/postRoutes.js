let express = require("express");
const anchor = require("@project-serum/anchor");
const WindowController = require("../controllers/window");
const LISTEN_PROGRAM = "6m1znDkNEAt3mzEpnigtxUGv2XVm1sN6UBdopWXdFK3u";
const myIDL = require("../utils/idl.json");
const multer = require('multer')
const fs = require('fs')



const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'getWindows/')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})
let upload = multer({ dest: 'uploads/' })



const connection = new anchor.web3.Connection(
  anchor.web3.clusterApiUrl("devnet"),
  "confirmed"
);

const provider = anchor.Provider.local("https://api.devnet.solana.com");
//FFdBCwc1k11GbuTkj1oMGZfEgQ5o3EkYprUqpS3X4PsG, Co8yPTsByynVCSzx9nLVYQEjLEpgyxo1SKAbVHSkS1Zf


const program = new anchor.Program(myIDL, LISTEN_PROGRAM, provider);

let router = express.Router();


router.post("/addWindow", async (req, res, next) => {
 

  let walletAddress = new anchor.web3.PublicKey(req.body.userKeypair);
  let tokenAccountAddress = new anchor.web3.PublicKey(req.body.tokenAccount);
  let mintAddress = new anchor.web3.PublicKey(req.body.mint);
  let newWindowProgram = new WindowController(program,connection);
  console.log("program id2",newWindowProgram.program.programId.toBase58());
  let newWindow = await newWindowProgram.apiAddWindows(walletAddress,mintAddress,tokenAccountAddress)
  //Validate if window exists already, if not then
  console.log(" new window ",newWindow.keys)

  res.send( newWindow );
});

router.post("/getWindows",upload.single('file') ,async (req,res,next) => {


  console.log(req.body)

  res.json({})

})



module.exports = router;
