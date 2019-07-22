const request = require('request')

const forecast = function (latitude, longitude, callback) {

    const url = 'https://api.darksky.net/forecast/f5e9a7d45aea59542dc4d0af2d5adb56/' +
        latitude + ',' + longitude + '?units=si&lang=it'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('ERROR - Unable to connect to Weather service!', undefined)
        } else if (body.error) {
            callback('ERROR - ' + body.error, undefined)
        } else {
            callback(undefined,
                body.daily.data[0].summary + ' ' +
                "Ci sono attualmente " + body.currently.temperature + " °C.\n"+ 
                "La probablità di pioggia è del " + body.currently.precipProbability * 100 + " %.\n" +
                "Temperatura minima e massima del giorno sono state: " + body.daily.data[0].temperatureLow +
                " - " + body.daily.data[0].temperatureHigh + " °C."  )
        }
    })

}

module.exports = forecast