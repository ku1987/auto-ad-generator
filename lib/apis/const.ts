import { CreateImageRequestSizeEnum } from "openai";

export const OPEN_AI_API_KEY = process.env.openAiApiKey ?? "";
export const STABILITY_API_KEY = process.env.stabilityAiApiKey ?? "";
export const OPEN_AI_TEXT_MODEL = {
  GPT_3_5_TURBO: "gpt-3.5-turbo",
};
export const TEXT_GENERATE_TEMPERATURE = 0.8;
export const IMAGE_QUALITY = {
  HIGH: CreateImageRequestSizeEnum._1024x1024,
  MID: CreateImageRequestSizeEnum._512x512,
  LOW: CreateImageRequestSizeEnum._256x256,
};

export const DEFAULT_IMAGE_PROMPT =
  "photorealistic, hyper detail, outdoor lighting, Canon EOS R3, nikon, f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame, 8K";

export const DEFAULT_IMAGE_NEGATIVE_PROMPT =
  "((out of frame)), ((extra fingers)),((nude)),((nsfw)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((Chinese)), ((Koreans)), ((extra legs)), ((camera)), ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face, blurry, draft, grainy";
