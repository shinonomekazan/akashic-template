# akashic-template

**akashic-template**は TypeScript で Akashic のゲームを作るためのテンプレートです。

## 利用方法

`akashic-template` を利用するには Node.js が必要です。

初回のみ、以下のコマンドを実行して、ビルドに必要なパッケージをインストールしてください。
この作業は `akashic-template` を新しく生成するごとに必要です。

```sh
npm install
```

### ビルド方法

`akashic-template` は TypeScript で書かれているため、以下のコマンドで JavaScript ファイルに変換する必要があります。

```sh
npm run build
```

`src` ディレクトリ以下の TypeScript ファイルがコンパイルされ、`script` ディレクトリ以下に JavaScript ファイルが生成されます。

`npm run build` は自動的に `akashic scan asset script` を実行するので、`game.json` の更新が行われます。

### 動作確認方法

以下のどちらかを実行後、ブラウザで `http://localhost:3000/game/` にアクセスすることでゲームを実行できます。

- `npm start`
- `npm install -g @akashic/akashic-sandbox` 後、 `akashic-sandbox .`
