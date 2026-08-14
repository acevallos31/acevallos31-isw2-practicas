// ============================================================
// PRUEBA UNITARIA 4 — TDD (RED)
// Requerimiento: RF-10 — Crear Cita
// Función: crearCita
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { crearCita } from '../src/cita.js';

describe('crearCita', () => {
  test('debe crear una cita válida con todos sus datos', () => {
    // ARRANGE: Preparamos los datos de entrada
    const datos = {
      idPaciente: 'pac-1',
      idMedico: 'med-1',
      fecha: '2026-08-20',
      hora: '10:00',
      motivo: 'Consulta de control'
    };
    const citasExistentes = [];

    // ACT: Ejecutamos la función a probar
    const cita = crearCita(datos, citasExistentes);

    // ASSERT: Verificamos que la cita se creó correctamente
    expect(cita).toBeDefined();
    expect(cita.id).toBeDefined();
    expect(cita.idPaciente).toBe('pac-1');
    expect(cita.idMedico).toBe('med-1');
    expect(cita.fecha).toBe('2026-08-20');
    expect(cita.hora).toBe('10:00');
    expect(cita.motivo).toBe('Consulta de control');
    expect(cita.estado).toBe('Pendiente');
  });

  test('debe rechazar una cita en una fecha pasada', () => {
    // ARRANGE: Preparamos una cita con fecha pasada
    const datos = {
      idPaciente: 'pac-1',
      idMedico: 'med-1',
      fecha: '2020-01-01',
      hora: '10:00',
      motivo: 'Consulta'
    };
    const citasExistentes = [];

    // ACT: Ejecutamos la función a probar
    const crear = () => crearCita(datos, citasExistentes);

    // ASSERT: Verificamos que lanza un error por fecha pasada
    expect(crear).toThrow('La fecha de la cita no puede ser anterior a hoy.');
  });

  test('debe rechazar una cita cuando el médico ya tiene una cita a la misma hora y fecha', () => {
    // ARRANGE: Preparamos una cita existente del mismo médico en la misma fecha y hora
    const datos = {
      idPaciente: 'pac-2',
      idMedico: 'med-1',
      fecha: '2026-08-20',
      hora: '10:00',
      motivo: 'Consulta'
    };
    const citasExistentes = [
      { id: 'cita-1', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', hora: '10:00' }
    ];

    // ACT: Ejecutamos la función a probar
    const crear = () => crearCita(datos, citasExistentes);

    // ASSERT: Verificamos que lanza un error por conflicto de horario del médico
    expect(crear).toThrow('El médico ya tiene una cita en esa fecha y hora.');
  });

  test('debe rechazar una cita cuando el paciente ya tiene una cita el mismo día a la misma hora', () => {
    // ARRANGE: Preparamos una cita existente del mismo paciente en la misma fecha y hora
    const datos = {
      idPaciente: 'pac-1',
      idMedico: 'med-2',
      fecha: '2026-08-20',
      hora: '10:00',
      motivo: 'Consulta'
    };
    const citasExistentes = [
      { id: 'cita-1', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', hora: '10:00' }
    ];

    // ACT: Ejecutamos la función a probar
    const crear = () => crearCita(datos, citasExistentes);

    // ASSERT: Verificamos que lanza un error por conflicto de horario del paciente
    expect(crear).toThrow('El paciente ya tiene una cita en esa fecha y hora.');
  });
});