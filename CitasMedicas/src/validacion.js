// ============================================================
// Módulo: Validación
// Principio SOLID: SRP (Responsabilidad Única)
// Este módulo se encarga únicamente de la validación de datos.
// ============================================================

/**
 * Valida que los campos obligatorios estén presentes y no vacíos.
 * @param {Object} datos - Objeto con los datos a validar.
 * @param {string[]} camposObligatorios - Lista de campos requeridos.
 * @throws {Error} Si falta un campo obligatorio.
 */
export function validarCamposObligatorios(datos, camposObligatorios) {
  for (const campo of camposObligatorios) {
    if (!datos[campo] || String(datos[campo]).trim() === '') {
      throw new Error(`El campo "${campo}" es obligatorio.`);
    }
  }
}