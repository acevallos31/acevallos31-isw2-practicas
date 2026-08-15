// ============================================================
// APP.JS — Lógica de interfaz de usuario
// Conecta formularios y eventos con funciones del backend
// ============================================================

// IMPORTAR FUNCIONES DEL BACKEND
import { crearPaciente, buscarPacientes, editarPaciente, eliminarPaciente, listarPacientes } from './src/paciente.js';
import { crearMedico, editarMedico, eliminarMedico, listarMedicos, asignarTurnos, bloquearHorario, obtenerDisponibilidad } from './src/medico.js';
import { crearCita, editarCita, cancelarCita, listarCitas, cambiarEstadoCita } from './src/cita.js';
import { guardarDatos, obtenerDatos, eliminarDatos, exportarJSON, importarJSON } from './src/almacenamiento.js';

// ============================================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ============================================================

let estadoApp = {
  pacientes: [],
  medicos: [],
  citas: [],
  editandoPaciente: null,
  editandoMedico: null,
  editandoCita: null,
};

// ============================================================
// FUNCIONES DE INICIALIZACIÓN
// ============================================================

/**
 * Inicia la aplicación al cargar
 */
function inicializarApp() {
  cargarDatos();
  configurarEventos();
  actualizarEstadisticas();
  renderizarPacientes();
  renderizarMedicos();
  renderizarCitas();
}

/**
 * Carga los datos desde localStorage
 */
function cargarDatos() {
  const datosGuardados = obtenerDatos('citasMedicas');
  if (datosGuardados) {
    estadoApp.pacientes = datosGuardados.pacientes || [];
    estadoApp.medicos = datosGuardados.medicos || [];
    estadoApp.citas = datosGuardados.citas || [];
  }
}

/**
 * Guarda los datos en localStorage
 */
function guardarEnLocal() {
  guardarDatos('citasMedicas', {
    pacientes: estadoApp.pacientes,
    medicos: estadoApp.medicos,
    citas: estadoApp.citas,
  });
}

// ============================================================
// NAVEGACIÓN DE PESTAÑAS
// ============================================================

/**
 * Cambia la pestaña activa
 */
function cambiarPestana(seccion) {
  // Ocultar todas las secciones
  document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
  
  // Desactivar todos los botones
  document.querySelectorAll('.pestana').forEach(p => p.classList.remove('activa'));
  
  // Mostrar la sección seleccionada
  const elemento = document.getElementById(seccion);
  if (elemento) {
    elemento.classList.add('activa');
  }
  
  // Activar el botón correspondiente
  const boton = document.querySelector(`[data-seccion="${seccion}"]`);
  if (boton) {
    boton.classList.add('activa');
  }
}

/**
 * Ir a una pestaña (función para botones)
 */
window.irAPestana = function(seccion) {
  cambiarPestana(seccion);
};

// ============================================================
// GESTIÓN DE MENSAJES
// ============================================================

/**
 * Muestra un mensaje al usuario
 */
function mostrarMensaje(texto, tipo = 'info', duracion = 3000) {
  const contenedor = document.getElementById('contenedor-mensajes');
  const mensaje = document.createElement('div');
  mensaje.className = `mensaje mensaje-${tipo}`;
  mensaje.textContent = texto;
  
  contenedor.appendChild(mensaje);
  
  setTimeout(() => {
    mensaje.classList.add('eliminar');
    setTimeout(() => mensaje.remove(), 300);
  }, duracion);
}

// ============================================================
// MODAL DE CONFIRMACIÓN
// ============================================================

/**
 * Muestra un modal de confirmación
 */
