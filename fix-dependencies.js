#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔧 Solucionando problemas de dependencias...\n");

try {
  // Verificar si existe package-lock.json
  if (fs.existsSync("package-lock.json")) {
    console.log("🗑️ Eliminando package-lock.json...");
    fs.unlinkSync("package-lock.json");
  }

  // Verificar si existe node_modules
  if (fs.existsSync("node_modules")) {
    console.log("🗑️ Eliminando node_modules...");
    if (process.platform === "win32") {
      execSync("rmdir /s /q node_modules", { stdio: "inherit" });
    } else {
      execSync("rm -rf node_modules", { stdio: "inherit" });
    }
  }

  // Limpiar caché de npm
  console.log("🧹 Limpiando caché de npm...");
  execSync("npm cache clean --force", { stdio: "inherit" });

  // Instalar con legacy peer deps
  console.log("📦 Instalando con --legacy-peer-deps...");
  execSync("npm install --legacy-peer-deps", { stdio: "inherit" });

  // Verificar instalación de Expo
  console.log("🔍 Verificando instalación de Expo...");
  try {
    execSync("npx expo --version", { stdio: "inherit" });
  } catch (error) {
    console.log("📦 Instalando Expo CLI...");
    execSync("npm install -g @expo/cli", { stdio: "inherit" });
  }

  // Ejecutar expo install --fix
  console.log("🔧 Ejecutando expo install --fix...");
  execSync("npx expo install --fix", { stdio: "inherit" });

  console.log("\n✅ ¡Problemas de dependencias solucionados!");
  console.log("\n📱 Ahora puedes ejecutar:");
  console.log("   npx expo start");
} catch (error) {
  console.error("❌ Error:", error.message);
  console.log("\n🔧 Soluciones alternativas:");
  console.log("1. Usa yarn: yarn install");
  console.log("2. Actualiza Node.js a la última versión LTS");
  console.log("3. Usa npx expo install --fix");
  process.exit(1);
}
