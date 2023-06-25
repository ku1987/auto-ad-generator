import { Configuration, OpenAIApi } from "openai";

export class OpenAI {
  openai: OpenAIApi;

  constructor(apiKey: string) {
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
  }

  async generateText(prompt: string, model = "gpt-3.5-turbo") {
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
        n: 3,
      });
      console.log(response?.data?.data);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