function mostrarConfirmacion(titulo, mensaje, callback) {
  const modal = document.getElementById('modal-confirmacion');
  document.getElementById('modal-titulo').textContent = titulo;
  document.getElementById('modal-mensaje').textContent = mensaje;
  
  const btnConfirmar = document.getElementById('modal-confirmar');
  const btnCancelar = document.getElementById('modal-cancelar');
  
  const aceptar = () => {
    modal.classList.remove('activo');
    btnConfirmar.removeEventListener('click', aceptar);
    btnCancelar.removeEventListener('click', cancelar);
    callback(true);
  };
  
  const cancelar = () => {
    modal.classList.remove('activo');
    btnConfirmar.removeEventListener('click', aceptar);
    btnCancelar.removeEventListener('click', cancelar);
    callback(false);
  };
  
  btnConfirmar.addEventListener('click', aceptar);
  btnCancelar.addEventListener('click', cancelar);
  
  modal.classList.add('activo');
}

// ============================================================
// GESTIÓN DE PACIENTES
// ============================================================

/**
 * Maneja el envío del formulario de pacientes
 */
function configurarFormularioPaciente() {
  const formulario = document.getElementById('formulario-paciente');
  
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
      const datos = {
        nombre: document.getElementById('pac-nombre').value,
        apellidos: document.getElementById('pac-apellidos').value,
        dni: document.getElementById('pac-dni').value,
        fechaNacimiento: document.getElementById('pac-fecha-nacimiento').value,
        telefono: document.getElementById('pac-telefono').value,
        correo: document.getElementById('pac-correo').value,
        direccion: document.getElementById('pac-direccion').value,
      };
      
      if (estadoApp.editandoPaciente) {
        // Editar paciente
        const pacienteActualizado = editarPaciente(estadoApp.editandoPaciente, datos);
        const indice = estadoApp.pacientes.findIndex(p => p.id === pacienteActualizado.id);
        estadoApp.pacientes[indice] = pacienteActualizado;
        mostrarMensaje('✅ Paciente actualizado correctamente', 'exito');
        estadoApp.editandoPaciente = null;
      } else {
        // Crear paciente
        const nuevoPaciente = crearPaciente(datos);
        estadoApp.pacientes.push(nuevoPaciente);
        mostrarMensaje('✅ Paciente registrado correctamente', 'exito');
      }
      
      guardarEnLocal();
      renderizarPacientes();
      formulario.reset();
      actualizarEstadisticas();
    } catch (error) {
      mostrarMensaje(`❌ Error: ${error.message}`, 'error');
    }
  });
}

/**
 * Renderiza la lista de pacientes
 */
