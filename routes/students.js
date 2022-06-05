const {getStudents, getStudent} = require('../controllers/students')

//Student Schema
const Student = {
  type: "object",
  properties: {
    id: { type: "integer" },
    email: { type: "string" },
    name: { type: "string" },
    password: { type: "string" },
    name: { type: "string" },
    class_list: { type: "array" },
    gender: { type: "string" },
    meta_data: { type: "string" },
  },
};

//Options for get all students
const getStudentsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Student,
        },
      },
    },
    handler: getStudents
  
  }

const getStudentOpts = {
  schema: {
    response: {
      200: Student,
    },
  },

  handler: getStudent
};

function studentRoutes(fastify, options, done) {

  // Get all items
  fastify.get("/students", getStudentsOpts)

  //Get a single student using param ID in request
  fastify.get("/students/:id", getStudentOpts, )

  done();
}

module.exports = studentRoutes