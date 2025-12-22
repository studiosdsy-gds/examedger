import json
import os

# Define the supported languages and their codes
LANGUAGES = {
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
}

# The Master Dictionary of Translations
# Structure: 'key': {'lang_code': 'Translation'}
# If a language is missing, it falls back to English (key)
TRANSLATIONS = {
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
        # Add others as needed, defaulting to English for now
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
    }
}

def generate_locales():
    # Ensure locales directory exists
    base_path = os.path.join("public", "locales")
    if not os.path.exists(base_path):
        os.makedirs(base_path)

    for lang_code in LANGUAGES.keys():
        # Create dictionary for this language
        lang_dict = {}
        
        for key, translations in TRANSLATIONS.items():
            # Use translation if available, else fallback to English, else fallback to key
            if lang_code in translations:
                lang_dict[key] = translations[lang_code]
            elif 'en' in translations:
                lang_dict[key] = translations['en']
            else:
                lang_dict[key] = key.capitalize()
        
        # Write to JSON file
        lang_path = os.path.join(base_path, lang_code)
        if not os.path.exists(lang_path):
            os.makedirs(lang_path)
            
        json_path = os.path.join(lang_path, "translation.json")
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(lang_dict, f, ensure_ascii=False, indent=2)
            
        print(f"Generated {lang_code} locale at {json_path}")

if __name__ == "__main__":
    generate_locales()
