// ============================================================
// PRUEBA UNITARIA 1 — TDD (RED)
// Entidad: Paciente
// Función: crearPaciente
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { crearPaciente, buscarPacientes } from '../src/paciente.js';

describe('crearPaciente', () => {
  test('debe crear un paciente válido con todos sus datos', () => {
    // ARRANGE: Preparamos los datos de entrada
    const datos = {
      nombre: 'Juan',
      apellidos: 'Pérez Gómez',
      dni: '12345678',
      fechaNacimiento: '1990-05-15',
      telefono: '987654321',
      correo: 'juan.perez@mail.com',
      direccion: 'Av. Los Olivos 123'
    };

    // ACT: Ejecutamos la función a probar
    const paciente = crearPaciente(datos);

    // ASSERT: Verificamos que el paciente se creó correctamente
    expect(paciente).toBeDefined();
    expect(paciente.id).toBeDefined();
    expect(paciente.nombre).toBe('Juan');
    expect(paciente.apellidos).toBe('Pérez Gómez');
    expect(paciente.dni).toBe('12345678');
    expect(paciente.fechaNacimiento).toBe('1990-05-15');
    expect(paciente.telefono).toBe('987654321');
    expect(paciente.correo).toBe('juan.perez@mail.com');
    expect(paciente.direccion).toBe('Av. Los Olivos 123');
  });
});

// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-03 — Buscar pacientes por nombre o DNI
// Función: buscarPacientes
// Patrón AAA: Arrange - Act - Assert
// ============================================================

describe('buscarPacientes', () => {
  test('debe buscar pacientes por nombre', () => {
    // ARRANGE: Preparamos una lista de pacientes
    const pacientes = [
      { id: '1', nombre: 'Juan', apellidos: 'Pérez', dni: '12345678' },
      { id: '2', nombre: 'María', apellidos: 'Gómez', dni: '87654321' }
    ];

    // ACT: Ejecutamos la función a probar
    const resultado = buscarPacientes(pacientes, 'Juan');

    // ASSERT: Verificamos que encuentra al paciente por nombre
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('1');
  });

  test('debe buscar pacientes por DNI', () => {
    // ARRANGE: Preparamos una lista de pacientes
    const pacientes = [
      { id: '1', nombre: 'Juan', apellidos: 'Pérez', dni: '12345678' },
      { id: '2', nombre: 'María', apellidos: 'Gómez', dni: '87654321' }
    ];

    // ACT: Ejecutamos la función a probar
    const resultado = buscarPacientes(pacientes, '87654321');

    // ASSERT: Verificamos que encuentra al paciente por DNI
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('2');
  });

  test('debe devolver lista vacía si no hay coincidencias', () => {
    // ARRANGE: Preparamos una lista de pacientes
    const pacientes = [
      { id: '1', nombre: 'Juan', apellidos: 'Pérez', dni: '12345678' }
    ];

    // ACT: Ejecutamos la función a probar
    const resultado = buscarPacientes(pacientes, 'Inexistente');

    // ASSERT: Verificamos que devuelve lista vacía
    expect(resultado.length).toBe(0);
  });
});