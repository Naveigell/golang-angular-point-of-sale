const category = document.getElementById("category");

if (category !== null) {
    new coreui.MultiSelect(category, { multiple: false, search: true });
}
