'use strict'

const express = require('express');
const dealRouter = express.Router();
const Deal = require('./../models/deal')

//POST '/deal/create'
dealRouter.post('/deal/create', (req, res, next) => {

})


//GET '/deal/:id/edit'
dealRouter.get('/deal/:id/edit', (req, res, next) => {
    
})


//POST '/deal/:id/edit'
dealRouter.post('/deal/:id/edit', (req, res, next) => {
    
})


//POST '/deal/:id/delete'
dealRouter.post('/deal/:id/delete', (req, res, next) => {
    
})
 


module.exports = dealRouter