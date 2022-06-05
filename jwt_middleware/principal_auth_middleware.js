/**
 * Author: Sahil
 * auth middleware decorator
 */

const { error } = require('console');
const { default: fastify } = require('fastify');
import jwt_decode from "jwt_decode";

const fastifyPlugin = require('fastify-plugin');
module.exports = fastifyPlugin(async (fastify) => {
    fastify.decorate('jwtAuthenticationPrincipal', async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            var decoded = jwt_decode(token);
            print(decoded);
            if (decoded['actor'] == 'principal') {
                await req.jwtVerify();
            } else {
                res.send({ 'authorization error': 'not authorized for this end point' }, error = true);
            }
        } catch (error) {
            res.send(error);
        }

    })
})