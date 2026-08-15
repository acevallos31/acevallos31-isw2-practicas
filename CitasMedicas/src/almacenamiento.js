// ============================================================
// Módulo: Almacenamiento local
// Responsabilidad: Persistir datos de la aplicación en localStorage.
// ============================================================

/**
 * Valida que la dependencia de almacenamiento pueda guardar datos.
 * @param {Storage} almacenamiento - Almacenamiento a utilizar.
 * @returns {Storage} Almacenamiento válido.
 */
function obtenerAlmacenamiento(almacenamiento) {
  if (!almacenamiento || typeof almacenamiento.setItem !== 'function') {
    throw new Error('El almacenamiento no es válido.');
  }

  return almacenamiento;
}

/**
 * Guarda datos serializados en el almacenamiento local.
 * @param {string} clave - Clave usada para almacenar los datos.
 * @param {*} datos - Datos que se guardarán como JSON.
 * @param {Storage} almacenamiento - Almacenamiento a utilizar.
 */
export function guardarDatos(clave, datos, almacenamiento = localStorage) {
  obtenerAlmacenamiento(almacenamiento).setItem(clave, JSON.stringify(datos));
}

/**
 * Exporta múltiples colecciones en un objeto JSON.
 * @param {Array<Object>} pacientes - Lista de pacientes.
 * @param {Array<Object>} medicos - Lista de médicos.
 * @param {Array<Object>} citas - Lista de citas.
 * @returns {string} String JSON con todas las colecciones.
 */
export function exportarJSON(pacientes, medicos, citas) {
  const datos = {
    pacientes,
    medicos,
    citas,
  };
  return JSON.stringify(datos);
}

/**
 * Importa colecciones desde un string JSON.
 * @param {string} json - String JSON con las colecciones.
 * @returns {Object} Objeto con propiedades pacientes, medicos, citas.
 * @throws {Error} Si el JSON no es válido.
 */
export function importarJSON(json) {
  try {
    return JSON.parse(json);
  } catch {
    throw new Error('El JSON no es válido.');
  }
}

/**
 * Obtiene datos del almacenamiento local.
 * @param {string} clave - Clave para recuperar los datos.
 * @param {Storage} almacenamiento - Almacenamiento a utilizar.
 * @returns {*} Datos deserializados, o null si no existen.
 */
export function obtenerDatos(clave, almacenamiento = localStorage) {
  const datos = obtenerAlmacenamiento(almacenamiento).getItem(clave);
  return datos ? JSON.parse(datos) : null;
}

/**
 * Elimina datos del almacenamiento local.
 * @param {string} clave - Clave de los datos a eliminar.
 * @param {Storage} almacenamiento - Almacenamiento a utilizar.
 */
export function eliminarDatos(clave, almacenamiento = localStorage) {
  obtenerAlmacenamiento(almacenamiento).removeItem(clave);
}
