const Service = require('../models/Service');
const User = require('../models/User');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.volunteerForService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user already volunteered
    if (service.volunteers.includes(req.userId)) {
      return res.status(400).json({ message: 'Already volunteered for this service' });
    }

    // Add user to service volunteers
    service.volunteers.push(req.userId);
    await service.save();

    // Add service to user's services
    user.services.push(service._id);
    await user.save();

    res.json({ message: 'Successfully volunteered for service' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
