document.querySelector('.submit').addEventListener('click', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    // Simple validation
    if (!email || !password) {
        alert('Please fill all the fields');
        return;
    }

    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
        alert('Password must be at least 8 characters long and contain a special character');
        return;
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
    }
    
    if (!validatePassword(password)) {
        alert('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
        return;
    }


    // Send data to server
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'User registered successfully') {
            window.location.href = 'main.html';
        } else {
            alert(data);
        }
    })
    .catch(error => console.error('Error:', error));
});
