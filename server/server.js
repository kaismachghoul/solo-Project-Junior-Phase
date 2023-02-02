const express = require("express");
const cors = require("cors");
let app = express();
// const db = require ('./databaase/database')
const { saveArchitect, saveProject,findAllArchitect,findAllProject,deleteProject,updateProject } = require("./databaase/database");

// app.use(express.static(__dirname + '/../client/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.put("/users/architects/project/update/:id", (req,res)=>{
  updateProject(req.params.id, req.body).then((response)=>{
    console.log(response)
  }).catch((err)=>{console.log(err)})
})


app.delete("/users/architects/project/delete/:id", (req,res)=>{
  console.log("============================>",req.params)
  deleteProject(req.params.id).then(response=>{
    res.status(200).json(response)
  }).catch(err=>{console.log(err)})
})

app.post("/users/architects", async function (req, res) {
  
  let store = {
    name: req.body.architectDetails.name,
    lastname: req.body.architectDetails.lastName,
    email: req.body.architectDetails.emailuser,
    agencyName :req.body.architectDetails.agencyName,
    location : req.body.architectDetails.location,
    password : req.body.architectDetails.password,
  };

  try{
    let add = await saveArchitect(store)
    res.status(200).json(add)
  }catch(err){
  res.status(501).json(err)
  }
});

app.post("/users/architects/project/:_id", async function (req, res) {

  console.log(req.params)
  let store = {
    name: req.body.name,
    date: req.body.date,
    description: req.body.description,
    image: req.body.image,
    architect : req.params
  };
  console.log(store)
try{
 let save= await saveProject(store)
  res.status(200).json(save);
}catch(err){
  console.error(err)
}
  
});

app.get("/users/architects/project", async (req,res)=>{

  try{
  let find = await findAllProject()
  console.log(find)
  res.status(201).json(find)
}
catch(err){
  console.log(err);
}

})

app.get("/users/architects", async (req,res)=>{
  try{
let ar=  await findAllArchitect()
  res.status(201).json(ar)
  }
  catch (err){
    console.log(err)
  }
})

app.get("/users", function (req, res) {});

let port = 8080;

app.listen(port, function () {
  console.log(`this is my server, listening on port ${port}`);
});
