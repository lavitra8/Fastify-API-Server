// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {title:'fastify-api' },
  }
})

fastify.register(require('./routes/students'))

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
