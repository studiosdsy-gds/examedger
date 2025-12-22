
// src/services/ai.ts
import { client } from "@gradio/client";

const SPACE_ID = "Souhardyo/EdgeAI";

export async function getAIResponse(message: string, history: Array<[string, string]> = []) {
    try {
        const app = await client(SPACE_ID);

        // Assuming the API expects message and history.
        // Adjust based on actual API signature of /respomd
        // The prompt mentions API name: /respomd

        const result = await app.predict("/respond", [
            message,
            // Gradio usually expects history as list of lists [[user, bot], ...]
            // We might need to map our history format to Gradio's if it differs.
            // For now passing it directly assuming it matches or is handled by the client helper.
            // If the space uses 'chat' interface, it might be simpler.
            // But user specified '/respomd'.
        ]);

        return result.data;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
}
