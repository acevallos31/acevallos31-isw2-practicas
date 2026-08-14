// ============================================================
// PRUEBA UNITARIA 3 — TDD (RED)
// Requerimiento: RF-07 — Registro de Médico
// Función: crearMedico
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { crearMedico, editarMedico, eliminarMedico } from '../src/medico.js';

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

// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-09 — Editar y eliminar médicos
// Funciones: editarMedico, eliminarMedico
// Patrón AAA: Arrange - Act - Assert
// ============================================================

describe('editarMedico', () => {
  test('debe editar los datos de un médico existente', () => {
    // ARRANGE: Preparamos un médico existente y los nuevos datos
    const medico = { id: 'med-1', nombre: 'Dra. Ana Torres', especialidad: 'Cardiología', colegiatura: 'CMP-12345', horarioInicio: '08:00', horarioFin: '17:00' };
    const nuevosDatos = { especialidad: 'Dermatología', horarioFin: '18:00' };

    // ACT: Ejecutamos la función a probar
    const resultado = editarMedico(medico, nuevosDatos);

    // ASSERT: Verificamos que el médico se editó correctamente
    expect(resultado.especialidad).toBe('Dermatología');
    expect(resultado.horarioFin).toBe('18:00');
    expect(resultado.id).toBe('med-1');
    expect(resultado.nombre).toBe('Dra. Ana Torres');
  });

  test('debe rechazar la edición con un horario inválido', () => {
    // ARRANGE: Preparamos un médico y un horario inválido
    const medico = { id: 'med-1', nombre: 'Dra. Ana Torres', especialidad: 'Cardiología', colegiatura: 'CMP-12345', horarioInicio: '08:00', horarioFin: '17:00' };
    const nuevosDatos = { horarioInicio: '18:00', horarioFin: '09:00' };

    // ACT: Ejecutamos la función a probar
    const editar = () => editarMedico(medico, nuevosDatos);

    // ASSERT: Verificamos que lanza un error por horario inválido
    expect(editar).toThrow('La hora de inicio debe ser anterior a la hora de fin.');
  });
});

describe('eliminarMedico', () => {
  test('debe eliminar un médico de la lista', () => {
    // ARRANGE: Preparamos una lista de médicos
    const medicos = [
      { id: 'med-1', nombre: 'Dra. Ana Torres' },
      { id: 'med-2', nombre: 'Dr. Luis Pérez' }
    ];

    // ACT: Ejecutamos la función a probar
    const resultado = eliminarMedico(medicos, 'med-1');

    // ASSERT: Verificamos que el médico fue eliminado
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('med-2');
  });

  test('debe lanzar error si el médico no existe', () => {
    // ARRANGE: Preparamos una lista de médicos
    const medicos = [
      { id: 'med-1', nombre: 'Dra. Ana Torres' }
    ];

    // ACT: Ejecutamos la función a probar
    const eliminar = () => eliminarMedico(medicos, 'med-999');

    // ASSERT: Verificamos que lanza un error
    expect(eliminar).toThrow('El médico no existe.');
  });
});