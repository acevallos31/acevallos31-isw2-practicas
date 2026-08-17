// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-14 — Editar y cancelar citas
// Funciones: editarCita, cancelarCita
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { editarCita, cancelarCita } from '../src/cita.js';

describe('editarCita', () => {
  test('debe editar los datos de una cita existente', () => {
    // ARRANGE: Preparamos una cita existente y los nuevos datos
    const cita = { id: 'cita-1', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', hora: '10:00', motivo: 'Consulta', estado: 'Pendiente' };
    const nuevosDatos = { fecha: '2026-08-21', hora: '11:00', motivo: 'Control' };
    const citasExistentes = [];

    // ACT: Ejecutamos la función a probar
    const resultado = editarCita(cita, nuevosDatos, citasExistentes);

    // ASSERT: Verificamos que la cita se editó correctamente
    expect(resultado.fecha).toBe('2026-08-21');
    expect(resultado.hora).toBe('11:00');
    expect(resultado.motivo).toBe('Control');
    expect(resultado.id).toBe('cita-1');
  });

  test('debe rechazar la edición si hay conflicto de horario', () => {
    // ARRANGE: Preparamos una cita existente y otra que ocupa el horario
    const cita = { id: 'cita-1', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', hora: '10:00', motivo: 'Consulta', estado: 'Pendiente' };
    const nuevosDatos = { fecha: '2026-08-20', hora: '11:00', motivo: 'Control' };
    const citasExistentes = [
      { id: 'cita-2', idPaciente: 'pac-2', idMedico: 'med-1', fecha: '2026-08-20', hora: '11:00' }
    ];

    // ACT: Ejecutamos la función a probar
    const editar = () => editarCita(cita, nuevosDatos, citasExistentes);

    // ASSERT: Verificamos que lanza un error por conflicto
    expect(editar).toThrow('El médico ya tiene una cita en esa fecha y hora.');
  });
});

describe('cancelarCita', () => {
  test('debe cancelar una cita existente', () => {
    // ARRANGE: Preparamos una cita existente
    const cita = { id: 'cita-1', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', hora: '10:00', motivo: 'Consulta', estado: 'Pendiente' };

    // ACT: Ejecutamos la función a probar
    const resultado = cancelarCita(cita);

    // ASSERT: Verificamos que la cita quedó cancelada
    expect(resultado.estado).toBe('Cancelada');
  });

  test('debe registrar en auditoría la cancelación de una cita', () => {
    // ARRANGE: Preparamos una cita existente y el usuario que cancela
    const cita = { id: 'cita-1', idPaciente: 'pac-1', idMedico: 'med-1', fecha: '2026-08-20', hora: '10:00', motivo: 'Consulta', estado: 'Pendiente' };
    const usuario = 'admin';

    // ACT: Ejecutamos la función a probar
    const resultado = cancelarCita(cita, usuario);

    // ASSERT: Verificamos que se generó un registro de auditoría
    expect(resultado.auditoria).toBeDefined();
    expect(resultado.auditoria.accion).toBe('CANCELAR_CITA');
    expect(resultado.auditoria.usuario).toBe('admin');
    expect(resultado.auditoria.fecha).toBeDefined();
    expect(resultado.auditoria.citaId).toBe('cita-1');
  });
});