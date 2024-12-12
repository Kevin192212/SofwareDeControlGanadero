function buscarVaca() {
    // Mostrar el indicador de carga
    document.getElementById('loading').style.display = 'flex';

    // Obtener las vacas almacenadas en localStorage
    const vacas = JSON.parse(localStorage.getItem('vacas')) || [];
    
    // Obtener el código ingresado por el usuario
    const codigoVaca = document.getElementById('buscarCodigo').value.trim();

    // Buscar la vaca por el código
    const vaca = vacas.find(v => v.codigoVaca === codigoVaca);
    const resultadoVacaDiv = document.getElementById('resultadoVaca');
    
    // Limpiar los resultados previos
    resultadoVacaDiv.innerHTML = '';

    // Establecer un temporizador para cerrar el indicador de carga después de 1 segundo
    setTimeout(function() {
        // Cerrar el indicador de carga
        document.getElementById('loading').style.display = 'none';

        // Mostrar los resultados
        resultadoVacaDiv.style.display = 'block';  // Mostrar la sección de resultados

        if (vaca) {
            // Si la vaca existe, mostrar los detalles
            resultadoVacaDiv.innerHTML = `
                <h3>Detalles de la Vaca</h3>
                <p><strong>Código:</strong> ${vaca.codigoVaca}</p>
                <p><strong>Fecha de Nacimiento:</strong> ${vaca.fechaNacimientoVaca}</p>
                <p><strong>Sexo:</strong> ${vaca.sexoVaca}</p>
                <p><strong>Raza:</strong> ${vaca.razaVaca}</p>
                <p><strong>Peso al Nacer:</strong> ${vaca.pesoNacimientoVaca}</p>
                <h4>Historial de Servicios</h4>
                ${vaca.servicios ? `
                    <ul>
                        ${vaca.servicios.map(servicio => `
                            <li>
                                <strong>Cantidad de Leche:</strong> ${servicio.cantidadLeche}<br>
                                <strong>Fecha de Palpación:</strong> ${servicio.fechaPalpacion}<br>
                                <strong>Fecha de Parto:</strong> ${servicio.fechaParto}<br>
                                <strong>Hora de Parto:</strong> ${servicio.horaParto}<br>
                                <strong>Medicamento Aplicado:</strong> ${servicio.medicamentoAplicado}<br>
                                <strong>Aplicado por:</strong> ${servicio.aplicadoPor}<br>
                                <strong>Síntomas:</strong> ${servicio.sintomas}
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p>No hay servicios registrados para esta vaca.</p>'}
            `;

            // Crear la gráfica de producción de leche diaria
            mostrarGraficaLeche(vaca);
        } else {
            // Si no se encuentra la vaca
            resultadoVacaDiv.innerHTML = `<p><strong>No se encontró ninguna vaca con el código ingresado.</strong></p>`;
        }
    }, 1000);  // El indicador de carga se cierra después de 1 segundo
}


function mostrarGraficaLeche(vaca) {
    const lecheData = vaca.servicios.map(servicio => servicio.cantidadLeche);
    const fechas = vaca.servicios.map(servicio => servicio.fechaPalpacion);  // Usamos fecha de palpación como ejemplo

    // Crear la gráfica de línea
    const ctxLinea = document.getElementById('lecheChart').getContext('2d');
    new Chart(ctxLinea, {
        type: 'line',  // Tipo de gráfico (línea)
        data: {
            labels: fechas,  // Fechas de los servicios
            datasets: [{
                label: 'Producción de Leche Diaria (Litros)',
                data: lecheData,  // Cantidad de leche
                borderColor: '#00765a',
                backgroundColor: 'rgba(0, 118, 90, 0.2)',  // Color de fondo de las áreas bajo la línea
                fill: true,  // Llenar el área bajo la línea
                tension: 0.4  // Curvatura de la línea
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Producción de Leche Diaria de la Vaca'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Fecha de Palpación'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Litros de Leche'
                    }
                }
            }
        }
    });

    // Crear la gráfica de barras
    const ctxBarras = document.getElementById('barChart').getContext('2d');
    new Chart(ctxBarras, {
        type: 'bar',  // Tipo de gráfico (barras)
        data: {
            labels: fechas,  // Fechas de los servicios
            datasets: [{
                label: 'Producción de Leche Diaria (Litros)',
                data: lecheData,  // Cantidad de leche
                backgroundColor: '#00765a',  // Color de las barras
                borderColor: '#005a40',  // Color del borde de las barras
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Producción de Leche Diaria - Gráfica de Barras'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Fecha de Palpación'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10  // Limita la cantidad de etiquetas mostradas
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Litros de Leche'
                    }
                }
            }
        }
    });

    // Llenar la tabla con los datos de producción de leche
    const tablaCuerpo = document.querySelector('#tablaProduccion tbody');
    tablaCuerpo.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos datos

    vaca.servicios.forEach(servicio => {
        const fila = document.createElement('tr');
        const celdaFecha = document.createElement('td');
        const celdaLeche = document.createElement('td');

        // Llenar las celdas
        celdaFecha.textContent = servicio.fechaPalpacion;
        celdaLeche.textContent = servicio.cantidadLeche;

        // Añadir las celdas a la fila
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaLeche);

        // Añadir la fila a la tabla
        tablaCuerpo.appendChild(fila);
    });
}
