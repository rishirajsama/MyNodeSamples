const request = require('request')

const forecast=({latitude,longitude}, callback)=>{
 const url='http://api.weatherstack.com/current?access_key=231347b791b0e5b64a48d9ba69d8e2c8&query='+latitude+','+longitude

    request({url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to Weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find the location. Try with another location.',undefined)
        }
        else{
            callback(undefined,'Today is '+ body.location.localtime+'.  Current weather is bit '+body.current.weather_descriptions[0]+ '. It is currently '+body.current.temperature+' degree out. There is '+body.current.precip+'% raining chance')
        }
    })
}

module.exports=forecast
