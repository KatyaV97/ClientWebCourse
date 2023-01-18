function get(url, data) {
    return $.get(url, data);
}

function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

function PhoneBookService() {
    this.url = "/api/";
}

PhoneBookService.prototype.getContacts = function (term) {
    return get(this.url + "getContacts", { term: term })
};

PhoneBookService.prototype.createContact = function (contact) {
    return post(this.url + "createContact", contact)
};

PhoneBookService.prototype.deleteContact = function (id) {
    return post(this.url + "deleteContact", { id: id })
};

PhoneBookService.prototype.deleteSelectedContacts = function (selectedContacts) {
    return post(this.url + "deleteSelectedContacts", { selectedContacts: selectedContacts })
};

new Vue({
    el: "#app",

    data: {
        contacts: [],
        firstName: "",
        lastName: "",
        phoneNumber: "",
        term: "",
        checkedContactsId: [],
        service: new PhoneBookService()
    },

    created: function () {
        this.loadContacts();
    },

    methods: {
        loadContacts: function () {
            var self = this;

            this.service.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Failed to load contacts list");
            });
        },

        createContact: function () {
            var self = this;

            var request = {
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber
            };
            
            this.service.createContact(request).done(function (response) {
                
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();

                self.firstName = "";
                self.lastName = "";
                self.phoneNumber = "";
            }).fail(function () {
                alert("Failed to create contact");
            });
        }, 

        deleteContact: function (contact) {
            var self = this;

            this.service.deleteContact(contact.id).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert("Failed to delete contact");
            });
        },

        deleteSelectedContacts: function () {
            var self = this;
            console.log(this.checkedContactsId);
            this.service.deleteSelectedContacts(self.checkedContactsId).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert("Failed to delete selected contacts");
            });
        }
    }
});