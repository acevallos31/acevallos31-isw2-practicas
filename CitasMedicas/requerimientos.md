# Requerimientos — App de Citas Médicas (HTML Standalone)

> **Tipo de aplicación:** Aplicación web standalone en HTML/CSS/JavaScript (sin backend ni base de datos externa).
> **Alcance:** Gestión de citas médicas de forma local en el navegador.

---

## 1. Requerimientos Funcionales

### 1.1 Gestión de Pacientes
- RF-01: Registrar un nuevo paciente con nombre, apellidos, DNI, fecha de nacimiento, teléfono, correo y dirección.
- RF-02: Listar todos los pacientes registrados.
- RF-03: Buscar pacientes por nombre o DNI.
- RF-04: Editar los datos de un paciente existente.
- RF-05: Eliminar un paciente (con confirmación).
- RF-06: Validar que el DNI sea único y tenga formato válido.

### 1.2 Gestión de Médicos
- RF-07: Registrar un médico con nombre, especialidad, colegiatura y horario de atención.
- RF-08: Listar médicos y filtrar por especialidad.
- RF-09: Editar y eliminar médicos.

### 1.3 Gestión de Citas
- RF-10: Crear una cita seleccionando paciente, médico, fecha, hora y motivo.
- RF-11: Validar que no exista conflicto de horario (mismo médico y misma hora).
- RF-12: Listar citas con filtros por fecha, médico o estado.
- RF-13: Cambiar el estado de una cita (Pendiente, Confirmada, Completada, Cancelada).
- RF-14: Editar y cancelar citas.
- RF-15: Impedir agendar citas en fechas pasadas o en horarios fuera del rango del médico.

### 1.4 Persistencia Local
- RF-16: Guardar todos los datos en `localStorage` para que persistan al recargar la página.
- RF-17: Permitir exportar/importar los datos en formato JSON (respaldo).

### 1.5 Interfaz de Usuario
- RF-18: Interfaz en español, responsive (funciona en móvil y escritorio).
- RF-19: Navegación por pestañas o secciones: Pacientes, Médicos, Citas, Dashboard.
- RF-20: Mostrar confirmaciones y mensajes de error claros al usuario.

---

## 2. Requerimientos No Funcionales

- RNF-01: **Usabilidad:** Interfaz intuitiva, con formularios claros y validación en tiempo real.
- RNF-02: **Rendimiento:** La app debe cargar y responder de forma inmediata (sin llamadas de red).
- RNF-03: **Compatibilidad:** Funcionar en navegadores modernos (Chrome, Edge, Firefox, Safari).
- RNF-04: **Seguridad:** No almacenar contraseñas; sanitizar entradas para evitar inyección de HTML (XSS).
- RNF-05: **Mantenibilidad:** Código organizado en módulos (HTML, CSS, JS separados).
- RNF-06: **Disponibilidad:** Funcionar 100% offline al ser standalone.

---

## 3. Reglas de Negocio

- RN-01: Un paciente no puede tener dos citas a la misma hora con el mismo médico.
- RN-02: Una cita solo puede agendarse en el horario de atención del médico.
- RN-03: No se permiten citas en fechas pasadas.
- RN-04: El DNI del paciente debe ser único.
- RN-05: Una cita cancelada no puede volver a estado "Pendiente" o "Confirmada".

---

## 4. Entidades Principales

| Entidad  | Atributos clave |
|----------|-----------------|
| Paciente | id, nombre, apellidos, dni, fechaNacimiento, telefono, correo, direccion |
| Médico   | id, nombre, especialidad, colegiatura, horarioInicio, horarioFin |
| Cita     | id, idPaciente, idMedico, fecha, hora, motivo, estado |

---

## 5. Fuera de Alcance (v1)

- Autenticación de usuarios / roles.
- Conexión a base de datos o backend.
- Envío de recordatorios por correo/SMS.
- Facturación o pagos.
- Historial clínico completo.
