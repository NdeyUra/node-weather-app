const request = require('request');
const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&%20&appid=8f61b0c6f1864a158dafc180cc3451bc&units=metric'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather network', undefined);
        } else if (body.message) {
            callback('Unable to find Latitude and Longitude values', undefined);
        } else {
            callback(undefined, body.current.weather[0].description + '.It is currently ' + body.current.temp + ' degree outside.There is ' + body.current.clouds + '% clouds .The Maximum Temparature is ' + body.daily[0].temp.max + ' degree and minimum is ' + body.daily[0].temp.min + ' degree.The temparature that feels is ' + body.current.feels_like + ' degree and the wind speed is ' + body.current.wind_speed + ' km/h');
        }
    })
}
module.exports = forecast;