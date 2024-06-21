const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

// Service function to get all admins
async function getAdminsService() {
  try {
    const admins = await Admin.findAll();
    return admins;
  } catch (error) {
    throw new Error('Error fetching admins: ' + error.message);
  }
}

async function bulkCreateAdminsService(admins) {
    try {
        const createdAdmins = await Admin.bulkCreate(admins);
        return createdAdmins;
    } catch (error) {
        throw new Error("Error creating admins: " + error.message);
    }
}


// Service function to create a new admin
async function createAdminService(adminData) {
  try {
    const { adminname, adminemail, adminpassword } = adminData;

    // Check if admin with the same email already exists
    const existingAdmin = await Admin.findOne({ where: { adminemail } });
    if (existingAdmin) {
      throw new Error('Admin with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminpassword, 10);

    // Create the admin
    const admin = await Admin.create({ adminname, adminemail, adminpassword: hashedPassword });
    return admin;
  } catch (error) {
    throw new Error('Error creating admin: ' + error.message);
  }
}

// Service function to get an admin by ID
async function getAdminByIdService(id) {
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) throw new Error('Admin not found');
    return admin;
  } catch (error) {
    throw new Error('Error fetching admin: ' + error.message);
  }
}

// Service function to update an admin by ID
async function updateAdminService(id, newData) {
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) throw new Error('Admin not found');

    await admin.update(newData);

    return admin;
  } catch (error) {
    throw new Error('Error updating admin: ' + error.message);
  }
}

// Service function to delete an admin by ID
async function deleteAdminService(id) {
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) throw new Error('Admin not found');

    await admin.destroy();

    return 'Admin deleted successfully';
  } catch (error) {
    throw new Error('Error deleting admin: ' + error.message);
  }
}

module.exports = {
  getAdminsService,
  createAdminService,
  getAdminByIdService,
  updateAdminService,
  deleteAdminService,
  bulkCreateAdminsService
};
