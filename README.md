# MiTratamiento 💊

**Tu asistente personal de salud**

MiTratamiento es una aplicación móvil diseñada para pacientes de EPS públicas y privadas que reciben medicamentos de forma mensual o trimestral. La app ayuda a adultos mayores y pacientes a recordar sus tratamientos, controlar su tensión arterial y conocer sus derechos en salud.

## 🎯 Características Principales

### 📱 Funcionalidades Core

- **Gestión de Medicamentos**: Registra, organiza y recibe recordatorios de tus medicamentos
- **Control de Tensión Arterial**: Registra y monitorea tu presión arterial con gráficos de evolución
- **Calendario de Entregas**: Mantén un control de cuándo debes ir por tus medicamentos
- **Derechos en Salud**: Conoce y ejerce tus derechos como paciente
- **Educación y Consejos**: Accede a contenido educativo sobre salud y autocuidado
- **Modo Cuidador**: Permite que familiares reciban notificaciones sobre tu salud

### 🎨 Diseño y UX

- **Interfaz Amigable**: Diseñada específicamente para adultos mayores
- **Fuentes Grandes**: Texto legible (16-20px) para facilitar la lectura
- **Botones Amplios**: Elementos táctiles grandes y fáciles de usar
- **Modo Claro y Oscuro**: Adaptable a las preferencias del usuario
- **Colores Accesibles**: Paleta de colores suaves y contrastantes

### 💰 Monetización

- **Versión Gratuita**: Con publicidad y funciones básicas
- **Versión Premium**: Sin publicidad + funciones avanzadas
- **Planes**: $1.99 USD/mes o $9.99 USD/año

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Android Studio (para desarrollo Android)

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/mitratamiento.git
cd mitratamiento
```

2. **Instalar dependencias**

**Opción A: Instalación Automática (Recomendada)**

**Para Windows (Recomendado):**

```bash
# Opción 1: Instalación e inicio automático
npm run init

# Opción 2: Solo instalación
npm run install-windows
```

**Para macOS/Linux:**

```bash
# Ejecuta el script de instalación automática
node install-dependencies.js
```

**⚠️ IMPORTANTE:**

- NO ejecutes `node App.js` (causará errores)
- USA `npx expo start` para ejecutar la app
- Descarga Expo Go en tu teléfono para escanear el QR

**Opción B: Instalación Manual**

```bash
npm install
# Si encuentras errores de dependencias, prueba:
npm install --legacy-peer-deps
# O alternativamente:
yarn install
```

**Si persisten problemas con AdMob:**

```bash
npx expo install --fix
```

3. **Configurar variables de entorno**

```bash
# Crear archivo .env
cp .env.example .env
```

4. **Configurar Firebase** (opcional)

- Crear proyecto en Firebase Console
- Configurar Authentication y Firestore
- Actualizar `src/services/FirebaseService.js` con tus credenciales

5. **Configurar AdMob** (opcional)

- Crear cuenta en AdMob
- Obtener IDs de unidades publicitarias
- Actualizar `src/services/AdService.js`

### Ejecutar la Aplicación

```bash
# Desarrollo
npm start
# o
yarn start

# Android
npm run android
# o
yarn android

# iOS (solo en macOS)
npm run ios
# o
yarn ios
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CustomButton.js
│   ├── CustomCard.js
│   ├── MedicationCard.js
│   ├── BloodPressureCard.js
│   └── AdBanner.js
├── screens/            # Pantallas principales
│   ├── WelcomeScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── MedicationsScreen.js
│   ├── BloodPressureScreen.js
│   ├── CalendarScreen.js
│   ├── RightsScreen.js
│   ├── EducationScreen.js
│   ├── CaregiverScreen.js
│   └── SettingsScreen.js
├── navigation/         # Configuración de navegación
│   └── AppNavigator.js
├── services/          # Servicios y lógica de negocio
│   ├── StorageService.js
│   ├── NotificationService.js
│   ├── FirebaseService.js
│   ├── AdService.js
│   └── BillingService.js
├── styles/            # Estilos y temas
│   ├── colors.js
│   ├── typography.js
│   ├── spacing.js
│   └── theme.js
├── data/              # Datos de ejemplo
│   └── sampleData.js
└── utils/             # Utilidades
    └── helpers.js
