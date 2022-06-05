const {getTeachers, getTeacher, addTeacher, deleteTeacher, updateTeacher} = require('../controllers/teachers')

//Teacher Schema
const Teacher = {
  type: "object",
  properties: {
    teacher_id: { type: "string" },
    email: { type: "string" },
    name: { type: "string" },
    password: { type: "string" },
    name: { type: "string" },
    class_list: { type: "array" },
    gender: { type: "string" },
    meta_data: { type: "string" },
  },
};

//Options for get all teachers
const getTeachersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Teacher,
        },
      },
    },
    handler: getTeachers
  
  }

const getTeacherOpts = {
  schema: {
    response: {
      200: Teacher,
    },
  },

  handler: getTeacher
};

const postTeacherOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {type: 'string'}
      }
    },
    response: {
      201: Teacher,
    },
  },

  handler: addTeacher,
};

const deleteTeacherOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'},
        }
      },
    },
  },

  handler: deleteTeacher,
};

const updateTeacherOpts = {
  schema: {
    response: {
      200: Teacher,
    },
  },

  handler: updateTeacher,
};

function teacherRoutes(fastify, options, done) {
  // Get all items
  fastify.get("/teachers", getTeachersOpts);

  //Get a single teacher using param ID in request
  fastify.get("/teachers/:id", getTeacherOpts);

  //Add teacher
  fastify.post("/teachers", postTeacherOpts);

  //Delete teacher
  fastify.delete("/teachers/:id", deleteTeacherOpts);

  //Update teacher
  fastify.put("/teachers/:id", updateTeacherOpts);

  done();
}

module.exports = teacherRoutes;