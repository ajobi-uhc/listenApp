import React from "react";


const addWindowLinks = async (data:any) => {
    let newLink = await (await fetch("https://localhost:4000/getWindows", {
        method:'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })).json()
}