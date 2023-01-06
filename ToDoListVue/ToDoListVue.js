new Vue({
    el: "#app",

    data: {
        items: [],
        newItemText: "",
        isNewItemInvalid: false,
        itemId: 1
    },

    methods: {
        addItem: function () {
            var value = this.newItemText.trim();
            this.isNewItemInvalid = value.length === 0;

            if (this.isNewItemInvalid) {
                alert("Нужно ввести задачу");
                return;
            }

            this.items.push({
                id: this.itemId,
                text: value,
                isEditing: false,
                editText: ""
            });

            this.itemId++;
            this.newItemText = "";
        },

        deleteItem: function (index) {
            this.items.splice(index, 1);
        },

        editItem: function (item) {
            item.editText = item.text;
            item.isEditing = true;
        },

        saveItem: function (item) {
            item.text = item.editText;
            item.isEditing = false;
        },

        canselEditing: function (item) {
            item.isEditing = false;
        },
    }
});