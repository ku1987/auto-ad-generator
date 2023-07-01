"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagesResponseDataInner } from "openai";

import { OpenAI } from "../lib/apis/openai";
import { Loader } from "../lib/components/spinner";
import { OPEN_AI_API_KEY } from "../lib/apis/const";

const images = [
  {
    url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-OtyVjKo51CJ3Rwe2kOSDQ7B6/user-W3tfT5w8vZ5ZNUzvLdNkph6z/img-GJGqsPxcMzDTOS6lGx1kb7H7.png?st=2023-07-01T05%3A05%3A08Z&se=2023-07-01T07%3A05%3A08Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-30T20%3A28%3A01Z&ske=2023-07-01T20%3A28%3A01Z&sks=b&skv=2021-08-06&sig=WwXa%2B0h9zngW3gIqRp6dxzx8ILDy5Phnvqk5WDtcq1I%3D",
  },
  {
    url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-OtyVjKo51CJ3Rwe2kOSDQ7B6/user-W3tfT5w8vZ5ZNUzvLdNkph6z/img-GJGqsPxcMzDTOS6lGx1kb7H7.png?st=2023-07-01T05%3A05%3A08Z&se=2023-07-01T07%3A05%3A08Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-30T20%3A28%3A01Z&ske=2023-07-01T20%3A28%3A01Z&sks=b&skv=2021-08-06&sig=WwXa%2B0h9zngW3gIqRp6dxzx8ILDy5Phnvqk5WDtcq1I%3D",
  },
  {
    url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-OtyVjKo51CJ3Rwe2kOSDQ7B6/user-W3tfT5w8vZ5ZNUzvLdNkph6z/img-GJGqsPxcMzDTOS6lGx1kb7H7.png?st=2023-07-01T05%3A05%3A08Z&se=2023-07-01T07%3A05%3A08Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-30T20%3A28%3A01Z&ske=2023-07-01T20%3A28%3A01Z&sks=b&skv=2021-08-06&sig=WwXa%2B0h9zngW3gIqRp6dxzx8ILDy5Phnvqk5WDtcq1I%3D",
  },
];
const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [response, setResponse] = useState("");
  const [responseImage, setResponseImage] = useState<ImagesResponseDataInner[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const clearAll = () => {
    setPrompt("");
    setResponse("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      alert("Please enter a valid prompt.");
      setResponse("");
      return;
    }

    try {
      setIsLoading(true);
      const openai = new OpenAI(OPEN_AI_API_KEY);
      const res = await openai.generateText(prompt);
      if (!res) {
        console.warn("Nothing returned from OpenAI API.");
        return;
      }
      setResponse(res);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt) {
      alert("Please enter a valid prompt.");
      setResponse("");
      return;
    }

    try {
      setIsLoadingImage(true);
      const openai = new OpenAI(OPEN_AI_API_KEY);
      const res = await openai.generateImage(imagePrompt);
      if (!res) {
        console.warn("Nothing returned from OpenAI API.");
        return;
      }
      setResponseImage(res);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Ad generator</h1>
      <h2>Text generator</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="w-296 mt-5 mb-5">
          <textarea
            className="w-full h-32 bg-white border-slate-100 border-b rounded p-3 text-slate-900"
            placeholder="Enter prompt for chat..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <div>
        <p>
          <strong>Response</strong>
        </p>
        <div className="border border-gray-300 bg-gray-600 rounded p-3 my-3 min-h-20">
          {response}
        </div>
      </div>
      <h2>Image generator</h2>
      <form onSubmit={handleSubmitImage} className="mb-4">
        <div className="mt-5 mb-5">
          <textarea
            className="w-full h-32 bg-white border-slate-100 border-b rounded p-3 text-slate-900 tw-prose-pre-bg)"
            value={imagePrompt}
            placeholder="Enter prompt for image..."
            onChange={(e) => setImagePrompt(e.target.value)}
          />
        </div>
        <div>
          {isLoadingImage ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <div>
        <p>
          <strong>Image</strong>
        </p>
        <div className="border border-gray-300 rounded p-3 my-3 min-h-20 grid-cols-2">
          {images.map((imgData, i) => {
            return (
              <Image
                width="256"
                height="256"
                className=""
                key={i}
                src={imgData.url || ""}
                alt=""
              />
            );
          })}
          {/* {responseImage.map((imgData, i) => {
            return (
              <Image
                className="w-auto"
                key={i}
                src={imgData.url || ""}
                alt=""
              />
            );
          })} */}
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
