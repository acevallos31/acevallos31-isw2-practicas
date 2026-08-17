// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-15 — Validar horario de atención del médico
// Función: crearCita
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { crearCita } from '../src/cita.js';

describe('crearCita con horario de atención', () => {
  test('debe rechazar una cita fuera del horario de atención del médico', () => {
    // ARRANGE: Preparamos una cita fuera del rango de atención
    const datos = {
      idPaciente: 'pac-1',
      idMedico: 'med-1',
      fecha: '2026-08-20',
      hora: '18:00',
      motivo: 'Consulta'
    };
    const medico = {
      id: 'med-1',
      horarioInicio: '08:00',
      horarioFin: '17:00'
    };

    // ACT: Ejecutamos la función a probar
    const crear = () => crearCita(datos, [], medico);

    // ASSERT: Verificamos que se rechaza el horario no disponible
    expect(crear).toThrow('La hora de la cita debe estar dentro del horario de atención del médico.');
  });
});
