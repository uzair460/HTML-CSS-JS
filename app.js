const express = require('express')
const app = express()
const port = 3000

//ORM
//importing the mongoose orm module and assinging to constant
const mongoose = require('mongoose')
//assing to URI
const mongoDB='mongodb+srv://anjumuzair46:Uzairanjum46@clusterfullstack.gdw6vxl.mongodb.net/Universaty'
//Attempt database connection and auth base on username and password
mongoose.connect(mongoDB)
//Assigning deytails of database connection
const db = mongoose.connection
// Generation error messages if fails
db.on('Eroor', console.log.bind(console, "mongodb connection error:"))

// document Schema reggister the structure of the data that will be stored
const studentSchema = new mongoose.Schema({
    forename : String,
    surname : String,
    email: String
})



// create an object base on Student class
    const Student = mongoose.model('student', studentSchema);


//routes 
app.get('/api/students/', (req, res) => {
  res.send('Hello World! students')
})
//test route 
app.get('/api/students/test', (req, res) => {
    const newStudent = new Student ({
        forename: 'Uzair',
        surname: 'Anjum',
        email : 'anjumuzair46@gmail.com'
    })
    newStudent.save();
    res.send('new reccord created')
    console.log(`New student has been created: ${newStudent}.`)

  })
  app.post('/api/students/:forename/:surname/:email', (req, res) => {
    const newStudent = new Student ({
        forename: req.params.forename,
        surname: req.params.surname,
        email :  req.params.email
    })
    newStudent.save();
    res.send('new reccord created')
    console.log(`New student has been created: ${newStudent}.`)

  })

app.listen(port, () => {
  console.log(`api listening on port ${port}`)
})