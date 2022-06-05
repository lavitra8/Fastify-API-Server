const {getClasses, getClass, addClass, deleteClass, updateClass} = require('../controllers/classes')

//Class Schema
const Class = {
  type: "object",
  properties: {
    class_id: { type: "string" },
    class_name: { type: "string" },
    class_teacher_id: { type: "string" },
    student_list: { type: "array" },
  },
};

//Options for get all classes
const getClassesOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Class,
        },
      },
    },

    handler: getClasses
  }

const getClassOpts = {
  schema: {
    response: {
      200: Class,
    },
  },

  handler: getClass
};

const postClassOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['class_name'],
      properties: {
        name: {type: 'string'}
      }
    },
    response: {
      201: Class,
    },
  },

  handler: addClass,
};

const deleteClassOpts = {
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

  handler: deleteClass,
};

const updateClassOpts = {
  schema: {
    response: {
      200: Class,
    },
  },

  handler: updateClass,
};

function classRoutes(fastify, options, done) {
  // Get all items
  fastify.get("/classes", getClassesOpts);

  //Get a single class using param ID in request
  fastify.get("/classes/:id", getClassOpts);

  //Add class
  fastify.post("/classes", postClassOpts);

  //Delete class
  fastify.delete("/classes/:id", deleteClassOpts);

  //Update class
  fastify.put("/classes/:class_id", updateClassOpts);

  done();
}

module.exports = classRoutes