import { useState } from "react";
import { Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { ImagesResponseDataInner } from "openai";

import { OpenAI } from "../lib/apis/openai";
import { Loader } from "../lib/components/spinner";

const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [response, setResponse] = useState("");
  const [responseImage, setResponseImage] = useState<ImagesResponseDataInner[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

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
      const openai = new OpenAI(process.env.openAiApiKey as string);
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
      setIsLoading(true);
      const openai = new OpenAI(process.env.openAiApiKey as string);
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
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Title</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="w-296">
          <Textarea
            size="md"
            label="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
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
      </form>
      <div className="border border-gray-300 rounded px-4 py-2">
        <strong>Response: {response}</strong>
      </div>
      <form onSubmit={handleSubmitImage} className="mb-4">
        <div className="w-296">
          <Textarea
            size="md"
            label="Prompt for Image"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
          />
        </div>
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
      </form>
      <div className="border border-gray-300 rounded px-4 py-2">
        <strong>Response</strong>
        {responseImage.map((imgData, i) => {
          return <img key={i} src={imgData.url || ""} alt="" />;
        })}
      </div>
      <Button onClick={clearAll}>Clear</Button>
    </div>
  );
};

export default IndexPage;
