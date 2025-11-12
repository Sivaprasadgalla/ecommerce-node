const express = require("express");
const router = express.Router();

const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require("../controllers/Contact");
const { validateAccessToken } = require("../middleware/authMiddleware");

router.use(validateAccessToken);
//routes for the contacts
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;