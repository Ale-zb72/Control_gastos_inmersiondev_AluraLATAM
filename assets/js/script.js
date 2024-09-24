let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];
let mesSeleccionado = '';
let editandoPosicion = -1; 

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = Number(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    mesSeleccionado = document.getElementById('mesGasto').value;

    if (editandoPosicion === -1) {
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionesGastos.push(descripcionGasto);
        gastoGrande();
    } else {
        listaNombresGastos[editandoPosicion] = nombreGasto;
        listaValoresGastos[editandoPosicion] = valorGasto;
        listaDescripcionesGastos[editandoPosicion] = descripcionGasto;
        editandoPosicion = -1; 
        gastoGrande();
    }

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];
        
        htmlLista += `<li>
                        ${elemento} - MXN ${valorGasto.toFixed(2)} 
                        <small>Descripción: ${descripcionGasto}</small>
                        <button onclick="eliminarGasto(${posicion});">Eliminar</button> 
                        <button onclick="modificarGasto(${posicion});">Modificar</button>
                      </li>`;

        totalGastos += valorGasto;  
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);

    limpiar(); 

    document.getElementById('botonFormulario').textContent = 'Agregar gasto';
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function modificarGasto(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];

    document.getElementById('botonFormulario').textContent = 'Actualizar gasto';

    editandoPosicion = posicion;
}

function gastoGrande(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = Number(document.getElementById('valorGasto').value);

    if (valorGasto > 500) {
        alert(`El gasto "${nombreGasto}" es grande, es mayor a MX $500.`);
    }
}

function descargarPDF() { 
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Lista de Gastos - ${mesSeleccionado}`, 10, 10); 

    let y = 20;
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];

        doc.setFontSize(12);
        doc.text(`${elemento} - MXN ${valorGasto.toFixed(2)}`, 10, y);
        y += 10;

        doc.setFontSize(10);
        doc.text(`Descripción: ${descripcionGasto}`, 10, y);
        y += 10;

        doc.setFontSize(12);

        totalGastos += valorGasto;
    });

    doc.text(`Total Mensual para ${mesSeleccionado}: MX $${totalGastos.toFixed(2)}`, 10, y + 10);
    doc.save(`lista_gastos_${mesSeleccionado}.pdf`);
}
