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
