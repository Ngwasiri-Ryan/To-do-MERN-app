const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const dotenv = require('dotenv')
const fs = require('fs');

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

app.put('/update/:id',(req , res) => {
  const {id} = req.params;
 TodoModel.findByIdAndUpdate({ _id: id}, {done: true})
 .then(result => res.json(result))
 .catch(err=> res.json(err))
})

app.delete('/delete/:id', (req , res) => {
  const {id} = req.params;
  TodoModel.findByIdAndDelete({ _id: id})
  .then(result => res.json(result))
  .catch(err=> res.json(err))
})


app.get('/get', (req , res) => {
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err=> res.json(err))
})


app.post( '/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
      task: task
    }).then(result => res.json(result))
    .catch(err=> res.json(err))
})

app.listen(3001, () => {
  const message = 'Server is running on port 3001\n';
  fs.appendFile('server.log', message, err => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      console.log('Server is running and message logged.');
    }
  });
});