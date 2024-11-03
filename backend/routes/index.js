const AuthRoute = require('./AuthRoute');
const UserRoute = require('./UserRoute');

function route(app) {
    app.use('/api/auth', AuthRoute);
    app.use('/api/user', UserRoute);
}

module.exports = route;