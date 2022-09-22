# studyPixiJS
學習和測試PixiJS

[PixiJS Elementals](https://www.pixijselementals.com/#introduction)

## pixi-hotwire
建立基本結構
首先，在任何想要建構環境的資料夾中下一系列的指令：

```bash
// 到你想要建構環境的資料夾內
$ cd PATH_TO_DIR

// 初始化 package.json
$ npm init -y

// 初始化 tsconfig.json
$ tsc --init
```

#### 下載 Webpack 相關套件

首先，筆者下載兩個跟 `webpack` 相關的套件：

```bash
$ npm install webpack webpack-cli copy-webpack-plugin --save-dev
```

另外，因為我們需要讓 TypeScript 與專案結合，必須要**重新下載 `typescript`** 與下載打包時需要的 Loader —— 也就是 `ts-loader`：

```bash
$ npm install typescript ts-loader --save-dev
```

專案設定

習慣上，開發時我們會將主程式都放在名為 `/src` 的資料夾；打包專案時則會將結果輸出到 `/build` 或 `/dist` 的資料夾（又或者是看讀者有什麼習慣）。

以下分別新增兩種專案資料夾，並且額外新增 `index.ts` 到 `/src` 資料夾裡，代表主程式撰寫的地方喔～

```bash
// 建構 /src 與 /dist 這兩種不同的檔案資料夾
$ mkdir src
$ mkdir dist

// 新增 ./src/index.ts 檔案
$ touch ./src/index.ts
```

在 `index.ts` 裡隨便寫一行 `console.log`：
```
console.log("hello world");
```

另外，我們也需要設定 TypeScript 編譯器的檔案：

```json
{
  "compilerOptions": {
    
    "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library 
    "module": "commonjs", /* Specify what module code is generated. */
    "rootDir": "./src/", /* Specify the root folder within your source files. */
                                  /* Specify type package names to be included without being referenced in a source file. */
                                   
    "outDir": "./dist/", /* Specify an output folder for all emitted files. */
    
    "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
    
    "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
   
    "strict": true, /* Enable all strict type-checking options. */
    "noImplicitAny": true, /* Enable error reporting for expressions and declarations with an implied `any` type.. */
    "strictNullChecks": true, /* When type checking, take into account `null` and `undefined`. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
```

以上是筆者設定過的東西，其他如果有一開始預設的設定被啟動可以放著。

另外，建立 `webpack.config.js` 並且填入以下內容：
```javascript
const path = require('path');

module.exports = {
    //輸入的檔案
    entry: './src/index.ts',
    module: {
        rules: [
            //使用ts-loader負責處理.ts相關的檔案
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        //輸出的檔案名稱為bundle.js
        filename: 'bundle.js',

        //輸出的檔案會放置在./dist/這個資料夾裡
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // Copy our static assets to the final build
        new CopyPlugin({
            patterns: [{ from: 'static/' }],
        }),
    ],
}
```
編譯到測試開發流程

接之前筆者有提過我們可以使用 `lite-server` 簡單地 Host HTML 檔案並且監控靜態檔案的變更 —— 如果該 HTML 檔引入的 JavaScript 檔案有被變動時，就會自動幫我們刷新頁面。

首先，我們當然得先要有 `index.html` 來測試我們編譯過後的 JavaScript 檔案，以下是 `index.html` 的程式碼內容。
```htmlembedded
<!DOCTYPE html>
<html lang="en">

<head>
    <title>UBike Map Example</title>
</head>

<body>
    <!--引入編譯結果-->
    <script src="./dist/bundle.js"></script>
</body>

</html>

```
另外，我們除了想要使用 `lite-server` 外，通常使用 `webpack` 打包專案時，可以使用 `webpack -w` 開啟 Watch 模式 —— 只要專案一有變動，Webpack 就會自動重新打包並更新輸出結果。

不過這樣子又會遇到必須同時開兩個終端機，分別執行 `lite-server` 與 `webpack -w` 這兩個指令，於是我們也可以使用筆者之前提到的 `concurrently` 這個套件 —— 協助我們同時執行這兩種指令。

首先，下載 `lite-server` 與 `concurrenly` 這兩個套件：

```bash
$ npm install lite-server concurrently --save-dev
```

並且將 `package.json` 裡的 `scripts` 修改成：

```json
{
  /* 略... */
  "scripts": {
    "start:watch": "webpack -w",
    "start:serve": "lite-server",
    "start": "concurrently npm:start:*"
  },
  /* 略... */
}
```

我們就可以使用 `npm start` 同時執行 `webpack -w` 與 `lite-server` 這兩種指令。
