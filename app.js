const path = require('path')

const express = require('express');
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')
const rootDir = require('./util/path')
const exceptionsController = require('./controllers/exceptions')
const sequelize = require('./util/database')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const User = require('./models/user')

const app = express();
app.set('view engine', 'ejs'); //For pug templating engine: change view engine to pug
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')))

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(exceptionsController.get404)

//Associations
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
Cart.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize.sync({force: true})
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user){
            return User.create({name: 'Robin', email: 'robin.moreno.rinding@gmail.com'});
        }
        return user;
    })
    .then(user => {
        console.log(user)
        return user.createCart();
    })
    .then(cart => {
        console.log(cart);
        app.listen(3000);
    })
    .catch(err => console.log(err))