// ============================================================
// PRUEBA UNITARIA 3 — TDD (RED)
// Requerimiento: RF-07 — Registro de Médico
// Función: crearMedico
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { crearMedico } from '../src/medico.js';

describe('crearMedico', () => {
  test('debe crear un médico válido con todos sus datos', () => {
    // ARRANGE: Preparamos los datos de entrada
    const datos = {
      nombre: 'Dra. Ana Torres',
      especialidad: 'Cardiología',
      colegiatura: 'CMP-12345',
      horarioInicio: '08:00',
      horarioFin: '17:00'
    };

    // ACT: Ejecutamos la función a probar
    const medico = crearMedico(datos);

    // ASSERT: Verificamos que el médico se creó correctamente
    expect(medico).toBeDefined();
    expect(medico.id).toBeDefined();
    expect(medico.nombre).toBe('Dra. Ana Torres');
    expect(medico.especialidad).toBe('Cardiología');
    expect(medico.colegiatura).toBe('CMP-12345');
    expect(medico.horarioInicio).toBe('08:00');
    expect(medico.horarioFin).toBe('17:00');
  });
});