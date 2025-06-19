# 🌄 Sunrise Ramp Calculator

Ein barrierefreier Rampenrechner mit Unterstützung für internationale Normen, automatische Empfehlungen, Visualisierung & PDF-Export.

## Features
- ✅ Steigungs- & Winkelberechnung
- ✅ Normen (DIN, ÖNORM, SIA, EU usw.)
- ✅ Bewertung (ideal / akzeptabel / zu steil)
- ✅ Kompatible Rollstühle
- ✅ PDF / E-Mail / LocalStorage
- ✅ Getestet mit Vitest + GitHub Actions

## Steigungsbewertung

Die Funktion `checkRampAgainstNorms` prüft die Steigung einer Rampe anhand
gängiger DIN- und EU‑Vorgaben:

- **bis 6 %** → *ideal*: voll normkonform
- **bis 8 %** → *akzeptabel*: nur für kurze Rampen zulässig
- **über 8 %** → *zu steil*: nicht konform

Zur Nutzung in einer Anwendung kann die Funktion wie folgt aufgerufen werden:

```ts
import { checkRampAgainstNorms } from './src/norms.js';

const result = checkRampAgainstNorms(7.5);
console.log(result.rating); // "acceptable"
console.log(result.messages.join('\n'));
```

Das zurückgegebene Objekt enthält sowohl eine Bewertung als auch erläuternde
Texte für Benutzerinnen und Benutzer.

## Starten

```bash
npm install
npm run dev
```

## PC-Server

Der Python-Server im Ordner `pc-server` wird wie folgt vorbereitet und gestartet:

```bash
cd pc-server
pip install -r requirements.txt
python server.py
```
