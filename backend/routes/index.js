const AuthRoute = require('./AuthRoute');
const UserRoute = require('./UserRoute');
const ProductRoute = require('./ProductRoute');
const CategoryRoute = require('./CategoryRoute');
const CartRoute = require('./CartRoute');
const OrderRoute = require('./OrderRoute');
const FeedbackRoute = require('./FeedbackRoute');

function route(app) {
    app.use('/api/auth', AuthRoute);
    app.use('/api/user', UserRoute);
    app.use('/api/product', ProductRoute);
    app.use('/api/category', CategoryRoute);
    app.use('/api/cart', CartRoute);
    app.use('/api/order', OrderRoute);
    app.use('/api/feedback', FeedbackRoute);
}

module.exports = route;