const contenitoreEventi = document.getElementById('griglia-eventi');
const statoProgramma = document.getElementById('stato-programma');

function formattaData(dataIso) {
  const [anno, mese, giorno] = dataIso.split('-').map(Number);
  const data = new Date(anno, mese - 1, giorno);
  const formattata = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(data);
  return formattata.charAt(0).toUpperCase() + formattata.slice(1);
}

function creaSchedaEvento(evento, sediPerId) {
  const scheda = document.createElement('article');
  scheda.className = 'event-card';

  const img = document.createElement('img');
  img.src = evento.immagine;
  img.alt = evento.immagine_alt;
  img.width = 900;
  img.height = 600;

  const body = document.createElement('div');
  body.className = 'event-body';

  const meta = document.createElement('p');
  meta.className = 'event-meta';
  meta.textContent = `${formattaData(evento.data)} · ${evento.orario} · ${evento.categoria}`;

  const titolo = document.createElement('h3');
  titolo.textContent = evento.titolo;

  const descrizione = document.createElement('p');
  descrizione.textContent = evento.descrizione;

  const luogo = document.createElement('p');
  luogo.className = 'event-place';

  const etichettaSede = document.createElement('strong');
  etichettaSede.textContent = 'Sede: ';

  const sede = sediPerId.get(evento.sede_id);
  const nomeSede = sede ? sede.nome : 'Sede da definire';

  luogo.append(etichettaSede, nomeSede);
  body.append(meta, titolo, descrizione, luogo);
  scheda.append(img, body);

  return scheda;
}

async function caricaProgramma() {
  statoProgramma.hidden = false;
  statoProgramma.textContent = 'Caricamento del programma in corso…';
  contenitoreEventi.replaceChildren();

  try {
    const [rispostaEventi, rispostaSedi] = await Promise.all([
      fetch('dati/eventi.json'),
      fetch('dati/sedi.json'),
    ]);

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error('Impossibile leggere uno dei file JSON.');
    }

    const [eventi, sedi] = await Promise.all([
      rispostaEventi.json(),
      rispostaSedi.json(),
    ]);

    if (!Array.isArray(eventi) || !Array.isArray(sedi)) {
      throw new Error('Formato dei dati non valido.');
    }

    if (eventi.length === 0) {
      statoProgramma.textContent = 'Nessun evento in programma al momento.';
      return;
    }

    const sediPerId = new Map(sedi.map((sede) => [sede.id, sede]));
    const frammento = document.createDocumentFragment();

    for (const evento of eventi) {
      frammento.append(creaSchedaEvento(evento, sediPerId));
    }

    contenitoreEventi.append(frammento);
    statoProgramma.textContent = '';
    statoProgramma.hidden = true;
  } catch (errore) {
    console.error(errore);
    statoProgramma.hidden = false;
    statoProgramma.textContent = 'Impossibile caricare il programma. Riprova più tardi.';
  }
}

caricaProgramma();