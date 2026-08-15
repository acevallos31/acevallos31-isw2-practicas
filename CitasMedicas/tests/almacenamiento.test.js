// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-16 — Persistencia local
// Función: guardarDatos
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { jest } from '@jest/globals';
import { guardarDatos, exportarJSON, importarJSON } from '../src/almacenamiento.js';

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

// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-17 — Exportar/Importar datos en JSON
// Funciones: exportarJSON, importarJSON
// Patrón AAA: Arrange - Act - Assert
// ============================================================

describe('exportarJSON', () => {
  test('debe exportar todas las colecciones en un objeto JSON válido', () => {
    // ARRANGE: Preparamos datos de múltiples colecciones
    const pacientes = [{ id: 'pac-1', nombre: 'Juan' }];
    const medicos = [{ id: 'med-1', especialidad: 'Cardiología' }];
    const citas = [{ id: 'cita-1', estado: 'Pendiente' }];

    // ACT: Ejecutamos la función a probar
    const json = exportarJSON(pacientes, medicos, citas);

    // ASSERT: Verificamos que la exportación es válida
    expect(json).toBeDefined();
    expect(typeof json).toBe('string');
    
    const datos = JSON.parse(json);
    expect(datos.pacientes).toEqual(pacientes);
    expect(datos.medicos).toEqual(medicos);
    expect(datos.citas).toEqual(citas);
  });
});

describe('importarJSON', () => {
  test('debe importar las colecciones desde un string JSON válido', () => {
    // ARRANGE: Preparamos un JSON con datos
    const pacientes = [{ id: 'pac-1', nombre: 'Juan' }];
    const medicos = [{ id: 'med-1', especialidad: 'Cardiología' }];
    const citas = [{ id: 'cita-1', estado: 'Pendiente' }];
    const json = JSON.stringify({ pacientes, medicos, citas });

    // ACT: Ejecutamos la función a probar
    const resultado = importarJSON(json);

    // ASSERT: Verificamos que restaura correctamente las colecciones
    expect(resultado).toBeDefined();
    expect(resultado.pacientes).toEqual(pacientes);
    expect(resultado.medicos).toEqual(medicos);
    expect(resultado.citas).toEqual(citas);
  });

  test('debe lanzar un error si el JSON es inválido', () => {
    // ARRANGE: Preparamos un JSON inválido
    const jsonInvalido = '{no es json válido}';

    // ACT y ASSERT: Verificamos que lanza error
    expect(() => importarJSON(jsonInvalido)).toThrow('El JSON no es válido.');
  });
});
