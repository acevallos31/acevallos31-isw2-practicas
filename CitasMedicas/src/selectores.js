// ============================================================
// Módulo: Selectores de interfaz
// Responsabilidad: Generar opciones seguras para formularios.
// ============================================================

import { escaparHTML } from './sanitizacion.js';

/**
 * Crea las opciones del selector de pacientes.
 * @param {Array<Object>} pacientes - Pacientes registrados.
 * @returns {string} Opciones HTML del selector.
 */
export function crearOpcionesPacientes(pacientes) {
  return pacientes
    .map((paciente) =>
      `<option value="${escaparHTML(paciente.id)}">${escaparHTML(paciente.nombre)} ${escaparHTML(paciente.apellidos)}</option>`
    )
    .join('');
}
