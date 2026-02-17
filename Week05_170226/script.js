// Array to store users
let users = [];

function register() {
  try {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value;
    let date = document.getElementById("regDate").value;

    // Validation
    if (name === "" || email === "" || password === "" || date === "") {
      throw "All fields are required!";
    }

    // String validation
    if (!email.includes("@") || !email.includes(".")) {
      throw "Invalid email format!";
    }

    if (password.length < 6) {
      throw "Password must be at least 6 characters!";
    }

    // Date validation
    let selectedDate = new Date(date);
    let today = new Date();
    if (selectedDate < today) {
      throw "Booking date cannot be in the past!";
    }

    // Store user in array
    let user = {
      name: name.toUpperCase(), // string method
      email: email.toLowerCase(),
      password: password
    };

    users.push(user);

    document.getElementById("regMessage").innerHTML = "Registration Successful!";
  }
  catch (error) {
    document.getElementById("regMessage").innerHTML = error;
  }
}

function login() {
  try {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
      throw "Please enter login details!";
    }

    let found = false;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email.toLowerCase() &&
          users[i].password === password) {
        found = true;
        break;
      }
    }

    if (!found) {
      throw "Invalid Credentials!";
    }

    document.getElementById("loginMessage").innerHTML = "Login Successful!";
  }
  catch (error) {
    document.getElementById("loginMessage").innerHTML = error;
  }
}