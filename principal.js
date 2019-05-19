const fs = require('fs');
const cursos = [
    {
        id: 1,
        nombre: "Ingles",
        duracion: 3,
        valor: 5000,
    },
    {
        id: 2,
        nombre: "Frances",
        duracion: 3,
        valor: 5000,
    },
    {
        id: 3,
        nombre: "Programación",
        duracion: 5,
        valor: 15000,
    },
    {
        id: 4,
        nombre: "Medicina",
        duracion: 10,
        valor: 15000,
    },
    {
        id: 5,
        nombre: "Derecho",
        duracion: 2,
        valor: 5000,
    }

];
const opciones = {
    id: {
        demand: true,
        alias: 'i'
    },
    nombre: {
        demand: true,
        alias: 'n'
    },
    cedula: {
        demand: true,
        alias: 'x'
    }
}
//Cantidad e elementos a recorrer
let counter = cursos.length - 1;
//imprimir un elemento
let imprimirCurso = (element) => {
    let resultado;
    resultado = 'El curso se llama ' + element.nombre + ' tiene una duración de ' + element.duracion + ' y un valor de ' + element.valor;
    return resultado;
};

//mostrar lista con intervalo de tiempo
mostrar = () => {
    let valor = imprimirCurso(cursos[counter])
    console.log(valor);
    counter--;
    if (counter >= 0) {
        setTimeout(mostrar, 2000);
    }

}

//Iniciar mostrado de listado
iniciar = () => {
    setTimeout(() => {
        mostrar();
    }, 2000);
}
iniciar();

const argv = require('yargs')
    .command('inscribir', 'Inscribirme en un curso', opciones)
    .argv


let crearArchivo = (id, nombre, cedula) => {
    texto = 'El estudiante ' + nombre + '\n';
    texto = texto + 'con cédula ' + cedula + '\n';
    let curso = cursos.find(curso => curso.id == id);
       
    if (curso != undefined) {
        texto = texto + imprimirCurso(curso);
        fs.writeFile('matricula.txt', texto, (err) => {
            if (err) throw (err);
            console.log("Archivo creado");
        });
    }else{
        console.log("El curso solicitado no existe");
    }
}

crearArchivo(argv.id, argv.nombre, argv.cedula);