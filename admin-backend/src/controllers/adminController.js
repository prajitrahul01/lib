const {
    getAdminsService,
    createAdminService,
    getAdminByIdService,
    updateAdminService,
    deleteAdminService,
    bulkCreateAdminsService
  } = require('../service/adminService');
  
  // Controller function to get all admins
  const getAdmins = async (req, res) => {
    try {
      const admins = await getAdminsService();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller function to create a new admin
  const createAdmin = async (req, res) => {
    try {
      const newAdmin = await createAdminService(req.body);
      res.json(newAdmin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller function to get an admin by ID
  const getAdminById = async (req, res) => {
    try {
      const admin = await getAdminByIdService(req.params.id);
      res.json(admin);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  async function bulkCreateAdmins(req, res) {
    try {
        // console.log("Request: ", req.body);
        const admins = req.body; // assuming request body contains an array of admin objects
        const createdAdmins = await bulkCreateAdminsService(admins);
        res.status(201).json(createdAdmins);
    } catch (error) {
        console.error("Error creating admins:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

  // Controller function to update an admin by ID
  const updateAdmin = async (req, res) => {
    try {
      const admin = await updateAdminService(req.params.id, req.body);
      res.json(admin);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  // Controller function to delete an admin by ID
  const deleteAdmin = async (req, res) => {
    try {
      const message = await deleteAdminService(req.params.id);
      res.json({ message });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAdmins,
    createAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    bulkCreateAdmins
  };
  