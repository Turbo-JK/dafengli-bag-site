# 首页内容管理说明

## 当前状态

- **手袋商品**：已在后台「商品管理」中管理，数据来自 Supabase，可增删改查、多颜色、图片上传。
- **首页其他区块**（新品上市、手工艺的永恒承诺、甄选全球顶级皮革、穿搭灵感、品牌故事等）目前为**静态内容**：
  - 文案来自 `lib/i18n.ts`（中英文键值）。
  - 图片来自 `public/images/`（如 hero.jpg、craft.jpg）。
  - 「新品上市」列表来自接口 `/api/products`（isNew / isFeatured），与手袋数据一致。
  - 「穿搭灵感」Lookbook、「品牌故事」Stories 仍使用 `lib/mock-data.ts`，尚未接入后台。

## 一般网站的做法

1. **独立 CMS**（Strapi、Contentful、Sanity 等）  
   文案、图片、区块顺序在 CMS 里维护，网站通过 API 拉取后渲染。适合内容多、多人协作、多站点复用。

2. **后台 + 数据库**  
   在现有 Admin 里增加「首页管理」或「内容管理」：每个区块对应一条记录（标题、副标题、图片 URL、链接、排序），存 Supabase；首页请求 `/api/homepage-sections` 等接口再渲染。和当前商品管理同一套技术栈。

3. **代码/配置内维护**  
   文案改 `lib/i18n.ts`，图片替换 `public/images/` 后重新部署。无需后端，适合更新频率低、由开发完成发布的情况。

## 后续可做的扩展

- 在 Supabase 增加表（如 `homepage_sections`、`stories`、`lookbook_items`），并为之编写 API 与 Admin 页面，让「新品上市」以外的区块也支持在后台编辑标题、副标题、图片、链接等。
- 将首页改为根据接口数据动态渲染各区块，而不是写死组件与 i18n key。
