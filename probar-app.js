#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

console.log("🧪 Probando MiTratamiento...\n");

try {
  // Verificar que node_modules existe
  if (!fs.existsSync("node_modules")) {
    console.log("❌ node_modules no encontrado");
    console.log("💡 Ejecuta: npm run install-windows");
    process.exit(1);
  }

  // Verificar metro.config.js
  console.log("🔧 Verificando metro.config.js...");
  try {
    require("./metro.config.js");
    console.log("✅ metro.config.js - OK");
  } catch (error) {
    console.log("❌ metro.config.js - ERROR:", error.message);
    process.exit(1);
  }

  // Verificar Expo CLI
  console.log("🔧 Verificando Expo CLI...");
  try {
    const version = execSync("npx expo --version", { encoding: "utf8" });
    console.log(`✅ Expo CLI - ${version.trim()}`);
  } catch (error) {
    // Fallback: si el binario no está disponible, comprobamos si el paquete 'expo' está instalado
    try {
      const expoPkg = require('expo/package.json');
      console.log(`⚠️ Expo CLI no es ejecutable desde el sistema, pero el paquete 'expo' está instalado (v${expoPkg.version}). Puedes usar 'npx expo start' o 'npx -p expo expo start'.`);
    } catch (e) {
      console.log("❌ Expo CLI - ERROR (no ejecutable y paquete 'expo' no encontrado)");
      process.exit(1);
    }
  }

  // Verificar dependencias críticas
  console.log("📦 Verificando dependencias...");
  const deps = [
    "expo",
    "@react-native-async-storage/async-storage",
    "react-native-paper",
  ];

  deps.forEach((dep) => {
    try {
      execSync(`npm list ${dep}`, { stdio: "pipe" });
      console.log(`✅ ${dep} - OK`);
    } catch (error) {
      console.log(`❌ ${dep} - FALTANTE`);
    }
  });

  console.log("\n🎉 ¡Todo está listo!");
  console.log("\n📱 Para ejecutar la aplicación:");
  console.log("   npx expo start");
  console.log("\n⚠️  RECUERDA:");
  console.log("   - NO uses: node App.js");
  console.log("   - USA: npx expo start");
  console.log("   - Descarga Expo Go en tu teléfono");
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
