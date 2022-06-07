// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });


fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {title:'fastify-api' },
  }
})

fastify.register(require("@fastify/jwt"), {
  secret: "!@#$%^&*()SECRET)(*&^%$#@!",
});

fastify.addHook("onRequest", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

fastify.post('/signup', (req, reply) => {
  const { email, password } = req.body;
  let actor = "student";
  const token = fastify.jwt.sign({ email, actor }, { expiredIn: 86400 });
  reply.send({ token });
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
