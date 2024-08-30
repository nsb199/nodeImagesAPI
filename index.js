const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config()
const app = express();

const port = process.env.PORT || 3000;

app.get("/api/image/random", async(req,res)=>{
    try{
       const response = await axios({
          method :"get",
          url : `https://api.unsplash.com/search/photos?page=1&query=nature&client_id=${process.env.UNSPLASH_API_KEY}`,
          Headers:{
             "Content-type" :"application/json"
          }
       })
       const imageUrl = response.data.results.map(image =>({
        id: image.id,
        url: image.urls.regular,
       }))

       res.json(imageUrl)
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            error: "An error occurred while fetching images",
          });
    }
})







app.listen(port , ()=>{
    console.log("server start at "+port)
})