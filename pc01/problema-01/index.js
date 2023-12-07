const fs = require("node:fs");
const {Buffer} = require('node:buffer');

const filename = "archivo.txt";
let dataBuffer = Buffer.alloc(1024);
let tamanoBuffer = dataBuffer.length;

/**
 * Trabajar archivo
 */
function workFile() {
    try {
        const flags = "r";
        fs.open(filename, flags, myReadFile);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Leer archivo
 * @param err: Error
 * @param fd: File descriptor
 */
function myReadFile(err, fd) {
    if (err) if (err) printLog({err, message: "Error al leer el archivo"});

    fs.read(fd, dataBuffer, 0, tamanoBuffer, 0, myProcessData);
    fs.close(fd, myCloseFile);
}

/**
 * Procesar datos
 * @param err
 * @param bytes:
 * @returns {Promise<void>}
 */
async function myProcessData(err, bytes) {
    if (err) printLog({err, message: "Error al procesar el archivo"});
    if (bytes < 1) return printLog({err, message: "No hay datos para procesar"});

    let data = dataBuffer.subarray(0, bytes).toString();
    const response = await dataToUpper(data);

    console.log({response});
}

/**
 * Contenido a MAYUSCULA
 * @param data
 * @returns {Promise<{normal, mayusc: string}>}
 */
async function dataToUpper(data) {
    return new Promise((resolve, reject) => {
        try {
            let response = {
                normal: data,
                mayusc: data.toUpperCase()
            }
            return resolve(response);
        } catch (e) {
            return reject(e);
        }
    })
}

/**
 * Cerrar archivo
 * @param err
 */
function myCloseFile(err) {
    if (err) printLog({message: "Error al cerrar el archivo"});
}

/**
 * Imprimir en consola
 * @param err
 * @param message
 */
function printLog({err, message}) {
    if (err) {
        let messageError = message ? message : err;
        console.error(err)
        throw new Error(messageError);
    }
    console.log(message);
}

// Ejecutar aplicación
workFile()