function renderizarPacientes() {
  const lista = document.getElementById('lista-pacientes');
  
  if (estadoApp.pacientes.length === 0) {
    lista.innerHTML = '<p class="vacio">No hay pacientes registrados</p>';
    return;
  }
  
  lista.innerHTML = estadoApp.pacientes.map(paciente => `
    <div class="elemento-lista">
      <div class="elemento-info">
        <div class="elemento-titulo">${paciente.nombre} ${paciente.apellidos}</div>
        <div class="elemento-detalle">DNI: ${paciente.dni} | Teléfono: ${paciente.telefono}</div>
        <div class="elemento-detalle">Correo: ${paciente.correo}</div>
      </div>
      <div class="elemento-acciones">
        <button class="boton boton-primario boton-pequeno" onclick="editarPaciente('${paciente.id}')">
          ✏️ Editar
        </button>
        <button class="boton boton-eliminar boton-pequeno" onclick="eliminarPacienteUI('${paciente.id}')">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Editar paciente
 */
window.editarPaciente = function(id) {
  const paciente = estadoApp.pacientes.find(p => p.id === id);
  if (!paciente) return;
  
  estadoApp.editandoPaciente = paciente;
  
  document.getElementById('pac-nombre').value = paciente.nombre;
  document.getElementById('pac-apellidos').value = paciente.apellidos;
  document.getElementById('pac-dni').value = paciente.dni;
  document.getElementById('pac-fecha-nacimiento').value = paciente.fechaNacimiento;
  document.getElementById('pac-telefono').value = paciente.telefono;
  document.getElementById('pac-correo').value = paciente.correo;
  document.getElementById('pac-direccion').value = paciente.direccion;
  
  document.querySelector('#formulario-paciente button[type="submit"]').textContent = '✏️ Actualizar Paciente';
  
  // Scroll al formulario
  document.querySelector('.formulario-contenedor').scrollIntoView({ behavior: 'smooth' });
};

/**
 * Eliminar paciente
 */
window.eliminarPacienteUI = function(id) {
  mostrarConfirmacion(
    'Eliminar Paciente',
    '¿Está seguro de que desea eliminar este paciente?',
    (confirmado) => {
      if (confirmado) {
        try {
          estadoApp.pacientes = eliminarPaciente(estadoApp.pacientes, id);
          mostrarMensaje('✅ Paciente eliminado correctamente', 'exito');
          guardarEnLocal();
          renderizarPacientes();
          actualizarEstadisticas();
        } catch (error) {
          mostrarMensaje(`❌ Error: ${error.message}`, 'error');
        }
      }
    }
  );
};

/**
 * Buscar pacientes
 */
function configurarBuscadorPacientes() {
  const buscador = document.getElementById('buscar-paciente');
  
  buscador.addEventListener('input', (e) => {
    const criterio = e.target.value;
    const resultados = criterio ? buscarPacientes(estadoApp.pacientes, criterio) : estadoApp.pacientes;
    
    const lista = document.getElementById('lista-pacientes');
    if (resultados.length === 0) {
      lista.innerHTML = '<p class="vacio">No se encontraron resultados</p>';
      return;
    }
    
    lista.innerHTML = resultados.map(paciente => `
      <div class="elemento-lista">
        <div class="elemento-info">
          <div class="elemento-titulo">${paciente.nombre} ${paciente.apellidos}</div>
          <div class="elemento-detalle">DNI: ${paciente.dni} | Teléfono: ${paciente.telefono}</div>
          <div class="elemento-detalle">Correo: ${paciente.correo}</div>
        </div>
        <div class="elemento-acciones">
          <button class="boton boton-primario boton-pequeno" onclick="editarPaciente('${paciente.id}')">
            ✏️ Editar
          </button>
          <button class="boton boton-eliminar boton-pequeno" onclick="eliminarPacienteUI('${paciente.id}')">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    `).join('');
  });
}

// ============================================================
// GESTIÓN DE MÉDICOS
// ============================================================

/**
 * Maneja el envío del formulario de médicos
 */
function configurarFormularioMedico() {
  const formulario = document.getElementById('formulario-medico');
  
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
      const datos = {
        nombre: document.getElementById('med-nombre').value,
        especialidad: document.getElementById('med-especialidad').value,
        colegiatura: document.getElementById('med-colegiatura').value,
        horarioInicio: document.getElementById('med-horario-inicio').value,
        horarioFin: document.getElementById('med-horario-fin').value,
      };
      
      if (estadoApp.editandoMedico) {
        // Editar médico
        const medicoActualizado = editarMedico(estadoApp.editandoMedico, datos);
        const indice = estadoApp.medicos.findIndex(m => m.id === medicoActualizado.id);
        estadoApp.medicos[indice] = medicoActualizado;
        mostrarMensaje('✅ Médico actualizado correctamente', 'exito');
        estadoApp.editandoMedico = null;
      } else {
        // Crear médico
        const nuevoMedico = crearMedico(datos);
        estadoApp.medicos.push(nuevoMedico);
        mostrarMensaje('✅ Médico registrado correctamente', 'exito');
      }
      
      guardarEnLocal();
      renderizarMedicos();
      actualizarSelectsMedicos();
      formulario.reset();
      actualizarEstadisticas();
    } catch (error) {
      mostrarMensaje(`❌ Error: ${error.message}`, 'error');
    }
  });
}

/**
 * Renderiza la lista de médicos
 */
function renderizarMedicos() {
  const lista = document.getElementById('lista-medicos');
  
  if (estadoApp.medicos.length === 0) {
    lista.innerHTML = '<p class="vacio">No hay médicos registrados</p>';
    return;
  }
  
  lista.innerHTML = estadoApp.medicos.map(medico => `
    <div class="elemento-lista">
      <div class="elemento-info">
        <div class="elemento-titulo">Dr/a. ${medico.nombre}</div>
        <div class="elemento-detalle">Especialidad: ${medico.especialidad} | Colegiatura: ${medico.colegiatura}</div>
        <div class="elemento-detalle">Horario: ${medico.horarioInicio} - ${medico.horarioFin}</div>
      </div>
      <div class="elemento-acciones">
        <button class="boton boton-primario boton-pequeno" onclick="editarMedico('${medico.id}')">
          ✏️ Editar
        </button>
        <button class="boton boton-eliminar boton-pequeno" onclick="eliminarMedicoUI('${medico.id}')">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Editar médico
 */
window.editarMedico = function(id) {
  const medico = estadoApp.medicos.find(m => m.id === id);
  if (!medico) return;
  
  estadoApp.editandoMedico = medico;
  
  document.getElementById('med-nombre').value = medico.nombre;
  document.getElementById('med-especialidad').value = medico.especialidad;
  document.getElementById('med-colegiatura').value = medico.colegiatura;
  document.getElementById('med-horario-inicio').value = medico.horarioInicio;
  document.getElementById('med-horario-fin').value = medico.horarioFin;
  
  document.querySelector('#formulario-medico button[type="submit"]').textContent = '✏️ Actualizar Médico';
  
  document.querySelector('.formulario-contenedor').scrollIntoView({ behavior: 'smooth' });
};

/**
 * Eliminar médico
 */
window.eliminarMedicoUI = function(id) {
  mostrarConfirmacion(
    'Eliminar Médico',
    '¿Está seguro de que desea eliminar este médico?',
    (confirmado) => {
      if (confirmado) {
        try {
          estadoApp.medicos = eliminarMedico(estadoApp.medicos, id);
          mostrarMensaje('✅ Médico eliminado correctamente', 'exito');
          guardarEnLocal();
          renderizarMedicos();
          actualizarSelectsMedicos();
          actualizarEstadisticas();
        } catch (error) {
          mostrarMensaje(`❌ Error: ${error.message}`, 'error');
        }
      }
    }
  );
};

/**
 * Filtra médicos por especialidad
 */
function configurarFiltroMedicos() {
  const filtro = document.getElementById('filtro-especialidad');
  
  filtro.addEventListener('input', (e) => {
    const especialidad = e.target.value;
    const resultados = especialidad 
      ? listarMedicos(estadoApp.medicos, { especialidad })
      : estadoApp.medicos;
    
    const lista = document.getElementById('lista-medicos');
    if (resultados.length === 0) {
      lista.innerHTML = '<p class="vacio">No se encontraron médicos con esa especialidad</p>';
      return;
    }
    
    lista.innerHTML = resultados.map(medico => `
      <div class="elemento-lista">
        <div class="elemento-info">
          <div class="elemento-titulo">Dr/a. ${medico.nombre}</div>
          <div class="elemento-detalle">Especialidad: ${medico.especialidad} | Colegiatura: ${medico.colegiatura}</div>
          <div class="elemento-detalle">Horario: ${medico.horarioInicio} - ${medico.horarioFin}</div>
        </div>
        <div class="elemento-acciones">
          <button class="boton boton-primario boton-pequeno" onclick="editarMedico('${medico.id}')">
            ✏️ Editar
          </button>
          <button class="boton boton-eliminar boton-pequeno" onclick="eliminarMedicoUI('${medico.id}')">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    `).join('');
  });
}

/**
 * Actualiza los selects de médicos en el formulario de citas
 */
function actualizarSelectsMedicos() {
  const select = document.getElementById('cita-medico');
  select.innerHTML = '<option value="">-- Seleccionar Médico --</option>' +
    estadoApp.medicos.map(m => `<option value="${m.id}">${m.nombre} (${m.especialidad})</option>`).join('');
}

// ============================================================
// GESTIÓN DE CITAS
// ============================================================

/**
 * Maneja el envío del formulario de citas
 */
function configurarFormularioCita() {
  const formulario = document.getElementById('formulario-cita');
  
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
      const idPaciente = document.getElementById('cita-paciente').value;
      const idMedico = document.getElementById('cita-medico').value;
      const fecha = document.getElementById('cita-fecha').value;
      const hora = document.getElementById('cita-hora').value;
      const motivo = document.getElementById('cita-motivo').value;
      
      const medico = estadoApp.medicos.find(m => m.id === idMedico);
      
      const datos = {
        idPaciente,
        idMedico,
        fecha,
        hora,
        motivo,
      };
      
      const nuevaCita = crearCita(datos, estadoApp.citas, medico);
      estadoApp.citas.push(nuevaCita);
      mostrarMensaje('✅ Cita agendada correctamente', 'exito');
      
      guardarEnLocal();
      renderizarCitas();
      formulario.reset();
      actualizarEstadisticas();
    } catch (error) {
      mostrarMensaje(`❌ Error: ${error.message}`, 'error');
    }
  });
}

