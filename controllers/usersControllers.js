const User = require("../models/User");

module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            // Destructuring the user document and excluding unnecessary fields
            const { password, __v,updatedAt, createdAt, ...userData } = user._doc;

            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json("error");
        }
    },

    delete: async (req, res)=> {
        try {
            await User.findByIdAndDelete(req.user.id)
            res.status(200).json("user successfully deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
};
