# Third-Party Notices

The MIT license in `LICENSE` covers only this project's own code. The bundled third-party components below keep their original licenses.

## MapLibre GL JS 4.7.1 — BSD-3-Clause
- Files: `lib/maplibre-gl.js`, `lib/maplibre-gl.css`
- Full license and copyright notices: `lib/LICENSE.txt`. Keep them unchanged.
- https://github.com/maplibre/maplibre-gl-js

## Fonts — SIL Open Font License 1.1
- `fonts/Montserrat-subset.woff2`: subset of Montserrat (Copyright The Montserrat Project Authors). License: `fonts/OFL-Montserrat.txt`.
- `fonts/NotoSansSC-subset.woff2`: subset of Noto Sans SC (Copyright Google LLC / Adobe). License: `fonts/OFL-Noto.txt`.
- These are modified (subset) versions. Under the OFL they may not be sold on their own.

## Map data and tiles
At runtime the browser loads vector tiles and glyphs online from **OpenFreeMap** (`tiles.openfreemap.org`). They are not bundled in this repository.
- Required attribution, which the tool draws on every poster: **© OpenFreeMap © OpenMapTiles Data © OpenStreetMap contributors**
- **OpenStreetMap** data is licensed under the **ODbL 1.0**: https://www.openstreetmap.org/copyright
- **OpenMapTiles** schema/styles: https://openmaptiles.org/ (BSD-3 / CC-BY 4.0)
- **OpenFreeMap** is a free public service: https://openfreemap.org/ . Respect its terms and fair use. Do not bulk-download tiles, run stress tests or misuse it commercially. For heavy use, self-host the tiles.
- Exported posters contain OSM-derived map imagery and must keep the attribution above.

## Sample GPX
The route geometry in `samples/beijing-fictional-ride.gpx` comes from the public OSRM demo, based on OSM data (ODbL). Its times and elevations are synthetic: it is a fictional activity. The other samples are fully synthetic.
