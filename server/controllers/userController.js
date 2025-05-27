const User = require('../models/User');
const Service = require('../models/Service');

exports.getUserServices = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('services');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};