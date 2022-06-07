const { Console } = require('console');
const { v4: uuidv4 } = require('uuid')
let classes = require("../classes");
let students = require("../students")

const jwt_decode = require("jwt-decode");
const { authStudent, authTeacher } = require("../auth_middleware");

const getClasses = (req, reply) => {
  authStudent(req, reply, jwt_decode);
  reply.send(classes);
}

const getClass = (req, reply) => {
  authStudent(req, reply, jwt_decode);

  const { id } = req.params;

  const lecture = classes.find((lecture) => lecture.class_id === id);

  reply.send(lecture);
}

const addClass = (req, reply) => {
  authTeacher(req, reply, jwt_decode);

  const { class_name } = req.body;
  const { class_teacher_id } = req.body;
  const { student_list } = req.body;
  const lecture = {
    class_id: uuidv4(),
    class_name,
    class_teacher_id,
    student_list,
  };

  classes = [...classes, lecture]

  students.forEach((student) => {
    if (student_list.includes(student.name)) {
      student.class_list.push(class_name);
    }
  });

  reply.code(201).send(lecture)
}

const deleteClass = (req, reply) => {
  authTeacher(req, reply, jwt_decode);

  const { id } = req.params

  classes = classes.filter(lecture => lecture.class_id !== id)

  reply.send({ message: `Class ${id} has been removed` })
}

const updateClass = (req, reply) => {
  authTeacher(req, reply, jwt_decode);

  const { class_id } = req.params;
  const { class_name } = req.body;
  const { class_teacher_id } = req.body;
  const { student_list } = req.body;

  classes = classes.map((lecture) =>
    lecture.class_id === class_id
      ? { class_id, class_name, class_teacher_id, student_list }
      : lecture
  );

  students.forEach((student) => {
    if (student.name in student_list) {
      student.class_list.push(class_name);
    }
  })

  lecture = classes.find((lecture) => lecture.class_id === class_id);

  reply.send(lecture);
};

module.exports = {
  getClasses,
  getClass,
  addClass,
  deleteClass,
  updateClass,
}