document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('authForm');
    const formTitle = document.getElementById('formTitle');
    const toggleForm = document.getElementById('toggleForm');
    const alertContainer = document.getElementById('alertContainer');
    let isLogin = true;

    toggleForm.addEventListener('click', function() {
        isLogin = !isLogin;
        if (isLogin) {
            formTitle.textContent = 'Login';
            toggleForm.textContent = "Don't have an account? Register";
            authForm.querySelector('button').textContent = 'Login';
        } else {
            formTitle.textContent = 'Register';
            toggleForm.textContent = 'Already have an account? Login';
            authForm.querySelector('button').textContent = 'Register';
        }
    });

    authForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (isLogin) {
            
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');
            if (username === storedUsername && password === storedPassword) {
                showAlert('Login successful!', 'success');
            } else {
                showAlert('Invalid username or password', 'error');
            }
        } else {
            
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            showAlert('Registration successful! Please login.', 'success');
            toggleForm.click(); // Switch to login form
        }
    });

    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert ${type} p-4 mb-4 text-sm text-white rounded-lg shadow-md`;
        alert.textContent = message;

        if (type === 'success') {
            alert.classList.add('bg-green-500');
        } else if (type === 'error') {
            alert.classList.add('bg-red-500');
        }

        alertContainer.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
});