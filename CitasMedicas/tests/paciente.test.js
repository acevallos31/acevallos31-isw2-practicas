// ============================================================
// PRUEBA UNITARIA 1 — TDD (RED)
// Entidad: Paciente
// Función: crearPaciente
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { crearPaciente } from '../src/paciente.js';

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