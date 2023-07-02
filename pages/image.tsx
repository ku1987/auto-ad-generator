"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { ImagesResponseDataInner } from "openai";
import { v4 as uuidv4 } from "uuid";
import { OpenAI } from "../lib/apis/openai";
import { Loader } from "../components/spinner";
import { OPEN_AI_API_KEY } from "../lib/apis/const";
import Link from "next/link";

const images = [
  {
    url: "/lfc.jpg",
  },
  {
    url: "/lfc.jpg",
  },
  {
    url: "/lfc.jpg",
  },
];
const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<ImagesResponseDataInner[]>([]);
  const [imageBatchSize, setImageBatchSize] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const clearAll = () => {
    setPrompt("");
    setResponse([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setResponse([]);
      const openai = new OpenAI(OPEN_AI_API_KEY);
      const res = await openai.generateImage(prompt, imageBatchSize);
      if (!res) {
        console.warn("Nothing returned from OpenAI API.");
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

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Image generator</h1>
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
          {isError ?? <p>Something went wrong. Please try again.</p>}
        </div>
      </form>
      <div>
        <div className="mt-5 grid grid-cols-2 gap-6">
          {response.map((imgData, i) => {
            return (
              <div
                className="flex flex-col justify-center items-center"
                key={i}
              >
                <Link target="_blank" href={imgData.url ?? ""}>
                  <Image
                    src={imgData.url || ""}
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
      <div>
        <button
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-10"
          onClick={clearAll}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
