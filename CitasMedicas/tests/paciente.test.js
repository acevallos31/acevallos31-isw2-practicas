// ============================================================
// PRUEBA UNITARIA 1 — TDD (RED)
// Entidad: Paciente
// Función: crearPaciente
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { crearPaciente, buscarPacientes, editarPaciente, eliminarPaciente } from '../src/paciente.js';

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

// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-04 — Editar paciente
// Función: editarPaciente
// Patrón AAA: Arrange - Act - Assert
// ============================================================

describe('editarPaciente', () => {
  test('debe editar los datos de un paciente existente', () => {
    // ARRANGE: Preparamos un paciente existente y los nuevos datos
    const paciente = { id: 'pac-1', nombre: 'Juan', apellidos: 'Pérez', dni: '12345678', telefono: '987654321', correo: 'juan@mail.com' };
    const nuevosDatos = { telefono: '999888777', correo: 'juan.nuevo@mail.com' };

    // ACT: Ejecutamos la función a probar
    const resultado = editarPaciente(paciente, nuevosDatos);

    // ASSERT: Verificamos que el paciente se editó correctamente
    expect(resultado.telefono).toBe('999888777');
    expect(resultado.correo).toBe('juan.nuevo@mail.com');
    expect(resultado.id).toBe('pac-1');
    expect(resultado.nombre).toBe('Juan');
  });
});

// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RF-05 — Eliminar paciente
// Función: eliminarPaciente
// Patrón AAA: Arrange - Act - Assert
// ============================================================

describe('eliminarPaciente', () => {
  test('debe eliminar un paciente de la lista', () => {
    // ARRANGE: Preparamos una lista de pacientes
    const pacientes = [
      { id: 'pac-1', nombre: 'Juan', dni: '12345678' },
      { id: 'pac-2', nombre: 'María', dni: '87654321' }
    ];

    // ACT: Ejecutamos la función a probar
    const resultado = eliminarPaciente(pacientes, 'pac-1');

    // ASSERT: Verificamos que el paciente fue eliminado
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe('pac-2');
  });

  test('debe lanzar error si el paciente no existe', () => {
    // ARRANGE: Preparamos una lista de pacientes
    const pacientes = [
      { id: 'pac-1', nombre: 'Juan', dni: '12345678' }
    ];

    // ACT: Ejecutamos la función a probar
    const eliminar = () => eliminarPaciente(pacientes, 'pac-999');

    // ASSERT: Verificamos que lanza un error
    expect(eliminar).toThrow('El paciente no existe.');
  });
});