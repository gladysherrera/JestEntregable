#  TP ENTREGABLE JEST

Este proyecto corresponde al trabajo práctico entregable de Gladys Herrera de la materia **Programación** del curso **Full Stack** en la sede **Olavarría**.

##  Descripción

El objetivo principal del trabajo es implementar y validar mediante pruebas automatizadas el módulo `notebooks`, que gestiona reportes técnicos de notebooks.

Se realizaron distintos tipos de pruebas utilizando **Jest**, incluyendo:

- ✅ Test unitarios del **controller** (`notebooks.controller`)
- ✅ Test unitarios del **service** (`notebooks.service`)
- ✅ Test de integración
- ✅ Test **end-to-end (e2e)**

Además, se ejecutó el **test de cobertura**, alcanzando el **100% de cobertura** en el controlador.

##  Detalles de los tests

### 🔹 Unit Test - Service

Se utilizó **mockeo del repositorio** para testear el comportamiento del `notebooks.service` de forma aislada.

### 🔹 Unit Test - Controller

Se aplicó **spyOn** para verificar las llamadas y respuestas del `notebooks.controller`.

### 🔹 Test e2e

Para ejecutar correctamente el test e2e, se debe tener precargado en la base de datos el siguiente registro:

```json
{
  "id": 1,
  "title": "PC Lenovo",
  "content": "falla en arranque"
}
