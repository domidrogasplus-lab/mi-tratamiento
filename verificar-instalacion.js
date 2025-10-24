#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔍 Verificando instalación de MiTratamiento...\n");

// Verificar si node_modules existe
if (!fs.existsSync("node_modules")) {
  console.log("❌ node_modules no encontrado");
  console.log("💡 Ejecuta: node install-windows.js");
  process.exit(1);
}

// Verificar dependencias críticas
const dependenciasCriticas = [
  "expo",
  "@react-native-async-storage/async-storage",
  "react-native-paper",
  "react-navigation",
];

console.log("📦 Verificando dependencias críticas...");
dependenciasCriticas.forEach((dep) => {
  try {
    execSync(`npm list ${dep}`, { stdio: "pipe" });
    console.log(`✅ ${dep} - OK`);
  } catch (error) {
    console.log(`❌ ${dep} - FALTANTE`);
  }
});

// Verificar Expo CLI
console.log("\n🔧 Verificando Expo CLI...");
try {
  const version = execSync("npx expo --version", { encoding: "utf8" });
  console.log(`✅ Expo CLI - ${version.trim()}`);
} catch (error) {
  console.log("❌ Expo CLI no encontrado");
  console.log("💡 Ejecuta: npm install -g @expo/cli");
}

console.log("\n📱 Para ejecutar la aplicación:");
console.log("   npx expo start");
console.log("\n⚠️  NO uses: node App.js (causará errores)");
console.log("✅ USA: npx expo start");
