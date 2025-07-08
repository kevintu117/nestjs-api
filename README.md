# NestJS POC 專案

這是一個基於 NestJS 的概念驗證 (POC) 專案，用於快速開發和測試各種想法和功能。採用模組化架構，讓不同的 POC 可以並存且易於擴展。

## 📋 目前實作的 POC 模組

### 🈳 [簡繁轉換模組 (Text Conversion)](./src/modules/text-conversion/README.md)

將簡體中文文字轉換為繁體中文的 API 服務。

**快速開始：**
```bash
curl -X POST http://localhost:3000/text-conversion/convert \
  -H "Content-Type: application/json" \
  -d '{"text":"简体中文测试"}'
```

**特色功能：** OpenCC 轉換 • 輸入驗證 • RESTful API

### 💬 [流式聊天模組 (Streaming Chat)](./src/modules/streaming-chat/README.md)

提供流式聊天 API 服務，將請求轉發到外部 AI API 並實時返回回應。

**快速開始：**
```bash
curl -X POST http://localhost:3000/streaming-chat/stream \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"content":"Hello","role":"user"}]}' \
  --no-buffer
```

**特色功能：** 流式響應 • 多輪對話 • RxJS Observable • 超時控制

## 🚀 快速開始

### 環境需求
- Node.js (v18 或更高版本)
- npm

### 安裝與啟動
```bash
# 安裝依賴
npm install

# 啟動開發伺服器（支援熱重載）
npm run start:dev
```

伺服器預設在 `http://localhost:3000` 啟動

### 健康檢查
```bash
# 檢查所有模組狀態
curl http://localhost:3000/text-conversion/health
curl http://localhost:3000/streaming-chat/health
```

## 🧪 測試

```bash
# 執行所有測試
npm run test

# 執行特定模組測試
npm test -- --testPathPattern=text-conversion
npm test -- --testPathPattern=streaming-chat

# 端到端測試
npm run test:e2e

# 測試覆蓋率
npm run test:cov
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
    ├── text-conversion/       # 🈳 簡繁轉換模組
    │   ├── README.md          # 模組詳細說明
    │   ├── *.ts               # TypeScript 檔案
    │   └── *.spec.ts          # 測試檔案
    └── streaming-chat/        # 💬 流式聊天模組
        ├── README.md          # 模組詳細說明
        ├── *.ts               # TypeScript 檔案
        └── *.spec.ts          # 測試檔案
```

## 🎯 設計原則

- **模組化架構**：每個 POC 都是獨立的模組，有自己的 README
- **扁平化結構**：模組內檔案直接放在模組目錄中，不使用子目錄
- **類型安全**：使用 TypeScript 嚴格類型檢查
- **測試導向**：每個功能都有完整的測試覆蓋
- **程式碼品質**：使用 ESLint 和 Prettier 確保程式碼一致性
- **文件完整**：每個模組都有詳細的使用說明和範例

## 🔄 新增 POC 模組

1. 在 `src/modules/` 建立新的模組目錄
2. 建立模組相關檔案：
   - `README.md` - 模組說明文件
   - `[module-name].module.ts` - 模組定義
   - `[module-name].controller.ts` - HTTP 控制器
   - `[module-name].service.ts` - 業務邏輯服務
   - `*.dto.ts` - 資料傳輸物件
   - `*.spec.ts` - 測試檔案
3. 在 `app.module.ts` 中註冊新模組
4. 在主 README 新增模組連結
5. 撰寫測試並確保通過

## 🛠️ 技術棧

- **框架**：NestJS
- **語言**：TypeScript
- **測試**：Jest
- **驗證**：class-validator
- **HTTP 客戶端**：Axios (NestJS HttpModule)
- **流式處理**：RxJS
- **程式碼品質**：ESLint + Prettier
- **特殊函式庫**：OpenCC (簡繁轉換)

## 📝 開發規範

專案遵循嚴格的開發規範，詳見：
- `.cursor/rules/` - Cursor IDE 規則
- `eslint.config.mjs` - ESLint 配置
- 各模組 README - 詳細使用說明

## 🤝 貢獻

歡迎提交新的 POC 想法或改進現有功能！請確保：
1. 遵循專案的程式碼規範
2. 添加適當的測試
3. 更新相關文件（包括模組 README）
4. 在主 README 中新增模組連結

## �� 授權

本專案使用 MIT 授權。
