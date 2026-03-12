# 阿里云后台登录配置清单

Vercel 能登录、阿里云不能登录时，按下面步骤从头检查。

---

## 1. 确认项目目录

SSH 登录阿里云后：

```bash
cd /var/www/dafengli-bag-site
pwd
# 应输出：/var/www/dafengli-bag-site
```

---

## 2. 确认 .env.local 存在且内容正确

```bash
cat .env.local
```

必须包含以下三行（值要和 Vercel 里一致）：

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=DFL2026!bag
ADMIN_SESSION_TOKEN=ajsdh73289asdjh9283asdh
```

注意：
- 等号两边不要有空格
- 不要用引号包起来
- 每行结尾不要有多余空格
- 文件编码 UTF-8

如果没有或不对，编辑：

```bash
nano .env.local
```

把上面三行加进去，保存退出（Ctrl+O 回车，Ctrl+X）。

---

## 3. 确认 .env.local 在项目根目录

```bash
ls -la .env.local
# 应显示文件存在

ls package.json
# 应和 .env.local 在同一目录
```

---

## 4. 拉取最新代码并重新构建

```bash
cd /var/www/dafengli-bag-site
git pull
pnpm install
pnpm build
```

构建必须成功，不能有报错。

---

## 5. 重启 PM2（必须！）

环境变量只在进程启动时加载，改完 .env.local 后必须重启：

```bash
pm2 list
# 找到你的应用名，例如 dafengli 或 npm

pm2 restart 你的应用名
# 例如：pm2 restart dafengli
```

---

## 6. 测试登录 API

在服务器上直接调接口：

```bash
curl -X POST http://127.0.0.1:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"DFL2026!bag"}'
```

- 若返回 `{"ok":true}` → 接口正常，问题在浏览器/cookie
- 若返回 `{"ok":false,"message":"Admin login is not configured."}` → 环境变量未生效，回到步骤 2、5
- 若返回 `{"ok":false,"message":"Invalid credentials."}` → 账号密码不对，检查 .env.local 里的值

---

## 7. 浏览器测试

1. 打开：`http://8.163.26.202:3000/admin/login`
2. 账号：`admin`，密码：`DFL2026!bag`
3. 点登录

若仍失败，按 F12 打开开发者工具 → Network，点登录后看 `/api/admin/login` 的响应：
- Status 500 + "Admin login is not configured" → 环境变量问题
- Status 401 → 账号密码错误
- Status 200 → 接口成功，可能是 cookie 问题（已通过代码修复 HTTP 下 Secure cookie）

---

## 常见问题

| 现象 | 原因 | 处理 |
|------|------|------|
| 点登录后闪回「登录」、无错误 | HTTP 下 cookie 被设为 Secure，浏览器不保存 | 已修复，需 git pull 后重新 build + restart |
| 提示 Admin login is not configured | 环境变量未加载 | 检查 .env.local 位置、内容，并 pm2 restart |
| 提示 Invalid credentials | 账号或密码不一致 | 确认 .env.local 与输入完全一致（大小写、符号） |

---

## 完整操作顺序（一次性执行）

```bash
cd /var/www/dafengli-bag-site
git pull
# 确认 .env.local 有 ADMIN_USERNAME、ADMIN_PASSWORD、ADMIN_SESSION_TOKEN
pnpm install
pnpm build
pm2 restart 你的应用名
```

然后访问 `http://8.163.26.202:3000/admin/login` 测试。
