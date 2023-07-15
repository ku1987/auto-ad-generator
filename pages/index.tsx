import { LinkText } from "../components/link-text";

export default function index() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">AI Ad Generator</h1>
      <div>
        <p>OpenAI API を利用した自動広告生成ツールです。</p>
        <p>
          上のタブからテキストを生成するときは Text を、画像を生成するときは
          Image をクリックしてください。
        </p>
        <p>
          テキスト生成と画像生成にはそれぞれ以下の API
          とモデルを利用しています。
        </p>
        <ul className="list-disc ml-5 mt-2">
          <li>
            <LinkText
              link="https://platform.openai.com/docs/guides/gpt/chat-completions-api"
              text="Chat Completions API (gpt-3.5-turbo)"
            />
          </li>
          <li>
            <LinkText
              link="https://documenter.getpostman.com/view/18679074/2s83zdwReZ#454773c9-de34-4030-af9b-8a976cbf264c"
              text="Stable Diffusion v3 API"
            />
          </li>
        </ul>
      </div>
      <h2 className="text-xl font-bold my-4">テキスト生成</h2>
      <ul className="list-disc ml-5">
        <li>
          テキストボックスに日本語でプロンプトを入力して、Submit
          ボタンを押してください。
        </li>
        <li>
          レスポンスの中にあるコピーボタンで生成されたテキストをコピーできます。
        </li>
        <li>Clear ボタンを押すとプロンプトとレスポンスがクリアされます。</li>
        <li>プロンプト作成のベストプラクティスは下記を参考にしてください。</li>
        <LinkText
          link="https://platform.openai.com/docs/guides/gpt-best-practices"
          text="GPT best practices"
        />
      </ul>
      <h2 className="text-xl font-bold my-4">画像生成</h2>
      <ul className="list-disc ml-5">
        <li>
          テキストボックスに英語でプロンプトを入力して、生成する画像数を 1 - 10
          の中から選択して Submit ボタンを押してください。
        </li>
        <li>
          連続して多くの画像を生成すると、エラーになることがあります。そのときは少し時間をおいてからリトライしてください。
        </li>
        <li>画像をクリックすると別タブで開きます。</li>
        <li>
          画像を右クリックして開いたメニューから画像をダウンロードできます。
        </li>
        <li>プロンプト作成のベストプラクティスは下記を参考にしてください。</li>
        <LinkText
          link="https://stable-diffusion-art.com/prompt-guide/"
          text="Stable Diffusion prompt: a definitive guide"
        />
      </ul>
    </div>
  );
}
