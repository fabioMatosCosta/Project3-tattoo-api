require('dotenv').config();
var cors = require('cors')
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

const username = process.env.MONGOUSERNAME
const password = process.env.MONGOPASSWORD

mongoose
  .connect(`mongodb+srv://${username}:${password}@tattoounderground-lqqlh.azure.mongodb.net/test`, {useNewUrlParser: true,useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
// Middleware Setup

app.use(cors({
  origin: ["https://localhost:3000", "http://localhost:3000"],
  credentials: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 1200000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

function protecc(req,res,next){
  if(req.session.currentUser) next();
  else res.status(403).json({message: "Not logged in bro"});
}

function protectArtist(req,res,next){
  if(req.session.currentArt) next();
  else res.status(403).json({message: "Not logged in yo"});
}

// default value for title local
app.locals.title = 'Tattoo API';


const index = require('./routes/index');
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const profile = require('./routes/user/profile');
const artists = require('./routes/artist/artist');
const artSignUp = require('./routes/artist/artSignup');
const artLogin = require('./routes/artist/artLogin');
const artList = require('./routes/artistList');
const artTattoo = require('./routes/artist/addTattoo');
const tattoos = require('./routes/tattooPics');

app.use('/artist', artSignUp);
app.use('/artist', artLogin);
app.use('/artist', artList);
app.use('/artist', artTattoo);
app.use('/artist', artists);
app.use('/', logout);
app.use('/', index);
app.use('/', signup);
app.use('/', login);
app.use('/', tattoos);
app.use('/user',  profile);
app.use('/', tattoos);

module.exports = app;
