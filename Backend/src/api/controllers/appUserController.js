const AppUserModel = require('../../models/appUserModel.js');
const appUserService = require('../../services/appUserService.js')

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await appUserService.getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Function controllers/getAllUsers error:', error);
        res.status(500).send('Error when getting users from the database');
    }
};

const addUser = async (req, res) => {
    try {
        const appUser = new AppUserModel(
            req.body.id,
            req.body.firstName,
            req.body.lastName,
            req.body.username,
            req.body.password,
            req.body.address,
            req.body.locationCityId,
            req.body.email,
            req.body.phoneNumber,
            req.body.birthDate,
            req.body.gender,
            req.body.registrationDate,
            req.body.enabled,
        );
        const user = await appUserService.addUser(appUser);
        //Update to success code after inserting
        res.status(200).json(user);
    } catch (error) {
        console.error('Function controllers/addUser error:', error);
        res.status(500).send('Error when adding user from the database');
    }
};


module.exports = {
    getAllUsers,
    addUser
}