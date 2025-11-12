const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");

// GET /api/contacts 
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    const user = await User.findById(req.user.id).select('username email');
    res.status(200).json({ message: "Succesfully fetched all the contacts", contacts, user });
});

// POST /api/contacts 
const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All the fields are required!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone, 
        user_id: req.user.id
    })
    res.status(200).json({ message: "Created the contact!", contact});
});

// GET /api/contacts/:id
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("Contact not found!");
    }
    res.status(200).json({ message: "Succesfully fetched the contact", contact});
});

// UPDATE /api/contacts/:id
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("Contact not found!");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error ("User don't have permission to update other user contacts!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body, 

        { new: true}
    )
    res.status(200).json({ message: "Succesfully updated the contact", contact: updatedContact});
});

// DELETE /api/contacts/:id
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("Contact not found!");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error ("User don't have permission to update other user contacts!");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Succesfully deleted the contact"});
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}