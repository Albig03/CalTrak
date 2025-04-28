const changePasswordBtn = document.getElementById('changePasswordBtn');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');

const changePasswordModal = document.getElementById('changePasswordModal');
const deleteAccountModal = document.getElementById('deleteAccountModal');

const closeChangePassword = document.getElementById('closeChangePassword');
const closeDeleteAccount = document.getElementById('closeDeleteAccount');

const confirmChangePasswordBtn = document.getElementById('confirmChangePassword');
const confirmDeleteAccountBtn = document.getElementById('confirmDeleteAccount');
const deleteConfirmInput = document.getElementById('deleteConfirmInput');

const getUsername = () => {
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (userData) {
        try {
            return JSON.parse(userData).username;
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }
    return null; 
};

changePasswordBtn.addEventListener('click', () => {
    changePasswordModal.style.display = 'block';
});

deleteAccountBtn.addEventListener('click', () => {
    deleteAccountModal.style.display = 'block';
});

closeChangePassword.addEventListener('click', () => {
    changePasswordModal.style.display = 'none';
});

closeDeleteAccount.addEventListener('click', () => {
    deleteAccountModal.style.display = 'none';
});

// Enable/disable confirm delete button based on typed input
deleteConfirmInput.addEventListener('input', () => {
    if (deleteConfirmInput.value === "Delete Account") {
        confirmDeleteAccountBtn.disabled = false;
    } else {
        confirmDeleteAccountBtn.disabled = true;
    }
});

// Password change
confirmChangePasswordBtn.addEventListener('click', async () => {
    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmNewPassword = document.getElementById('confirmNewPassword').value.trim();
    
    const errorElement = document.getElementById('passwordError');
    errorElement.textContent = '';
    
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        errorElement.textContent = 'Please fill in all fields.';
        return;
    }

    if (newPassword !== confirmNewPassword) {
        errorElement.textContent = 'New passwords do not match.';
        return;
    }

    // Check new password strength
    if (newPassword.length < 8) {
        errorElement.textContent = 'Password must be at least 8 characters long.';
        return;
    }

    // Get username
    const username = getUsername();
    if (!username) {
        errorElement.textContent = 'Not logged in. Please login again.';
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        return;
    }

    try {
        const response = await fetch('/api/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, currentPassword, newPassword })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('passwordSuccess').textContent = 'Password changed successfully!';
            
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmNewPassword').value = '';
            
            // Close after 2 seconds
            setTimeout(() => {
                changePasswordModal.style.display = 'none';
                document.getElementById('passwordSuccess').textContent = '';
            }, 2000);
        } else {
            errorElement.textContent = data.message || 'Failed to change password.';
        }
    } catch (error) {
        console.error('Error changing password:', error);
        errorElement.textContent = 'Server error. Please try again later.';
    }
});

// Account deletion
confirmDeleteAccountBtn.addEventListener('click', async () => {
    const confirmText = deleteConfirmInput.value.trim();
    
    // Get error message element
    const errorElement = document.getElementById('deleteError');
    errorElement.textContent = '';

    if (confirmText !== "Delete Account") {
        errorElement.textContent = 'Confirmation text does not match.';
        return;
    }

    // Get username
    const username = getUsername();
    if (!username) {
        errorElement.textContent = 'Not logged in. Please login again.';
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        return;
    }

    try {
        const response = await fetch('/api/auth/delete-account', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('deleteSuccess').textContent = 'Account deleted successfully!';
            
            // Clear local storage and session storage
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            errorElement.textContent = data.message || 'Failed to delete account.';
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        errorElement.textContent = 'Server error. Please try again later.';
    }
});

window.addEventListener('click', (event) => {
    if (event.target === changePasswordModal) {
        changePasswordModal.style.display = 'none';
    }
    if (event.target === deleteAccountModal) {
        deleteAccountModal.style.display = 'none';
    }
});