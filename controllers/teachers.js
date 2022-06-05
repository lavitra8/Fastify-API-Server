const { v4:uuidv4 } = require('uuid')
let teachers = require("../teachers");

const getTeachers = (req, reply) => {
    reply.send(teachers);
}

const getTeacher = (req, reply) => {
    const { id } = req.params;

    const teacher = teachers.find((teacher) => teacher.teacher_id === id);

    reply.send(teacher);
}

const addTeacher = (req, reply) => {
    const { email } = req.body
    const {password} = req.body
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
}

const deleteTeacher = (req, reply) => {
    const {id} = req.params

    teachers = teachers.filter((teacher) => teacher.teacher_id !== id);

    reply.send({message: `Teacher ${id} has been removed`})
}

const updateTeacher = (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;

  teachers = teachers.map((teacher) =>
    teacher.teacher_id === id ? { id, name } : teacher
  );

  teacher = teachers.find((teacher) => teacher.teacher_id === id);

  reply.send(teacher);
};

module.exports = {
    getTeachers,
    getTeacher,
    addTeacher,
    deleteTeacher,
    updateTeacher,
}