/**
 * Renderiza la lista de citas
 */
function renderizarCitas() {
  const lista = document.getElementById('lista-citas');
  
  if (estadoApp.citas.length === 0) {
    lista.innerHTML = '<p class="vacio">No hay citas registradas</p>';
    return;
  }
  
  lista.innerHTML = estadoApp.citas.map(cita => {
    const paciente = estadoApp.pacientes.find(p => p.id === cita.idPaciente);
    const medico = estadoApp.medicos.find(m => m.id === cita.idMedico);
    
    return `
      <div class="elemento-lista">
        <div class="elemento-info">
          <div class="elemento-titulo">${paciente?.nombre || 'Paciente'} → ${medico?.nombre || 'Médico'}</div>
          <div class="elemento-detalle">Fecha: ${cita.fecha} | Hora: ${cita.hora}</div>
          <div class="elemento-detalle">Motivo: ${cita.motivo}</div>
          <div>
            <span class="estado-badge estado-${cita.estado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}">
              ${cita.estado}
            </span>
          </div>
        </div>
        <div class="elemento-acciones">
          ${cita.estado === 'Pendiente' ? `
            <button class="boton boton-confirmar-cita boton-pequeno" onclick="confirmarCita('${cita.id}')">
              ✅ Confirmar
            </button>
          ` : ''}
          ${['Pendiente', 'Confirmada'].includes(cita.estado) ? `
            <button class="boton boton-cancelar-cita boton-pequeno" onclick="cancelarCitaUI('${cita.id}')">
              ❌ Cancelar
            </button>
          ` : ''}
          <button class="boton boton-eliminar boton-pequeno" onclick="eliminarCitaUI('${cita.id}')">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Confirmar cita
 */
window.confirmarCita = function(id) {
  try {
    const cita = estadoApp.citas.find(c => c.id === id);
    const citaActualizada = cambiarEstadoCita(cita, 'Confirmada');
    const indice = estadoApp.citas.findIndex(c => c.id === id);
    estadoApp.citas[indice] = citaActualizada;
    mostrarMensaje('✅ Cita confirmada correctamente', 'exito');
    guardarEnLocal();
    renderizarCitas();
    actualizarEstadisticas();
  } catch (error) {
    mostrarMensaje(`❌ Error: ${error.message}`, 'error');
  }
};

/**
 * Cancelar cita
 */
window.cancelarCitaUI = function(id) {
  mostrarConfirmacion(
    'Cancelar Cita',
    '¿Está seguro de que desea cancelar esta cita?',
    (confirmado) => {
      if (confirmado) {
        try {
          const cita = estadoApp.citas.find(c => c.id === id);
          const citaActualizada = cancelarCita(cita, 'admin');
          const indice = estadoApp.citas.findIndex(c => c.id === id);
          estadoApp.citas[indice] = citaActualizada;
          mostrarMensaje('✅ Cita cancelada correctamente', 'exito');
          guardarEnLocal();
          renderizarCitas();
          actualizarEstadisticas();
        } catch (error) {
          mostrarMensaje(`❌ Error: ${error.message}`, 'error');
        }
      }
    }
  );
};

/**
 * Eliminar cita
 */
window.eliminarCitaUI = function(id) {
  mostrarConfirmacion(
    'Eliminar Cita',
    '¿Está seguro de que desea eliminar esta cita?',
    (confirmado) => {
      if (confirmado) {
        estadoApp.citas = estadoApp.citas.filter(c => c.id !== id);
        mostrarMensaje('✅ Cita eliminada correctamente', 'exito');
        guardarEnLocal();
        renderizarCitas();
        actualizarEstadisticas();
      }
    }
  );
};

/**
 * Filtra citas por fecha y estado
 */
function configurarFiltrosCitas() {
  const filtroFecha = document.getElementById('filtro-fecha');
  const filtroEstado = document.getElementById('filtro-estado');
  
  const aplicarFiltros = () => {
    const fecha = filtroFecha.value;
    const estado = filtroEstado.value;
    
    const filtros = {};
    if (fecha) filtros.fecha = fecha;
    if (estado) filtros.estado = estado;
    
    const resultados = Object.keys(filtros).length > 0
      ? listarCitas(estadoApp.citas, filtros)
      : estadoApp.citas;
    
    const lista = document.getElementById('lista-citas');
    if (resultados.length === 0) {
      lista.innerHTML = '<p class="vacio">No hay citas con los filtros seleccionados</p>';
      return;
    }
    
    lista.innerHTML = resultados.map(cita => {
      const paciente = estadoApp.pacientes.find(p => p.id === cita.idPaciente);
      const medico = estadoApp.medicos.find(m => m.id === cita.idMedico);
      
      return `
        <div class="elemento-lista">
          <div class="elemento-info">
            <div class="elemento-titulo">${paciente?.nombre || 'Paciente'} → ${medico?.nombre || 'Médico'}</div>
            <div class="elemento-detalle">Fecha: ${cita.fecha} | Hora: ${cita.hora}</div>
            <div class="elemento-detalle">Motivo: ${cita.motivo}</div>
            <div>
              <span class="estado-badge estado-${cita.estado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}">
                ${cita.estado}
              </span>
            </div>
          </div>
          <div class="elemento-acciones">
            ${cita.estado === 'Pendiente' ? `
              <button class="boton boton-confirmar-cita boton-pequeno" onclick="confirmarCita('${cita.id}')">
                ✅ Confirmar
              </button>
            ` : ''}
            ${['Pendiente', 'Confirmada'].includes(cita.estado) ? `
              <button class="boton boton-cancelar-cita boton-pequeno" onclick="cancelarCitaUI('${cita.id}')">
                ❌ Cancelar
              </button>
            ` : ''}
            <button class="boton boton-eliminar boton-pequeno" onclick="eliminarCitaUI('${cita.id}')">
              🗑️ Eliminar
            </button>
          </div>
        </div>
      `;
    }).join('');
  };
  
  filtroFecha.addEventListener('change', aplicarFiltros);
  filtroEstado.addEventListener('change', aplicarFiltros);
}

/**
 * Actualiza los selects de pacientes en el formulario de citas
 */
function actualizarSelectsPacientes() {
  const select = document.getElementById('cita-paciente');
  select.innerHTML = '<option value="">-- Seleccionar Paciente --</option>' +
    estadoApp.pacientes.map(p => `<option value="${p.id}">${p.nombre} ${p.apellidos}</option>`).join('');
}

// ============================================================
// ESTADÍSTICAS Y DASHBOARD
// ============================================================

/**
 * Actualiza las estadísticas del dashboard
 */
function actualizarEstadisticas() {
  document.getElementById('estadistica-pacientes').textContent = estadoApp.pacientes.length;
  document.getElementById('estadistica-medicos').textContent = estadoApp.medicos.length;
  document.getElementById('estadistica-citas').textContent = estadoApp.citas.length;
  
  const confirmadas = estadoApp.citas.filter(c => c.estado === 'Confirmada').length;
  document.getElementById('estadistica-confirmadas').textContent = confirmadas;
}

// ============================================================
// EXPORTAR/IMPORTAR DATOS
// ============================================================

/**
 * Configura el botón de exportar
 */
function configurarExportar() {
  const btn = document.getElementById('btn-exportar');
  
  btn.addEventListener('click', () => {
    try {
      const json = exportarJSON(estadoApp.pacientes, estadoApp.medicos, estadoApp.citas);
      
      // Crear descarga
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `citas-medicas-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      mostrarMensaje('✅ Datos exportados correctamente', 'exito');
    } catch (error) {
      mostrarMensaje(`❌ Error al exportar: ${error.message}`, 'error');
    }
  });
}

