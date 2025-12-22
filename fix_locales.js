
import fs from 'fs';
import path from 'path';

// Using __dirname needs a little hack in ES modules, but this will be run as simple node script or standard CJS
// Assuming CJS environment for simple script execution
// If 'type': 'module' is in package.json, we might need adjustments. I'll just use CJS format.

const localesDir = path.join(process.cwd(), 'public', 'locales');
const enPath = path.join(localesDir, 'en', 'translation.json');

try {
    const enContent = fs.readFileSync(enPath, 'utf-8');
    const enJson = JSON.parse(enContent);
    const enKeys = Object.keys(enJson);

    // Get all language directories
    const items = fs.readdirSync(localesDir, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory() && item.name !== 'en') {
            const langDir = path.join(localesDir, item.name);
            const langFile = path.join(langDir, 'translation.json');

            let langJson = {};
            try {
                if (fs.existsSync(langFile)) {
                    const content = fs.readFileSync(langFile, 'utf-8');
                    langJson = JSON.parse(content || '{}');
                }
            } catch (e) {
                console.log(`Error reading ${item.name}, treating as empty`);
            }

            // Fill missing keys
            let changes = 0;
            enKeys.forEach(key => {
                if (!langJson[key] || langJson[key] === "") {
                    langJson[key] = enJson[key]; // Copy english value
                    changes++;
                }
            });

            if (changes > 0 || !fs.existsSync(langFile)) {
                fs.writeFileSync(langFile, JSON.stringify(langJson, null, 2));
                console.log(`Updated ${item.name}: ${changes} keys filled.`);
            }
        }
    });
    console.log("Localization fix complete.");
} catch (error) {
    console.error("Critical error:", error);
}
