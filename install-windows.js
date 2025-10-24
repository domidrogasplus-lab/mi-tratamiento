#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

console.log("🚀 Instalando dependencias para MiTratamiento en Windows...\n");

try {
  // Limpiar caché de npm
  console.log("🧹 Limpiando caché de npm...");
  execSync("npm cache clean --force", { stdio: "inherit" });

  // Eliminar node_modules y package-lock.json si existen
  if (fs.existsSync("node_modules")) {
    console.log("🗑️ Eliminando node_modules existente...");
    execSync("rmdir /s /q node_modules", { stdio: "inherit" });
  }

  if (fs.existsSync("package-lock.json")) {
    console.log("🗑️ Eliminando package-lock.json...");
    execSync("del package-lock.json", { stdio: "inherit" });
  }

  // Instalar dependencias con legacy peer deps
  console.log("📦 Instalando dependencias con --legacy-peer-deps...");
  execSync("npm install --legacy-peer-deps", { stdio: "inherit" });

  // Verificar instalación de Expo CLI
  console.log("🔧 Verificando Expo CLI...");
  try {
    execSync("npx expo --version", { stdio: "inherit" });
  } catch (error) {
    console.log("📦 Instalando Expo CLI globalmente...");
    execSync("npm install -g @expo/cli", { stdio: "inherit" });
  }

  // Ejecutar expo install --fix
  console.log("🔧 Ejecutando expo install --fix...");
  execSync("npx expo install --fix", { stdio: "inherit" });

  console.log("\n✅ ¡Instalación completada exitosamente!");
  console.log("\n📱 Para ejecutar la aplicación:");
  console.log("   npx expo start");
  console.log("\n📱 Para ejecutar en Android:");
  console.log("   npx expo start --android");
  console.log("\n📱 Para ejecutar en iOS:");
  console.log("   npx expo start --ios");
} catch (error) {
  console.error("❌ Error durante la instalación:", error.message);
  console.log("\n🔧 Soluciones alternativas:");
  console.log("1. Ejecuta: npm install --legacy-peer-deps");
  console.log("2. O usa: yarn install");
  console.log("3. O ejecuta: npx expo install --fix");
  process.exit(1);
}
