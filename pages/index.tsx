import { useState } from "react";

const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ env: process.env.openAiApiKey });

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log(data);

      setResponse(data.title);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Title</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
