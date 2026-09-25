const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// Wire up the CRUD endpoints for contacts. Each route delegates the work to
// the controller, and carries its own Swagger annotation block.
router.get('/', (req, res, next) => {
    /*
    #swagger.path = '/contacts'
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get all contacts'
    #swagger.description = 'Returns every contact stored in the contacts collection.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
        description: 'OK - Returns an array of contacts.',
        schema: { type: 'array', items: { $ref: '#/definitions/Contact' } }
    }
    #swagger.responses[500] = { description: 'Internal Server Error' }
    */
    contactsController.getAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
    /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get a contact by id'
    #swagger.description = 'Returns a single contact matching the provided id.'
    #swagger.produces = ['application/json']
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the contact',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'OK - Returns the requested contact.',
        schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[400] = { description: 'Bad Request - The id is not a valid ObjectId.' }
    #swagger.responses[404] = { description: 'Not Found - No contact exists with that id.' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
    */
    contactsController.getSingle(req, res, next);
});

router.post('/', (req, res, next) => {
    /*
    #swagger.path = '/contacts'
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.description = 'Creates a contact in MongoDB. All five fields are required. Returns the id of the new contact.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'The contact to create. All five fields are required.',
        required: true,
        schema: { $ref: '#/definitions/Contact' },
        example: {
            firstName: 'Sofia',
            lastName: 'Ramirez',
            email: 'sofia.ramirez@example.com',
            favoriteColor: 'purple',
            birthday: '1998-04-12'
        }
    }
    #swagger.responses[201] = {
        description: 'Created - Returns the id of the newly created contact.',
        schema: { $ref: '#/definitions/ContactId' }
    }
    #swagger.responses[400] = { description: 'Bad Request - One or more required fields are missing or invalid.' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
    */
    contactsController.createContact(req, res, next);
});

router.put('/:id', (req, res, next) => {
    /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Update an existing contact'
    #swagger.description = 'Replaces the contact matching the provided id. All five fields are required.'
    #swagger.consumes = ['application/json']
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the contact to update',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'The new values for the contact. All five fields are required.',
        required: true,
        schema: { $ref: '#/definitions/Contact' },
        example: {
            firstName: 'Sofia',
            lastName: 'Ramirez',
            email: 'sofia.ramirez@example.com',
            favoriteColor: 'green',
            birthday: '1998-04-12'
        }
    }
    #swagger.responses[204] = { description: 'No Content - The contact was updated.' }
    #swagger.responses[400] = { description: 'Bad Request - Invalid id, or a required field is missing.' }
    #swagger.responses[404] = { description: 'Not Found - No contact exists with that id.' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
    */
    contactsController.updateContact(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a contact'
    #swagger.description = 'Removes the contact matching the provided id.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the contact to delete',
        required: true,
        type: 'string'
    }
    #swagger.responses[204] = { description: 'No Content - The contact was deleted.' }
    #swagger.responses[400] = { description: 'Bad Request - The id is not a valid ObjectId.' }
    #swagger.responses[404] = { description: 'Not Found - No contact exists with that id.' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
    */
    contactsController.deleteContact(req, res, next);
});

module.exports = router;
