const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)

//Setup the static folder path
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
res.render('index', {
title:'Welcome Page',
name:'Rishi Kumar Tiwari'})
})

app.get('/about', (req, res)=>{
res.render('about', {
    title: 'Welcome on About Page',
    name:'Rishi Kumar Tiwari'
})
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Welcome on Help Page',
        name:'Rishi Kumar Tiwari',
        helpText:'We are ready to listen you'
    })

})

app.get('/weather', (req,res)=>{
if(!req.query.address){
    return res.send({
        error:'you must provide address.'
    })
}

geocode(req.query.address, (error, {longitude, latitude, location})=>{
if(error){
    res.send({error})
}
 forecast({longitude,latitude}, (error, forecastData)=>{
    if(error){
        res.send({error})
    }

    res.send({
        forecast:forecastData,
        location,
        address:req.query.address
    })

 })

})
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Welcome on Help Page',
        name:'Rishi Kumar Tiwari',
        errorMessage:'There is some error, please look into help section'
    })

})



app.listen(3000, ()=>{
console.log('Server is up on port with nodemon!') 
}) 