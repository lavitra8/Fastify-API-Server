const {getStudents, getStudent, addStudent, deleteStudent, updateStudent} = require('../controllers/students')

//Student Schema
const Student = {
  type: "object",
  properties: {
    id: { type: "string" },
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

const postStudentOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {type: 'string'}
      }
    },
    response: {
      201: Student,
    },
  },

  handler: addStudent,
};

const deleteStudentOpts = {
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

  handler: deleteStudent,
};

const updateStudentOpts = {
  schema: {
    response: {
      200: Student,
    },
  },

  handler: updateStudent,
};

function studentRoutes(fastify, options, done) {
  // Get all items
  fastify.get("/students", getStudentsOpts);

  //Get a single student using param ID in request
  fastify.get("/students/:id", getStudentOpts);

  //Add student
  fastify.post("/students", postStudentOpts);

  //Delete student
  fastify.delete("/students/:id", deleteStudentOpts);

  //Update student
  fastify.put("/students/:id", updateStudentOpts);
  
  done();
}

module.exports = studentRoutes