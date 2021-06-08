const userController = require('../../controller/v1/user-controller')


const createRoutesV1 = (app) => {
    app.get('/api/v1/users', userController.getUsers);
    app.get('/api/v1/users/:userId', userController.getUserById);
};

module.exports = createRoutesV1;
