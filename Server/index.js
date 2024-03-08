const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



require('dotenv').config();


const port = 5000 || process.env.PORT


const app = express();
app.use(express.json());
app.use(cors());



// Define Profile schema
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: Number,
  avatar: String,
},{
    timestamps:true
}

);

const Profile = mongoose.model('Profile', profileSchema);

//reading data 
app.get("/", async(req,res)=>{

    const data = await Profile.find({})
    res.json( {success: true , data: data })
})

//craete data 
app.post("/create", async(req,res)=>{

    console.log(req.body)
    const data = new Profile(req.body)
    await data.save()
    res.json( {success: true , message: "Data has been saved succesfully ",Data:data })
});


//update data 
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const {id,...rest}=req.body;
    console.log(rest)
    const data= await Profile.updateOne({_id:id},rest)
    res.json( {success: true , message: "Data has been updated  succesfully ", Data:data })

})

//delete data

app.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id;
    console.log(id)
    const data =await Profile.deleteOne({_id:id})


    res.json( {success: true , message: "Data has been deleted   succesfully ",Data:data })

})

//connection of db

mongoose.connect('mongodb://localhost:27017/crudData')
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port:http://localhost:${port}`);
      });
})
.catch((err)=>{
console.log(`Error fetch in db connection :${err}`)
})









