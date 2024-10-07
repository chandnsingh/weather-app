import express from 'express';
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();
const app=express()
const port=3000;
const apiKey=process.env.API_KEY
const api_url="https://weatherapi-com.p.rapidapi.com/current.json"

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("weather.ejs")
})

app.post("/weather/:city",async(req,res)=>{
    const city=req.body.city
    try {
        const response=await axios.get(api_url + `?q=${city}`,{
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
              }
        })
       const result=response.data
        res.render("weather.ejs",{
            city:city,
            result:result
        })
        console.log(result)
    } catch (error) {
        res.send(error+ ": city not found")
    }
})
   
app.get('/weather/:city/:day',async(req,res)=>{
    const city=req.params.city
    const day=req.params.day
    try {
        const response=await axios.get(api_url +`?q=${city},days=${day}`,{
            headers:{
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        })
        const result=response.data
        res.send(result)
        console.log(result)
        

    } catch (error) {
        
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})