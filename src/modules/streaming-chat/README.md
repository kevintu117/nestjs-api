# 💬 流式聊天模組 (Streaming Chat)

提供流式聊天 API 服務，將請求轉發到外部 AI API 並實時返回回應。

## 功能特色

- 支援流式響應，實時返回 AI 回應
- 多輪對話支援（user、assistant、system 角色）
- 完整的輸入驗證和錯誤處理
- 自動重試和超時機制（30 秒）
- 完整的測試覆蓋

## API 端點

### POST `/streaming-chat/stream`
流式聊天對話

**請求格式：**
```json
{
  "messages": [
    {
      "content": "Hello, how are you?",
      "role": "user"
    }
  ]
}
```

**單輪對話範例：**
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
        "content": "TypeScript is a programming language developed by Microsoft that builds on JavaScript by adding static type definitions.",
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

### GET `/streaming-chat/health`
健康檢查端點

**回應範例：**
```json
{
  "status": "ok",
  "message": "Streaming chat service is running"
}
```

## 訊息角色說明

| 角色 | 描述 | 使用時機 |
|------|------|----------|
| `user` | 使用者訊息 | 用戶提出的問題或請求 |
| `assistant` | AI 助理回應 | AI 的回答或建議 |
| `system` | 系統指令 | 設定 AI 行為的指導指令 |

## 輸入驗證

- `messages` 陣列為必填，至少包含一條訊息
- 每條訊息必須包含 `content` 和 `role` 字段
- `content` 必須為非空字串
- `role` 必須為 `user`、`assistant` 或 `system`

## 錯誤處理

| 狀態碼 | 描述 |
|--------|------|
| 400 | 輸入驗證失敗 |
| 500 | 流式傳輸錯誤 |
| 504 | 外部 API 超時（30 秒） |

## 測試

```bash
# 執行此模組的測試
npm test -- --testPathPattern=streaming-chat

# 執行特定測試檔案
npm test src/modules/streaming-chat/streaming-chat.service.spec.ts
npm test src/modules/streaming-chat/streaming-chat.controller.spec.ts
```

## 技術實作

### 依賴函式庫
- **@nestjs/axios**: HTTP 客戶端
- **RxJS**: 流式資料處理
- **class-validator**: 輸入驗證
- **class-transformer**: 資料轉換

### 檔案結構
```
streaming-chat/
├── README.md                            # 模組說明文件
├── streaming-chat.module.ts             # 模組定義
├── streaming-chat.controller.ts         # HTTP 控制器
├── streaming-chat.service.ts            # 業務邏輯服務
├── chat-request.dto.ts                  # 聊天請求 DTO
├── chat-message.dto.ts                  # 聊天訊息 DTO
├── streaming-chat.controller.spec.ts    # 控制器測試
└── streaming-chat.service.spec.ts       # 服務測試
```

### 關鍵類別

#### `StreamingChatService`
- 負責與外部 AI API 通訊
- 處理流式資料傳輸
- 管理 Observable 流和錯誤處理
- 配置超時和重試機制

#### `StreamingChatController`
- 處理 HTTP 請求和流式回應
- 設定流式傳輸 headers
- 管理連線狀態和錯誤處理

## 流式傳輸技術

### Headers 配置
```typescript
response.setHeader('Content-Type', 'text/plain; charset=utf-8');
response.setHeader('Transfer-Encoding', 'chunked');
response.setHeader('Cache-Control', 'no-cache');
response.setHeader('Connection', 'keep-alive');
```

### RxJS Observable 流
```typescript
const stream$ = this.streamingChatService.streamChat(chatRequest);
stream$.subscribe({
  next: (chunk: string) => response.write(chunk),
  error: (error) => this.handleStreamError(error, response),
  complete: () => response.end()
});
```

## 外部 API 配置

目前配置的外部 API 端點：
```
http://192.168.0.82:8000/streaming/test
```

### 請求配置
- **Method**: POST
- **Timeout**: 30 秒
- **Headers**: `Accept: application/json`, `Content-Type: application/json`
- **Response Type**: stream

## 使用範例

### 基本聊天
```bash
curl -X POST http://localhost:3000/streaming-chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "什麼是 NestJS？",
        "role": "user"
      }
    ]
  }' \
  --no-buffer
```

### 帶上下文的對話
```bash
curl -X POST http://localhost:3000/streaming-chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "你是一個程式設計助手",
        "role": "system"
      },
      {
        "content": "如何在 TypeScript 中定義介面？",
        "role": "user"
      }
    ]
  }' \
  --no-buffer
```

## 效能考量

- **連線數限制**: 支援並發流式連線
- **記憶體使用**: 流式處理避免大量資料緩存
- **超時控制**: 30 秒自動超時防止連線懸掛
- **錯誤恢復**: 自動錯誤處理和連線清理

## 監控和日誌

```typescript
// 服務啟動日誌
this.logger.log('Starting streaming chat request');

// 資料塊接收日誌
this.logger.debug(`Received chunk: ${text.substring(0, 50)}...`);

// 流式結束日誌
this.logger.log('Stream ended');

// 錯誤日誌
this.logger.error('Stream error:', error);
```

## 未來擴展

- [ ] 支援多個外部 AI 提供商
- [ ] 加入聊天記錄持久化
- [ ] 實作速率限制和用量監控
- [ ] 支援檔案上傳和多媒體對話
- [ ] 加入聊天室和多用戶支援
- [ ] WebSocket 支援
- [ ] 聊天記錄搜尋和匯出功能 