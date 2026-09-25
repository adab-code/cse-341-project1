const swaggerAutogen = require('swagger-autogen')();

// Basic API metadata for the generated docs.
const doc = {
    info: {
        title: 'Contacts API',
        description: 'REST API to create, read, update and delete contacts stored in MongoDB.',
        version: '1.0.0',
    },
    host: 'project01-bk00.onrender.com',
    basePath: '/',
    schemes: ['https'],
    tags: [
        {
            name: 'Home',
            description: 'Base route of the Contacts API',
        },
        {
            name: 'Contacts',
            description: 'CRUD operations on the contacts collection',
        },
    ],
    definitions: {
        Contact: {
            type: 'object',
            required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
            properties: {
                _id: { type: 'string', example: '6aa9ab499bf001dc1b95669b' },
                firstName: { type: 'string', example: 'Sofia' },
                lastName: { type: 'string', example: 'Ramirez' },
                email: { type: 'string', example: 'sofia.ramirez@example.com' },
                favoriteColor: { type: 'string', example: 'purple' },
                birthday: { type: 'string', example: '1998-04-12' },
            },
        },
        ContactId: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '6aa9ab499bf001dc1b95669b' },
            },
        },
    },
};

// Generate swagger.json from the routes.
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
