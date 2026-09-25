const swaggerAutogen = require('swagger-autogen')();

// Basic API metadata for the generated docs.
const doc = {
    info: {
        title: 'Users API',
        description: 'Users Api'
    },
    host: 'localhost:3001',
    schemes: ['http'],
};

// Generate swagger.json from the routes.
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);