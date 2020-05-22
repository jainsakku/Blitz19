if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const mongoose = require('mongoose');
const device = require('express-device');
const compression = require('compression')
const favicon = require('serve-favicon')
const subdomain = require('express-subdomain');
const registrationHandler = require('./server/registration')
const teamHandler = require('./server/team')
const prezHandler = require('./server/prez')
const port = process.env.PORT || 8081
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'

// app.use(helmet())

app.use(compression())

app.use(favicon(path.resolve(__dirname, './src/images/favicon.ico')))

mongoose.connect(uri, {
    useNewUrlParser: true,
    dbName: process.env.DB_NAME || "blitzschlag",
    reconnectInterval: 500,
    reconnectTries: 5
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
  console.log("Mongo Connected")
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(device.capture())

app.use(subdomain('team', teamHandler))
app.use(subdomain('prez', prezHandler))

app.use('/dist', express.static('dist'))

app.use('/register', registrationHandler)

app.get('/', (req, res) => res.sendFile(path.resolve('./dist/index.html')))

app.get('/team', (req, res) => res.sendFile(path.resolve('./dist/team.html')))

app.get('/timeline', (req, res) => res.sendFile(path.resolve('./dist/timeline.html')))

app.get('/celeb', (req, res) => res.sendFile(path.resolve('./dist/celeb.html')))

app.get('/Flagships', (req, res) => res.sendFile(path.resolve('./dist/pronite.html')))

app.get('/payment', (req, res) => res.sendFile(path.resolve('./dist/payment.html')))

// app.get('/destho', (req, res) => res.sendFile(path.resolve('./dist/destho.html')))

app.get('/events/:event', (req, res) => res.sendFile(path.resolve(`./dist/events/${req.params.event}.${req.device.type === 'phone'?'mob':'pc'}.html`)))

app.get('/events/register/#/:society/:event', (req, res) => res.sendFile(path.resolve('./dist/events/register.mob.html')))
app.get('/events/registert/#/:society/:event', (req, res) => res.sendFile(path.resolve('./dist/events/registert.mob.html')))

app.get('/workshops', (req, res) => res.sendFile(path.join(__dirname, `./dist/workshops.${req.device.type === 'phone'?'mob':'pc'}.html`)))

app.get('/workshops/:workshop', (req, res) => res.sendFile(path.resolve(`./dist/workshops/${req.params.workshop}.${req.device.type === 'phone'?'mob':'pc'}.html`)))
app.get('/workshops/register/#/:society/:workshop', (req, res) => res.sendFile(path.resolve('./dist/workshops/register.mob.html')))

app.get('/pdf/:name', (req, res) => res.sendFile(path.resolve(`./dist/pdf/${req.params.name}.pdf`)))

app.get('*', (req, res) => res.sendFile(path.resolve('./404.html')))

app.listen(port, () => console.log(`server running at port ${port}`))

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: ', p, 'reason: ', reason)
})
