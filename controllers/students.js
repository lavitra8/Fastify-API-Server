const { v4: uuidv4 } = require('uuid')
let students = require("../students");

const jwt_decode = require("jwt-decode");
const { authTeacher } = require("../auth_middleware");


const getStudents = (req, reply) => {
    if (authTeacher(req, reply, jwt_decode)) {
        reply.send(students);
    } else {
        reply.send({ message: 'not authorized' });
    }
}

const getStudent = (req, reply) => {
    if (authTeacher(req, reply, jwt_decode)) {
        const { id } = req.params;

        const student = students.find((students) => students.id === id);

        reply.send(student);
    } else {
        reply.send({ message: 'auth error' });
    }

}

const addStudent = (req, reply) => {
    if (authTeacher(req, reply, jwt_decode)) {
        const { email } = req.body
        const { password } = req.body
        const { name } = req.body;
        const { gender } = req.body;
        const { class_list } = req.body;
        const { meta_data } = req.body;
        const student = {
            id: uuidv4(),
            email,
            password,
            name,
            gender,
            class_list,
            meta_data,
        };

        students = [...students, student]

        reply.code(201).send(student)
    } else {
        reply.send({ message: 'auth error' });
    }

}

const deleteStudent = (req, reply) => {
    if (authTeacher(req, reply, jwt_decode)) {
        const { id } = req.params

        students = students.filter(student => student.id !== id)

        reply.send({ message: `Student ${id} has been removed` })
    } else {
        reply.send({ message: 'auth error' });
    }


}

const updateStudent = (req, reply) => {
    if (authTeacher(req, reply, jwt_decode)) {
        const { id } = req.params;
        const { name } = req.body;

        students = students.map(student => (student.id === id ? { id, name } : student))

        student = students.find((student) => student.id === id);

        reply.send(student);
    } else {
        reply.send({ message: 'auth error' });
    }


};

module.exports = {
    getStudents,
    getStudent,
    addStudent,
    deleteStudent,
    updateStudent,
}