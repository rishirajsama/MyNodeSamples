const request = require('request')


const geocode= (address,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicmlzaGlyYWpzYW1hIiwiYSI6ImNrOXRsamg3YTBrcm8zZXBjcG5sZzkzNWUifQ.7vpo4pvP4GziEy0UTUs05w'

request({url, json: true}, (error, {body})=>{    
    if(error){
        callback('Unable to connect Weather service',undefined)
    }    
    else if(body.features.length==0){
      
        callback('Unable to find the location. Try with another location.',undefined)
    }
    else{ 
        callback(undefined,{
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
         })
    }
})
}


module.exports=geocode