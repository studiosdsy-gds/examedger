import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the supported languages and their codes
const LANGUAGES = {
    'en': 'English',
    'hi': 'Hindi',
    'bn': 'Bengali',
    'te': 'Telugu',
    'mr': 'Marathi',
    'ta': 'Tamil',
    'ur': 'Urdu',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'or': 'Odia',
    'pa': 'Punjabi',
    'as': 'Assamese',
    'mai': 'Maithili',
    'sat': 'Santali',
    'ks': 'Kashmiri',
    'ne': 'Nepali',
    'kok': 'Konkani',
    'sd': 'Sindhi',
    'doi': 'Dogri',
    'mni': 'Manipuri',
    'brx': 'Bodo',
    'sa': 'Sanskrit'
};

// The Master Dictionary of Translations
const TRANSLATIONS = {
    "menu": {
        "en": "MENU",
        "hi": "मेनू",
        "bn": "মেনু",
        "te": "మెనూ",
        "mr": "मेनू",
        "ta": "மெனு",
        "gu": "મેનુ",
        "kn": "ಮೆನು",
        "ml": "മെനു",
        "pa": "ਮੇਨੂ"
    },
    "dashboard": {
        "en": "Dashboard",
        "hi": "डैशबोर्ड",
        "bn": "ডैशবোর্ড",
        "te": "డాష్‌బోర్డ్",
        "mr": "डॅशबोर्ड",
        "ta": "டாஷ்போர்டு",
        "gu": "ડેશબોર્ડ",
        "kn": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        "ml": "ഡാഷ്‌ബോർഡ്",
        "pa": "ਡੈਸ਼ਬੋਰਡ"
    },
    "exams": {
        "en": "Exams",
        "hi": "परीक्षाएँ",
        "bn": "পরীক্ষা",
        "te": "పరీక్షలు",
        "mr": "परीक्षा",
        "ta": "தேர்வுகள்",
        "gu": "પરીક્ષાઓ",
        "kn": "ಪರೀಕ್ಷೆಗಳು",
        "ml": "പരീക്ഷകൾ",
        "pa": "ਪ੍ਰੀਖਿਆਵਾਂ"
    },
    "photoStudio": {
        "en": "Photo Studio",
        "hi": "फोटो स्टूडियो",
        "bn": "ফটো স্টুডিও",
        "te": "ఫోటో స్టూడియో",
        "mr": "फोटो स्टुडिओ",
        "ta": "புகைப்பட ஸ்டுடியோ",
        "gu": "ફોટો સ્ટુડિયો",
        "kn": "ಫೋಟೋ ಸ್ಟುಡಿಯೋ",
        "ml": "ഫോട്ടോ സ്റ്റുഡിയോ",
        "pa": "ਫੋਟੋ ਸਟੂਡੀਓ"
    },
    "pdfTools": {
        "en": "PDF Tools",
        "hi": "पीडीएफ उपकरण",
        "bn": "পিডিএফ টুলস",
        "te": "PDF సాధనాలు",
        "mr": "पीडीएफ टूल्स",
        "ta": "PDF கருவிகள்",
        "gu": "PDF સાધનો",
        "kn": "PDF ಉಪಕರಣಗಳು",
        "ml": "PDF ഉപകരണങ്ങൾ",
        "pa": "PDF ਟੂਲ"
    },
    "login": {
        "en": "Login",
        "hi": "लॉग इन",
        "bn": "লগ ইন",
        "te": "లాగిన్",
        "mr": "लॉग इन",
        "ta": "உள்நுழைய",
        "gu": "લૉગ ઇન",
        "kn": "ಲಾಗಿನ್",
        "ml": "ലോഗിൻ",
        "pa": "ਲਾਗਇਨ"
    },
    "logout": {
        "en": "Logout",
        "hi": "लॉग आउट",
        "bn": "লগ আউট",
        "te": "లాగ్ అవుట్",
        "mr": "लॉग आउट",
        "ta": "வெளியேறு",
        "gu": "લોગ આઉટ",
        "kn": "ಲಾಗ್ ಔಟ್",
        "ml": "ലോഗ് ഔട്ട്",
        "pa": "ਲਾਗ ਆਉਟ"
    },
    "guestUser": {
        "en": "Guest User",
        "hi": "अतिथि उपयोगकर्ता",
        "bn": "অতিথি ব্যবহারকারী",
        "te": "అతిథి వినియోగదారు",
        "mr": "अतिथी वापरकर्ता",
        "ta": "விருந்தினர்",
        "gu": "મહેમાન વપરાશકર્તા",
        "kn": "ಅತಿಥಿ ಬಳಕೆದಾರ",
        "ml": "അതിഥി ഉപയോക്താവ്",
        "pa": "ਮਹਿਮਾਨ ਉਪਭੋਗਤਾ"
    },
    "member": {
        "en": "Member",
        "hi": "सदस्य",
        "bn": "সদস্য",
        "te": "సభ్యుడు",
        "mr": "सदस्य",
        "ta": "உறுப்பினர்",
        "gu": "સભ્ય",
        "kn": "ಸದಸ್ಯ",
        "ml": "അംഗം",
        "pa": "ਮੈਂਬਰ"
    },
    "limitedAccess": {
        "en": "Limited Access",
        "hi": "सीमित पहुंच",
        "bn": "সীমিত অ্যাক্সেস",
        "te": "పరిమిత ప్రాప్యత",
        "mr": "मर्यादित प्रवेश",
        "ta": "வரையறுக்கப்பட்ட அணுகல்",
        "gu": "મર્યાદિત ઍક્સેસ",
        "kn": "ಸೀಮಿತ ಪ್ರವೇಶ",
        "ml": "പരിമിതമായ ആക്സസ്",
        "pa": "ਸੀਮਤ ਪਹੁੰਚ"
    },
    "theme": {
        "en": "Dark Mode",
        "hi": "डार्क मोड",
        "bn": "ডার্ক মোড",
        "ta": "டார்க் மோட்"
    },
    "lightMode": {
        "en": "Light Mode",
        "hi": "लाइट मोड",
        "bn": "লাইট মোড",
        "ta": "லைட் மோட்"
    },
    "language": {
        "en": "Language",
        "hi": "भाषा",
        "bn": "ভাষা",
        "te": "భాష",
        "mr": "भाषा",
        "ta": "மொழி",
        "gu": "ભાષા",
        "kn": "ಭಾಷೆ",
        "ml": "ഭാഷ",
        "pa": "ਭਾਸ਼ਾ"
    },
    "selectLanguage": {
        "en": "Select Language",
        "hi": "भाषा चुनें",
        "bn": "ভাষা নির্বাচন করুন",
        "ta": "மொழியைத் தேர்ந்தெடுக்கவும்"
    },
    // Exams Page Translations
    "directory": { "en": "DIRECTORY", "hi": "निर्देशिका", "bn": "ডিরেক্টরি" },
    "timeline": { "en": "Timeline", "hi": "समय सीमा", "bn": "সময়রেখা" },
    "checklist": { "en": "Checklist", "hi": "चेकलिस्ट", "bn": "চেকলিস্ট" },
    "protocolNote": { "en": "Protocol Note", "hi": "प्रोटोकॉल नोट", "bn": "প্রোটোকল নোট" },
    "officialInfo": { "en": "Official Info", "hi": "आधिकारिक जानकारी", "bn": "অফিসিয়াল তথ্য" },
    "visitWebsite": { "en": "Visit Website", "hi": "वेबसाइट पर जाएं", "bn": "ওয়েবসাইট দেখুন" },
    "quickSpecs": { "en": "Quick Specs", "hi": "त्वरित विवरण", "bn": "দ্রুত স্পেসিফিকেশন" },
    "overview": { "en": "Overview", "hi": "अवलोकन", "bn": "ওভারভিউ" },
    "examDayDos": { "en": "Exam Day Dos", "hi": "परीक्षा के दिन क्या करें", "bn": "পরীক্ষার দিনের করণীয়" },
    "criticalDonts": { "en": "Critical Donts", "hi": "महत्वपूर्ण क्या न करें", "bn": "গুরুত্বপূর্ণ বর্জনীয়" },
    "officialQuickLinks": { "en": "Official Quick Links", "hi": "आधिकारिक त्वरित लिंक", "bn": "অফিসিয়াল কুইক লিঙ্ক" },
    "preparationRoadmap": { "en": "Preparation Roadmap", "hi": "तैयारी रोडमैप", "bn": "প্রস্তুতির রোডম্যাপ" },
    "daysFound": { "en": "GUIDES FOUND", "hi": "गाइड मिले", "bn": "গাইড পাওয়া গেছে" },
    "latestUpdates": { "en": "Latest Updates", "hi": "नवीनतम अपडेट", "bn": "সর্বশেষ আপডেট" },
    "readMore": { "en": "Read More", "hi": "और पढ़ें", "bn": "আরও পড়ুন" },
    "launchStudio": { "en": "LAUNCH STUDIO", "hi": "स्टूडियो लॉन्च करें", "bn": "স্টুডিও চালু করুন" },
    "openTools": { "en": "OPEN TOOLS", "hi": "टूल्स खोलें", "bn": "টুলস খুলুন" },
    "stampImage": { "en": "STAMP IMAGE", "hi": "स्टैम्प इमेज", "bn": "স্ট্যাম্প ইমেজ" },

    // Tabs
    "details": { "en": "Details", "hi": "विवरण", "bn": "বিবরণ" },
    "news": { "en": "News", "hi": "समाचार", "bn": "খবর" },
    "tools": { "en": "Tools", "hi": "उपकरण", "bn": "সরঞ্জাম" },

    // Labels
    "examDate": { "en": "EXAM", "hi": "परीक्षा" },
    "resultDate": { "en": "RESULT", "hi": "परिणाम" },
    "mode": { "en": "Mode", "hi": "मोड" },
    "totalMarks": { "en": "Total Marks", "hi": "कुल अंक" },
    "duration": { "en": "Duration", "hi": "अवधि" },
    "limit": { "en": "Limit", "hi": "सीमा" },

    // Additional Menu Items
    "guides": { "en": "Guides", "hi": "गाइड्स" },
    "currentAffairs": { "en": "Current Affairs", "hi": "करेंट अफेयर्स" },
    "about": { "en": "About Us", "hi": "हमारे बारे में" },
    "contact": { "en": "Contact Us", "hi": "संपर्क करें" }
};

function generateLocales() {
    const basePath = path.join(__dirname, "public", "locales");

    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
    }

    for (const langCode of Object.keys(LANGUAGES)) {
        const langDict = {};

        for (const [key, translations] of Object.entries(TRANSLATIONS)) {
            if (translations[langCode]) {
                langDict[key] = translations[langCode];
            } else if (translations['en']) {
                langDict[key] = translations['en'];
            } else {
                langDict[key] = key.charAt(0).toUpperCase() + key.slice(1);
            }
        }

        const langPath = path.join(basePath, langCode);
        if (!fs.existsSync(langPath)) {
            fs.mkdirSync(langPath, { recursive: true });
        }

        const jsonPath = path.join(langPath, "translation.json");
        fs.writeFileSync(jsonPath, JSON.stringify(langDict, null, 2), 'utf-8');
        console.log(`Generated ${langCode} locale at ${jsonPath}`);
    }
}

generateLocales();
