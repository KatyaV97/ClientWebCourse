﻿$(function () {
    var bodyTable = $(".contacts-list tbody");
    var lastNameInputText = $("#last-name");
    var firstNameInputText = $("#first-name");
    var phoneNumberInputText = $("#phone-number");

    var contactsData = [];
    var storageTokens = localStorage.getItem("tokens");

    if (storageTokens !== null && storageTokens !== "") {
        var index = 0;

        storageTokens.split(", ").forEach(function (token) {
            contactsData[index] = JSON.parse(localStorage.getItem(token));
            index++;
        })

        initPhoneBook();
    }

    $(".add-button").click(function () {
        var lastName = lastNameInputText.val().trim();
        var firstName = firstNameInputText.val().trim();
        var phoneNumber = phoneNumberInputText.val().trim();

        if (!isValidContactData(lastName, firstName, phoneNumber)) {
            return;
        };

        if (checkIncludePhoneNumber(phoneNumber)) {
            bootbox.alert("This phone number exists!")
            return;
        }

        addContactHandler(lastName, firstName, phoneNumber);

        var newToken = randomToken();

        contactsData.push({
            token: newToken,
            lastName: lastName,
            firstName: firstName,
            phoneNumber: phoneNumber
        })

        localStorage.setItem(newToken, JSON.stringify(contactsData[contactsData.length - 1]));
        localStorage.tokens = getTokensList();

        $(".add-form input").val("");
    });

    $("#common-checkbox").click(function () {
        if ($(this).prop("checked")) {
            $("tr:visible td:first-child input:not(:checked)").each(function () {
                $(this).prop("checked", true);
            })
        } else {
            $("tr:visible td:first-child input:checked").each(function () {
                $(this).prop("checked", false);
            })
        }
    });

    $(".contacts-list form").on("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $(".filter-text").on("keydown", function (e) {
        if (e.keyCode === 13) {
            applyFilter($(this).val().trim());
        }
    });

    $(".apply-filter-button").click(function () {
        applyFilter($(this).prev().val().trim());
    });

    $(".clear-filter-button").click(function () {
        $(this).closest("form").find("input").val("");
        clearFilterForContactsList();

        updateCellsNumbers();
    });

    function addContactHandler(lastName, firstName, phoneNumber) {
        var newContactRow = $("<tr>").html("<td><input type='checkbox'></td>" +
            "<td class='number'></td>" +
            "<td class='last-name'></td>" +
            "<td class='first-name'></td>" +
            "<td class='phone-number'></td>" +
            "<td><button class='delete-button' type='button'>X</button></td>")
            .appendTo(bodyTable);

        newContactRow.find(".number").text($("tbody tr:visible").length);
        newContactRow.find(".last-name").text(lastName);
        newContactRow.find(".first-name").text(firstName);
        newContactRow.find(".phone-number").text(phoneNumber);

        newContactRow.find(".delete-button").click(function () {
            var currentRow = $(this).closest("tr");
            currentRow.find("input").prop("checked", true);

            bootbox.confirm({
                message: "Are you sure?",
                title: "The selected contacts will be deleted",
                callback: function (result) {
                    if (result) {
                        $("tbody tr").each(function () {
                            if ($(this).find("input").prop("checked")) {
                                var phoneNumber = $(this).find(".phone-number").text();
                                var index = contactsData.findIndex(contactData => contactData.phoneNumber === phoneNumber);
                                var token = contactsData[index].token;

                                delete localStorage[token];

                                contactsData.splice(index, 1);
                                localStorage.tokens = getTokensList();

                                $(this).remove();
                            }
                        });

                        updateCellsNumbers();
                    } else {
                        currentRow.find("input").prop("checked", false);
                    }

                    $("#common-checkbox").prop("checked", false);
                }
            });
        })
    }

    function getTokensList() {
        return contactsData.map(contactData => contactData.token).join(", ");
    }

    function applyFilter(filterText) {
        if (filterText === null || filterText === "") {
            clearFilterForContactsList();
            updateCellsNumbers();

            return;
        }

        $("tbody tr").each(function () {
            if ($(this).find(".last-name").text().toLowerCase().includes(filterText.toLowerCase()) ||
                $(this).find(".first-name").text().toLowerCase().includes(filterText.toLowerCase()) ||
                $(this).find(".phone-number").text().toLowerCase().includes(filterText.toLowerCase())) {
                $(this).show();
            } else {
                $(this).find("td:first-child input").prop("checked", false);
                $(this).hide();
            }
        })

        updateCellsNumbers()
    }

    function clearFilterForContactsList() {
        $("tbody tr").each(function () {
            $(this).show();
        })
    }

    function updateCellsNumbers() {
        $("tbody tr:visible").each(function (rowIndex) {
            $(this).find("td:nth-child(2)").text(rowIndex + 1);
        })
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
        if (inputText === "" || inputText === null) {
            return false;
        }

        return true;
    }

    function hiddenHint(hint, inputForm, hideHint) {
        hideHint ? hint.addClass("js-hidden-hint") : hint.removeClass("js-hidden-hint");
        hideHint ? inputForm.removeClass("js-add-border") : inputForm.addClass("js-add-border");
    }

    function checkIncludePhoneNumber(phoneNumber) {
        return contactsData.some(contactData => contactData.phoneNumber === phoneNumber);
    }

    function randomToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    function initPhoneBook() {
        contactsData.forEach(function (contactData) {
            addContactHandler(contactData.lastName, contactData.firstName, contactData.phoneNumber);
        })
    }
});