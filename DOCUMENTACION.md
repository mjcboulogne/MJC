# 📦 MJC Boulogne — Documentación Completa del Proyecto
> Ministerio Jesucristo es el Camino · Boulogne, Buenos Aires, Argentina
> Exportado el: Marzo 2026

---

## ÍNDICE
1. [Datos del Ministerio](#datos)
2. [Estado del Proyecto](#estado)
3. [Decisiones e Instrucciones Configuradas](#instrucciones)
4. [Resumen de Conversaciones](#conversaciones)
5. [Archivos del Proyecto](#archivos)
6. [Próximos Pasos](#proximos-pasos)

---

## 1. DATOS DEL MINISTERIO {#datos}

| Campo | Valor |
|---|---|
| Nombre completo | Ministerio Jesucristo es el Camino |
| Nombre corto | MJC Boulogne |
| Dirección | Junín 1734, Boulogne, Buenos Aires |
| Servicio viernes | 19:30 hs |
| Servicio domingo | 09:30 hs |
| WhatsApp | +54 9 11 3570 2698 |
| Instagram | @mjcboulogne |
| Facebook | /share/1AioxqC8CD/ |
| YouTube | @MJCBoulogne |
| YouVersion | b58e6c18-0645-45d5-8dda-474451be81f5 |
| Radio | zeno.fm/radio/cristianos-en-linea/ |
| Maps | maps.app.goo.gl/4YHrh6iGA58LqhyX9 |

### Datos bancarios (DolarApp)
| Campo | Valor |
|---|---|
| Titular | Marina De Los Angeles Sanchez |
| CUIT/CUIL | 27-32452226-9 |
| Alias | iglesia.mjc.dolarapp |
| CBU | 0000069700095638726514 |
| Entidad | Garpa SA (DolarApp) |
| QR Ofrenda — motivo | Ofrenda-MJC |
| QR Cimientos — motivo | Cimientos-MJC |

---

## 2. ESTADO DEL PROYECTO {#estado}

| Ítem | Estado | Detalle |
|---|---|---|
| index.html v2 | ✅ TERMINADO | 2,699 líneas — sitio completo |
| manifest.json | ✅ GENERADO | Pendiente subir al servidor |
| sw.js | ✅ GENERADO | Pendiente subir al servidor |
| Modo Simple 👴 | ✅ INTEGRADO | En index.html |
| Banner PWA Android | ✅ INTEGRADO | En index.html |
| Panel iOS PWA | ✅ INTEGRADO | En index.html |
| Datos donación | ✅ REALES | CBU/alias/CUIT completos |
| QR Ofrenda | ✅ BASE64 | Embebido en index.html |
| Sección Mensajes | ⏳ PRÓXIMAMENTE | Animación papiro lista, falta contenido real |
| Galería fotos | ⏳ PENDIENTE | Usa Unsplash como placeholder |
| Foto comunidad (JPEG01.jpg) | ⏳ PENDIENTE | Referenciada pero debe subirse |
| QR_CODE.png (YouVersion) | ⏳ PENDIENTE | Referenciada pero debe subirse |

### Archivos a subir al servidor (root del dominio)
```
index.html
Logo.png
Bible_01.png
JPEG01.jpg
QR_CODE.png
manifest.json
sw.js
```

---

## 3. INSTRUCCIONES CONFIGURADAS EN EL PROYECTO {#instrucciones}

### Bloque A — Full Stack Senior / Product Engineer
- **Stack:** React (Next.js 14+), Tailwind CSS, Lucide React (íconos)
- **State Management:** React Hooks, Context API o Zustand
- **Backend/Base de Datos:** Supabase o Firebase (si se requiere persistencia)
- **Estilo:** Minimalismo moderno, animaciones fluidas con Framer Motion

**Reglas de Oro:**
1. CÓDIGO LIMPIO: Principios SOLID, código modular y reutilizable
2. DISEÑO PRIMERO: Interfaz responsive y estéticamente profesional antes de lógica compleja
3. COMPONENTIZACIÓN: Dividir UI en componentes pequeños en /components
4. EXPLICACIÓN BREVE: Sin explicar lo obvio, decisiones de arquitectura destacadas

**Proceso:**
- Definir estructura de archivos antes de cada funcionalidad
- Código completo (sin placeholders)
- Proponer mejoras no solicitadas como "Mejora Sugerida"

### Bloque B — Plataformas de Fe y Organizaciones Sin Fines de Lucro
- **Tono:** Respetuoso, acogedor, inspirador y profesional
- **Tipografía:** Serif elegante para títulos (autoridad/tradición), sans-serif para lectura
- **CTAs clave:** Planificar visita / Peticiones de oración / Ver prédica en vivo
- **Stack:** Next.js 14 App Router + Tailwind CSS + Contentful/Markdown (CMS)
- **Media:** Optimización reproductores audio/video para sermones

**Reglas de Contenido:**
1. BIBLIA: Usar RVR1960 o NVI
2. ACCESIBILIDAD: WCAG 100% — especialmente para personas mayores
3. MODULARIDAD: Componentes específicos para Tarjetas de Eventos, Reproductores Podcast, Formularios Oración, Secciones Donación

---

## 4. RESUMEN DE CONVERSACIONES {#conversaciones}

### Conversación 1: Diseño y construcción del sitio principal
**Qué se construyó:**
- Sitio HTML single-file completo desde cero
- Identidad visual: dark/light theme, Cormorant Garamond + Montserrat, dorado #b8975a
- Preloader con motivo de cruz + glow animado
- Nav glassmorphism con íconos sociales y botones CTA (Visitanos, Escuchanos, Mensajes, Ofrendar)
- Hero con versículo Juan 14:6 y radio player con equalizer animado
- Sección Visión/Misión con imagen Bible_01.png
- Sección En qué Creemos — acordeón con 6 ítems doctrinales + ink-wipe reveal
- Sección Horarios con tarjetas Viernes 19:30 / Domingo 09:30 + mapa Google Maps embebido
- Sección Comunidad/Pastor con imagen JPEG01.jpg
- Sección Únete con Logo.png
- Sección Ofrendar con 3 columnas: Ofrenda (planta→lirio SVG), Transferencia Bancaria, Cimientos (iglesia SVG)
- Sección Mensajes "Próximamente" con animación pergamino + pluma escribiendo
- Sección Diezmo con animación espigas de trigo
- Footer con datos de contacto + QR_CODE.png (YouVersion)
- Toggle de tema Dark/Light con cruz animada (amanecer ↔ noche)
- VOTD — Versículo del Día: botón libro + flip card RVR1960/NVI + 31 versículos curados
- WhatsApp flotante
- Marquee strips doradas

**Decisiones de diseño:**
- Arquitectura single-file HTML (no framework) por simplicidad de deploy
- Color dorado #b8975a como color de marca establecido
- Fuentes: Cormorant Garamond (serif, títulos) + Montserrat (sans-serif, cuerpo)
- Animaciones SVG puras (sin librerías externas) para Ofrendar y Mensajes

**Lo que quedó pendiente:**
- CBU/alias/CUIT → Luego provistos por MJC ✅ ya integrados

---

### Conversación 2: PWA + Modo Simple (Adultos Mayores)
**Qué se construyó:**
- `manifest.json` — PWA standalone, tema #b8975a, íconos Logo.png
- `sw.js` — Service Worker con estrategia cache-first para assets, network-first para navegación
- Banner instalación Android/Chrome — deferred prompt con localStorage dismissal
- Panel iOS "Compartir → Pantalla de inicio" — hint visual con ícono compartir
- **Modo Simple (👴):** overlay fullscreen con tiles tap-friendly grandes para:
  - WhatsApp (verde)
  - Cómo llegar / Maps (azul)
  - Radio en vivo (dorado)
  - YouTube (rojo)
  - Instagram (gradient)
  - Facebook (azul oscuro)
  - Versículo del día + horarios al pie

**Decisiones de arquitectura:**
- Modo Simple implementado como overlay CSS puro (no iframe, no route separada)
- Botón 👴 fijo en esquina inferior izquierda
- localStorage para recordar preferencia del usuario
- Tiles mínimo 80px de alto para facilitar tap en pantallas pequeñas

**Lo que quedó pendiente:**
- Subir manifest.json y sw.js al servidor junto con index.html

---

### Conversación 3: Migración y documentación estructurada
**Qué se realizó:**
- Extracción completa del proyecto para migración a cuenta destino
- Documentación de archivos, conversaciones, código y snapshot final
- Generación de este archivo ZIP descargable

---

## 5. ARCHIVOS DEL PROYECTO {#archivos}

Este ZIP contiene:
- `index.html` — Sitio completo v2 (2,699 líneas)
- `manifest.json` — PWA Manifest
- `sw.js` — Service Worker
- `DOCUMENTACION.md` — Este archivo

**Archivos referenciados en index.html que NO están en este ZIP**
(deben estar en el servidor):
- `Logo.png` — Logo del ministerio (usado en nav, Únete, footer, íconos PWA)
- `Bible_01.png` — Imagen para sección Visión
- `JPEG01.jpg` — Imagen para sección Comunidad/Pastor
- `QR_CODE.png` — QR de YouVersion para footer

---

## 6. PRÓXIMOS PASOS {#proximos-pasos}

### Inmediato — Deploy
1. Subir al root del servidor:
   ```
   index.html
   Logo.png
   Bible_01.png
   JPEG01.jpg
   QR_CODE.png
   manifest.json
   sw.js
   ```
2. Verificar que el Service Worker se registra correctamente (abrí DevTools → Application → Service Workers)
3. Testear instalación PWA en Android Chrome y iOS Safari

### Próxima fase — Sección Mensajes
La sección actualmente muestra "Próximamente" con animación de pergamino.
Para activarla con contenido real, opciones:
- **Opción A:** Embedear playlist de YouTube `@MJCBoulogne`
- **Opción B:** Grilla de cards con íconos que linkean a cada sermón en YouTube
- **Opción C:** CMS liviano (Contentful/Notion API) para que el ministerio cargue mensajes sin tocar código

### Próxima fase — Galería de fotos
Reemplazar imágenes de Unsplash con fotos reales de la iglesia.
Estructura de grilla ya lista en el CSS (`.photo-grid`).

### Mejoras sugeridas a futuro
- Formulario de peticiones de oración (Google Forms embebido o Formspree)
- Sección de eventos próximos
- Integración con calendario Google del ministerio
- Versión en inglés para alcance internacional
