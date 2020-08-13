const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/GeoCode')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Itshak Barabie'
    })
})
app.get('/about', (req, res) => {
    res.render('about', { //this is the hbs file
        title: 'About me',
        name: 'Itshak Barabie'
    })
})
app.get('/help', (req, res) => {
    res.render('help', { //this is the hbs file
        title: 'Help page',
        content: 'Lorem ipsum',
        name: 'Itshak Barabie'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'missing address'
        })
    }
    //res.send('else')
    geoCode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecase: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Itshak Barabie',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Itshak Barabie',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})