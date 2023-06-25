import { useState } from "react";
import { OpenAI } from "../lib/apis/openai";

const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      alert("Please enter a valid prompt.");
      setResponse("");
      return;
    }

    try {
      const openai = new OpenAI("process.env.openAiApiKey as string");
      const res = await openai.generateText(prompt);
      if (!res) {
        console.warn("Nothing returned from OpenAI API.");
        return;
      }
      setResponse(res);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Title</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Prompt:
          <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Write your thoughts here..."></textarea>
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <div className="border border-gray-300 rounded px-4 py-2">
        <strong>Response: {response}</strong>
      </div>
    </div>
  );
};

export default IndexPage;
