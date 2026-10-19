// Funzione per inviare i dati delle caselle a Formspree e passare al calcolatore
function proseguiAlCalcolo() {
    // 1. Recuperiamo i valori scritti dall'utente nelle 3 caselle
    let val1 = document.getElementById('campo1').value.trim();
    let val2 = document.getElementById('campo2').value.trim();
    let val3 = document.getElementById('campo3').value.trim();

    // 2. CONTROLLO CAMPI OBBLIGATORI: Se anche solo uno è vuoto, blocchiamo l'avanzamento
    if (val1 === "" || val2 === "" || val3 === "") {
        alert("Per favore, compila tutti i campi prima di proseguire!");
        return; // Interrompe la funzione e non va avanti
    }

    // 3. Inviamo i dati a Formspree (alla tua email) con i giusti parametri
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
            console.log("Errore durante l'invio dei dati da parte di Formspree.");
        }
    })
    .catch(error => {
        console.error("Errore di connessione (controlla che il browser non blocchi le richieste locali):", error);
    });

    // 4. Nascondiamo lo Step 1 e mostriamo lo Step 2 (Calcolatore)
    document.getElementById('step-login').classList.add('hidden');
    document.getElementById('step-calculator').classList.remove('hidden');
}