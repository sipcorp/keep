const mongoose = require('mongoose');
const bcrypt = require('../node_modules/bcrypt-nodejs');
const {
  Schema
} = mongoose;

const userSchema = new Schema({
  userCode: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  role: { type: String, required: true },
  cargo: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  movile: { type: Number, required: true },
  direction: { type: String, required: true },
  lastLogin: { type: Date, required: false }
}, { collection: 'user' });
userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);