"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";

import {
  DEFAULT_IMAGE_NEGATIVE_PROMPT,
  DEFAULT_IMAGE_PROMPT,
  STABILITY_API_KEY,
} from "../lib/apis/const";
import Link from "next/link";
import { StableDiffusion } from "../lib/apis/stable-diffusion";

const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [imageBatchSize, setImageBatchSize] = useState(1);
  const [peopleCount, setPeopleCount] = useState("one person");
  const [race, setRace] = useState("japanese");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearAll = () => {
    setPrompt("");
    setResponse([]);
    setIsError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      setResponse([]);
      const stableDiffusion = new StableDiffusion(STABILITY_API_KEY);
      const updatedPrompt = `,${prompt},${race},${peopleCount},${DEFAULT_IMAGE_PROMPT}`;
      const negativePrompt = `${DEFAULT_IMAGE_NEGATIVE_PROMPT}`;
      const res = await stableDiffusion.generateImage(
        updatedPrompt,
        negativePrompt,
        imageBatchSize
      );
      if (!res) {
        console.warn("Nothing returned from StableDiffusion API.");
        return;
      }
      setResponse(res);
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageBatchSize(Number(event.target.value));
  };

  const handleRadioBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPeopleCount(event.target.value);
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
            placeholder="Enter prompt for image..."
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <p>
            Batch size:
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
            <p className="my-2">人物</p>
            <input
              className="mx-1"
              id="one-person"
              type="radio"
              value="one person"
              checked={peopleCount === "one person"}
              onChange={handleRadioBoxChange}
            />
            <label htmlFor="one-person">1人</label>
            <input
              className="mx-1"
              id="two-people"
              type="radio"
              value="two people"
              checked={peopleCount === "two people"}
              onChange={handleRadioBoxChange}
            />
            <label htmlFor="two-people">2人</label>
            <input
              className="mx-1"
              id="multiple"
              type="radio"
              value="multiple people"
              checked={peopleCount === "multiple people"}
              onChange={handleRadioBoxChange}
            />
            <label htmlFor="multiple">複数人 (不特定)</label>
          </div>
          <div className="my-2">
            <p className="my-2">人種</p>
            <input
              className="mx-1"
              id="japanese"
              type="radio"
              value="japanese"
              checked={race === "japanese"}
              onChange={handleRaceChange}
            />
            <label htmlFor="japanese">日本人</label>
            <input
              className="mx-1"
              id="caucasian"
              type="radio"
              value="caucasian"
              checked={race === "caucasian"}
              onChange={handleRaceChange}
            />
            <label htmlFor="caucasian">欧米人</label>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="inline-block bg-blue-300 text-slate-100 font-bold py-2 px-4 rounded">
              Submit
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-slate-100 font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          )}
          {isError ? (
            <p className="text-orange-600 mt-5">
              Something went wrong. Please try again.
            </p>
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
                  <Image src={imgUrl || ""} width={300} height={200} alt="" />
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
