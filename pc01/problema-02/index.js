const baseURL = "https://api.sampleapis.com/countries/countries"

/**
 * Obtener datos de una API
 * @returns {Promise<void>}
 */
async function getData() {
    const response = await fetch(baseURL);
    const result = await response.json();
    const dataProcesed = await processData(result);
    console.log(dataProcesed)
}

/**
 * Procesar datos
 * @param data
 * @returns {Promise<*[]>}
 */
async function processData(data) {
    const max = 2;
    let response = [];

    for (let i = 0; i < max; i++) {
        const {name, media, capital} = data[i];
        response.push({
            pais: name,
            capital: capital,
            bandera: media.flag,
        });
    }

    return response;

}

getData()