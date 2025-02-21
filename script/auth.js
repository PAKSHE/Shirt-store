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
            toggleForm.textContent = "ยังไม่มีบัญชีใช่ไหม? สมัครสมาชิก";
            authForm.querySelector('button').textContent = 'Login';
        } else {
            formTitle.textContent = 'Register';
            toggleForm.textContent = 'มีบัญชีอยู่แล้วใช่ไหม? เข้าสู่ระบบ';
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
                showAlert('ล็อคอินสำเร็จ!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redirect to index page after successful login
                }, 1500);
            } else {
                showAlert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
            }
        } else {
         
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            showAlert('การลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ', 'success');
            toggleForm.click(); // Switch to login form
        }
    });

    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert ${type} flex items-center justify-between p-4 mb-4 text-sm text-white rounded-lg shadow-md`;
        alert.innerHTML = `
            <span>${message}</span>
            <button class="ml-4 text-white" onclick="this.parentElement.remove()">✖</button>
        `;

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