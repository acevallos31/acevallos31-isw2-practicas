// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Funcionalidad: Selector de pacientes para agendar citas
// Función: crearOpcionesPacientes
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { crearOpcionesPacientes } from '../src/selectores.js';

describe('crearOpcionesPacientes', () => {
  test('debe crear una opción por cada paciente registrado', () => {
    // ARRANGE: Preparamos pacientes disponibles
    const pacientes = [
      { id: 'pac-1', nombre: 'Ana', apellidos: 'López' },
      { id: 'pac-2', nombre: 'Luis', apellidos: 'Pérez' }
    ];

    // ACT: Creamos las opciones del selector
    const opciones = crearOpcionesPacientes(pacientes);

    // ASSERT: Verificamos que ambos pacientes pueden seleccionarse
    expect(opciones).toContain('<option value="pac-1">Ana López</option>');
    expect(opciones).toContain('<option value="pac-2">Luis Pérez</option>');
  });
});
