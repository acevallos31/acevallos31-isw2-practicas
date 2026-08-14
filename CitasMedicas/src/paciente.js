// ============================================================
// Módulo: Paciente
// Fase TDD: GREEN — Implementación mínima para pasar la prueba
// ============================================================

/**
 * Crea un nuevo paciente con un id único.
 * @param {Object} datos - Datos del paciente.
 * @returns {Object} Paciente creado.
 */
export function crearPaciente(datos) {
  return {
    id: crypto.randomUUID(),
    nombre: datos.nombre,
    apellidos: datos.apellidos,
    dni: datos.dni,
    fechaNacimiento: datos.fechaNacimiento,
    telefono: datos.telefono,
    correo: datos.correo,
    direccion: datos.direccion
  };
}