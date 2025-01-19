const mongoose = require('mongoose')

const userDashboardData = async (req, res) => {
    const usersModel = mongoose.model('users')

    const getUser = await usersModel.findOne({
        _id: req.user._id
    }).select("-password")

    res.status(200).json({
        status: "success",
        data: getUser
    })
}

module.exports = userDashboardData;