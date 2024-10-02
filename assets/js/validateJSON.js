const JSONInput = document.getElementById("json-input");

function validateJSON() {
    try {
        JSON.parse(JSONInput.value);
        alert("Valid JSON!");
        JSONInput.style.borderColor = "green";
    } catch (error) {
        alert("Invalid JSON!");
        JSONInput.style.borderColor = "red";
    }
}

JSONInput.addEventListener("change", validateJSON);
