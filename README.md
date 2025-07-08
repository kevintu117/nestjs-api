# NestJS POC 專案

這是一個基於 NestJS 的概念驗證 (POC) 專案，用於快速開發和測試各種想法和功能。採用模組化架構，讓不同的 POC 可以並存且易於擴展。

## 📋 目前實作的 POC 模組

### 🈳 簡繁轉換模組 (Text Conversion)

將簡體中文文字轉換為繁體中文的 API 服務。

**功能特色：**
- 使用 OpenCC 庫進行準確的簡繁轉換
- 完整的輸入驗證（最大 10,000 字元）
- RESTful API 設計
- 完整的測試覆蓋

**API 端點：**

#### POST `/text-conversion/convert`
轉換簡體中文為繁體中文

**請求範例：**
```bash
curl -X POST http://localhost:3000/text-conversion/convert \
  -H "Content-Type: application/json" \
  -d '{"text":"简体中文测试"}'
```

**回應範例：**
```json
{
  "originalText": "简体中文测试",
  "convertedText": "簡體中文測試",
  "timestamp": "2025-07-08T02:35:19.784Z"
}
```

#### GET `/text-conversion/health`
健康檢查端點

**回應範例：**
```json
{
  "status": "ok",
  "message": "Text conversion service is running"
}
```

### 💬 流式聊天模組 (Streaming Chat)

提供流式聊天 API 服務，將請求轉發到外部 AI API 並實時返回回應。

**功能特色：**
- 支援流式響應，實時返回 AI 回應
- 多輪對話支援（user、assistant、system 角色）
- 完整的輸入驗證和錯誤處理
- 自動重試和超時機制（30 秒）
- 完整的測試覆蓋

**API 端點：**

#### POST `/streaming-chat/stream`
流式聊天對話

**請求範例：**
```bash
curl -X POST http://localhost:3000/streaming-chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "Hello, how are you?",
        "role": "user"
      }
    ]
  }' \
  --no-buffer
```

**多輪對話範例：**
```bash
curl -X POST http://localhost:3000/streaming-chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "What is TypeScript?",
        "role": "user"
      },
      {
        "content": "TypeScript is a programming language...",
        "role": "assistant"
      },
      {
        "content": "Can you give me a simple example?",
        "role": "user"
      }
    ]
  }' \
  --no-buffer
```

**回應特色：**
- 流式文字回應（`Content-Type: text/plain; charset=utf-8`）
- 使用 `Transfer-Encoding: chunked` 進行分塊傳輸
- 即時接收 AI 回應，無需等待完整回應

#### GET `/streaming-chat/health`
健康檢查端點

**回應範例：**
```json
{
  "status": "ok",
  "message": "Streaming chat service is running"
}
```

## 🚀 快速開始

### 環境需求
- Node.js (v18 或更高版本)
- npm

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
# 開發模式（支援熱重載）
npm run start:dev

# 標準模式
npm run start

# 生產模式
npm run start:prod
```

伺服器預設在 `http://localhost:3000` 啟動

## 🧪 測試

```bash
# 單元測試
npm run test

# 端到端測試
npm run test:e2e

# 測試覆蓋率
npm run test:cov

# 特定模組測試
npm test -- --testPathPattern=text-conversion
npm test -- --testPathPattern=streaming-chat
```

## 🔧 程式碼品質

```bash
# ESLint 檢查和自動修復
npm run lint

# 程式碼格式化
npm run format
```

## 📁 專案結構

```
src/
├── app.controller.ts          # 主要控制器
├── app.service.ts             # 主要服務  
├── app.module.ts              # 應用程式模組
├── main.ts                    # 應用程式入口點
└── modules/                   # POC 功能模組
    ├── text-conversion/       # 簡繁轉換模組
    │   ├── text-conversion.module.ts
    │   ├── text-conversion.controller.ts
    │   ├── text-conversion.service.ts
    │   ├── convert-text.dto.ts
    │   ├── convert-text-response.dto.ts
    │   └── *.spec.ts          # 測試檔案
    └── streaming-chat/        # 流式聊天模組
        ├── streaming-chat.module.ts
        ├── streaming-chat.controller.ts
        ├── streaming-chat.service.ts
        ├── chat-request.dto.ts
        ├── chat-message.dto.ts
        └── *.spec.ts          # 測試檔案
```

## 🎯 設計原則

- **模組化架構**：每個 POC 都是獨立的模組
- **扁平化結構**：模組內檔案直接放在模組目錄中，不使用子目錄
- **類型安全**：使用 TypeScript 嚴格類型檢查
- **測試導向**：每個功能都有完整的測試覆蓋
- **程式碼品質**：使用 ESLint 和 Prettier 確保程式碼一致性

## 🔄 新增 POC 模組

1. 在 `src/modules/` 建立新的模組目錄
2. 建立模組相關檔案：
   - `[module-name].module.ts`
   - `[module-name].controller.ts`
   - `[module-name].service.ts`
   - `[module-name].dto.ts`
   - 對應的測試檔案
3. 在 `app.module.ts` 中註冊新模組
4. 撰寫測試並確保通過

## 🛠️ 技術棧

- **框架**：NestJS
- **語言**：TypeScript
- **測試**：Jest
- **驗證**：class-validator
- **HTTP 客戶端**：Axios (NestJS HttpModule)
- **程式碼品質**：ESLint + Prettier
- **特殊函式庫**：
  - OpenCC (簡繁轉換)
  - RxJS (流式處理)

## 📝 開發規範

專案遵循嚴格的開發規範，詳見：
- `.cursor/rules/` - Cursor IDE 規則
- `eslint.config.mjs` - ESLint 配置
- `.vscode/settings.json` - VSCode 設定

## 🤝 貢獻

歡迎提交新的 POC 想法或改進現有功能！請確保：
1. 遵循專案的程式碼規範
2. 添加適當的測試
3. 更新相關文件

## �� 授權

本專案使用 MIT 授權。
