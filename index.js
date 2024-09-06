const cl = console.log

const http = require('http')
const postsArr = [
  {
    title: 'Angular and Node',
    content: 'Angular and Node',
    userId: 5,
    id: 123
  },
  {
    title: 'MEAN Stack',
    content: 'MEAN Stack',
    userId: 9,
    id: 124
  }
]
// const server = http.createServer((req,res) => {
//     res.end(`This is our first response`)
// })

// server.listen(3000, () => {
//   cl(`Server is running on port 3000`)
// })

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/dev');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(cors({
  origin : ['http://127.0.0.1:5500', 'http://4200'],
  methos : ['GET', "POST", "PATCH", "DELETE"],
  allowedHeaders : ['Content-Type', 'Authorization'],
  credentials : true
}));


app.get('/posts', (req, res) => {
  res.json(postsArr)
})

app.get('/posts/:id', (req, res) => {
  let postId = req.params.id
  let post = postsArr.find(post => post.id === +postId)
  res.json(post)
})

app.post('/posts', (req, res) => {
  let newpost = req.body 
  postsArr.push(newpost)
  res.status(200).json(newpost)
})

app.patch('/posts/:id', (req, res) => {
  let updatedPost = req.body
  let getIndex = postsArr.findIndex(post => post.id === updatedPost.id)
  postsArr[getIndex] = updatedPost
  res.json({ message: `Post with id ${updatedPost.id} is updated succussfully`, post: updatedPost })
})

app.delete("/posts/:id", (req,res) => {
    let removeId = +req.params.id;

    let getIndex = postsArr.findIndex(post => post.id === removeId);

    postsArr.splice(getIndex, 1);

    res.status(200).json({
        message : `Post with id ${removeId} is removed successfully`
    })
})

mongoose.connect(config.DB_URL)
  .then(() => {
    cl(`Mongoose is coonected`)
  })

app.listen(PORT, () => {
  cl(`App is runnig on Port ${PORT}`)
})
