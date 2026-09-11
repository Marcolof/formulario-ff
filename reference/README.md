# Referencia

Material de origen que no forma parte del build. Nada de acá se sirve ni se publica.

## `landing-original.html`

La landing de MiCorreo guardada desde el navegador, tal como estaba el 2026-09-10. Se
conserva sólo el HTML: sirve para verificar la jerarquía del DOM, los textos y los enlaces
de la landing original.

**No conserva los estilos.** La landing usa MUI + emotion, que inyecta el CSS por
JavaScript; los `<style>` del archivo guardado quedaron vacíos y el chunk
`landing-template-*.js` no se guardó. Abrirlo en un navegador muestra la página sin estilos.
Las medidas y colores de la réplica salieron de leer los estilos computados de la landing en
producción, no de este archivo.

**Los assets no están acá.** Los que usa la réplica ya viven en `src/assets/`. El resto está
en el original de sólo lectura:
`C:\MLOF 01\VORTEX\CORREO ARGENTINO\Formulario FF\html reference`.
