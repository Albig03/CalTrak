document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await res.json();

        if (data.message === 'User registered successfully') {
            alert('Registration successful! You can now log in.');
            window.location.href = '/login'; // Redirect to login page
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Something went wrong, please try again.');
    }
});
