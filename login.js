// login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            // If login is successful, redirect to the dashboard
            window.location.href = 'dashboard.html';  
        } else {
            alert(result.message);  
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
});
