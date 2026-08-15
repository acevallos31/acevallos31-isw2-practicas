// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Requerimiento: RNF-04 — Sanitizar entradas contra XSS
// Función: escaparHTML
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { escaparHTML } from '../src/sanitizacion.js';

describe('escaparHTML', () => {
  test('debe escapar caracteres HTML potencialmente peligrosos', () => {
    // ARRANGE: Preparamos texto con caracteres interpretables como HTML
    const texto = `<img src=x onerror="alert('xss')"> &`;

    // ACT: Ejecutamos la función a probar
    const resultado = escaparHTML(texto);

    // ASSERT: Verificamos que el navegador lo trataría como texto plano
    expect(resultado).toBe('&lt;img src=x onerror=&quot;alert(&#39;xss&#39;)&quot;&gt; &amp;');
  });
});
