const students = require("../students")

//Options for get all students
const getStudentsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {type: 'integer'},
            name: {type: 'string'},
          }
        }
      }
    }
  }
}

const getStudentOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "integer" },
          email: { type: "string" },
          name: { type: "string" },
          password: { type: "string" },
          name: { type: "string" },
          class_list: { type: "string" },
          gender: { type: "string" },
          meta_data: { type: "string" },
        },
      },
    },
  },
};

function studentRoutes(fastify, options, done) {

  // Get all items
  fastify.get("/students", getStudentsOpts, (request, reply) => {
    reply.send(students);
  })

  //Get a single student using param ID in request
  fastify.get("/students/:id", getStudentOpts, (request, reply) => {
    const { id } = request.params;

    const student = students.find((students) => students.id === id);

    reply.send(student);
  })

  done();
}

module.exports = studentRoutes