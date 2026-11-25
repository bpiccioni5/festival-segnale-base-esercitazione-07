const parametriMeteo = new URLSearchParams({
  latitude: '45.0703',
  longitude: '7.6869',
  current: 'temperature_2m,wind_speed_10m',
  timezone: 'Europe/Rome',
});
const URL_METEO = `https://api.open-meteo.com/v1/forecast?${parametriMeteo}`;

const statoMeteo = document.getElementById('stato-meteo');
const contenitoreDati = document.getElementById('dati-meteo');
const campoTemperatura = document.getElementById('meteo-temperatura');
const campoVento = document.getElementById('meteo-vento');
const campoOra = document.getElementById('meteo-ora');

function formattaNumero(valore) {
  return new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: 1,
  }).format(valore);
}

function formattaOraDato(dataOraIso) {
  const [parteData, parteOra] = dataOraIso.split('T');
  const [anno, mese, giorno] = parteData.split('-').map(Number);
  const [ore, minuti] = parteOra.split(':').map(Number);
  const data = new Date(anno, mese - 1, giorno, ore, minuti);

  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(data);
}

async function caricaMeteo() {
  try {
    const risposta = await fetch(URL_METEO);

    if (!risposta.ok) {
      throw new Error(`Risposta non valida dal server (${risposta.status}).`);
    }

    const dati = await risposta.json();
    const attuale = dati.current;
    const unita = dati.current_units || {};

    if (
      !attuale ||
      typeof attuale.temperature_2m !== 'number' ||
      typeof attuale.wind_speed_10m !== 'number' ||
      typeof attuale.time !== 'string'
    ) {
      throw new Error('Dati meteo incompleti.');
    }

    const unitaTemperatura = unita.temperature_2m || '°C';
    const unitaVento = unita.wind_speed_10m || 'km/h';

    campoTemperatura.textContent = `${formattaNumero(attuale.temperature_2m)} ${unitaTemperatura}`;
    campoVento.textContent = `${formattaNumero(attuale.wind_speed_10m)} ${unitaVento}`;
    campoOra.textContent = formattaOraDato(attuale.time);

    statoMeteo.hidden = true;
    contenitoreDati.hidden = false;
  } catch (errore) {
    console.error(errore);
    contenitoreDati.hidden = true;
    statoMeteo.hidden = false;
    statoMeteo.textContent =
      'Dati meteo momentaneamente non disponibili. Il resto della pagina resta consultabile normalmente.';
  }
}

caricaMeteo();