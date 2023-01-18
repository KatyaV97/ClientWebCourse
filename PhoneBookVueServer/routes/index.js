var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

var contacts = [];
var newContactId = 1;

router.get("/api/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    var filteredContacts = term.length === 0
        ? contacts
        : contacts.filter(function (contact) {
            return contact.firstName.toUpperCase().includes(term) ||
                contact.phoneNumber.toUpperCase().includes(term);
        })

    res.send(filteredContacts);
});

router.post("/api/deleteContact", function (req, res) {
    var id = req.body.id;

    contacts = contacts.filter(function (contact) {
        return contact.id !== id;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/deleteSelectedContacts", function (req, res) {
    console.log(req.body.checkedContactsId);
    var checkedContactsId = req.body.checkedContactsId;
   
    contacts = contacts.filter(function (contact) {
        return !checkedContactsId.includes(contact.id);
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/createContact", function (req, res) {
    var contact = req.body;

    if (!contact) {
        res.send({
            success: false,
            message: "Invalid request format"
        });

        return;
    }

    if (!contact.firstName) {
        res.send({
            success: false,
            message: "Need insert first name"
        });

        return;
    }

    if (!contact.lastName) {
        res.send({
            success: false,
            message: "Need insert last name"
        });

        return;
    }

    if (!contact.phoneNumber) {
        res.send({
            success: false,
            message: "Need insert phone number"
        });

        return;
    }

    if (contacts.some(function (c) {
        return c.phoneNumber.toUpperCase() === contact.phoneNumber.toUpperCase();
    })) {
        res.send({
            success: false,
            message: "This phone number exists"
        });

        return;
    }

    contacts.push({
        id: newContactId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
    });

    newContactId++;

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;
