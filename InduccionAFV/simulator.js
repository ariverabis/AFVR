// Simulator Logic

const homeScreen = document.getElementById('homeScreen');
const appFrame = document.getElementById('appFrame');
const mainScreen = document.getElementById('mainScreen');
const manualLog = document.getElementById('manualLog');

// Store current app state
let currentApp = null;
let historyStack = [];

function launchApp(appName) {
    homeScreen.style.display = 'none';
    appFrame.classList.remove('hidden');
    currentApp = appName;

    let url = '';
    switch (appName) {
        case 'SDS':
            url = 'sds.html';
            break;
        case 'AFV':
            // TODO: Create afv_login.html or link to existing
            url = 'menu_ventas.html'; // Temporary link to existing menu
            break;
        case 'Catalog':
            url = 'catalog.html';
            break;
        default:
            goHome();
            return;
    }

    // Check if file exists (mock check for now, simulation assumes files exist)
    appFrame.src = url;
}

function goHome() {
    appFrame.src = 'about:blank';
    appFrame.classList.add('hidden');
    homeScreen.style.display = 'flex';
    currentApp = null;
    historyStack = [];
}

function goBack() {
    if (currentApp) {
        // Simple back logic for iframe history
        try {
            appFrame.contentWindow.history.back();
        } catch (e) {
            console.log("Cannot access iframe history due to cross-origin or other error");
        }
    }
}

// PDF Generation Logic (Placeholder for now)
async function generatePDFManual() {
    manualLog.innerHTML = "Generando manual... por favor espere.";

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Manual de Usuario - AFV Simulator", 10, 20);
    doc.setFontSize(12);
    doc.text("Este manual ha sido generado automáticamente desde el simulador.", 10, 30);

    // Future implementation:
    // 1. Iterate through a defined list of "Screens" (URLs).
    // 2. Load each URL into a hidden iframe or div.
    // 3. Use html2canvas to take a screenshot.
    // 4. Add screenshot to PDF using doc.addImage().
    // 5. Add description text from a data object.

    doc.save("Manual_AFV.pdf");
    manualLog.innerHTML = "Manual descargado correctamente.";
}
