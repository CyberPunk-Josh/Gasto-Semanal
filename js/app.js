//Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;


//Clases

//Clase de presupuesto:
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //Metodo para ir restando del presupuesto actual:
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}
//Clase de interfaz, maneja todo lo relacionado con el html:
class Interfaz{
    insertarPresupuesto(cantidad){
       const presupuestoSpan = document.querySelector('span#total');
       const restanteSpan = document.querySelector('span#restante');

       //Insertar en el HTML:
       presupuestoSpan.innerHTML = `${cantidad}`;
       restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        //Crear Mensaje:
        divMensaje.appendChild(document.createTextNode(mensaje));
        //Insertar en el DOM:
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar el alert despues de 3 segundos:
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000)
    }

    //Inserta los gastos a la lista:
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');

        //Crear un li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center'; //Material de Boostrap
        //Insertar el gasto:
        li.innerHTML = `
            ${nombre}
           <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
        `;
        //Insertar al HTML
        gastosListado.appendChild(li);
    }
    //Comprueba el presupuesto restante:
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        this.comprobarPresupuesto();
    }
    //Cambia de color el presupuesto restante:
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        //Comprobar el 25%:
        if((presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if((presupuestoTotal / 2) > presupuestoRestante ){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success',);
            restante.classList.add('alert-warning');
        }
        
    }
}


//EventListeners

//Recargar el prompt inicial hasta que cargue se inserte una cantidad
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        //Recarga el prompt:
        window.location.reload();
    }else{
        //Instanciar un presupuesto:
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Instanciar la clase de Interfaz:
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //Leer del formulario los gastos:
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //Instanciar la Interfaz:
    const ui = new Interfaz();

    //Comprobar que los campos no esten vacios:
    if (nombreGasto === "" || cantidadGasto === ""){
        // 2 parametros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    }else{
        //Insertar en el HTML
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        //Restar los gastos a la cantidad disponible:
        ui.presupuestoRestante(cantidadGasto);
    }
})
