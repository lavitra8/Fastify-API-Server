/**
 * Author: Sahil
 * auth middleware decorator
 */
const authStudent = (req, res, jwt_decode) => {
    try {
        const token = req.headers["authorization"];
        var decoded = jwt_decode(token);
        if (decoded['actor'] == 'student' ||
            decoded['actor'] == 'teacher' ||
            decoded['actor'] == 'principal') {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        res.status(400).send({ error });
    }
};

const authTeacher = (req, res, jwt_decode) => {
    try {
        const token = req.headers["authorization"];
        var decoded = jwt_decode(token);
        if (decoded['actor'] == 'teacher' ||
            decoded['actor'] == 'principal') {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        res.status(400).send({ error });
    }
};

const authPrincipal = (req, res, jwt_decode) => {
    try {
        const token = req.headers["authorization"];
        var decoded = jwt_decode(token);
        if (decoded['actor'] == 'principal') {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        res.status(400).send({ error });
    }
};

module.exports = { authStudent, authTeacher, authPrincipal }