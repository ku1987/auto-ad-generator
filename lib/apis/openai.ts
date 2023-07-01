import { Configuration, OpenAIApi } from "openai";
import { CREATE_IMAGE_NUM, OPEN_AI_TEXT_MODEL } from "./const";

export class OpenAI {
  openai: OpenAIApi;

  constructor(apiKey: string) {
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
  }

  async generateText(prompt: string, model = OPEN_AI_TEXT_MODEL) {
    try {
      const response = await this.openai.createChatCompletion({
        model,
        messages: [{ role: "user", content: prompt }],
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

  async generateImage(prompt: string) {
    try {
      const response = await this.openai.createImage({
        prompt,
        n: CREATE_IMAGE_NUM,
      });
      console.log(response?.data?.data);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
