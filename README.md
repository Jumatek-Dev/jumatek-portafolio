# JUMATEK — Portafolio comercial

Portafolio de una iniciativa de desarrollo web y software para pequeños y medianos negocios en República Dominicana. Presenta servicios, propuestas de proyectos y un formulario para preparar solicitudes de cotización mediante WhatsApp.

## Estructura

```text
JUMATEK-PORTAFOLIO/
├── index.html                 # Página principal
├── css/
│   └── styles.css             # Estilos compartidos y diseño responsive
├── js/
│   └── main.js                # Menú, FAQ, cotización y año del footer
├── assets/
│   ├── barberia.svg           # Ilustración conceptual original
│   ├── restaurante.svg        # Ilustración conceptual original
│   └── colmado-pos.svg        # Ilustración conceptual original
├── proyectos/
│   ├── barberia.html          # Presentación del proyecto planificado
│   ├── restaurante.html       # Presentación del proyecto planificado
│   └── colmado-pos.html       # Presentación del proyecto planificado
└── README.md
```

## Tecnologías

HTML5 semántico, CSS3, JavaScript puro y SVG. No utiliza frameworks, paquetes de ejecución ni un proceso de compilación. Montserrat e Inter se cargan desde Google Fonts; existen fuentes alternativas del sistema si esa conexión falla.

## Abrir con Live Server

1. Abre la carpeta completa en Visual Studio Code.
2. Si todavía no la tienes, instala la extensión **Live Server**, de Ritwick Dey, desde el panel de extensiones. Es una herramienta opcional de desarrollo, no una dependencia del sitio.
3. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.
4. Revisa la página en la dirección local que abra la extensión. Accede a las presentaciones mediante los enlaces **Ver detalles**.

## Configurar WhatsApp

En `js/main.js`, busca la constante `WHATSAPP_NUMBER` al principio del archivo. Escribe dentro de sus comillas el número del destinatario, con código de país y solo dígitos: sin `+`, espacios ni guiones. No incluyas el número personal en esta documentación.

Para desactivar la apertura de WhatsApp, deja la constante así:

```js
const WHATSAPP_NUMBER = '';
```

La validación comprueba de 7 a 15 dígitos y que el primero no sea cero; no confirma que el número exista ni que tenga una cuenta de WhatsApp. Verifica manualmente el destinatario antes de publicar.

**El número configurado en JavaScript será público al publicar el sitio.** Cualquier visitante podrá consultar el archivo; esta constante no es un secreto ni una configuración privada.

El formulario valida nombre, servicio y descripción; el negocio es opcional. Prepara el mensaje con `encodeURIComponent` y abre `https://wa.me/NUMERO?text=MENSAJE` desde la acción de envío del usuario, en la misma pestaña. WhatsApp requiere que el usuario revise y confirme el envío: abrir el enlace no equivale a enviar el mensaje.

Con número vacío o inválido se muestra un aviso y no se abre WhatsApp. La opción de copiar la solicitud permanece disponible también con un número configurado. Si falla el acceso al portapapeles, se selecciona el texto para copiarlo manualmente.

El código no guarda solicitudes en bases de datos ni en almacenamiento del navegador, ni envía correos. Al abrir WhatsApp, los datos de la solicitud forman parte de la URL preparada para ese servicio. Las fuentes generan conexiones con Google Fonts al cargar las páginas.

## Funcionalidades disponibles

- Navegación por secciones y menú móvil con `aria-expanded`, cierre con Escape y manejo del foco.
- Secciones Inicio, Nosotros, Servicios, Proyectos, Cómo trabajamos, Preguntas frecuentes y Contacto.
- FAQ con `details/summary`, una pregunta abierta a la vez y compatibilidad mediante JavaScript.
- Solicitud de cotización con validación HTML5, apertura de WhatsApp según configuración y copia alternativa.
- Tres páginas de presentación con enlaces para regresar al portafolio.
- Footer con año automático, foco por superficie y respeto por movimiento reducido.
- Títulos, descripciones y metadatos básicos Open Graph individuales en las cuatro páginas.

Sin JavaScript, el formulario permanece deshabilitado y muestra una explicación. La navegación sigue disponible; la agrupación del acordeón depende del soporte nativo del navegador.

## Proyectos planificados

| Proyecto | Alcance previsto | Tecnología prevista |
| --- | --- | --- |
| Sitio web para barbería | Servicios, precios, galería y contacto por WhatsApp | HTML, CSS y JavaScript |
| Sitio web para restaurante | Menú digital, categorías y solicitudes de pedidos por WhatsApp | HTML, CSS y JavaScript |
| JUMATEK POS — Colmados | Ventas, inventario, clientes y control de fiado | Arquitectura por definir |

Son propuestas con estado **Planificado** y **Demostración en preparación**. Las ilustraciones son conceptuales, no capturas de sistemas terminados. Las funcionalidades descritas en sus páginas todavía no están implementadas. Inventario, POS, citas y software personalizado se presentan en Servicios como **En desarrollo**.

## Pruebas pendientes antes de publicar

- Revisar las cuatro páginas en navegadores de escritorio y móviles, incluyendo anchos pequeños, zoom al 200 % y ausencia de desplazamiento horizontal.
- Recorrer enlaces, menú, FAQ y formulario con Tab, Shift+Tab, Enter, Espacio y Escape cuando corresponda; comprobar foco completo y sin recortes.
- Revisar lectura, etiquetas, validaciones y anuncios con un lector de pantalla.
- Probar movimiento reducido, JavaScript desactivado y fallo de carga de fuentes.
- Verificar los enlaces y las rutas relativas desde un alojamiento de prueba.
- Comprobar número vacío, inválido y destinatario real autorizado; revisar el mensaje en WhatsApp móvil y web antes de confirmar cualquier envío.
- Probar campos vacíos, espacios, negocio omitido, acentos, emojis y textos de longitud máxima; comprobar copia permitida y bloqueada.
- Revisar consola, solicitudes de red, rendimiento, HTTPS, compresión y caché del alojamiento.
- Verificar los metadatos y la presentación al compartir cuando exista una URL pública.

Estas pruebas de navegador y alojamiento no se consideran aprobadas por la sola revisión del código.

## Recursos pendientes

En `assets/` solo hay tres ilustraciones de proyectos. No se ha identificado un logotipo gráfico oficial ni un favicon oficial; el favicon queda pendiente de recibir el recurso aprobado. Se conserva la marca tipográfica existente.

Open Graph incluye `og:title`, `og:description` y `og:type`. No se incluyen `og:url` ni `og:image`: quedan pendientes hasta contar con una URL pública e imagen aprobada disponibles públicamente. La URL canónica también deberá definirse cuando exista un dominio real.
