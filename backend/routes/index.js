const AuthRoute = require('./AuthRoute');
const UserRoute = require('./UserRoute');
const ProductRoute = require('./ProductRoute');
const CategoryRoute = require('./CategoryRoute');
const CartRoute = require('./CartRoute');

function route(app) {
    app.use('/api/auth', AuthRoute);
    app.use('/api/user', UserRoute);
    app.use('/api/product', ProductRoute);
    app.use('/api/category', CategoryRoute);
    app.use('/api/cart', CartRoute);
}

module.exports = route;