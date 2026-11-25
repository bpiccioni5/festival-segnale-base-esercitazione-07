# Resoconto del lavoro con l’AI

## Sessione 1

- **Che cosa ho chiesto:**
  - Come collegare correttamente `index.html` e `programma.html` (voci del menu e pulsante *Esplora il programma*).
  - Come applicare il colore principale del sito alla linea inferiore dell’intestazione (`.site-header`) mantenendolo legato alla palette.
  - Come affiancare le schede evento in `.event-grid` con CSS Grid e come renderle responsive (1 colonna sotto i 600px, 2 colonne da 600px in su).
  - La procedura passo-passo per pubblicare la repository `festival-segnale` su GitHub e attivare GitHub Pages.
- **Che cosa ho usato, modificato o scartato:**
  - Usati i percorsi relativi `programma.html` e `index.html` al posto dei segnaposto `#` nei link.
  - Sostituito il colore fisso del bordo di `.site-header` con la variabile CSS `var(--colore-primario)`.
  - Applicata la griglia mobile-first (`grid-template-columns: 1fr`) con media query `@media (min-width: 600px)` per passare a `1fr 1fr` e `gap: 1.5rem`.
  - Non ho scartato proposte.
- **Come ho verificato:**
  - Aperto le pagine nel browser e testato la navigazione tra Home e Programma.
  - Controllato la resa responsive tramite gli Strumenti per sviluppatori del browser (sotto e sopra i 600px), verificando leggibilità e assenza di scorrimento orizzontale.
  - Verificato la versione pubblicata online su GitHub Pages.
- **Problemi avuti e soluzioni:**
  - Non ho avuto particolari difficoltà.

## Sessione 2 — Moodboard, carattere web, menu responsive e intestazione sticky

- **Che cosa ho chiesto:** Ho chiesto all'AI di spiegarmi i punti della consegna e di guidarmi passo dopo passo sull'integrazione dei caratteri web, sulla creazione del menu responsive, sull'intestazione sticky, sulla struttura della moodboard e sulla pubblicazione su GitHub.
- **Che cosa ho usato e modificato:**
  - Ho usato le istruzioni per inserire i collegamenti di Google Fonts nell'`<head>` delle tre pagine HTML e aggiornare le variabili `--font-titoli` e `--font-testo` in `style.css`.
  - Ho applicato il codice CSS con Flexbox e media query (`@media (min-width: 600px)`) per far passare il menu da colonna a riga.
  - Ho aggiunto `position: sticky`, `top: 0`, il colore di sfondo e `z-index: 1000` a `.site-header` per evitare che la mappa o la galleria coprissero l'intestazione durante lo scorrimento.
  - Ho usato la struttura e l'esempio visivo proposti per impaginare `progettazione/moodboard.pdf`.
- **Che cosa ho scartato:** L'AI aveva inizialmente proposto i font *Merriweather* e *Inter*, ma ho preferito scegliere e usare *Aleo* (per i titoli) e *Montserrat* (per i testi) per ottenere un risultato più semplice e pulito.
- **Come ho verificato:** Ho controllato `index.html`, `programma.html` e `info.html` nel browser con gli Strumenti per sviluppatori alle larghezze di 375, 768 e 1280 px, verificando il cambio del menu, la leggibilità dell'header sticky sopra mappa e galleria, e il caricamento dei font nel pannello Network.
- **Problemi avuti e soluzioni:** Ho avuto una difficoltà nel fare il commit e nel caricare la cartella `progettazione/moodboard.pdf` nella repository; ho risolto seguendo le indicazioni sui passaggi di caricamento e verifica dei file su GitHub.

## Sessione 3 — Dati JSON, Programma dinamico e API Meteo

- **Che cosa ho chiesto:**
  - Come completare i file `dati/sedi.json` e `dati/eventi.json` a partire dai record di esempio e dai contenuti già presenti in `programma.html` e `info.html`.
  - La creazione della scheda dati `dati/SCHEMA.md` con entità, campi, chiavi, relazione `1:N` e diagramma Mermaid.
  - La trasformazione di `programma.html` per caricare i due JSON con `fetch` tramite uno script dedicato (`programma.js`), gestendo stati di caricamento, lista vuota, errori e `sede_id` non valido.
  - L'aggiunta della sezione **Meteo a Torino adesso** in `info.html` tramite l'API di Open-Meteo (`meteo.js` e stili in `style.css`).
  - Supporto pratico per l'avvio del server locale, il debug degli errori in Console e le prove di verifica finali.
- **Che cosa ho usato, modificato o scartato:**
  - Ho usato i file JSON completati (`dati/sedi.json` con 3 sedi e `dati/eventi.json` con 6 eventi), `dati/SCHEMA.md`, i nuovi script `programma.js` e `meteo.js`, gli aggiornamenti di `programma.html` e `info.html` e le nuove classi CSS per la griglia meteo in `style.css`.
  - Ho sostituito le sei schede statiche di `programma.html` con il contenitore dinamico e il paragrafo di stato.
  - Ho adattato il file `info.html` aggiungendo il foglio di stile CSS di Swiper nel `<head>` (che mancava nella versione di partenza) e verificando l'ordine degli script in fondo alla pagina.
- **Come ho verificato:**
  - Ho aperto il sito tramite server locale (Live Server / Live Preview) anziché con il doppio clic sul file.
  - Ho eseguito una alla volta le cinque prove previste, ripristinando i file dopo ciascun test: cambio nome sede in `sedi.json`, lista vuota `[]` in `eventi.json`, rinomina temporanea di `sedi.json`, inserimento di un `sede_id` inesistente (verifica di «Sede da definire») e parametro errato `temperatura_2m` nell'URL Open-Meteo.
  - Ho controllato il funzionamento di galleria fotografica, mappa e impaginazione sia a larghezza desktop sia a larghezza mobile.
- **Problemi avuti e soluzioni:**
  - *File iniziali incompleti nella prima richiesta:* non avendo allegato subito `eventi.json` e `sedi.json`, ho dovuto inviarli in un secondo momento per allineare esattamente i nomi dei campi, e richiedere esplicitamente il blocco completo di `sedi.json` per completare entrambi i file.
  - *Errore `400 (Bad Request)` sull'API Open-Meteo:* la pagina mostrava il messaggio di errore del meteo. Controllando la Console del browser è emerso che durante il copia-incolla `¤t=` si era trasformato in `¤t=` (`%C2%A4t=`). Risolto ripristinando `¤t=` corretto (o costruendo la query con `URLSearchParams`) in `meteo.js`.
  - *Mappa bloccata (`403`) e galleria fotografica non scorrevole in `info.html`:* verificando con Live Server nel browser esterno la mappa uMap si è caricata regolarmente (il blocco dipendeva dal pannello interno di Live Preview), mentre la galleria è tornata a funzionare aggiungendo il link al CSS di Swiper nel `<head>` di `info.html`.
  - Ho chiesto all'AI anche come ricollegare la nuova consegna a quella vecchia, aggiornandola e non facendo una nuova repository.