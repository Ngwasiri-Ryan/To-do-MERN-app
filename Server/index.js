const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const dotenv = require('dotenv')

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


const uri= 
"mongodb+srv://Ngwasiri:Ngwasiri_123@cluster0.s60y2a6.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"

async function connect(){
  try{
     await mongoose.connect(uri);
     console.log("Connected to MongoDB")
  }catch(error){
     console.error(error);
  }
}

connect();

app.post( '/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
      task: task
    }).then(result => res.json(result))
    .catch(err=> res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running');
});