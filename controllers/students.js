const students = require("../students");

const getStudents = (req, reply) => {
    reply.send(students);
}

const getStudent = (req, reply) => {
    const { id } = req.params;

    const student = students.find((students) => students.id === id);

    reply.send(student);
}

module.exports = {
    getStudents,
    getStudent,
}