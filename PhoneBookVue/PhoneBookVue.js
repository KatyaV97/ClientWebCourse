new Vue({
    el: "#app",

    data: {
        contacts: [],
        id: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        checkedContacts: [],
        isCheckedCommonCheckbox: false,
        filterText: "",
        contactToDelete: null,
        storageContacts: []
    },

    beforeMount() {
        this.loadContacts();
    },

    watch: {
        checkedContacts() {
            if (this.checkedContacts.length === this.contacts.length && this.contacts.length !== 0) {
                this.isCheckedCommonCheckbox = true;
            } else {
                this.isCheckedCommonCheckbox = false;
            }
        }
    },

    methods: {
        loadContacts: function () {
            var storageContacts = JSON.parse(localStorage.getItem("contacts"));

            if (storageContacts !== null) {
                this.contacts = storageContacts.slice(0);
                this.storageContacts = this.contacts.slice(0);
            }

            var lastContactId = localStorage.getItem("lastContactId");

            if (lastContactId === null || lastContactId === "") {
                this.id = 1;
            } else {
                this.id = lastContactId;
            }
        },

        createContact: function () {
            this.firstName = this.firstName.trim();
            this.lastName = this.lastName.trim();
            this.phoneNumber = this.phoneNumber.trim();

            var lastNameIsValid = this.isValid(this.lastName);
            var firstNameIsValid = this.isValid(this.firstName);
            var phoneNumberIsValid = this.isValid(this.phoneNumber);

            this.toggleHint($("#first-name-invalid"), firstNameIsValid);
            this.toggleHint($("#last-name-invalid"), lastNameIsValid);
            this.toggleHint($("#phone-number-invalid"), phoneNumberIsValid);
            this.addBorder($("#first-name"), !firstNameIsValid);
            this.addBorder($("#last-name"), !lastNameIsValid);

            var hasPhoneNumber = this.hasPhoneNumber();

            this.addBorder($("#phone-number"), !phoneNumberIsValid || hasPhoneNumber);

            if (!lastNameIsValid || !firstNameIsValid || !phoneNumberIsValid || hasPhoneNumber) {
                return;
            }

            var contact = {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber,
            };

            this.storageContacts.push(contact);
            this.contacts.push(contact);
            this.updateLocalStorage();

            this.firstName = "";
            this.lastName = "";
            this.phoneNumber = "";
            this.id++;
            localStorage.lastContactId = this.id;
        },

        deleteContact: function () {
            var indexInStorageContacts = this.storageContacts.indexOf(this.contactToDelete);
            var indexInCheckedContacts = this.checkedContacts.indexOf(this.contactToDelete.id);

            this.storageContacts.splice(indexInStorageContacts, 1);
            this.checkedContacts.splice(indexInCheckedContacts, 1);

            this.filterContacts();
            this.updateLocalStorage();
        },

        launchDeleteContactConfirmation: function (contact) {
            this.contactToDelete = contact;

            if (!this.checkedContacts.includes(contact.id)) {
                this.checkedContacts.push(contact.id);
            }

            var deleteContactConfirmation = new bootstrap.Modal('#deleteContactConfirmation');
            deleteContactConfirmation.show();
        },

        launchDeleteSelectedContactsConfirmation: function () {
            if (this.checkedContacts.length === 0) {
                return;
            }

            var deleteSelectedContactsConfirmation = new bootstrap.Modal('#deleteSelectedContactsConfirmation');
            deleteSelectedContactsConfirmation.show();
        },

        uncheck: function () {
            var index = this.checkedContacts.indexOf(this.contactToDelete.id);
            this.checkedContacts.splice(index, 1);
        },

        uncheckHiddenContacts: function () {
            var self = this;

            this.storageContacts.map(function (contact) {
                if (!self.contacts.includes(contact) && self.checkedContacts.includes(contact.id)) {
                    var index = self.checkedContacts.indexOf(contact.id);
                    self.checkedContacts.splice(index, 1);
                }
            });
        },

        filterContacts: function () {
            var self = this;

            this.contacts = this.filterText === "" ? this.storageContacts.slice(0) :
                this.storageContacts.filter(function (contact) {
                    if (contact.firstName.toLowerCase().includes(self.filterText.toLowerCase()) ||
                        contact.lastName.toLowerCase().includes(self.filterText.toLowerCase()) ||
                        contact.phoneNumber.toLowerCase().includes(self.filterText.toLowerCase())) {
                        return contact;
                    }
                });
        },

        applyFilterText: function () {
            this.filterContacts();
            this.uncheckHiddenContacts();
        },

        isValid: function (inputText) {
            return inputText !== null && inputText !== "";
        },

        hasPhoneNumber: function () {
            var self = this;

            var isPhoneNumberExist = this.storageContacts.some(function (contact) {
                return contact.phoneNumber === self.phoneNumber;
            });

            this.toggleHint($("#phone-number-exist"), !isPhoneNumberExist);

            return isPhoneNumberExist;
        },

        toggleHint: function (hint, toggleHint) {
            hint.toggleClass("hidden-hint", toggleHint);
        },

        addBorder: function (inputForm, addBorder) {
            inputForm.toggleClass("add-border", addBorder);
        },

        updateLocalStorage: function () {
            localStorage.contacts = JSON.stringify(this.storageContacts);
        },

        clearFilterText: function () {
            this.filterText = "";
            this.loadContacts();
        },

        checkedAllContacts: function () {
            if (!this.isCheckedCommonCheckbox) {
                this.checkedContacts = this.contacts.map(function (contact) {
                    return contact.id;
                });
            } else {
                this.checkedContacts = [];
            }
        },

        deleteCheckedContacts: function () {
            var self = this;

            this.storageContacts = this.storageContacts.filter(function (contact) {
                return !self.checkedContacts.includes(contact.id);
            });

            this.checkedContacts = [];
            this.filterContacts();
            this.updateLocalStorage();
        },
    }
});