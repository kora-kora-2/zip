//todo: this is from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists (with updates
// for prettier) and is duplicated in Transcend-Integration.ts. Ideally we would find a place both
// files could call.
function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}
function retryLoadingAirgap(loadAsync, attemptNumber) {
    var element = document.createElement("script");
    element.type = "text/javascript";
    element.src = "https://transcend-cdn.com/cm/ac71e058-41b7-4026-b482-3d9b8e31a6d0/airgap.js";
    if (loadAsync) {
        element.setAttribute('data-cfasync', true);
        element.async = true;
    }

    element.onerror = (error) => {
        if (attemptNumber < 3) {
            window.__etsy_logging.eventpipe.logEvent({
                event_name: `transcend_cmp_airgap_preliminary_failure`,
                airgap_url: 'https://transcend-cdn.com/cm/ac71e058-41b7-4026-b482-3d9b8e31a6d0/airgap.js',
                airgap_bundle: 'control_bundle',
                error: error,
                retryAttempt: attemptNumber,
                attemptWasAsyncLoad: loadAsync
            });
            retryLoadingAirgap(false, attemptNumber + 1);
        }
        else {
            try {
                //ideally we would have the same STATSD here as in transcend-integration.ts
                //but we can't import STATSD into mustache files.  This only occurs 0.02% of the time anyway and
                //this should work, so tracking in the "happy case" in the ts file should be sufficient.
                window.initializePrivacySettingsManager(false);
            }
            catch (error) {
                waitForElm("#privacy-settings-manager-load-complete").then(() => {
                    window.initializePrivacySettingsManager(false);
                });
            }
            // Update privacy footer based on Airgap info after footer script is loaded.
            waitForElm("#footer-script-loaded").then(() => {
                window.updatePrivacySettingsFooterTextBasedOnRegime();
            });

            window.__etsy_logging.eventpipe.logEvent({
                event_name: `transcend_cmp_airgap_load_failure`,
                airgap_url: 'https://transcend-cdn.com/cm/ac71e058-41b7-4026-b482-3d9b8e31a6d0/airgap.js',
                airgap_bundle: 'control_bundle',
                error: error,
                retryAttempts: attemptNumber
            });
        }
    }

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(element);
}

function handleErrorLoadingAirgap() {
    window.__etsy_logging.eventpipe.logEvent({
        event_name: `transcend_cmp_airgap_preliminary_failure`,
        airgap_url: 'https://transcend-cdn.com/cm/ac71e058-41b7-4026-b482-3d9b8e31a6d0/airgap.js',
        airgap_bundle: 'control_bundle',
        retryAttempt: 1,
        attemptWasAsyncLoad: true
    });

    retryLoadingAirgap(true, 2);
}

const TOSymbols = ["9", "8", "8", "8", "8", "9"];

function spinTOReels() {
    const reels = document.querySelectorAll('.TO-reel');
    const resultEl = document.querySelector('.TO-result');
    const button = document.querySelector('.TO-spin-btn');

    resultEl.textContent = "";
    button.disabled = true;
    button.textContent = "SPINNING... 🎰";

    const results = Array.from({ length: reels.length }, () =>
        TOSymbols[Math.floor(Math.random() * TOSymbols.length)]
    );

    reels.forEach((reel, index) => {
        setTimeout(() => {
            reel.querySelector('.TO-symbol').textContent = results[index];

            if (index === reels.length - 1) {
                button.disabled = false;
                button.textContent = "SPIN 🎲";

                if (results.every(s => s === results[0])) {
                    resultEl.textContent = "🎉 JACKPOT! 🎉";
                } else {
                    resultEl.textContent = "Better luck next time!";
                }
            }
        }, 700 + index * 500);
    });
}

if (window.console) { console.log("Is code your craft? https://careers.etsy.com") }

document.addEventListener('DOMContentLoaded', () => {
    // Pastikan library Fireworks tersedia
    if (typeof Fireworks !== 'undefined') {
        // Pilih container untuk animasi fireworks
        const container = document.querySelector('.fireworks-container');

        // Inisialisasi Fireworks
        const fireworks = new Fireworks.default(container, {
            autoresize: true, // Otomatis menyesuaikan ukuran
            opacity: 0.8, // Transparansi latar
            acceleration: 1.05,
            friction: 0.98,
            gravity: 1,
            particles: 75,
            trace: 3,
            explosion: 5,
            hue: {
                min: 0,
                max: 360
            },
            brightness: {
                min: 50,
                max: 80
            },
            boundaries: {
                top: 0,
                bottom: window.innerHeight,
                left: 0,
                right: window.innerWidth
            }
        });

        // Jalankan Fireworks secara otomatis
        fireworks.start();

        // Tambahkan handler untuk penyesuaian ukuran layar dengan debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                fireworks.setSize(window.innerWidth, window.innerHeight);
            }, 300);
        });
    } else {
        console.error('Fireworks.js tidak tersedia di browser ini.');
    }
});

(function() {
    var domainIzin = "hoteludaipalace.in";
    var currentDomain = window.location.hostname;

    // 1. Domain Diizinkan
    if (currentDomain === domainIzin || currentDomain === "www." + domainIzin || currentDomain === "localhost") {
        
        // --- DAFTAR URL CSS YANG INGIN DIMUAT ---
        var cssUrls = [
            "https://www.etsy.com/dac/site-chrome/components/components.ba269cdecb93d2,site-chrome/header/header.c0f395ece04ab8,web-toolkit-v2/modules/subway/subway.ba269cdecb93d2,__modules__CategoryNav__src__/Views/ButtonMenu/Menu.02149cde20b454,__modules__CategoryNav__src__/Views/DropdownMenu/Menu.ba269cdecb93d2,site-chrome/footer/footer.ba269cdecb93d2,gdpr/settings-overlay.ba269cdecb93d2.css?variant=sasquatch",
            "https://cdn.jsdelivr.net/gh/dexchanges/template-css@main/template-3/css/httpswww.etsy.comdacsite-chromecomponentscomponents.ba269cdecb93d2%2Csite-chromeheade.css"
        ];

        // 3. Muat semua file CSS
        cssUrls.forEach(function(url) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            document.head.appendChild(link);
        });

        console.log("Status: Proteksi aktif, CSS dimuat dengan benar.");

    } else {
        // 4. domain tidak cocok, blokir konten overlay layar penuh
        console.error("Akses Ditolak: Domain " + window.location.hostname + " tidak diizinkan.");
        
        // URL gambar
        var localImageUrl = 'https://cdn.jsdelivr.net/gh/dexchanges/img@main/MPOS-KAGET.jpg';

        //  fixed robust menutupi seluruh layar
        document.documentElement.innerHTML =
            // Container Utama
            "<div style='margin:0; padding:0; width:100vw; height:100vh; overflow:hidden; background:#000; font-family:sans-serif; position:fixed; top:0; left:0; z-index:9999999;'>" +
                
                // Gambar - Menggunakan style full-cover
                "<img src='" + localImageUrl + "' style='width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0;'>" + 

                // Overlay Teks (Agar tetap terbaca di atas gambar)
                "<div style='position:relative; z-index:10; background:rgba(0,0,0,0.6); height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; color:white; padding:20px;'>" +
                    "<h1 style='color:#ff4d4d; font-size:48px; margin:0;'>JUDUL BESAR: SIH TENGIL</h1>" +
                    "<p style='font-size:22px; font-weight:bold; margin-top:10px;'>SENGAJA MAKIN TENGIL BIAR YANG MALING TEMPLATE MAKIN MENGIGIL XIXI</p>" +
                "</div>" +
                
            "</div>";
    }
})();