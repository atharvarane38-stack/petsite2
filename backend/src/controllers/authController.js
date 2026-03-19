const User = require('../models/User');
const { hashPassword, generateToken, comparePassword } = require('../utils/auth');
const { sendSuccess, sendError } = require('../utils/response');

// User registration
const register = async (req, res) => {
  try {
    const { name, email, phone, password, userType = 'customer' } = req.body;

    if (!name || !email || !phone || !password) {
      return sendError(res, 'Missing required fields', 400);
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendError(res, 'User already exists', 409);
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    const token = generateToken(user);

    sendSuccess(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
      token,
    }, 'User registered successfully', 201);
  } catch (error) {
    sendError(res, 'Registration failed', 500, error.message);
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password required', 400);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const token = generateToken(user);

    sendSuccess(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
      token,
    }, 'Login successful');
  } catch (error) {
    sendError(res, 'Login failed', 500, error.message);
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    sendSuccess(res, user, 'Profile retrieved');
  } catch (error) {
    sendError(res, 'Failed to fetch profile', 500, error.message);
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
