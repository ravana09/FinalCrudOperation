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









// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/crudData', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define Profile schema
// const profileSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   phoneNumber: String,
//   avatar: String,
// });

// const Profile = mongoose.model('Profile', profileSchema);

// // API endpoints
// app.get('/api/profiles', async (req, res) => {
//   try {
//     const profiles = await Profile.find();
//     res.json(profiles);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.post('/api/profiles', async (req, res) => {
//   const profile = new Profile(req.body);
//   try {
//     const newProfile = await profile.save();
//     res.status(201).json(newProfile);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.get('/api/profiles/:id', async (req, res) => {
//   try {
//     const profile = await Profile.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.put('/api/profiles/:id', async (req, res) => {
//   try {
//     const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(profile);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.delete('/api/profiles/:id', async (req, res) => {
//   try {
//     await Profile.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Profile deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });








