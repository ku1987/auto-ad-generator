"use client";

import { useState } from "react";

import { OpenAI } from "../lib/apis/openai";
import { OPEN_AI_API_KEY, OPEN_AI_TEXT_MODEL } from "../lib/apis/const";
import IconCopy from "../components/copy-text";

const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearAll = () => {
    setPrompt("");
    setResponse("");
    setIsError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsError(false);
      setIsLoading(true);
      setResponse("");
      const openai = new OpenAI(OPEN_AI_API_KEY);
      const roleContent = "あなたはWeb広告企業で働く有能なコピーライターです。";
      const res = await openai.generateText(
        prompt,
        OPEN_AI_TEXT_MODEL.GPT_3_5_TURBO,
        roleContent
      );
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

  const copyText = async () => {
    const el = document.getElementById("response");
    if (el) {
      await navigator.clipboard.writeText(el.innerText);
      alert("Text copied.");
    }
    return;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Text generator</h1>
      <div>
        <button
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={clearAll}
        >
          Clear
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="w-296 mt-5 mb-5">
          <textarea
            required
            className="w-full h-32 bg-white border-slate-100 border-b rounded p-3 text-slate-900"
            placeholder="Enter prompt for chat..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div>
          {isLoading ? (
            <div className="inline-block bg-blue-300 text-slate-100 font-bold py-2 px-4 rounded">
              Submit
            </div>
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
        {isError ? (
          <p className="text-orange-600">
            Something went wrong. Please try again.
          </p>
        ) : null}
        <p>
          <strong>Response</strong>
        </p>
        <div
          id="response"
          className="relative border border-gray-300 text-slate-900 bg-gray-400 rounded p-3 my-3 min-h-20"
        >
          <span
            onClick={(e) => {
              copyText();
            }}
            className="cursor-pointer absolute right-2 top-1"
          >
            <IconCopy />
          </span>
          {response}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
