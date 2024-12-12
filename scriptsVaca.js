// Simulamos una base de datos en localStorage
let vacas = JSON.parse(localStorage.getItem('vacas')) || [];

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

// Función para registrar una vaca
function registrarVaca() {
    const codigoVaca = document.getElementById('codigoVaca').value;
    const fechaNacimientoVaca = document.getElementById('fechaNacimientoVaca').value;
    const sexoVaca = document.getElementById('sexoVaca').value;
    const razaVaca = document.getElementById('razaVaca').value;
    const pesoNacimientoVaca = document.getElementById('pesoNacimientoVaca').value;
    const litrosLecheVaca = document.getElementById('litrosLecheVaca').value; // Nuevo campo
    const pesoNacer = document.getElementById('pesoNacer').value; // Nuevo campo
    const pesoActual = document.getElementById('pesoActual').value; // Nuevo campo
    const potrero = document.getElementById('potrero').value; // Nuevo campo
    const origen = document.getElementById('origen').value; // Nuevo campo
    const numHijos = document.getElementById('numHijos').value; // Nuevo campo

    // Verificar que todos los campos estén llenos
    if (codigoVaca && fechaNacimientoVaca && sexoVaca && razaVaca && pesoNacimientoVaca && litrosLecheVaca && pesoNacer && pesoActual && potrero && origen && numHijos) {
        const nuevaVaca = { 
            codigoVaca, 
            fechaNacimientoVaca, 
            sexoVaca, 
            razaVaca, 
            pesoNacimientoVaca,
            litrosLecheVaca, // Agregado al objeto
            pesoNacer, // Agregado al objeto
            pesoActual, // Agregado al objeto
            potrero, // Agregado al objeto
            origen, // Agregado al objeto
            numHijos // Agregado al objeto
        };
        
        vacas.push(nuevaVaca);
        localStorage.setItem('vacas', JSON.stringify(vacas));
        mostrarLoading();
        
        setTimeout(() => {
            ocultarLoading();
            mostrarRegistroExito();
            setTimeout(() => {
                const registroExitoModalEl = document.getElementById('registroExito');
                const registroExitoModal = bootstrap.Modal.getInstance(registroExitoModalEl);
                registroExitoModal.hide();
                mostrarVacasRegistradas();
            }, 2000);
        }, 1000);
    } else {
        alert('Por favor, complete todos los campos del formulario');
    }
}

// Función para mostrar las vacas registradas (opcional, si quieres mostrar la lista de vacas)
function mostrarVacasRegistradas() {
    console.log(vacas); // Aquí puedes manejar la visualización de los registros guardados.
}
