"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  DEFAULT_IMAGE_NEGATIVE_PROMPT,
  DEFAULT_IMAGE_PROMPT,
  STABILITY_API_KEY,
} from "../lib/apis/const";
import { StableDiffusion } from "../lib/apis/stable-diffusion";
import { Loader } from "../components/loader";

const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [imageBatchSize, setImageBatchSize] = useState(1);
  const [race, setRace] = useState("Japanese");
  const [angle, setAngle] = useState("wide shot");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const clearAll = () => {
    setPrompt("");
    setNegativePrompt("");
    setResponse([]);
    setIsError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError("");
      setResponse([]);
      const stableDiffusion = new StableDiffusion(STABILITY_API_KEY);
      const updatedPrompt = `(((${prompt}))),((${race})),((${angle})),${DEFAULT_IMAGE_PROMPT}`;
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
        throw new Error(
          "連続してリクエストがあったため、生成に失敗しました。1分ほど時間を置いてから再度試してください。"
        );
      }
    } catch (error: any) {
      console.error("Error:", error);
      setIsError(error.message);
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

  const handleRaceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRace(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Image generator</h1>
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
              max={10}
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
          <div className="my-2">
            <p className="my-2">人種</p>
            <input
              className="mx-1"
              id="japanese"
              type="radio"
              value="Japanese"
              checked={race === "Japanese"}
              onChange={handleRaceChange}
            />
            <label htmlFor="japanese">日本人</label>
            <input
              className="mx-1"
              id="caucasian"
              type="radio"
              value="Caucasian"
              checked={race === "Caucasian"}
              onChange={handleRaceChange}
            />
            <label htmlFor="caucasian">欧米人</label>
          </div>
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
          {isError ? (
            <p className="text-orange-600 mt-5">Error: {isError}</p>
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
                  <Image
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    src={imgUrl || ""}
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

export default IndexPage;
