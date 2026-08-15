// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-16 — Persistencia local
// Función: guardarDatos
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { jest } from '@jest/globals';
import { guardarDatos } from '../src/almacenamiento.js';

describe('guardarDatos', () => {
  test('debe guardar una colección serializada en el almacenamiento local', () => {
    // ARRANGE: Preparamos datos y un almacenamiento simulado
    const pacientes = [{ id: 'pac-1', nombre: 'Juan' }];
    const almacenamiento = { setItem: jest.fn() };

    // ACT: Ejecutamos la función a probar
    guardarDatos('pacientes', pacientes, almacenamiento);

    // ASSERT: Verificamos que guarda los datos como JSON
    expect(almacenamiento.setItem).toHaveBeenCalledWith('pacientes', JSON.stringify(pacientes));
  });
});
