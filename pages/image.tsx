"use client";

import { ChangeEvent, MouseEventHandler, useState } from "react";
import Link from "next/link";

import {
  DEFAULT_IMAGE_NEGATIVE_PROMPT,
  DEFAULT_IMAGE_PROMPT,
  STABILITY_API_KEY,
} from "../lib/apis/const";
import { StableDiffusion } from "../lib/apis/stableDiffusion";
import { Loader } from "../components/loader";
import { ImageWithFallback } from "../components/imageWithFallback";
import { RefreshButton } from "../components/refreshButton";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [imageBatchSize, setImageBatchSize] = useState(1);
  const [angle, setAngle] = useState("wide shot");
  const [queueId, setQueueId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearAll = () => {
    setPrompt("");
    setNegativePrompt("");
    setResponse([]);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage("");
      setResponse([]);
      const stableDiffusion = new StableDiffusion(STABILITY_API_KEY);
      const updatedPrompt = `((${prompt})),((${angle})),${DEFAULT_IMAGE_PROMPT}`;
      const updatedNegativePrompt = negativePrompt
        ? `((${negativePrompt})),${DEFAULT_IMAGE_NEGATIVE_PROMPT}`
        : DEFAULT_IMAGE_NEGATIVE_PROMPT;
      const result = await stableDiffusion.generateImage(
        updatedPrompt,
        updatedNegativePrompt,
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
        if (result.id) {
          setQueueId(result.id);
          const estimated = Math.ceil(result.eta);
          setErrorMessage(
            `リクエストが混み合っているため、生成に時間がかかっています。${estimated}秒ほど待ってから Refresh ボタンをクリックしてください。`
          );
          return;
        }
        throw new Error(
          "リクエストが混み合っているため、生成に失敗しました。1分ほど時間を置いてから再度試してください。"
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

  const handleRadioBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAngle(event.target.value);
  };

  const handleRefresh = async (event: any) => {
    event.preventDefault();
    if (!queueId) {
      throw new Error("生成に失敗しました。再度試してください。");
    }
    try {
      setErrorMessage("");
      setIsRefreshing(true);
      const stableDiffusion = new StableDiffusion(STABILITY_API_KEY);
      const result = await stableDiffusion.fetchQueuedData(queueId);
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
        throw new Error("生成中です。もう少しお待ち下さい。");
      }
      throw new Error("生成に失敗しました。再度試してください。");
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Image generator</h1>
      <div>
        <button
          className="bg-red-400 hover:bg-red-500 text-white w-24 font-bold py-2 px-4 rounded mt-2"
          onClick={clearAll}
        >
          Clear
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mt-5 mb-5">
          <textarea
            required
            className="w-full h-32 bg-white border-slate-100 border-b rounded p-3 text-slate-900 tw-prose-pre-bg)"
            value={prompt}
            placeholder="英語でプロンプトを入力してください。例: A man working out in a gym"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="mt-5 mb-5">
          <textarea
            className="w-full h-32 bg-white border-slate-100 border-b rounded p-3 text-slate-900 tw-prose-pre-bg)"
            value={negativePrompt}
            placeholder="出力したくないものがある場合、英語で入力してください。例: Running machine"
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
              max={4}
              onChange={handleInputChange}
            ></input>
          </p>
          <div className="my-2">
            <p className="my-2">アングル</p>
            <input
              className="mx-1"
              id="wide"
              type="radio"
              value="wide shot"
              checked={angle === "wide shot"}
              onChange={handleRadioBoxChange}
            />
            <label htmlFor="wide">ワイドショット</label>
            <input
              className="mx-1"
              id="middle"
              type="radio"
              value="middle shot"
              checked={angle === "middle shot"}
              onChange={handleRadioBoxChange}
            />
            <label htmlFor="middle">ミドルショット</label>
            <input
              className="mx-1"
              id="close-up"
              type="radio"
              value="close-up"
              checked={angle === "close-up"}
              onChange={handleRadioBoxChange}
            />
            <label htmlFor="close-up">クローズアップ</label>
          </div>
        </div>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-slate-100 w-24 font-bold py-2 px-4 rounded"
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
        {queueId && RefreshButton(isRefreshing, queueId, handleRefresh)}
      </div>
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
                    alt={prompt}
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

export default ImageGeneration;
