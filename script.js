document.addEventListener("DOMContentLoaded", function () { 
    const registerForm = document.getElementById("registerForm"); 
    const loginForm = document.getElementById("loginForm"); 
    const dashboard = document.getElementById("dashboard");

    // Registration
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let fullname = document.getElementById("fullname").value.trim();
            let phone = document.getElementById("phone").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();
    
            if (!fullname || !phone || !email || !password) {
                alert("All fields are required!");
                return;
            }
    
            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Enter a valid 10-digit phone number.");
                return;
            }
    
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert("Enter a valid email address.");
                return;
            }
    
            let users = JSON.parse(localStorage.getItem("users")) || [];
    
            if (users.some(user => user.email === email)) {
                alert("User already exists! Please login.");
                return;
            }
    
            let user = { fullname, phone, email, password: btoa(password) };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUser", JSON.stringify(user));
    
            alert("Registration successful! Redirecting to dashboard.");
            window.location.href = "dash.html";
        });
    }
    // Login
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let email = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(user => user.email === email || user.phone === email); // Allow login via email or phone

        if (!user) {
            alert("User not found! Please register first.");
            return;
        }

        // Decode and compare password
        if (atob(user.password) !== password) { 
            alert("Invalid email or password!");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful! Redirecting to dashboard.");
        window.location.href = "dashboard.html";
    });
}

    
                // Ensure stored password is compared correctly
                if (user.password !== btoa(password)) {
                    alert("Invalid email or password!");
                    return;
                }
    
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                alert("Login successful! Redirecting to dashboard.");
                window.location.href = "dashboard.html";
            });
    // Load Dashboard Data
    function loadDashboard() {
        let user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!user) {
            alert("Please login first.");
            window.location.href = "login.html";
            return;
        }

        document.getElementById("userFullName").innerText = user.fullname;
        document.getElementById("userPhone").innerText = user.phone;
        document.getElementById("userEmail").innerText = user.email;
    }
    
    // Update Password
    window.updatePassword = function () {
        let newPassword = document.getElementById("newPassword").value.trim();
        if (!newPassword) {
            alert("Please enter a new password.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        let userIndex = users.findIndex(user => user.email === loggedInUser.email);
        if (userIndex !== -1) {
            users[userIndex].password = btoa(newPassword);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Password updated successfully!");
        }
    };
    
    // Logout Function
    window.logout = function () {
        localStorage.removeItem("loggedInUser");
        alert("You have been logged out.");
        window.location.href = "login.html";
    };

    if (dashboard) {
        loadDashboard();
    }