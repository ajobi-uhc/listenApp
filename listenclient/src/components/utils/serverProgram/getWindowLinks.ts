import React from "react";



const getWindowLinks = async () => {

    let getServerLinks = await ( await fetch('https://localhost:4000/getWindows')).json()

    console.log("server links",getServerLinks)



}

export default getWindowLinks