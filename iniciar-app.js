#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

console.log("🚀 Iniciando MiTratamiento...\n");

try {
  // Verificar si node_modules existe
  if (!fs.existsSync("node_modules")) {
    console.log("📦 Instalando dependencias...");
    execSync("node install-windows.js", { stdio: "inherit" });
  }

  // Verificar Expo CLI
  console.log("🔧 Verificando Expo CLI...");
  try {
    execSync("npx expo --version", { stdio: "pipe" });
  } catch (error) {
    console.log("📦 Verificando paquete expo...");
    try {
      require('expo/package.json');
    } catch (e) {
      console.log("📦 Reinstalando dependencias...");
      execSync("npm install --legacy-peer-deps", { stdio: "inherit" });
    }
  }

  // Iniciar la aplicación
  console.log("📱 Iniciando aplicación con Expo...");
  console.log("⚠️  IMPORTANTE: Usa Expo Go en tu teléfono para escanear el QR");
  console.log("⚠️  NO ejecutes archivos JS directamente con Node.js\n");

  execSync("npx expo start", { stdio: "inherit" });
} catch (error) {
  console.error("❌ Error:", error.message);
  console.log("\n🔧 Soluciones:");
  console.log("1. Ejecuta: npm run reset");
  console.log("2. Luego: npx expo start");
  console.log("3. O usa: node install-windows.js");
}
