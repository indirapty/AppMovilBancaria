# AppMovilBancaria
Consulta de las ubicaciones de agencias, sucursales, ATMs o puntos de pago del banco Con la finalidad de conocer donde están ubicados utilizando las funcionalidades de geolocalización y GPS del móvil.

# Proyectio que muestra la implementación de Google Maps nativo en Ionic 3.9.2
* App con template de 3 tabs Ionic
* Google Map Nativo

# Se necesita 
* API Key para Google Maps IOS SDK
* API Key para Google Maps Android SDK 
* https://developers.google.com/maps/documentation/?hl=es

# Requerimientos técnicos
Para que funcione correctamente:
* Angular 4 
* Ionic 3.X
* Apache Cordova 
* Xcode - Para iOS Apps
* Android Studio - para Android Apps
* Node.js - Mínimo V6 o superior

# Instalación
Clonar repositori0 https://github.com/indirapty/AppMovilBancaria.git

# Instalar Google Maps Plugin e insertar API Keys:
$ ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="GOOGLE_MAPS_KEY_HERE" --variable API_KEY_FOR_IOS="GOOGLE_MAPS_KEY_HERE"
$ npm install --save @ionic-native/google-maps

Una vez instalado puede proceder asegurarse que esté el dispositivo conectado a la PC
Puede compilarlo de manera manual utilizando estos comandos 
$ ionic cordova platform add ios
$ ionic cordova build ios

# Compilar en Xcode para dispositivos iOS
* Ir a la carpeta AppMovilBancaria\platforms\ios y abrir el proyecto de tipo .xcodeproj

# Compilar en Android Studio para dispositivos Android
* Ir a la carpeta AppMovilBancaria\platforms\android y abrir el proyecto de tipo .gradle


