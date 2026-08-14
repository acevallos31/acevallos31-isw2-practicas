// ============================================================
// Módulo: Cita
// Fase TDD: REFACTOR — Mejora de código sin cambiar comportamiento
// Principio SOLID: SRP (Responsabilidad Única)
// ============================================================

import {
  validarCamposObligatorios,
  validarFechaNoPasada,
  validarFormatoFecha,
  validarFormatoHora,
  validarConflictoHorario,
  validarEstadoCita,
  validarTransicionEstado
} from './validacion.js';

/** Campos obligatorios para crear una cita. */
const CAMPOS_OBLIGATORIOS = ['idPaciente', 'idMedico', 'fecha', 'hora', 'motivo'];

/** Estado inicial de una cita. */
const ESTADO_INICIAL = 'Pendiente';

/**
 * Crea una nueva cita con un id único.
 * @param {Object} datos - Datos de la cita.
 * @param {Array<Object>} citasExistentes - Lista de citas existentes.
 * @returns {Object} Cita creada.
 * @throws {Error} Si faltan campos, la fecha es pasada o hay conflicto de horario.
 */
export function crearCita(datos, citasExistentes) {
  validarCamposObligatorios(datos, CAMPOS_OBLIGATORIOS);
  validarFormatoFecha(datos.fecha);
  validarFormatoHora(datos.hora);
  validarFechaNoPasada(datos.fecha);
  validarConflictoHorario(datos, citasExistentes);

  return {
    id: crypto.randomUUID(),
    idPaciente: datos.idPaciente,
    idMedico: datos.idMedico,
    fecha: datos.fecha,
    hora: datos.hora,
    motivo: datos.motivo,
    estado: ESTADO_INICIAL
  };
}

/**
 * Cambia el estado de una cita validando la transición.
 * @param {Object} cita - Cita a modificar.
 * @param {string} nuevoEstado - Nuevo estado de la cita.
 * @returns {Object} Cita con el estado actualizado.
 * @throws {Error} Si el estado no es válido o la transición no está permitida.
 */
export function cambiarEstadoCita(cita, nuevoEstado) {
  validarEstadoCita(nuevoEstado);
  validarTransicionEstado(cita.estado, nuevoEstado);

  return { ...cita, estado: nuevoEstado };
}