
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private static getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  static async generateChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    const ai = this.getClient();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "Eres NeuroBOT Bot, el asistente virtual experto de la plataforma NeuroBOT. Ayudas a los empleados con problemas técnicos, consultas de tickets y procedimientos internos de forma profesional y eficiente.",
      }
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  }

  static async generateErrorVideo(imageB64: string, prompt: string) {
    const ai = this.getClient();
    
    if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }

    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Animate this scene showing: ${prompt}. Professional technical visualization style.`,
        image: {
          imageBytes: imageB64,
          mimeType: 'image/png'
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed");
      
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error: any) {
      if (error.message?.includes("Requested entity was not found")) {
        if (typeof (window as any).aistudio?.openSelectKey === 'function') {
          await (window as any).aistudio.openSelectKey();
        }
      }
      throw error;
    }
  }
}