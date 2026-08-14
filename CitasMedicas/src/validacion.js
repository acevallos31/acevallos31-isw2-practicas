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
 * Normaliza un DNI eliminando espacios y convirtiendo a mayúsculas.
 * @param {string} dni - DNI a normalizar.
 * @returns {string} DNI normalizado.
 */
function normalizarDni(dni) {
  return String(dni).trim().toUpperCase();
}

/**
 * Valida que un DNI no esté duplicado en la lista de pacientes.
 * @param {string} dni - DNI a validar.
 * @param {Array<Object>} pacientes - Lista de pacientes existentes.
 * @returns {boolean} true si el DNI es único, false si está duplicado.
 * @throws {Error} Si el DNI o la lista de pacientes son inválidos.
 */
export function validarDniUnico(dni, pacientes) {
  if (!dni || String(dni).trim() === '') {
    throw new Error('El DNI es obligatorio.');
  }
  if (!Array.isArray(pacientes)) {
    throw new Error('La lista de pacientes es inválida.');
  }

  const dniNormalizado = normalizarDni(dni);
  return !pacientes.some((paciente) => normalizarDni(paciente.dni) === dniNormalizado);
}

/**
 * Valida que una hora tenga formato HH:MM.
 * @param {string} hora - Hora a validar.
 * @returns {boolean} true si el formato es válido.
 */
function esHoraValida(hora) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(hora);
}

/**
 * Valida el horario de atención de un médico.
 * @param {string} horarioInicio - Hora de inicio (HH:MM).
 * @param {string} horarioFin - Hora de fin (HH:MM).
 * @throws {Error} Si el formato es inválido o el inicio es posterior al fin.
 */
export function validarHorario(horarioInicio, horarioFin) {
  if (!esHoraValida(horarioInicio) || !esHoraValida(horarioFin)) {
    throw new Error('El horario debe tener formato HH:MM.');
  }
  if (horarioInicio >= horarioFin) {
    throw new Error('La hora de inicio debe ser anterior a la hora de fin.');
  }
}

/**
 * Valida que una fecha no sea anterior a hoy.
 * @param {string} fecha - Fecha en formato YYYY-MM-DD.
 * @throws {Error} Si la fecha es anterior a hoy.
 */
export function validarFechaNoPasada(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaCita = new Date(`${fecha}T00:00:00`);

  if (fechaCita < hoy) {
    throw new Error('La fecha de la cita no puede ser anterior a hoy.');
  }
}

/**
 * Valida que una fecha tenga formato YYYY-MM-DD.
 * @param {string} fecha - Fecha a validar.
 * @throws {Error} Si el formato es inválido.
 */
export function validarFormatoFecha(fecha) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    throw new Error('La fecha debe tener formato YYYY-MM-DD.');
  }
}

/**
 * Valida que una hora tenga formato HH:MM.
 * @param {string} hora - Hora a validar.
 * @throws {Error} Si el formato es inválido.
 */
export function validarFormatoHora(hora) {
  if (!esHoraValida(hora)) {
    throw new Error('La hora debe tener formato HH:MM.');
  }
}

/**
 * Valida que una hora esté dentro del horario de atención de un médico.
 * @param {string} hora - Hora de la cita (HH:MM).
 * @param {string} horarioInicio - Hora de inicio del médico (HH:MM).
 * @param {string} horarioFin - Hora de fin del médico (HH:MM).
 * @throws {Error} Si la hora está fuera del horario de atención.
 */
export function validarHoraEnHorario(hora, horarioInicio, horarioFin) {
  if (hora < horarioInicio || hora >= horarioFin) {
    throw new Error('La hora de la cita debe estar dentro del horario de atención del médico.');
  }
}

/**
 * Valida que no exista conflicto de horario para un médico o paciente.
 * @param {Object} datos - Datos de la cita (idPaciente, idMedico, fecha, hora).
 * @param {Array<Object>} citasExistentes - Lista de citas existentes.
 * @throws {Error} Si hay conflicto de horario.
 */
export function validarConflictoHorario(datos, citasExistentes) {
  const conflictoMedico = citasExistentes.some(
    (cita) =>
      cita.idMedico === datos.idMedico &&
      cita.fecha === datos.fecha &&
      cita.hora === datos.hora
  );
  if (conflictoMedico) {
    throw new Error('El médico ya tiene una cita en esa fecha y hora.');
  }

  const conflictoPaciente = citasExistentes.some(
    (cita) =>
      cita.idPaciente === datos.idPaciente &&
      cita.fecha === datos.fecha &&
      cita.hora === datos.hora
  );
  if (conflictoPaciente) {
    throw new Error('El paciente ya tiene una cita en esa fecha y hora.');
  }
}

/** Estados válidos para una cita médica. */
const ESTADOS_CITA = ['Pendiente', 'Confirmada', 'Completada', 'Cancelada'];

/**
 * Valida que un estado de cita sea válido.
 * @param {string} estado - Estado a validar.
 * @throws {Error} Si el estado no es válido.
 */
export function validarEstadoCita(estado) {
  if (!ESTADOS_CITA.includes(estado)) {
    throw new Error('Estado de cita no válido.');
  }
}

/**
 * Valida que una cita cancelada no pueda volver a Pendiente o Confirmada (RN-05).
 * @param {string} estadoActual - Estado actual de la cita.
 * @param {string} nuevoEstado - Nuevo estado deseado.
 * @throws {Error} Si la transición no está permitida.
 */
export function validarTransicionEstado(estadoActual, nuevoEstado) {
  if (estadoActual === 'Cancelada' && (nuevoEstado === 'Pendiente' || nuevoEstado === 'Confirmada')) {
    throw new Error('Una cita cancelada no puede volver a Pendiente o Confirmada.');
  }
}