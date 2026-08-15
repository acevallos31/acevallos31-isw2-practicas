// ============================================================
// Módulo: Sanitización
// Responsabilidad: Convertir texto no confiable en contenido HTML seguro.
// ============================================================

/**
 * Escapa caracteres que el navegador podría interpretar como HTML.
 * @param {*} texto - Valor que se mostrará como texto HTML.
 * @returns {string} Texto seguro para interpolar en HTML.
 */
export function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
