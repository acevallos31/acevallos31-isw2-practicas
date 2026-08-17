// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-12 — Listar citas con filtros
// Función: listarCitas
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { listarCitas } from '../src/cita.js';

describe('listarCitas', () => {
  test('debe listar todas las citas sin filtros', () => {
    // ARRANGE: Preparamos una lista de citas
    const citas = [
      { id: 'cita-1', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Pendiente' },
      { id: 'cita-2', idMedico: 'med-2', fecha: '2026-08-21', estado: 'Confirmada' }
    ];

    // ACT: Ejecutamos la función a probar
    const resultado = listarCitas(citas);

    // ASSERT: Verificamos que devuelve todas las citas
    expect(resultado.length).toBe(2);
  });

  test('debe filtrar citas por fecha', () => {
    // ARRANGE: Preparamos citas con diferentes fechas
    const citas = [
      { id: 'cita-1', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Pendiente' },
      { id: 'cita-2', idMedico: 'med-2', fecha: '2026-08-21', estado: 'Confirmada' }
    ];
    const filtros = { fecha: '2026-08-20' };

    // ACT: Ejecutamos la función a probar
    const resultado = listarCitas(citas, filtros);

    // ASSERT: Verificamos que solo devuelve las citas de esa fecha
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('cita-1');
  });

  test('debe filtrar citas por médico', () => {
    // ARRANGE: Preparamos citas con diferentes médicos
    const citas = [
      { id: 'cita-1', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Pendiente' },
      { id: 'cita-2', idMedico: 'med-2', fecha: '2026-08-21', estado: 'Confirmada' }
    ];
    const filtros = { idMedico: 'med-2' };

    // ACT: Ejecutamos la función a probar
    const resultado = listarCitas(citas, filtros);

    // ASSERT: Verificamos que solo devuelve las citas de ese médico
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('cita-2');
  });

  test('debe filtrar citas por estado', () => {
    // ARRANGE: Preparamos citas con diferentes estados
    const citas = [
      { id: 'cita-1', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Pendiente' },
      { id: 'cita-2', idMedico: 'med-2', fecha: '2026-08-21', estado: 'Confirmada' }
    ];
    const filtros = { estado: 'Confirmada' };

    // ACT: Ejecutamos la función a probar
    const resultado = listarCitas(citas, filtros);

    // ASSERT: Verificamos que solo devuelve las citas con ese estado
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('cita-2');
  });

  test('debe filtrar citas por paciente', () => {
    // ARRANGE: Preparamos citas con diferentes pacientes
    const citas = [
      { id: 'cita-1', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Pendiente' },
      { id: 'cita-2', idPaciente: 'pac-2', idMedico: 'med-2', fecha: '2026-08-21', estado: 'Confirmada' }
    ];
    const filtros = { idPaciente: 'pac-2' };

    // ACT: Ejecutamos la función a probar
    const resultado = listarCitas(citas, filtros);

    // ASSERT: Verificamos que solo devuelve las citas de ese paciente
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('cita-2');
  });

  test('debe aplicar varios filtros a la vez', () => {
    // ARRANGE: Preparamos citas y aplicamos múltiples filtros
    const citas = [
      { id: 'cita-1', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Pendiente' },
      { id: 'cita-2', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Confirmada' },
      { id: 'cita-3', idPaciente: 'pac-2', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Pendiente' }
    ];
    const filtros = { idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', estado: 'Pendiente' };

    // ACT: Ejecutamos la función a probar
    const resultado = listarCitas(citas, filtros);

    // ASSERT: Verificamos que solo devuelve la cita que cumple todos los filtros
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('cita-1');
  });
});