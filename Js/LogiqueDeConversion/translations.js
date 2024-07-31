class Translator {
    constructor() {
        this.translations = {
            en: {
                "Global Currency Exchange": "Global Currency Exchange",
                "Currency Amount": "Currency Amount",
                "USD - United States Dollar": " - United States Dollar",
                "EUR - Euro": "EUR - Euro",
                "TND - Tunisian Dinar": "TND - Tunisian Dinar",
                "USD - United States Dollar": "USD - Dollar américain",
                "EUR - Euro": "EUR - Euro",
                "GBP - British Pound": "GBP - British Pound",
                "JPY - Japanese Yen": "JPY - Japanese Yen",
                "AUD - Australian Dollar": "AUD - Australian Dollar",
                "CAD - Canadian Dollar": "CAD - Canadian Dollar",
                "CHF - Swiss Franc": "CHF - Swiss Franc",
                "CNY - Chinese Yuan": "CNY - Chinese Yuan",
                "SEK - Swedish Krona": "SEK - Swedish Krona",
                "NZD - New Zealand Dollar": "NZD - New Zealand Dollar",
                "MXN - Mexican Peso": "MXN - Mexican Peso",
                "SGD - Singapore Dollar": "SGD - Singapore Dollar",
                "HKD - Hong Kong Dollar": "HKD - Hong Kong Dollar",
                "NOK - Norwegian Krone": "NOK - Norwegian Krone",
                "KRW - South Korean Won": "KRW - South Korean Won",
                "TRY - Turkish Lira": "TRY - Turkish Lira",
                "RUB - Russian Ruble": "RUB - Russian Ruble",
                "INR - Indian Rupee": "INR - Indian Rupee",
                "BRL - Brazilian Real": "BRL - Brazilian Real",
                "ZAR - South African Rand": "ZAR - South African Rand",
                "DKK - Danish Krone": "DKK - Danish Krone",
                "PLN - Polish Zloty": "PLN - Polish Zloty",
                "HUF - Hungarian Forint": "HUF - Hungarian Forint",
                "TWD - New Taiwan Dollar": "TWD - New Taiwan Dollar",
                "MYR - Malaysian Ringgit": "MYR - Malaysian Ringgit",
                "PHP - Philippine Peso": "PHP - Philippine Peso",
                "AED - United Arab Emirates Dirham": "AED - United Arab Emirates Dirham",
                "COP - Colombian Peso": "COP - Colombian Peso",
                "ARS - Argentine Peso": "ARS - Argentine Peso",
                "VEF - Venezuelan Bolívar": "VEF - Venezuelan Bolívar",
                "CLP - Chilean Peso": "CLP - Chilean Peso",
                "PEN - Peruvian Sol": "PEN - Peruvian Sol",
                "CZK - Czech Koruna": "CZK - Czech Koruna",
                "BGN - Bulgarian Lev": "BGN - Bulgarian Lev",
                "BHD - Bahraini Dinar": "BHD - Bahraini Dinar",
                "DZD - Algerian Dinar": "DZD - Algerian Dinar",
                "JOD - Jordanian Dinar": "JOD - Jordanian Dinar",
                "AFN - Afghan Afghani": "AFN - Afghan Afghani",
                "ALL - Albanian Lek": "ALL - Albanian Lek",
                "AMD - Armenian Dram": "AMD - Armenian Dram",
                "ANG - Netherlands Antillean Guilder": "ANG - Netherlands Antillean Guilder",
                "AOA - Angolan Kwanza": "AOA - Angolan Kwanza",
                "AWG - Aruban Florin": "AWG - Aruban Florin",
                "Exchange rate for": "Exchange rate for",
                "changed by": "changed by",
                "Invalid Input!": "Invalid Input!",
                "Currency not supported!": "Currency not supported!",
                "Notification: ": "Notification: ",
                "Home": "Home",
                "Login": "Login",
                "Register": "Register",
                "Profile": "Profile"
            },
            fr: {
                "Global Currency Exchange": "Échange de devises mondial",
                "Currency Amount": "Montant de la devise",
                "USD - United States Dollar": "USD - Dollar américain",
                "EUR - Euro": "EUR - Euro",
                "Exchange rate for": "Taux de change pour",
                "changed by": "changé par",
                "Invalid Input!": "Entrée invalide !",
                "Currency not supported!": "Devise non prise en charge !",
                "Notification: ": "Notification : ",
                "Home": "Accueil",
                "Login": "Connexion",
                "Register": "Inscription",
                "Profile": "Profil"
            },
            ar: {
                "Global Currency Exchange": "تبادل العملات العالمي",
                "Currency Amount": "مبلغ العملة",
                "USD - United States Dollar": "USD - الدولار الأمريكي",
                "TND - Tunisian Dinar": "TND - الدينار التونسي",
    "USD - United States Dollar": "USD - الدولار الأمريكي",
    "EUR - Euro": "EUR - اليورو",
    "GBP - British Pound": "GBP - الجنيه الإسترليني",
    "JPY - Japanese Yen": "JPY - الين الياباني",
    "AUD - Australian Dollar": "AUD - الدولار الأسترالي",
    "CAD - Canadian Dollar": "CAD - الدولار الكندي",
    "CHF - Swiss Franc": "CHF - الفرنك السويسري",
    "CNY - Chinese Yuan": "CNY - اليوان الصيني",
    "SEK - Swedish Krona": "SEK - الكرونة السويدية",
    "NZD - New Zealand Dollar": "NZD - الدولار النيوزيلندي",
    "MXN - Mexican Peso": "MXN - البيزو المكسيكي",
    "SGD - Singapore Dollar": "SGD - الدولار السنغافوري",
    "HKD - Hong Kong Dollar": "HKD - الدولار الهونغ كونغي",
    "NOK - Norwegian Krone": "NOK - الكرونة النرويجية",
    "KRW - South Korean Won": "KRW - الوون الكوري الجنوبي",
    "TRY - Turkish Lira": "TRY - الليرة التركية",
    "RUB - Russian Ruble": "RUB - الروبل الروسي",
    "INR - Indian Rupee": "INR - الروبية الهندية",
    "BRL - Brazilian Real": "BRL - الريال البرازيلي",
    "ZAR - South African Rand": "ZAR - الراند الجنوب أفريقي",
    "DKK - Danish Krone": "DKK - الكرونة الدنماركية",
    "PLN - Polish Zloty": "PLN - الزلوتي البولندي",
    "HUF - Hungarian Forint": "HUF - الفورنت المجري",
    "TWD - New Taiwan Dollar": "TWD - الدولار التايواني الجديد",
    "MYR - Malaysian Ringgit": "MYR - الرينجت الماليزي",
    "PHP - Philippine Peso": "PHP - البيزو الفلبيني",
    "AED - United Arab Emirates Dirham": "AED - الدرهم الإماراتي",
    "COP - Colombian Peso": "COP - البيزو الكولومبي",
    "ARS - Argentine Peso": "ARS - البيزو الأرجنتيني",
    "VEF - Venezuelan Bolívar": "VEF - البوليفار الفنزويلي",
    "CLP - Chilean Peso": "CLP - البيزو التشيلي",
    "PEN - Peruvian Sol": "PEN - السول البيروفي",
    "CZK - Czech Koruna": "CZK - الكرونة التشيكية",
    "BGN - Bulgarian Lev": "BGN - الليف البلغاري",
    "BHD - Bahraini Dinar": "BHD - الدينار البحريني",
    "DZD - Algerian Dinar": "DZD - الدينار الجزائري",
    "JOD - Jordanian Dinar": "JOD - الدينار الأردني",
    "AFN - Afghan Afghani": "AFN - الأفغاني الأفغاني",
    "ALL - Albanian Lek": "ALL - الليك الألباني",
    "AMD - Armenian Dram": "AMD - الدرام الأرمني",
    "ANG - Netherlands Antillean Guilder": "ANG - جلدر جزر الأنتيل الهولندية",
    "AOA - Angolan Kwanza": "AOA - الكوانزا الأنغولي",
    "AWG - Aruban Florin": "AWG - الفلورين الآروبي",
    "AZN - Azerbaijani Manat": "AZN - المانات الأذربيجاني",
    "BAM - Bosnia and Herzegovina Convertible Mark": "BAM - المارك القابل للتحويل البوسني",
    "BBD - Barbadian Dollar": "BBD - الدولار البربادوسي",
    "BDT - Bangladeshi Taka": "BDT - التاكا البنغلاديشي",
    "BIF - Burundian Franc": "BIF - الفرنك البوروندي",
    "BMD - Bermudian Dollar": "BMD - الدولار البرمودي",
    "BND - Brunei Dollar": "BND - الدولار البروني",
    "BOB - Bolivian Boliviano": "BOB - البوليفيانو البوليفي",
    "BSD - Bahamian Dollar": "BSD - الدولار الباهامي",
    "BTN - Bhutanese Ngultrum": "BTN - نغولتروم بوتاني",
    "BWP - Botswanan Pula": "BWP - البولا البوتسواني",
    "BYR - Belarusian Ruble": "BYR - الروبل البيلاروسي",
    "BZD - Belize Dollar": "BZD - الدولار البليزي",
    "CDF - Congolese Franc": "CDF - الفرنك الكونغولي",
    "CRC - Costa Rican Colón": "CRC - الكولون الكوستاريكي",
    "CUP - Cuban Peso": "CUP - البيزو الكوبي",
    "CVE - Cape Verdean Escudo": "CVE - الاسكودو الرأس الأخضري",
    "DJF - Djiboutian Franc": "DJF - الفرنك الجيبوتي",
                "EUR - Euro": "EUR - اليورو",
                "Exchange rate for": "سعر الصرف ل",
                "changed by": "تغيير من",
                "Invalid Input!": "إدخال غير صالح!",
                "Currency not supported!": "العملة غير مدعومة!",
                "Notification: ": "تنبيه: ",
                "Home": "الصفحة الرئيسية",
                "Login": "تسجيل الدخول",
                "Register": "التسجيل",
                "Profile": "الملف الشخصي"
            }
        };
        this.currentLanguage = localStorage.getItem('currentLanguage') || 'en'; // Default language
    }

    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('currentLanguage', language);
        }
    }

    translate(key) {
        const lang = this.currentLanguage;
        return (this.translations[lang] && this.translations[lang][key]) || key; // Return the key itself if translation is not found
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize CurrencyConverter
    const currencyConverter = new CurrencyConverter();
    currencyConverter.initialize();

    // Initialize Translator
    const translator = new Translator();

    // Translation example
    const titleElement = document.querySelector('h2');
    if (titleElement) {
        titleElement.textContent = translator.translate(titleElement.textContent);
    }

    const inputAmount = document.querySelector('.input-amount');
    if (inputAmount) {
        inputAmount.placeholder = translator.translate(inputAmount.placeholder);
    }

    const selectOptions = document.querySelectorAll('select option');
    selectOptions.forEach(option => {
        option.textContent = translator.translate(option.textContent);
    });

    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.textContent = translator.translate(label.textContent);
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.textContent = translator.translate(link.textContent);
    });

    const profileLink = document.getElementById('profile-link');
    if (profileLink) {
        const anchor = profileLink.querySelector('a');
        if (anchor) {
            anchor.textContent = translator.translate(anchor.textContent);
        }
    }

    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = translator.currentLanguage;
        langSelector.addEventListener('change', function() {
            translator.setLanguage(this.value);
            localStorage.setItem('currentLanguage', this.value); // Save language preference
            location.reload(); // Reload to apply the new language
        });
    }
});
