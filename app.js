const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRotes = require('./routes/auth')
const analyticsRotes = require('./routes/analytics')
const categoryRotes = require('./routes/category')
const orderRotes = require('./routes/order')
const positionRotes = require('./routes/position')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true } )
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));
    
app.use(passport.initialize())
require('./middelware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRotes)
app.use('/api/analytics', analyticsRotes)
app.use('/api/category', categoryRotes)
app.use('/api/order', orderRotes)
app.use('/api/position', positionRotes)

module.exports = app    