/**
 * Configura el botón de importar
 */
function configurarImportar() {
  const btn = document.getElementById('btn-importar');
  
  btn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.addEventListener('change', (e) => {
      const archivo = e.target.files[0];
      if (!archivo) return;
      
      const lector = new FileReader();
      lector.onload = (evento) => {
        try {
          const datos = importarJSON(evento.target.result);
          
          estadoApp.pacientes = datos.pacientes || [];
          estadoApp.medicos = datos.medicos || [];
          estadoApp.citas = datos.citas || [];
          
          guardarEnLocal();
          renderizarPacientes();
          renderizarMedicos();
          renderizarCitas();
          actualizarSelectsPacientes();
          actualizarSelectsMedicos();
          actualizarEstadisticas();
          
          mostrarMensaje('✅ Datos importados correctamente', 'exito');
        } catch (error) {
          mostrarMensaje(`❌ Error al importar: ${error.message}`, 'error');
        }
      };
      lector.readAsText(archivo);
    });
    
    input.click();
  });
}

/**
 * Configura el botón de limpiar todo
 */
function configurarLimpiar() {
  const btn = document.getElementById('btn-limpiar');
  
  btn.addEventListener('click', () => {
    mostrarConfirmacion(
      'Limpiar Todo',
      '⚠️ ¿Está seguro de que desea eliminar TODOS los datos? Esta acción no se puede deshacer.',
      (confirmado) => {
        if (confirmado) {
          estadoApp.pacientes = [];
          estadoApp.medicos = [];
          estadoApp.citas = [];
          guardarEnLocal();
          renderizarPacientes();
          renderizarMedicos();
          renderizarCitas();
          actualizarSelectsPacientes();
          actualizarSelectsMedicos();
          actualizarEstadisticas();
          mostrarMensaje('✅ Todos los datos han sido eliminados', 'advertencia');
        }
      }
    );
  });
}

// ============================================================
// CONFIGURACIÓN DE EVENTOS
// ============================================================

/**
 * Configura todos los eventos de la aplicación
 */
function configurarEventos() {
  // Navegación de pestañas
  document.querySelectorAll('.pestana').forEach(pestana => {
    pestana.addEventListener('click', (e) => {
      cambiarPestana(e.target.closest('.pestana').dataset.seccion);
    });
  });
  
  // Formularios
  configurarFormularioPaciente();
  configurarFormularioMedico();
  configurarFormularioCita();
  
  // Búsqueda y filtros
  configurarBuscadorPacientes();
  configurarFiltroMedicos();
  configurarFiltrosCitas();
  
  // Exportar/Importar
  configurarExportar();
  configurarImportar();
  configurarLimpiar();
}

// ============================================================
// INICIAR APLICACIÓN
// ============================================================

document.addEventListener('DOMContentLoaded', inicializarApp);
