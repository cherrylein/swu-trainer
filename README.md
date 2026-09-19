# SWU Trainer

Minimaler, inoffizieller Puzzle-Prototyp für Star Wars: Unlimited. Das GitHub-Repository war bei der Einrichtung leer.

## Lokal starten

Voraussetzung: Node.js 22.12 oder neuer (empfohlen: aktuelle Node-22-LTS-Version) und npm.

```sh
npm ci
npm run cf-typegen
npm run dev
```

Die von Vite ausgegebene lokale URL öffnen (normalerweise http://localhost:5173). Für die lokale Entwicklung wird kein Cloudflare-Konto benötigt.

## Was vorhanden ist

- React + TypeScript + Vite mit dem offiziellen Cloudflare-Vite-Plugin.
- Ein einzelner Worker mit statischen Frontend-Assets und `GET /api/health`; unbekannte API-Pfade liefern JSON mit Status 404, andere Methoden 405.
- `packages/swu-engine/index.ts`: UI-unabhängige, unveränderlich arbeitende Angriffsfunktionen, Zielprüfung und Puzzle-Ergebnis.
- `src/puzzles/`: lokale Puzzle-Daten, getrennt von Regeln und Oberfläche.
- Zwei spielbare Übungen: ein Angriffspuzzle mit Wachposten sowie eine Ressourcenentscheidung aus einer Ahsoka-Starthand.
- Spielbrett mit deutschen Kartenabbildungen, Zielauswahl, Wachposten, gleichzeitigem Kampfschaden, Erschöpfen, Sieg/Fehlschlag, Hinweis, Aktionsprotokoll, Rückgängig und Neustart.
- Keine Datenbank, Accounts, externe Kartendaten oder zusätzliche Cloud-Dienste. Zustand nur im Arbeitsspeicher; Neuladen setzt zurück.

Die Übungen nutzen deutsche Kartenbilder aus der vom Nutzer vorgeschlagenen ForceTable-CDN-Quelle. Sie werden extern geladen und nicht ins Repository kopiert. Karteninhalt und Artworks gehören Fantasy Flight Games/Asmodee. Der Gegner passt nach jedem Angriff. Es gibt keine neue Runde, Leader, Trigger oder weiteren Schlüsselwörter. Dies ist ein gezielter Trainer, keine vollständige Partie oder Regelengine. Die Lösung des ersten Puzzles: Vernestra Rwoh gegen Loth-Wolf, anschließend Gefräßiger Gundark gegen Basis. In der Ressourcenübung werden der Dagoyanische Meister und Anakin Skywalker als Ressourcen gewählt. Die Grundregeln zu Angriffen und Wachposten orientieren sich am [offiziellen Quickstart](https://images-cdn.fantasyflightgames.com/filer_public/36/f6/36f6e0a5-a7a9-4cbe-8d73-70e61fe6f548/sw_unlimited_quickstart_rules.pdf).

## Prüfen und Produktionsstand ansehen

```sh
npm test
npm run deploy:check
npm run preview
```

`deploy:check` führt Typprüfung, Produktionsbuild und Wrangler-Dry-Run aus; es veröffentlicht nichts. `preview` startet den gebauten Stand lokal in der Workers-Laufzeit. Nach Änderungen an `wrangler.jsonc` erneut `npm run cf-typegen` ausführen. Die generierte Typdatei ist absichtlich nicht versioniert.

## Auf Cloudflare veröffentlichen

```sh
npx wrangler login
npm run cf-typegen
npm run deploy
```

Beim tatsächlichen Deployment wird der Worker `swu-trainer` im angemeldeten Cloudflare-Konto angelegt bzw. aktualisiert. Wrangler zeigt danach die URL an. Der Build enthält Frontend und Worker zusammen. Es müssen keine Datenbank oder Speicher-Bindings angelegt werden.

Optional nach dem Push: das Repository in Cloudflare unter Workers & Pages importieren, Projektwurzel `/`, Build-Befehl `npm run cf-typegen && npm run build`, Deploy-Befehl `npx wrangler deploy`. Abhängigkeiten werden mit npm anhand des Lockfiles installiert. Die Git-Verbindung muss im Cloudflare-Konto eingerichtet werden; dieses Projekt erstellt sie nicht automatisch.

Grundlage: [Cloudflare React + Vite](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/). Noch kein Live-Deployment eingerichtet.
