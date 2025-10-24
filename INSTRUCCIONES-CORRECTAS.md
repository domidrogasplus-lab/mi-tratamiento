# 🚨 INSTRUCCIONES CORRECTAS PARA EJECUTAR LA APP

## ❌ ERRORES COMUNES

### 1. **NO ejecutes archivos JS directamente con Node.js**

```bash
# ❌ INCORRECTO - Esto causará errores
node App.js
node src/services/StorageService.js
```

### 2. **NO uses npm install sin las dependencias correctas**

```bash
# ❌ INCORRECTO - Causará errores de versiones
npm install
```

## ✅ FORMA CORRECTA DE EJECUTAR

### 1. **Instalar dependencias correctamente**

```bash
# Para Windows
node install-windows.js

# O manualmente
npm install --legacy-peer-deps
```

### 2. **Ejecutar con Expo (NO con Node.js)**

```bash
# ✅ CORRECTO - Usar Expo para ejecutar la app
npx expo start
```

### 3. **Si hay errores de dependencias**

```bash
# Limpiar e instalar de nuevo
npm run clean
npm install --legacy-peer-deps
npx expo install --fix
```

## 🔍 DIFERENCIA CLAVE

- **Node.js**: Para scripts de servidor (JavaScript puro)
- **Expo**: Para aplicaciones React Native (JSX, componentes, etc.)

## 📱 FLUJO CORRECTO

1. `node install-windows.js` (instalar dependencias)
2. `npx expo start` (ejecutar la app)
3. Escanear QR con Expo Go en tu teléfono

## 🆘 SI PERSISTEN ERRORES

```bash
# Reset completo
npm run reset
npx expo start
```
