const express=require("express")
const axios=require("axios")
const app=express()
require("dotenv").config()
// async function getnews(){
//     return await axios.get("https://newsdata.io/api/1/latest?apikey=pub_487843b54cd00e144ac56f855a5e5e3ba9021&language=en")
// }
async function getnews(query) {
    try {
        const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&q=${query}&language=en`);
        return response.data.results;
    } 
    catch (error) {
        console.error("Error fetching news data:", error);
    }
}
app.get("/",(req,res)=>{
    res.send("<h1>This is the News Server</h1>")
})
app.get("/getnews/:q", async (req,res)=>{
    let q=req.params.q
    console.log(q)
    const newsData = await getnews(q);
    res.send(newsData)
})
app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})