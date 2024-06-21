const express = require('express');
const router = express.Router();
const Student = require("../models/user");
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const sequelize = require('../config/db');

async function createStudentService(studentData) {
    try{
        const {studentid, studentname, studentemail, studentpassword, studentdepartment} = studentData;
        const existingStudent = await Student.findByPk(studentid);
        if(existingStudent){
            return res.status(400).json({ error: 'Student with this roll number already exists' });
        }
        const hashedPassword = await bcrypt.hash(studentpassword, 10);

        const student = await Student.create({ studentid, studentname, studentemail, studentpassword: hashedPassword, studentdepartment });
        return student;
    }
    catch(error){
        throw new Error('Error creating student: ' + error.message);
    }
}
async function bulkCreateStudentsService(students) {
    try {
        const createdStudents = await Student.bulkCreate(students);
        return createdStudents;
    } catch (error) {
        throw new Error("Error creating students: " + error.message);
    }
}

async function getStudentsService() {
    try {
      const students = await Student.findAll();
      return students;
    } catch (error) {
      throw new Error('Error fetching students: ' + error.message);
    }
}

async function getStudentByIdService(id) {
    try {
      const student = await Student.findByPk(id);
      if (!student) throw new Error('Student not found');
      return student;
    } catch (error) {
      throw new Error('Error fetching student: ' + error.message);
    }
}

async function updateStudentService(newData) {
    try {
      const student = await Student.findByPk(newData.id);
      if (!student) throw new Error('Student not found');
  
      await Student.update(newData, { where: { studentid: newData.id } });
  
      return student;
    } catch (error) {
      throw new Error('Error updating student: ' + error.message);
    }
}

async function deleteStudentService(id) {
    try {
      const student = await Student.findByPk(id);
      if (!student) throw new Error('Student not found');
  
      await Student.destroy({ where: { studentid: id } });
  
      return 'Student deleted successfully';
    } catch (error) {
      throw new Error('Error deleting student: ' + error.message);
    }
}

const getCountOfStudentsByDepartment = async () => {
    try {
      const cutoffDate = new Date(new Date() - 24 * 60 * 60 * 1000);
  
      const result = await Student.findAll({
        attributes: ['studentdepartment', [sequelize.fn('COUNT', sequelize.col('studentdepartment')), 'total']],
        where: {
          updatedAt: {
            [Op.gt]: cutoffDate
          }
        },
        group: ['studentdepartment']
      });
    //   return result;
      return result.map(item => {
        return ({
        id: item.studentdepartment,
        label: item.studentdepartment,
        value: item.get('total').toString()
        // color: getRandomColor() // You can define this function to generate random colors
      })
    });
    } catch (error) {
      throw new Error('Error getting count of students by department: ' + error.message);
    }
  };

module.exports = {
    createStudentService,
    getStudentsService,
    getStudentByIdService,
    updateStudentService,
    deleteStudentService,
    bulkCreateStudentsService,
    getCountOfStudentsByDepartment
};