// Simulamos una base de datos en localStorage
let vacas = JSON.parse(localStorage.getItem('vacas')) || [];

function validarCodigo() {
    const codigoVaca = document.getElementById('codigoVaca').value;
    const vaca = vacas.find(v => v.codigoVaca === codigoVaca);

    if (vaca) {
        mostrarFormularioServicio(vaca);
    } else {
        alert('No se encontró ninguna vaca con ese código.');
    }
}

function mostrarFormularioServicio(vaca) {
    document.getElementById('serviceTitle').innerText = `Registrar nuevo servicio para la vaca con código ${vaca.codigoVaca}`;
    const formContainer = document.getElementById('serviceFormContainer');
    formContainer.style.display = 'flex';
    setTimeout(() => {
        formContainer.style.left = '20px';
    }, 10);
    document.getElementById('serviceForm').dataset.codigoVaca = vaca.codigoVaca;
}

function ocultarFormularioServicio() {
    const formContainer = document.getElementById('serviceFormContainer');
    formContainer.style.left = '-500px';
    setTimeout(() => {
        formContainer.style.display = 'none';
    }, 500);
}

function registrarServicio() {
    // Mostrar pantalla de carga
    document.getElementById('loading').style.display = 'flex';

    setTimeout(() => {
        const codigoVaca = document.getElementById('serviceForm').dataset.codigoVaca;
        const cantidadLeche = document.getElementById('cantidadLeche').value;
        const fechaPalpacion = document.getElementById('fechaPalpacion').value;
        const fechaParto = document.getElementById('fechaParto').value;
        const horaParto = document.getElementById('horaParto').value;
        const medicamentoAplicado = document.getElementById('medicamentoAplicado').value;
        const aplicadoPor = document.getElementById('aplicadoPor').value;
        const sintomas = document.getElementById('sintomas').value;

        const vaca = vacas.find(v => v.codigoVaca === codigoVaca);
        if (vaca) {
            if (!vaca.servicios) {
                vaca.servicios = [];
            }
            vaca.servicios.push({
                cantidadLeche,
                fechaPalpacion,
                fechaParto,
                horaParto,
                medicamentoAplicado,
                aplicadoPor,
                sintomas
            });
            localStorage.setItem('vacas', JSON.stringify(vacas));
            document.getElementById('serviceForm').reset();
        } else {
            alert('Ocurrió un error al registrar el servicio.');
        }
        
        // Ocultar pantalla de carga
        document.getElementById('loading').style.display = 'none';
    }, 2000); // Simulamos el tiempo de carga de 2 segundos
}

function volverAtras() {
    // Aquí puedes agregar la lógica para volver a la página anterior o realizar alguna acción
    window.history.back(); // Vuelve atrás en el navegador
}

