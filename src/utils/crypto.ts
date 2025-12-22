
// src/utils/crypto.ts

/**
 * Generates a high-entropy AES-GCM key for the session.
 * This key is non-exportable by default for security, but we need to use it for operations.
 */
export async function generateSessionKey(): Promise<CryptoKey> {
    return window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true, // extractable
        ["encrypt", "decrypt"]
    );
}

/**
 * Encrypts a message using the session key.
 * Returns a Base64 string containing the IV and the ciphertext.
 */
export async function encryptMessage(message: string, key: CryptoKey): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    // 12 bytes IV for AES-GCM
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const ciphertext = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        data
    );

    // Combine IV and Ciphertext for storage: IV + Ciphertext
    const combined = new Uint8Array(iv.length + new Uint8Array(ciphertext).byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(ciphertext), iv.length);

    // Convert to Base64
    return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypts a Base64 string using the session key.
 */
export async function decryptMessage(encryptedBase64: string, key: CryptoKey): Promise<string> {
    try {
        const binaryString = atob(encryptedBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Extract IV (first 12 bytes)
        const iv = bytes.slice(0, 12);
        const ciphertext = bytes.slice(12);

        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            key,
            ciphertext
        );

        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    } catch (error) {
        console.error("Decryption failed:", error);
        return "Error: Could not decrypt message.";
    }
}
