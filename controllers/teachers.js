const { v4: uuidv4 } = require('uuid')
let teachers = require("../teachers");
const jwt_decode = require("jwt-decode");
const { authStudent, authPrincipal } = require("../auth_middleware");


const getTeachers = (req, reply) => {
  if (authStudent(req, reply, jwt_decode)) {
    reply.send(teachers);
  } else {
    reply.send({ message: 'not authorized' });
  }
}

const getTeacher = (req, reply) => {
  if (authStudent(req, reply, jwt_decode)) {

    const { id } = req.params;

    const teacher = teachers.find((teacher) => teacher.teacher_id === id);

    reply.send(teacher);
  } else {
    reply.send({ message: 'not authorized' });
  }

}

const addTeacher = (req, reply) => {
  if (authPrincipal(req, reply, jwt_decode)) {
    const { email } = req.body
    const { password } = req.body
    const { name } = req.body;
    const { gender } = req.body;
    const { class_list } = req.body;
    const { meta_data } = req.body;
    const teacher = {
      teacher_id: uuidv4(),
      email,
      password,
      name,
      gender,
      class_list,
      meta_data,
    };

    teachers = [...teachers, teacher];

    reply.code(201).send(teacher);
  } else {
    reply.send({ message: 'not authorized' });
  }

}

const deleteTeacher = (req, reply) => {
  if (authPrincipal(req, reply, jwt_decode)) {

    const { id } = req.params

    teachers = teachers.filter((teacher) => teacher.teacher_id !== id);

    reply.send({ message: `Teacher ${id} has been removed` })
  } else {
    reply.send({ message: 'not authorized' });
  }

}

const updateTeacher = (req, reply) => {
  if (authPrincipal(req, reply, jwt_decode)) {
    const { id } = req.params;
    const { name } = req.body;

    teachers = teachers.map((teacher) =>
      teacher.teacher_id === id ? { id, name } : teacher
    );

    teacher = teachers.find((teacher) => teacher.teacher_id === id);

    reply.send(teacher);
  } else {
    reply.send({ message: 'not authorized' });
  }


};

module.exports = {
  getTeachers,
  getTeacher,
  addTeacher,
  deleteTeacher,
  updateTeacher,
}