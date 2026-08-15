// ============================================================
// Módulo: Almacenamiento local
// Responsabilidad: Persistir datos de la aplicación en localStorage.
// ============================================================

/**
 * Guarda datos serializados en el almacenamiento local.
 * @param {string} clave - Clave usada para almacenar los datos.
 * @param {*} datos - Datos que se guardarán como JSON.
 * @param {Storage} almacenamiento - Almacenamiento a utilizar.
 */
export function guardarDatos(clave, datos, almacenamiento = localStorage) {
  almacenamiento.setItem(clave, JSON.stringify(datos));
}
