"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  DEFAULT_IMAGE_NEGATIVE_PROMPT,
  DEFAULT_IMAGE_PROMPT,
  STABILITY_API_KEY,
} from "../lib/apis/const";
import { StableDiffusion } from "../lib/apis/stableDiffusion";
import { Loader } from "../components/loader";
import { ImageWithFallback } from "../components/imageWithFallback";

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

const ImageVariation = () => {
  const [initUrl, setInitUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [imageBatchSize, setImageBatchSize] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearAll = () => {
    setPrompt("");
    setNegativePrompt("");
    setResponse([]);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(initUrl)) {
      setErrorMessage("正しいURLを入力してください。");
      return;
    }
    try {
      setIsLoading(true);
      setErrorMessage("");
      setResponse([]);
      const stableDiffusion = new StableDiffusion(STABILITY_API_KEY);
      const result = await stableDiffusion.generateImageVariations(
        initUrl,
        prompt,
        negativePrompt,
        imageBatchSize
      );
      if (!result || result.status === "failed") {
        throw new Error("生成に失敗しました。再度試してください。");
      }
      if (result.status === "success" && result.output.length > 0) {
        setResponse(result.output);
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        return;
      }
      if (result.status === "processing") {
        if (result.future_links && result.future_links.length > 0) {
          setResponse(result.future_links);
          const estimated = Math.ceil(result.eta);
          setErrorMessage(
            `連続してリクエストがあったため、生成に時間がかかっています。${estimated}秒ほど待ってから画像をクリックしてください。`
          );
          return;
        }
        throw new Error(
          "連続してリクエストがあったため、生成に失敗しました。1分ほど時間を置いてから再度試してください。"
        );
      }
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageBatchSize(Number(event.target.value));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Image variation generator</h1>
      <div>
        <button
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={clearAll}
        >
          Clear
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mt-5 mb-5">
          <input
            required
            type="url"
            className="w-full h-8 bg-white border-slate-100 border-b rounded p-3 text-slate-900 tw-prose-pre-bg)"
            value={initUrl}
            placeholder="画像のURLを入力してください。"
            onChange={(e) => setInitUrl(e.target.value)}
          />
        </div>
        <div className="mt-5 mb-5">
          <textarea
            required
            className="w-full h-16 bg-white border-slate-100 border-b rounded p-3 text-slate-900 tw-prose-pre-bg)"
            value={prompt}
            placeholder="英語でプロンプトを入力してください。"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="mt-5 mb-5">
          <textarea
            className="w-full h-16 bg-white border-slate-100 border-b rounded p-3 text-slate-900 tw-prose-pre-bg)"
            value={negativePrompt}
            placeholder="出力したくないものがある場合、英語で入力してください。"
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <p>
            生成する画像数:
            <input
              value={imageBatchSize}
              type="number"
              className="bg-slate-600 p-2 ml-2 rounded"
              id="image-batch-size"
              min={1}
              max={10}
              onChange={handleInputChange}
            ></input>
          </p>
        </div>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-slate-100 font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          )}
          {errorMessage ? (
            <p className="text-orange-600 mt-5">{errorMessage}</p>
          ) : null}
        </div>
      </form>
      <div>
        <div className="mt-5 grid grid-cols-2 gap-6">
          {response.map((imgUrl, i) => {
            return (
              <div
                className="flex flex-col justify-center items-center"
                key={i}
              >
                <Link target="_blank" href={imgUrl ?? ""}>
                  <ImageWithFallback
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    src={imgUrl}
                    width={300}
                    height={200}
                    alt=""
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageVariation;
