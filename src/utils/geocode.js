const request = require('Request')

const geocode = function (address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2VuY2lvcGVyYXZvbG9zIiwiYSI6ImNqeDdwZmV2dDAxdTgzeXFjZDNrZGd6dXoifQ.zYSiIrDxgYtoySEp4CaKSQ&limit=1'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('ERROR - Unable to connect to MapBox service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('ERROR - Unable to find location: ' + address, undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode