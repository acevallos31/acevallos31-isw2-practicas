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

/**
 * Valida que un DNI no esté duplicado en la lista de pacientes.
 * @param {string} dni - DNI a validar.
 * @param {Array<Object>} pacientes - Lista de pacientes existentes.
 * @returns {boolean} true si el DNI es único, false si está duplicado.
 */
export function validarDniUnico(dni, pacientes) {
  return !pacientes.some((paciente) => paciente.dni === dni);
}