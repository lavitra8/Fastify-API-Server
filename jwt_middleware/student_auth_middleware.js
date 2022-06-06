/**
 * Author: Sahil
 * auth middleware decorator
 */
const fastifyPlugin = require('fastify-plugin');
module.exports = fastifyPlugin(async (fastify) => {
    fastify.decorate('jwtAuthenticationStudent', async function (req, res) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            var decoded = jwt_decode.jwt_decode(token);
            print(decoded);
            if (decoded['actor'] == 'student') {
            } else {
                res.send({ 'authorization error': 'not authorized for this end point' }, error = true);
            }
            await req.jwtVerify();
        } catch (error) {
            res.send(error);
        }
    })
})