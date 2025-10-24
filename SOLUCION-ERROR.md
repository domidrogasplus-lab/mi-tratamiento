# 🔧 Solución al Error de Dependencias

## ❌ Error Encontrado

```
npm error code ETARGET npm error notarget No matching version found for expo-ads-admob@~11.4.0
```

## ✅ Soluciones Implementadas

### 1. **Actualización de Versiones**

- ✅ Corregido `expo-ads-admob` a `~11.0.0` (versión compatible)
- ✅ Actualizado `expo-in-app-purchases` a `~14.4.0`
- ✅ Actualizado `react-native-svg` a `13.14.0`
- ✅ Corregido `metro.config.js` para usar `@expo/metro-config`

### 2. **Scripts de Instalación Automática**

- ✅ `install-dependencies.js` - Instalación completa con limpieza
- ✅ `fix-dependencies.js` - Solución específica para errores de dependencias

### 3. **Scripts NPM Agregados**

```bash
npm run install-deps    # Instalación automática
npm run fix-deps        # Solución de errores
npm run clean           # Limpiar caché y node_modules
npm run reset           # Reset completo
```

## 🚀 Cómo Resolver el Error

### Opción 1: Instalación Automática (Recomendada)

```bash
node install-dependencies.js
```

### Opción 2: Comandos Manuales

```bash
# Limpiar todo
npm run clean

# Instalar con legacy peer deps
npm install --legacy-peer-deps

# Arreglar dependencias de Expo
npx expo install --fix
```

### Opción 3: Usar Yarn (Alternativa)

```bash
# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Instalar con yarn
yarn install
```

## 🔍 Verificación

Después de la instalación, verifica que todo funcione:

```bash
npx expo start
```

## 📱 Próximos Pasos

1. Ejecuta `npx expo start`
2. Escanea el QR con Expo Go
3. Configura Firebase (opcional)
4. Configura AdMob (opcional)

## 🆘 Si Persisten Problemas

1. Actualiza Node.js a la última versión LTS
2. Usa `npm run reset` para reset completo
3. Verifica que tienes la última versión de Expo CLI
4. Considera usar `yarn` en lugar de `npm`
