function validation() {
    let email = document.getElementById("email").value;
    console.log(email);

    function password() {
        let password1 = document.getElementById("password1").value;
        if (password1.length < 8) {
            alert("Password must be 8 characters long");
            password();
        }
        let password2 = document.getElementById("password2").value;
        if (password1 === password2) {
            console.log(password1);
            showContent(); // Call function to show content on successful validation
        } else {
            alert("Passwords don't match, please retry");
            password();
        }
    }

    password();
}

function showContent() {
    document.getElementById("content").style.display = "block"; // Show the content
}

