document.querySelector('.submit').addEventListener('click', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    // Simple validation
    if (!email || !password) {
        alert('Please fill all the fields');
        return;
    }

    // Send data to server
    fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Sign in successful') {
            window.location.href = 'main.html';
        } else {
            alert(data);
        }
    })
    .catch(error => console.error('Error:', error));
});
