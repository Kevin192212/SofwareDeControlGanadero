// Simulamos una base de datos en localStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Función para mostrar la ventana de carga
function mostrarLoading() {
    const loadingModal = new bootstrap.Modal(document.getElementById('loading'));
    loadingModal.show();
}

// Función para ocultar la ventana de carga
function ocultarLoading() {
    const loadingModalEl = document.getElementById('loading');
    const loadingModal = bootstrap.Modal.getInstance(loadingModalEl);
    loadingModal.hide();
}

// Función para mostrar el mensaje de éxito de registro
function mostrarRegistroExito() {
    const registroExitoModal = new bootstrap.Modal(document.getElementById('registroExito'));
    registroExitoModal.show();
}

// Función para registrar un nuevo usuario
function registrarUsuario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    if (nombre && apellido && correo && contrasena) {
        usuarios.push({ nombre, apellido, correo, contrasena });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarRegistroExito();
        setTimeout(() => {
            const registroExitoModalEl = document.getElementById('registroExito');
            const registroExitoModal = bootstrap.Modal.getInstance(registroExitoModalEl);
            registroExitoModal.hide();
            mostrarLoading();
            setTimeout(() => {
                ocultarLoading();
                window.location.href = 'index.html';
            }, 2000);
        }, 2000);
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

// Función para manejar el inicio de sesión
function login() {
    const loginCorreo = document.getElementById('loginCorreo').value;
    const loginContrasena = document.getElementById('loginContrasena').value;

    const usuarioValido = usuarios.find(u => u.correo === loginCorreo && u.contrasena === loginContrasena);

    if (usuarioValido) {
        mostrarLoading();
        setTimeout(() => {
            ocultarLoading();
            window.location.href = 'interfazPrincipal.html'; // Cambiar a la página que corresponda después del inicio de sesión
        }, 2000);
    } else {
        alert("Correo electrónico o contraseña incorrectos");
    }
}


