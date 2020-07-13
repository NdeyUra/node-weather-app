const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');
const { error } = require('console');

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const dir = path.join(__dirname, '../public');
const viewdir = path.join(__dirname, '../template/views');
const partialdir = path.join(__dirname, '../template/partials');
//Set up handlebars and views location
app.set('views', viewdir);
app.set('view engine', 'hbs');
hbs.registerPartials(partialdir);

//Set up static directory to serve
app.use(express.static(dir));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saurav'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Pandey'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Saurav'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, Forecast) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    location,
                    forecast: Forecast,
                    address: req.query.address
                });
            })
        })
        // res.send({
        //     forecast: 'its raining',
        //     Loaction: req.query.address

    // });
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        pTitle: 'Help page not found',
        name: 'Saurav'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        pTitle: 'Page not found',
        name: 'Saurav'
    });
})
app.listen(port, () => {
    console.log('Server is up and running on port' + port);
})