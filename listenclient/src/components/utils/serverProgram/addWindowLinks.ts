import React from "react";
import * as RNFS from 'react-native-fs'
import axios from 'axios'
const addWindowLinks = async (musicFile:any, imageFile:any) => {

    console.log( " musica",musicFile);
    console.log("image", imageFile)

    const formData = new FormData();
    let newMusicFile = Buffer.from(musicFile);

    formData.append('file',musicFile)

    // let newImageFile = Buffer.from(imageFile)
    // let data = {musica: newMusicFile}
    // let newData = "wow";

    axios.post("http://localhost:4000/getWindows", formData)
    .then(res => { // then print response status
      console.log(res.statusText)
    })

    
}

export default addWindowLinks;