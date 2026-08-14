// ============================================================
// Módulo: Médico
// Fase TDD: GREEN — Implementación mínima para pasar la prueba
// Principio SOLID: SRP (Responsabilidad Única)
// ============================================================

import { validarCamposObligatorios } from './validacion.js';

/** Campos obligatorios para crear un médico. */
const CAMPOS_OBLIGATORIOS = ['nombre', 'especialidad', 'colegiatura', 'horarioInicio', 'horarioFin'];

/**
 * Crea un nuevo médico con un id único.
 * @param {Object} datos - Datos del médico.
 * @returns {Object} Médico creado.
 * @throws {Error} Si faltan campos obligatorios.
 */
export function crearMedico(datos) {
  validarCamposObligatorios(datos, CAMPOS_OBLIGATORIOS);

  return {
    id: crypto.randomUUID(),
    nombre: datos.nombre,
    especialidad: datos.especialidad,
    colegiatura: datos.colegiatura,
    horarioInicio: datos.horarioInicio,
    horarioFin: datos.horarioFin
  };
}