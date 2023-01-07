$(function () {
    var tableBody = $(".contacts-list tbody");
    var lastNameInput = $("#last-name");
    var firstNameInput = $("#first-name");
    var phoneNumberInput = $("#phone-number");
    var filterTextInput = $(".filter-text");
    var commonCheckbox = $("#common-checkbox");

    var contactsData = [];
    var storageContacts = localStorage.getItem("contacts");

    if (storageContacts !== null && storageContacts !== "") {
        contactsData = JSON.parse(storageContacts);

        initPhoneBook();
    }

    $(".add-button").click(function () {
        var lastName = lastNameInput.val().trim();
        var firstName = firstNameInput.val().trim();
        var phoneNumber = phoneNumberInput.val().trim();

        if (!isValidContactData(lastName, firstName, phoneNumber)) {
            return;
        }

        if (hasPhoneNumber(phoneNumber)) {
            bootbox.alert("This phone number exists!");
            return;
        }

        addContact(lastName, firstName, phoneNumber);

        contactsData.push({
            rowIndex: tableBody.children().length - 1,
            lastName: lastName,
            firstName: firstName,
            phoneNumber: phoneNumber,
        });

        localStorage.contacts = JSON.stringify(contactsData);

        $(".add-form input").val("");
    });

    commonCheckbox.click(function () {
        if ($(this).prop("checked")) {
            tableBody.find("tr:visible input:not(:checked)").prop("checked", true);
        } else {
            tableBody.find("tr:visible input:checked").prop("checked", false);
        }
    });

    $('.delete-checked-button').click(function () {
        bootbox.confirm({
            message: "Are you sure?",
            title: "The selected contacts will be deleted",
            callback: function (result) {
                if (result) {
                    tableBody.children().each(function () {
                        if ($(this).find("input").prop("checked")) {
                            contactsData.splice($(this).index(), 1);
                            localStorage.contacts = JSON.stringify(contactsData);

                            $(this).remove();
                        }
                    });

                    updateCellsNumbers();
                    commonCheckbox.prop("checked", false);
                }
            }
        });
    });

    $(".contacts-list form").on("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    filterTextInput.on("keydown", function (e) {
        if (e.keyCode === 13) {
            applyFilter($(this).val().trim());
        }
    });

    $(".apply-filter-button").click(function () {
        applyFilter(filterTextInput.val().trim());
    });

    $(".clear-filter-button").click(function () {
        filterTextInput.val("");
        clearFilterForContactsList();

        updateCellsNumbers();
    });

    function addContact(lastName, firstName, phoneNumber) {
        var newContactRow = $("<tr>").html("<td><input type='checkbox'></td>" +
            "<td class='number'></td>" +
            "<td class='last-name'></td>" +
            "<td class='first-name'></td>" +
            "<td class='phone-number'></td>" +
            "<td><button class='btn btn-danger p-0 delete-button' type='button'>X</button></td>")
            .appendTo(tableBody);

        newContactRow.find(".number").text(tableBody.find("tr:visible").length);
        newContactRow.find(".last-name").text(lastName);
        newContactRow.find(".first-name").text(firstName);
        newContactRow.find(".phone-number").text(phoneNumber);

        newContactRow.find(".delete-button").click(function () {
            newContactRow.find("input").prop("checked", true);

            bootbox.confirm({
                message: "Are you sure?",
                title: "Contact will be deleted",
                callback: function (result) {
                    if (result) {
                        contactsData.splice(newContactRow.index(), 1);
                        localStorage.contacts = JSON.stringify(contactsData);

                        newContactRow.remove();
                        updateCellsNumbers();
                    }
                }
            });
        });

        newContactRow.find("input").click(function () {
            if (tableBody.find("tr:visible input:not(:checked)").length) {
                commonCheckbox.prop("checked", false);
            }
        });
    }

    function applyFilter(filterText) {
        if (filterText === null || filterText === "") {
            clearFilterForContactsList();
            updateCellsNumbers();

            return;
        }

        tableBody.children().each(function () {
            if ($(this).find(".last-name").text().toLowerCase().includes(filterText.toLowerCase()) ||
                $(this).find(".first-name").text().toLowerCase().includes(filterText.toLowerCase()) ||
                $(this).find(".phone-number").text().toLowerCase().includes(filterText.toLowerCase())) {
                $(this).show();
            } else {
                $(this).find("td:first-child input").prop("checked", false);
                $(this).hide();
            }
        });

        updateCellsNumbers();
    }

    function clearFilterForContactsList() {
        tableBody.children().show();
    }

    function updateCellsNumbers() {
        tableBody.find("tr:visible").each(function (rowIndex) {
            $(this).find("td:nth-child(2)").text(rowIndex + 1);
        });
    }

    function isValidContactData(lastName, firstName, phoneNumber) {
        var lastNameIsValid = isValid(lastName);
        var firstNameIsValid = isValid(firstName);
        var phoneNumberIsValid = isValid(phoneNumber);

        hiddenHint($("#last-name-invalid"), $("#last-name"), lastNameIsValid);
        hiddenHint($("#first-name-invalid"), $("#first-name"), firstNameIsValid);
        hiddenHint($("#phone-number-invalid"), $("#phone-number"), phoneNumberIsValid);

        return lastNameIsValid && firstNameIsValid && phoneNumberIsValid;
    }

    function isValid(inputText) {
        return inputText !== "" && inputText !== null;
    }

    function hiddenHint(hint, inputForm, hideHint) {
        hint.toggleClass("js-hidden-hint", hideHint);
        inputForm.toggleClass("js-add-border", !hideHint);
    }

    function hasPhoneNumber(phoneNumber) {
        return contactsData.some(function (contactData) {
            return contactData.phoneNumber === phoneNumber;
        });
    }

    function initPhoneBook() {
        contactsData.forEach(function (contactData) {
            addContact(contactData.lastName, contactData.firstName, contactData.phoneNumber);
        });
    }
});