// ============================================================
// Módulo: Médico
// Fase TDD: REFACTOR — Mejora de código sin cambiar comportamiento
// Principio SOLID: SRP (Responsabilidad Única)
// ============================================================

import { validarCamposObligatorios, validarHorario, validarDiasAtencion, normalizarDiasAtencion } from './validacion.js';

/** Campos obligatorios para crear un médico. */
const CAMPOS_OBLIGATORIOS = ['nombre', 'especialidad', 'colegiatura', 'horarioInicio', 'horarioFin'];

/**
 * Crea un nuevo médico con un id único.
 * @param {Object} datos - Datos del médico.
 * @returns {Object} Médico creado.
 * @throws {Error} Si faltan campos obligatorios o el horario es inválido.
 */
export function crearMedico(datos) {
  validarCamposObligatorios(datos, CAMPOS_OBLIGATORIOS);
  validarHorario(datos.horarioInicio, datos.horarioFin);

  return {
    id: crypto.randomUUID(),
    nombre: datos.nombre,
    especialidad: datos.especialidad,
    colegiatura: datos.colegiatura,
    horarioInicio: datos.horarioInicio,
    horarioFin: datos.horarioFin
  };
}

/**
 * Asigna días de atención a un médico.
 * @param {Object} medico - Médico al que asignar los días.
 * @param {string[]} dias - Lista de días de atención.
 * @returns {Object} Médico con los días de atención asignados.
 * @throws {Error} Si algún día no es válido.
 */
export function asignarTurnos(medico, dias) {
  if (!medico || !medico.id) {
    throw new Error('El médico no es válido.');
  }

  validarDiasAtencion(dias);
  const diasSinDuplicados = normalizarDiasAtencion(dias);

  return { ...medico, diasAtencion: diasSinDuplicados };
}