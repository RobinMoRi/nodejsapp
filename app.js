const path = require('path')

const express = require('express');
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')
const rootDir = require('./util/path')
const exceptionsController = require('./controllers/exceptions')

const app = express();
app.set('view engine', 'ejs'); //For pug templating engine: change view engine to pug
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(exceptionsController.get404)

app.listen(3000);