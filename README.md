# AssetApp - Frontend React

## 📚 Tabla de Contenido

-  [Descripción](#descripción)
-  [Tecnologías](#tecnologías)
-  [Características](#características)
-  [Instalación](#instalación)
-  [Ejecución del proyecto](#ejecución-del-proyecto)
-  [Autor](#autor)

## Descripción

AssetApp es una aplicación web frontend desarrollada en React que permite **gestionar un inventario de assets**.  
La aplicación implementa un **CRUD completo** (Crear, Leer, Actualizar, Eliminar) consumiendo una API a través de Axios, mostrando los datos en una tabla y utilizando modales para agregar, editar y eliminar assets.

---

## Tecnologías

-  **Frontend:** React + TypeScript
-  **Estilos:** CSS
-  **HTTP Client:** Axios
-  **Estado y hooks personalizados:** `useState`, `useEffect`, y `useAssets`

---

## Características

### Listado de assets

-  Muestra todos los assets disponibles en una tabla.
-  Columnas: **ID, Nombre, Tipo, Propietario, Fecha de creación y actualización**.
-  La tabla se actualiza automáticamente después de crear, editar o eliminar un asset.

### Agregar un asset

-  Modal para ingresar datos de un nuevo asset.
-  Los datos se envían directamente a la API (`POST`) y la tabla se actualiza en tiempo real.
-  Mientras se guarda, los campos quedan deshabilitados para evitar errores.

### Editar un asset

-  Modal con los datos precargados del asset seleccionado.
-  Permite modificar campos y enviar los cambios a la API (`PUT`).
-  La tabla se actualiza automáticamente al guardar los cambios.

### Eliminar un asset

-  Confirmación antes de eliminar un asset.
-  La API (`DELETE`) elimina el asset y la tabla se actualiza automáticamente.
-  Se muestra un mensaje de éxito tras la eliminación.

### Mensajes de notificación

-  Modal para **mensajes de éxito o error** al crear, editar o eliminar assets.
-  Permite cerrar el mensaje manualmente.

### Carga inicial

-  La aplicación hace **fetch automático** de todos los assets al cargar la página.

---

## Instalación

```bash
1. Clonar el repositorio
git clone https://github.com/ioogustavo/assets-app.git

2. Entrar al directorio
cd assets-app

3. Ejecutar `npm install` para instalar dependencias
npm install
```

---

## Ejecución del proyecto

-  **Modo desarrollo:**

   1. Ejecutar `npm run dev`
   2. Abrir el navegador y acceder a: `http://localhost:5173` (Vite abre el proyecto en este puerto por defecto)

-  **Modo producción:**
   1. Ejecutar `npm run build`
   2. Servir la carpeta `dist/` con cualquier servidor estático (por ejemplo `serve -s dist`)

---

## Autor

Rubén Gustavo Altamiranda
Proyecto desarrollado como challenge técnico de React.
