const username = document.getElementById('username');
const password = document.getElementById('password');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const notification = document.getElementById('notification');

// Función para mostrar notificación
function showNotification(message, type = '') {
    notification.textContent = message;
    notification.className = `notification visible ${type}`;
    
    setTimeout(() => {
        notification.className = 'notification hidden';
    }, 3000);
}

// Función de registro
registerButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const user = username.value;
    const pass = password.value;

    const storedUsername = localStorage.getItem('username');
    
    //Validar usuario
    if (storedUsername === user) {
        showNotification('Ya hay un usuario registrado con este nombre.', 'error');
    } else if (user && pass) {
        localStorage.setItem('username', user);
        localStorage.setItem('password', pass);
        showNotification('Registro exitoso! Ahora puedes iniciar sesión.', 'success');
    } else {
        showNotification('Por favor ingresa un nombre de usuario y una contraseña.');
    }
});

//Inicio de sesión
loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    
    const inputUsername = username.value;
    const inputPassword = password.value;
    
    if (inputUsername === storedUsername && inputPassword === storedPassword) {
        showNotification('Inicio de sesión exitoso!', 'success');
        setTimeout(() => {
            window.location.href = 'pages/market.html';
        }, 1000);
    } else {
        showNotification('Nombre de usuario o contraseña incorrectos.');
    }
});


// Animación de texto uwu
const cursor = document.getElementById('cursor');
setInterval(() => {
    cursor.classList.toggle('visible');
}, 500);