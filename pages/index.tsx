import { LinkText } from "../components/linkText";

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
              link="https://stablediffusionapi.com/docs/category/stable-diffusion-api"
              text="Stable Diffusion API"
            />
          </li>
        </ul>
        <p>
          テキスト生成と画像生成どちらも、ジムや広告関連の出力をするように設定しているため、他のものを生成しようとするとうまくいかない可能性があります。
        </p>
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
        <li>画像をクリックすると別タブで開きます。</li>
        <li>
          連続して多くの画像を生成したりリクエストが混み合う時間帯になると、生成に時間を要する場合があります。その場合は時間を置いてから画像をクリックしてください。
        </li>
        <li>
          時間を置いてから画像を開いても Not Found
          のままの場合、スーパーリロード (Command + Shift + R、Windows は Ctrl +
          Shift + R) でキャッシュを削除すると開けることがあります。
        </li>
        <li>
          画像を右クリックして開いたメニューから画像をダウンロードできます。
        </li>
        <li>プロンプト作成のベストプラクティスは下記を参考にしてください。</li>
        <LinkText
          link="https://stable-diffusion-art.com/prompt-guide/"
          text="Stable Diffusion prompt: a definitive guide"
        />
      </ul>
      <h2 className="text-xl font-bold my-4">画像バリエーション生成</h2>
      <ul className="list-disc ml-5">
        <li>
          画像を指定して類似の画像のバリエーションを生成することができます。
        </li>
        <li>
          画像の URL とプロンプトを入力して Submit ボタンを押してください。
        </li>
        <li>
          プロンプトは必須入力ですが、画像生成時に入力したものと同じでも大丈夫です。
        </li>
      </ul>
    </div>
  );
}
