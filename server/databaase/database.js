const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/architects",
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    },
    mongoose.set("strictQuery", true)
  )
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

let architectSchema = mongoose.Schema({
    name : {
      type : String,
      required : true
    },
    lastname : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : true,
      unique : true 
    },
    agencyName : {
      type : String,
      required : true
    },
    location : {
      type : String,
      required : true
    },
    password : {
      type :String,
      required : true
    },
   
  });

let projectsSchema = mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  date: {
    type : String,
    required : true
  },
  description: {
    type : String,
    required : true
  },
  image : String,
 
  architect : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Architects",
    required : true
  }],
});

let Architects = mongoose.model("Architects", architectSchema);
let Projects= mongoose.model("Projects",projectsSchema)

let saveArchitect = async (architect) => {
  console.log('8888888888888',architect)
  
 return  Architects.create(architect)
};

let saveProject= (project)=>{
 return Projects.create(project)
}

let findAllArchitect = ()=>{
   return Architects.find({})
}

let findAllProject=(id)=>{
  return Projects.find({})
}

let deleteProject =(id)=>{
  console.log("-------------------------------------------",id)
  return Projects.findByIdAndRemove(id)
}

let updateProject =(id,data)=>{
  console.log(id,data)
  return Projects.findByIdAndUpdate(id,data)
}



module.exports.saveArchitect = saveArchitect;
module.exports.saveProject=saveProject;
module.exports.findAllArchitect=findAllArchitect
module.exports.findAllProject=findAllProject
module.exports.deleteProject=deleteProject
module.exports.updateProject=updateProject
