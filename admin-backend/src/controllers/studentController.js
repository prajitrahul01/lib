const { createStudentService, bulkCreateStudentsService, getCountOfStudentsByDepartment,
    deleteStudentService, updateStudentService, getStudentsService, getStudentByIdService } =  require("../service/studentService");

const createStudent = async (req, res) => {
    try {
      const newStudent = await createStudentService(req.body);
      res.json(newStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getStudents = async (req, res) => {
    try {
      const students = await getStudentsService();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
async function bulkCreateStudents(req, res) {
    try {
        const students = req.body; // assuming request body contains an array of student objects
        const createdStudents = await bulkCreateStudentsService(students);
        res.status(201).json(createdStudents);
    } catch (error) {
        console.error("Error creating students:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const getStudentById = async (req, res) => {
    try {
      const student = await getStudentByIdService(req.params.id);
      res.json(student);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
      const student = await updateStudentService(req.body);
      res.json(student);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
      const message = await deleteStudentService(req.params.id);
      res.json({ message });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
};

const getStudentsByDepartment = async (req, res) => {
    try {
      const data = await getCountOfStudentsByDepartment();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    bulkCreateStudents,
    getStudentsByDepartment
  };