// ============================================================
// Módulo: Médico
// Fase TDD: REFACTOR — Mejora de código sin cambiar comportamiento
// Principio SOLID: SRP (Responsabilidad Única)
// ============================================================

import { validarCamposObligatorios, validarHorario, validarDiasAtencion, normalizarDiasAtencion, validarBloqueoEnHorario, validarMedico } from './validacion.js';

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
  validarMedico(medico);

  validarDiasAtencion(dias);
  const diasSinDuplicados = normalizarDiasAtencion(dias);

  return { ...medico, diasAtencion: diasSinDuplicados };
}

/**
 * Agrega un bloqueo de horario a un médico.
 * @param {Object} medico - Médico al que agregar el bloqueo.
 * @param {Object} bloqueo - Datos del bloqueo (fecha, horaInicio, horaFin, motivo).
 * @returns {Object} Médico con el bloqueo agregado.
 * @throws {Error} Si el bloqueo está fuera del horario de atención.
 */
export function bloquearHorario(medico, bloqueo) {
  validarMedico(medico);

  validarBloqueoEnHorario(bloqueo, medico.horarioInicio, medico.horarioFin);

  const bloqueos = [...(medico.bloqueos || []), { ...bloqueo }];

  return { ...medico, bloqueos };
}

/**
 * Genera los slots de horarios disponibles de un médico.
 * @param {Object} medico - Médico del que obtener disponibilidad.
 * @param {Array<Object>} citas - Lista de citas existentes.
 * @param {number} duracionMin - Duración de cada slot en minutos.
 * @returns {string[]} Lista de horas disponibles (HH:MM).
 */
export function obtenerDisponibilidad(medico, citas, duracionMin) {
  validarMedico(medico);

  const slots = [];
  const [horaInicio, minInicio] = medico.horarioInicio.split(':').map(Number);
  const [horaFin, minFin] = medico.horarioFin.split(':').map(Number);

  const inicioMin = horaInicio * 60 + minInicio;
  const finMin = horaFin * 60 + minFin;

  const horasOcupadas = citas
    .filter((cita) => cita.idMedico === medico.id)
    .map((cita) => cita.hora);

  const horasBloqueadas = (medico.bloqueos || []).map((bloqueo) => bloqueo.horaInicio);

  for (let t = inicioMin; t < finMin; t += duracionMin) {
    const hora = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
    if (!horasOcupadas.includes(hora) && !horasBloqueadas.includes(hora)) {
      slots.push(hora);
    }
  }

  return slots;
}