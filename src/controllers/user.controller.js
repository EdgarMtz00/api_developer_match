const user_service = require("../services/user.service");
const {okIfNotNull, okIfTrue} = require("./controllers");


exports.allUsers = async (req, res) => {
    const users = await user_service.findAll();
    okIfNotNull(users, "Couldn't retrieve users", res);
};

exports.user = async (req, res) => {
    const username = req.body.user;
    const user = await user_service.findUsername(username);

    okIfNotNull(user, "Couldn't find user", res);
}

exports.deleteUser = async (req, res) => {
    const user_id = req.body.id;
    const result = await user_service.delete(user_id);

    okIfTrue(result, "Couldn't delete user", res);
}
