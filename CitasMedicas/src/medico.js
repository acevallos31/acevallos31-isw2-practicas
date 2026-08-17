// ============================================================
// Módulo: Médico
// Fase TDD: REFACTOR — Mejora de código sin cambiar comportamiento
// Principio SOLID: SRP (Responsabilidad Única)
// ============================================================

import { validarCamposObligatorios, validarHorario, validarDiasAtencion, normalizarDiasAtencion, validarBloqueoEnHorario, validarMedico, validarExistencia } from './validacion.js';

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
 * Convierte una hora HH:MM a minutos desde medianoche.
 * @param {string} hora - Hora en formato HH:MM.
 * @returns {number} Minutos desde medianoche.
 */
function horaAMinutos(hora) {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Convierte minutos desde medianoche a formato HH:MM.
 * @param {number} minutos - Minutos desde medianoche.
 * @returns {string} Hora en formato HH:MM.
 */
function minutosAHora(minutos) {
  const h = String(Math.floor(minutos / 60)).padStart(2, '0');
  const m = String(minutos % 60).padStart(2, '0');
  return `${h}:${m}`;
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

  const inicioMin = horaAMinutos(medico.horarioInicio);
  const finMin = horaAMinutos(medico.horarioFin);

  const horasOcupadas = citas
    .filter((cita) => cita.idMedico === medico.id)
    .map((cita) => cita.hora);

  const horasBloqueadas = (medico.bloqueos || []).map((bloqueo) => bloqueo.horaInicio);

  const slots = [];
  for (let t = inicioMin; t < finMin; t += duracionMin) {
    const hora = minutosAHora(t);
    if (!horasOcupadas.includes(hora) && !horasBloqueadas.includes(hora)) {
      slots.push(hora);
    }
  }

  return slots;
}

/**
 * Edita los datos de un médico existente.
 * @param {Object} medico - Médico a editar.
 * @param {Object} nuevosDatos - Nuevos datos del médico.
 * @returns {Object} Médico editado.
 * @throws {Error} Si el horario es inválido.
 */
export function editarMedico(medico, nuevosDatos) {
  validarMedico(medico);

  const datosEditados = { ...medico, ...nuevosDatos };
  validarHorario(datosEditados.horarioInicio, datosEditados.horarioFin);

  return datosEditados;
}

/**
 * Elimina un médico de la lista.
 * @param {Array<Object>} medicos - Lista de médicos.
 * @param {string} id - Identificador del médico a eliminar.
 * @returns {Array<Object>} Lista de médicos sin el eliminado.
 * @throws {Error} Si el médico no existe.
 */
export function eliminarMedico(medicos, id) {
  validarExistencia(medicos, id, 'médico');

  return medicos.filter((medico) => medico.id !== id);
}

/**
 * Lista los médicos aplicando filtros opcionales.
 * @param {Array<Object>} medicos - Lista de médicos.
 * @param {Object} filtros - Filtros a aplicar (especialidad, etc.).
 * @returns {Array<Object>} Médicos que cumplen los filtros.
 */
export function listarMedicos(medicos, filtros = {}) {
  const filtrosActivos = Object.entries(filtros).filter(([, valor]) => valor);

  return medicos.filter((medico) =>
    filtrosActivos.every(([campo, valor]) => medico[campo] === valor)
  );
}
