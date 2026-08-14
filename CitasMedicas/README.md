# Aplicación Web de Agendamiento de Citas Médicas

## 1. Descripción General

Aplicación web (HTML, CSS y JavaScript) que permite a los pacientes agendar, consultar y gestionar citas médicas de forma sencilla e intuitiva. La aplicación funciona 100% en el navegador (sin backend), almacenando los datos localmente mediante `localStorage`.

El desarrollo se realiza aplicando la metodología **TDD** (Test-Driven Development) con el patrón **AAA** (Arrange-Act-Assert), garantizando que cada funcionalidad esté respaldada por pruebas unitarias.

---

## 2. Objetivos

- Permitir el registro de pacientes.
- Permitir agendar citas médicas seleccionando especialidad, médico, fecha y hora.
- Mostrar un listado de citas agendadas.
- Permitir cancelar o eliminar citas.
- Validar que no existan citas duplicadas (mismo médico, fecha y hora).
- Guardar la información de forma persistente en el navegador (LocalStorage).

---

## 3. Funcionalidades

### 3.1 Gestión de Pacientes
- Registrar un nuevo paciente con nombre, apellidos, DNI, fecha de nacimiento, teléfono, correo y dirección.
- Listar, buscar, editar y eliminar pacientes.
- Validación de campos obligatorios y DNI único.

### 3.2 Gestión de Médicos
- Registrar médicos con nombre, especialidad, colegiatura y horario de atención.
- Listar médicos y filtrar por especialidad.

### 3.3 Gestión de Citas
- Crear una cita seleccionando paciente, médico, fecha, hora y motivo.
- Validación de conflictos de horario (mismo médico, fecha y hora).
- Cambiar el estado de una cita (Pendiente, Confirmada, Completada, Cancelada).
- Editar y cancelar citas.

### 3.4 Persistencia Local
- Guardar todos los datos en `localStorage`.
- Exportar e importar datos en formato JSON (respaldo).

---

## 4. Requerimientos

La lista completa de requerimientos funcionales y no funcionales se encuentra en [requerimientos.md](./requerimientos.md).

---

## 5. Tecnologías

- **HTML5** — Estructura de la interfaz.
- **CSS3** — Estilos y diseño responsive.
- **JavaScript (ES Modules)** — Lógica de la aplicación.
- **Jest** — Framework de pruebas unitarias.
- **Node.js** — Entorno de ejecución para las pruebas.

---

## 6. Estructura del Proyecto

```
CitasMedicas/
├── src/          # Código fuente (implementación)
├── tests/        # Pruebas unitarias (Jest)
├── package.json
├── requerimientos.md
└── README.md
```

---

## 7. Instalación y Ejecución

### Requisitos
- Node.js >= 22
- npm

### Instalación
```bash
npm install
```

### Ejecutar pruebas
```bash
npm test
```

---

## 8. Metodología de Desarrollo (TDD)

Cada funcionalidad se desarrolla siguiendo el ciclo **Rojo - Verde - Refactor**:

1. **RED (Rojo):** Se escribe una prueba unitaria que falla.
2. **GREEN (Verde):** Se implementa el código mínimo para que la prueba pase.
3. **REFACTOR:** Se mejora el código sin cambiar su comportamiento.

Cada fase se documenta en un commit con mensaje descriptivo.

### Patrón AAA

Cada prueba unitaria sigue el patrón AAA:

- **Arrange:** Se preparan los datos de entrada.
- **Act:** Se ejecuta la función a probar.
- **Assert:** Se verifican los resultados esperados.

---

## 9. Estado del Proyecto

| Requerimiento | Funcionalidad | Estado |
|---------------|---------------|--------|
| RF-01 | `crearPaciente` | ✅ Completado |
| RF-06 | `validarDniUnico` | ✅ Completado |
| RF-07 | `crearMedico` | ✅ Completado |
| RF-10 | `crearCita` | ✅ Completado |
| RF-13 | `cambiarEstadoCita` | ✅ Completado |
| Turnos | `asignarTurnos` | ✅ Completado |
| Bloqueo | `bloquearHorario` | ✅ Completado |
| Agenda | `obtenerDisponibilidad` | ✅ Completado |
| RF-14 | `editarCita` / `cancelarCita` | ✅ Completado |
| RF-12 | `listarCitas` | ✅ Completado |
| RF-09 | `editarMedico` / `eliminarMedico` | ✅ Completado |

**Pruebas unitarias:** 32 passed, 8 suites

### Archivos de prueba (patrón AAA)

| Archivo | Funcionalidad cubierta |
|---------|------------------------|
| `tests/paciente.test.js` | `crearPaciente` |
| `tests/dniUnico.test.js` | `validarDniUnico` |
| `tests/medico.test.js` | `crearMedico` |
| `tests/cita.test.js` | `crearCita` |
| `tests/cambiarEstado.test.js` | `cambiarEstadoCita` |
| `tests/turnos.test.js` | `asignarTurnos` |