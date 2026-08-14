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