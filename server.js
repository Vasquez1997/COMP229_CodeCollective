import express from 'express'
import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose'
import path from 'path'
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { 
    //useNewUrlParser: true,
//useCreateIndex: true, 
//useUnifiedTopology: true
 } )
.then(() => {
    console.log("Connected to the database!");
    })
    
mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})
app.use(express.static(path.join(__dirname, 'client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
});
app.get("/", (req, res) => {
res.json({ message: "Welcome to User application." });
});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
})