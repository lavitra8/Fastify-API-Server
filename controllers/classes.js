const { v4:uuidv4 } = require('uuid')
let classes = require("../classes");

const getClasses = (req, reply) => {
    reply.send(classes);
}

const getClass = (req, reply) => {
    const { id } = req.params;

    const lecture = classes.find((lecture) => lecture.class_id === id);

    reply.send(lecture);
}

const addClass = (req, reply) => {
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

    reply.code(201).send(lecture)
}

const deleteClass = (req, reply) => {
    const {id} = req.params

    classes = classes.filter(lecture => lecture.class_id !== id)

    reply.send({message: `Class ${id} has been removed`})
}

const updateClass = (req, reply) => {
  const { class_id } = req.params;
  const { class_name } = req.body;
  const { class_teacher_id } = req.body;
  const { student_list } = req.body;

  classes = classes.map((lecture) =>
    lecture.class_id === class_id
      ? { class_id, class_name, class_teacher_id, student_list }
      : lecture
  );

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