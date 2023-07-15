interface GenerationResult {
  status: string;
  tip: string;
  eta: number;
  messege: string;
  fetch_result: string;
  id: number;
  output: string[];
  meta: any;
  generationTime?: number;
}

export class StableDiffusion {
  apiKey = "";
  baseUrl = "https://stablediffusionapi.com/api/v3";
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(
    prompt: string,
    negativePrompt: string,
    imageBatchSize: number = 1
  ): Promise<GenerationResult> {
    const requestBody = {
      key: this.apiKey,
      prompt,
      negative_prompt: negativePrompt,
      width: "1024",
      height: "768",
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
    const url = `${this.baseUrl}/text2img`;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      console.error(response.body);
      throw new Error("Request failed with status: " + response.status);
    }
    const result: GenerationResult = await response.json();
    if (result.status === "error" || result.status === "failed") {
      throw new Error("Request failed: " + result.messege);
    }
    return result;
  }
}
