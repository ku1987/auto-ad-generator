export class StableDiffusion {
  apiKey = "";
  baseUrl = "https://stablediffusionapi.com/api/v3/text2img";
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(
    prompt: string,
    negativePrompt: string,
    imageBatchSize: number = 1
  ): Promise<string[]> {
    const requestBody = {
      key: this.apiKey,
      prompt,
      negative_prompt: negativePrompt,
      width: "512",
      height: "512",
      samples: imageBatchSize,
      num_inference_steps: "20",
      safety_checker: "no",
      enhance_prompt: "yes",
      seed: null,
      guidance_scale: 7.5,
      webhook: null,
      track_id: null,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      console.error(response.body);
      throw new Error("Request failed with status: " + response.status);
    }
    const result = await response.json();
    if (result.status === "error" || result.status === "failed") {
      throw new Error("Request failed: " + result.messege);
    }
    return result.output;
  }
}
