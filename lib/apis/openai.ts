import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_TEXT_MODEL, TEXT_GENERATE_TEMPERATURE } from "./const";

export class OpenAI {
  openai: OpenAIApi;

  constructor(apiKey: string) {
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
  }

  async generateText(prompt: string, model = OPEN_AI_TEXT_MODEL) {
    try {
      const response = await this.openai.createChatCompletion({
        model,
        temperature: TEXT_GENERATE_TEMPERATURE,
        messages: [
          {
            role: "system",
            content: "あなたはWeb広告企業で働く有能なコピーライターです。",
          },
          { role: "user", content: prompt },
        ],
      });
      console.log(
        `request cost: ${response?.data?.usage?.total_tokens} tokens`
      );
      return response.data.choices[0].message?.content;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async generateImage(prompt: string, imageBatchSize: number = 1) {
    try {
      const response = await this.openai.createImage({
        prompt,
        n: imageBatchSize,
      });
      console.log(response?.data?.data);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
