import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from "openai";
import { OPEN_AI_TEXT_MODEL, TEXT_GENERATE_TEMPERATURE } from "./const";

export class OpenAI {
  openai: OpenAIApi;

  constructor(apiKey: string) {
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
  }

  async generateText(
    prompt: string,
    model: string = OPEN_AI_TEXT_MODEL.GPT_3_5_TURBO,
    roleContent: string = ""
  ) {
    try {
      const response = await this.openai.createChatCompletion({
        model,
        temperature: TEXT_GENERATE_TEMPERATURE,
        messages: [
          {
            role: "system",
            content: roleContent,
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

  async generateImage(
    prompt: string,
    imageSize: CreateImageRequestSizeEnum,
    imageBatchSize: number = 1
  ) {
    try {
      const response = await this.openai.createImage({
        prompt,
        n: imageBatchSize,
        size: imageSize,
      });
      console.log(response?.data?.data);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
