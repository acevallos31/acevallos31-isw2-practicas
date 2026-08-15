// ============================================================
// Módulo: Paciente
// Fase TDD: REFACTOR — Mejora de código sin cambiar comportamiento
// Principio SOLID: SRP (Responsabilidad Única)
// ============================================================

import { validarCamposObligatorios } from './validacion.js';

/** Campos obligatorios para crear un paciente. */
const CAMPOS_OBLIGATORIOS = ['nombre', 'apellidos', 'dni', 'fechaNacimiento', 'telefono'];

/**
 * Crea un nuevo paciente con un id único.
 * @param {Object} datos - Datos del paciente.
 * @returns {Object} Paciente creado.
 * @throws {Error} Si faltan campos obligatorios.
 */
export function crearPaciente(datos) {
  validarCamposObligatorios(datos, CAMPOS_OBLIGATORIOS);

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

/**
 * Normaliza un texto para búsquedas (minúsculas y sin espacios).
 * @param {string} texto - Texto a normalizar.
 * @returns {string} Texto normalizado.
 */
function normalizarTexto(texto) {
  return String(texto).toLowerCase().trim();
}

/**
 * Busca pacientes por nombre o DNI.
 * @param {Array<Object>} pacientes - Lista de pacientes.
 * @param {string} criterio - Texto a buscar (nombre o DNI).
 * @returns {Array<Object>} Pacientes que coinciden con el criterio.
 */
export function buscarPacientes(pacientes, criterio) {
  const texto = normalizarTexto(criterio);

  return pacientes.filter(
    (paciente) =>
      normalizarTexto(paciente.nombre).includes(texto) ||
      normalizarTexto(paciente.apellidos).includes(texto) ||
      normalizarTexto(paciente.dni).includes(texto)
  );
}

/**
 * Edita los datos de un paciente existente.
 * @param {Object} paciente - Paciente a editar.
 * @param {Object} nuevosDatos - Nuevos datos del paciente.
 * @returns {Object} Paciente editado.
 */
export function editarPaciente(paciente, nuevosDatos) {
  return { ...paciente, ...nuevosDatos };
}