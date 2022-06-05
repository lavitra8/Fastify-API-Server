// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const PORT = 3000

const students = require('./students')


/// Sahil- Is there a need of this api end point ?
// Declare a route
fastify.get("/students", (request, reply) => {
  reply.send(students);
});


/// Sahil- Is there a need of this api end point ?
//Param ID in request
fastify.get("/students/:id", (request, reply) => {

  const {id} = request.params

  const student = students.find((students) => students.id === id);

  reply.send(student);
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
