const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// The five fields required by the Contacts collection.
const CONTACT_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

// Build a contact out of the request body, keeping only the known fields.
const buildContact = (body) => {
    const contact = {};
    for (const field of CONTACT_FIELDS) {
        contact[field] = body[field];
    }
    return contact;
};

// Verify that every required field is present and not blank.
const validateContact = (contact) => {
    const missing = CONTACT_FIELDS.filter(
        (field) => typeof contact[field] !== 'string' || contact[field].trim() === ''
    );
    if (missing.length > 0) {
        return {
            isValid: false,
            error: `Missing or invalid required field(s): ${missing.join(', ')}.`,
        };
    }
    return { isValid: true };
};

// Reject malformed ids with 400 instead of letting ObjectId throw.
const toObjectId = (id) => {
    if (!ObjectId.isValid(id)) {
        return null;
    }
    return new ObjectId(id);
};

const getAll = async (req, res, next) => {
    // Fetch every contact in the collection.
    try {
        const contacts = await mongodb.getDatabase().db().collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    // Fetch a single contact by id.
    const contactId = toObjectId(req.params.id);
    if (!contactId) {
        return res.status(400).json({ error: 'Invalid contact id.' });
    }
    try {
        const contact = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .findOne({ _id: contactId });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    } catch (err) {
        next(err);
    }
};

const createContact = async (req, res, next) => {
    // Build the new contact from the request body and return its new id.
    const contact = buildContact(req.body);
    const validation = validateContact(contact);
    if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
    }
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
        res.status(201).json({ _id: result.insertedId });
    } catch (err) {
        next(err);
    }
};

const updateContact = async (req, res, next) => {
    // Replace an existing contact with the submitted data.
    const contactId = toObjectId(req.params.id);
    if (!contactId) {
        return res.status(400).json({ error: 'Invalid contact id.' });
    }
    const contact = buildContact(req.body);
    const validation = validateContact(contact);
    if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
    }
    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .replaceOne({ _id: contactId }, contact);
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

const deleteContact = async (req, res, next) => {
    // Remove a single contact by id.
    const contactId = toObjectId(req.params.id);
    if (!contactId) {
        return res.status(400).json({ error: 'Invalid contact id.' });
    }
    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .deleteOne({ _id: contactId });
        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
};
