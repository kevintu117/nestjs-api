# 🈳 簡繁轉換模組 (Text Conversion)

將簡體中文文字轉換為繁體中文的 API 服務。

## 功能特色

- 使用 OpenCC 庫進行準確的簡繁轉換
- 完整的輸入驗證（最大 10,000 字元）
- RESTful API 設計
- 完整的測試覆蓋

## API 端點

### POST `/text-conversion/convert`
轉換簡體中文為繁體中文

**請求格式：**
```json
{
  "text": "简体中文测试"
}
```

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

### GET `/text-conversion/health`
健康檢查端點

**回應範例：**
```json
{
  "status": "ok",
  "message": "Text conversion service is running"
}
```

## 輸入驗證

- `text` 字段為必填
- 最大長度：10,000 字元
- 必須為有效的字串格式

## 錯誤處理

| 狀態碼 | 描述 |
|--------|------|
| 400 | 輸入驗證失敗 |
| 500 | 轉換處理錯誤 |

## 測試

```bash
# 執行此模組的測試
npm test -- --testPathPattern=text-conversion

# 執行特定測試檔案
npm test src/modules/text-conversion/text-conversion.service.spec.ts
npm test src/modules/text-conversion/text-conversion.controller.spec.ts
```

## 技術實作

### 依賴函式庫
- **OpenCC**: 簡繁轉換核心庫
- **class-validator**: 輸入驗證
- **class-transformer**: 資料轉換

### 檔案結構
```
text-conversion/
├── README.md                           # 模組說明文件
├── text-conversion.module.ts           # 模組定義
├── text-conversion.controller.ts       # HTTP 控制器
├── text-conversion.service.ts          # 業務邏輯服務
├── convert-text.dto.ts                 # 請求 DTO
├── convert-text-response.dto.ts        # 回應 DTO
├── text-conversion.controller.spec.ts  # 控制器測試
└── text-conversion.service.spec.ts     # 服務測試
```

### 關鍵類別

#### `TextConversionService`
- 負責執行簡繁轉換邏輯
- 使用 OpenCC 進行文字轉換
- 處理轉換錯誤和例外

#### `TextConversionController`
- 處理 HTTP 請求和回應
- 執行輸入驗證
- 格式化 API 回應

## 使用範例

### 基本使用
```typescript
// 在其他服務中注入使用
constructor(private readonly textConversionService: TextConversionService) {}

// 執行轉換
const result = await this.textConversionService.convertText('简体中文');
console.log(result); // '簡體中文'
```

### 批量測試
```bash
# 測試多種簡體中文文字
curl -X POST http://localhost:3000/text-conversion/convert \
  -H "Content-Type: application/json" \
  -d '{"text":"北京大学的学生们正在学习计算机科学"}'
```

## 效能考量

- 轉換速度：約 1-2ms 處理 1000 字元
- 記憶體使用：OpenCC 字典載入約 10MB
- 併發處理：支援多請求並行處理

## 未來擴展

- [ ] 支援多種轉換模式（繁轉簡、台灣正體等）
- [ ] 加入快取機制提升效能
- [ ] 支援批量轉換 API
- [ ] 新增轉換統計和監控 