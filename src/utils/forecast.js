const request = require('postman-request')

const forecast = (lat,lon,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=97f360ab35f9213fa7794acbabd4140a&query='+lon+','+lat
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect the server.', undefined)
        } else if (body.error) {
            callback('Invalid area.',undefined)
        } else {
            const data = body.current
            callback(undefined, "It is currently " + data.temperature + " degrees out. It feels like " + data.feelslike + " degress out. And the humidity is "+ data.humidity +".")
        }
    })
}
module.exports = forecast