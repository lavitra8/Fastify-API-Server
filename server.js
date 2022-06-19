// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });


const PORT = 1234

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

fastify.post("/auth", (req, res) => {
  try {
    const {email, password} = re.body;
    
  } catch (error) {
    
  }
})
start();