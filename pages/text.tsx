"use client";

import { useState } from "react";

import { OpenAI } from "../lib/apis/openai";
import { OPEN_AI_API_KEY, OPEN_AI_TEXT_MODEL } from "../lib/apis/const";
import IconCopy from "../components/copy-text";
import { Loader } from "../components/loader";

const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearAll = () => {
    setPrompt("");
    setResponse("");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMessage("");
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
        throw new Error("生成に失敗しました。再度試してください。");
      }
      setResponse(res);
    } catch (error: any) {
      console.error("Error:", error);
      const message = error.response
        ? `${error.response.data?.error?.code}: ${error.response.data?.error?.message}`
        : error.message;
      setErrorMessage(message);
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
            className="w-full h-72 bg-white border-slate-100 border-b rounded p-3 text-slate-900"
            placeholder="日本語でプロンプトを入力してください。"
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
        {errorMessage && <p className="text-orange-600">{errorMessage}</p>}
        <p>
          <strong>Response</strong>
        </p>
        <div
          id="response"
          className="whitespace-pre-wrap min-h-32 relative border border-gray-300 text-slate-900 bg-gray-400 rounded p-3 my-3 min-h-20"
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
