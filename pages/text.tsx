"use client";

import { useState } from "react";

import { OpenAI } from "../lib/apis/openai";
import { Loader } from "../components/spinner";
import { OPEN_AI_API_KEY } from "../lib/apis/const";
import { CopyIcon } from "../components/copy-icon";

const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearAll = () => {
    setPrompt("");
    setResponse("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setResponse("");
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
            <CopyIcon />
          </span>
          {response}
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
