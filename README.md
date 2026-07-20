# Alan Al-Jamour — CV Portfolio

En personlig og responsiv CV- og portfoliohjemmeside, der præsenterer min profil som softwareudvikler, mine tekniske kompetencer, projekter og faglige retning.

## Live hjemmeside

Når GitHub Pages er aktiveret, kan hjemmesiden besøges her:

**https://aljamour.github.io/alan-cv-portfolio/**

## Om projektet

Portfolioen er udviklet som en statisk hjemmeside med fokus på:

- Et professionelt og personligt udtryk
- Responsivt design til både desktop og mobil
- Præsentation af tekniske kompetencer
- Udvalgte softwareprojekter
- Kontaktoplysninger og links til GitHub og LinkedIn
- Light/dark mode
- Mulighed for at udskrive siden som CV

## Teknologier

- HTML5
- CSS3
- JavaScript
- Responsive design
- Git og GitHub
- GitHub Pages

## Projektstruktur

```text
alan-cv-portfolio/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Kør projektet lokalt

Projektet kræver ingen installation eller build-proces.

### Mulighed 1: Åbn direkte i browseren

Åbn `index.html` direkte fra projektmappen.

### Mulighed 2: Brug Live Server i Visual Studio Code

1. Installér udvidelsen **Live Server**
2. Højreklik på `index.html`
3. Vælg **Open with Live Server**

Siden åbner typisk på:

```text
http://127.0.0.1:5500
```

### Mulighed 3: Start en simpel lokal server

Hvis Python er installeret:

```bash
python -m http.server 5500
```

Åbn derefter:

```text
http://localhost:5500
```

## Deployment med GitHub Pages

Hjemmesiden er statisk og kan derfor deployes direkte fra `main`-branchen uden en build-proces.

1. Åbn repositoryets **Settings**
2. Vælg **Pages** under **Code and automation**
3. Under **Build and deployment** vælges:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
4. Tryk **Save**

GitHub viser derefter adressen til den publicerede hjemmeside.

## Opdater hjemmesiden

Når der er foretaget ændringer lokalt:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages publicerer automatisk ændringerne fra `main`.

## Anbefalet arbejdsgang

For at holde projektet stabilt:

1. Foretag ændringer lokalt
2. Test siden med Live Server
3. Kontrollér links, layout og mobilvisning
4. Commit ændringerne med en beskrivende besked
5. Push til `main`
6. Kontrollér den publicerede hjemmeside

Eksempel:

```bash
git add .
git commit -m "Improve contact section layout"
git push origin main
```

## Fremtidige forbedringer

- Eget domæne
- Projektsider med mere detaljerede case studies
- Screenshots og live demonstrationer af projekter
- Downloadbart CV som PDF
- Bedre accessibility og performance
- Open Graph metadata til deling på LinkedIn

## Kontakt

- GitHub: [@aljamour](https://github.com/aljamour)
- Email: [aal.jamour9@gmail.com](mailto:aal.jamour9@gmail.com)

## Licens

Dette projekt er min personlige CV- og portfoliohjemmeside. Koden må bruges som inspiration, men indhold, tekster og personlig branding tilhører Alan Al-Jamour.
