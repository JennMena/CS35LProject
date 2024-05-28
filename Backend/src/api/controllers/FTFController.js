const FTFModel = require('../../models/FTFModel.js');
const FTFService = require('../../services/FTFService.js')

const getAllFTFs = async (req, res) => {
    try {
        const allFTFs = await FTFService.getAllFTFs();
        res.status(200).json(allFTFs);
    } catch (error) {
        console.error('Function controllers/getAllFTFs error:', error);
        res.status(500).send('Error when getting FTFs from the database');
    }
};

const addFTF = async (req, res) => {
    try {
        const FTF = new FTFModel(
            req.body.id,
            req.body.appUserId,
            req.body.categoryId,
            req.body.amount,
            req.body.registrationDate,
            req.body.frequency,
            req.body.dayOfMonth,
            req.body.description,
            req.body.enabled
        );
        const user = await FTFService.addFTF(FTF);
        //Update to success code after inserting
        res.status(200).json(user);
    } catch (error) {
        console.error('Function controllers/addFTF error:', error);
        res.status(500).send('Error when adding FTF from the database');
    }
};


module.exports = {
    getAllFTFs,
    addFTF
}