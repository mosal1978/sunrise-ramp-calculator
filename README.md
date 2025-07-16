# 🌄 Sunrise Ramp Calculator

Ein barrierefreier Rampenrechner mit Unterstützung für internationale Normen, automatische Empfehlungen, Visualisierung & PDF-Export. 
Das Node-Skript bietet nun eine einfache Kommandozeilenoberfläche, über die Steigung und Normkonformität direkt berechnet werden können.

## Features
- ✅ Steigungs- & Winkelberechnung
- ✅ Normen (DIN, ÖNORM, SIA, EU usw.)
- ✅ Bewertung (ideal / akzeptabel / zu steil)
- ✅ Kompatible Rollstühle
- ✅ PDF / E-Mail / LocalStorage
- ✅ Getestet mit Vitest + GitHub Actions

## Starten

```bash
npm install
npm run dev # startet die interaktive CLI
```

Tests können mit folgendem Befehl ausgeführt werden:

```bash
npm test
```

## PC-Server

Der Python-Server im Ordner `pc-server` wird wie folgt vorbereitet und gestartet:

```bash
cd pc-server
pip install -r requirements.txt
python server.py
```
Der Server lauscht über Bluetooth (RFCOMM) auf eingehende Verbindungen und beantwortet einfache
Anfragen zur Rampenüberprüfung.
