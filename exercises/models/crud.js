const User = require("./user");

const getUserById = id => {
  return User.findById(id).exec(); //always use .exec() at the end of your queries
};

const getAllUsers = () => {
  return User.find({}).exec();
};

const createUser = userDetails => {
  return User.create(userDetails);
};
const removeUserById = id => {
  return User.findByIdAndRemove(id).exec();
};

const updateUserById = (id, update) => {
  return User.findByIdAndUpdate(id, update, { new: true }).exec(); //if you don't pass {new: true}, after the operation if done it will not return the updated object
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
};
