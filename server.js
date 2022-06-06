// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
fastify.register(require('fastify-jwt'), {
  secret: '##sEcReTkEy##' // should not be done like this (there should be an env variable)
});


fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  }
})

let students = require("./students");
fastify.post("/loginStudent", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ error: true, msg: 'Mandatory params missing.' });
      return;
    }
    const student = students.find((students) => students.password == password && students.email == email);
    if (!student) {
      res.send({ 'login unsucessfull': 'invalid email or password' });
    } else {
      let actor = 'student';
      const token = fastify.jwt.sign({ email, actor }, { expiredIn: 86400 });
      res.status(200).send({ token, email });
    }
  } catch (error) {
    res.send(error);
  }
})

/**
 * Author: Sahil
 */
const jwt_decode = require("jwt-decode");
const { authStudent, authTeacher, authPrincipal } = require("./auth_middleware");
fastify.post("/authorizeStudent", async (req, res) => {
  authStudent(req, res, jwt_decode);
})
fastify.post("/authorizeTeacher", async (req, res) => {
  authStudent(req, res, jwt_decode);
})
fastify.post("/authorizePrincpal", async (req, res) => {
  authStudent(req, res, jwt_decode);
})

/**
 * Demo for middleware
 */


let teachers = require("./teachers");
fastify.post("/loginTeacher", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ error: true, msg: 'Mandatory params missing.' });
      return;
    }
    const student = teachers.find((teachers) => teachers.password == password && teachers.email == email);
    if (!student) {
      res.send({ 'login unsucessfull': 'invalid email or password' });
    } else {
      let actor = 'teacher';
      const token = fastify.jwt.sign({ email, actor }, { expiredIn: 86400 });
      res.status(200).send({ token, email });
    }
  } catch (error) {
    res.send(error);
  }
})

let principal = require("./principal");
fastify.post("/loginPrincipal", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ error: true, msg: 'Mandatory params missing.' });
      return;
    }
    const student = principal.find((principal) => principal.password == password && principal.email == email);
    if (!student) {
      res.send({ 'login unsucessfull': 'invalid email or password' });
    } else {
      let actor = 'principal';
      const token = fastify.jwt.sign({ email, actor }, { expiredIn: 86400 });
      res.status(200).send({ token, email });
    }
  } catch (error) {
    res.send(error);
  }
})


fastify.register(require('./routes/students'))
fastify.register(require("./routes/teachers"));
fastify.register(require("./routes/classes"));

const PORT = 3000

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