```

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework principal
- **Expo**: Plataforma de desarrollo
- **React Navigation**: Navegación entre pantallas
- **React Native Paper**: Componentes de UI
- **AsyncStorage**: Almacenamiento local
- **Expo Notifications**: Sistema de notificaciones
- **React Native Chart Kit**: Gráficos y visualizaciones
- **Firebase**: Backend y sincronización (opcional)
- **AdMob**: Monetización con publicidad
- **Google Play Billing**: Suscripciones premium

## 📱 Pantallas Principales

### 1. Pantalla de Bienvenida

- Logo y presentación de la app
- Botones de "Comenzar" y "Ya tengo cuenta"

### 2. Registro del Paciente

- Formulario con datos personales
- Validación de campos
- Almacenamiento en AsyncStorage

### 3. Inicio

- Resumen de medicamentos y estado de salud
- Acciones rápidas
- Mensajes motivacionales

### 4. Medicamentos

- Lista de medicamentos con estado
- Botón para marcar como tomado
- Agregar/editar medicamentos

### 5. Control de Tensión Arterial

- Formulario para registrar mediciones
- Gráfico de evolución
- Categorización automática

### 6. Calendario de Entregas

- Calendario interactivo
- Recordatorios de entregas
- Próximas citas

### 7. Derechos en Salud

- Información sobre derechos del paciente
- Modelos de documentos
- Enlaces útiles

### 8. Educación y Consejos

- Contenido educativo en video/audio
- Consejos de salud
- Recursos adicionales

### 9. Modo Cuidador

- Agregar familiares/contactos
- Configurar notificaciones
- Información sobre el modo cuidador

### 10. Configuración

- Ajustes de la aplicación
- Información del usuario
- Funciones premium

## 🔧 Configuración Avanzada

### Notificaciones

La app utiliza Expo Notifications para:

- Recordatorios de medicamentos
- Alertas de entregas
- Recordatorios de presión arterial
- Mensajes motivacionales

### Almacenamiento

- **AsyncStorage**: Para datos locales
- **Firebase**: Para sincronización en la nube (opcional)

### Monetización

- **AdMob**: Banners y anuncios intersticiales
- **Google Play Billing**: Suscripciones premium

## 📊 Datos de Ejemplo

La app incluye datos de ejemplo para probar todas las funcionalidades:

```javascript
// Inicializar datos de ejemplo
import { initializeSampleData } from "./src/data/sampleData";

// En tu componente
useEffect(() => {
  initializeSampleData();
}, []);
```

## 🚀 Despliegue

### Android (Google Play Store)

1. **Configurar firma de la app**

```bash
expo build:android
```

2. **Subir a Google Play Console**

- Crear cuenta de desarrollador
- Subir APK/AAB
- Configurar metadatos de la app

3. **Configurar AdMob**

- Crear cuenta en AdMob
- Configurar unidades publicitarias
- Actualizar IDs en el código

### Configuración de Producción

1. **Actualizar app.json**

```json
{
  "expo": {
    "name": "MiTratamiento",
    "slug": "mitratamiento",
    "version": "1.0.0",
    "android": {
      "package": "com.mitratamiento.app",
      "versionCode": 1
    }
  }
}
```

2. **Configurar Firebase para producción**
3. **Actualizar IDs de AdMob**
4. **Configurar Google Play Billing**

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:

- Email: soporte@mitratamiento.com
- GitHub Issues: [Crear un issue](https://github.com/tu-usuario/mitratamiento/issues)

## 🙏 Agradecimientos

- Equipo de desarrollo de React Native
- Comunidad de Expo
- Contribuidores de las librerías utilizadas
- Pacientes y profesionales de la salud que proporcionaron feedback

---

**MiTratamiento** - Tu salud, nuestra prioridad 💙
