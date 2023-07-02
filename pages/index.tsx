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
              text="Completions API (gpt-3.5-turbo)"
            />
          </li>
          <li>
            <LinkText
              link="https://platform.openai.com/docs/guides/images/introduction"
              text="Image generation API (DALL·E)"
            />
          </li>
        </ul>
      </div>
      <h2 className="text-xl font-bold my-4">テキスト生成</h2>
      <ul className="list-disc ml-5">
        <li>
          テキストボックスにプロンプトを入力して、Submit
          ボタンを押してください。
        </li>
        <li>レスポンスの中にあるコピーボタンでテキストをコピーできます。</li>
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
          テキストボックスにプロンプトを入力して、Batch size
          (同時に作成する画像数) を選択してから Submit ボタンを押してください。
        </li>
        <li>Batch size は 1 - 10 の範囲で選択できます。</li>
        <li>
          画像をクリックすると別タブで開きます。なお、一定時間が経過すると保存先サーバーから削除されてしまうようです。
        </li>
        <li>
          画像を右クリックして開いたメニューから画像をダウンロードできます。
        </li>
      </ul>
    </div>
  );
}
