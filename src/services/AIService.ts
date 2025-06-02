import { GoogleGenerativeAI } from '@google/generative-ai';

class AIService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Gemini API key is not configured');
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    }

    async chat(projectInfo: string, userMessage: string): Promise<string> {
        try {
            const chat = this.model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [`You are a helpful AI assistant specialized in explaining software projects. Here are the details about the current project:

Project Information:
${projectInfo}

Please help me understand this project better. When responding:
1. Use clear, natural language without markdown syntax
2. Format text naturally with proper spacing and paragraphs
3. Use plain text for emphasis instead of special characters
4. Keep responses focused and well-structured
5. Reference specific project details when relevant`],
                    },
                    {
                        role: "model",
                        parts: ["I understand the project details and I'll provide clear, naturally formatted responses without markdown syntax. I'll focus on being specific and helpful while maintaining good readability."],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.8,
                    maxOutputTokens: 1024,
                },
            });

            const result = await chat.sendMessage(userMessage);
            const response = await result.response;

            // Clean up any remaining markdown-style formatting
            return response.text()
                .replace(/\*\*/g, '')
                .replace(/\*/g, '')
                .replace(/#{1,6}\s/g, '')
                .replace(/`/g, '')
                .trim();
        } catch (error) {
            console.error('Error in AI chat:', error);
            if (error instanceof Error) {
                return `I encountered an error: ${error.message}. Please try rephrasing your question or asking about a different aspect of the project.`;
            }
            return 'I encountered an unexpected error. Please try again with a different question.';
        }
    }
}

export default new AIService();