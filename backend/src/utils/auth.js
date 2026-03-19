const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'petsite-secret-key';

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    userType: user.userType,
  };
  return jwt.encode(payload, secret);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
};
