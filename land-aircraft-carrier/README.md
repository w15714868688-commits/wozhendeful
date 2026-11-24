# 把一架飞机装进后备箱

**小鹏汇天「陆地航母」/ X3-F 的全方位调研与可行性分析**

《飞行汽车技术基础》课程作业 · 2026

---

## 这是什么

一个不依赖任何框架、构建工具或外部 CDN 的单页研究网站。入口文件是根目录的 `index.html`，直接用浏览器打开即可阅读。

研究对象是小鹏汇天「陆地航母」量产构型：陆行体（6×6 增程车）+ 飞行体 X3-F（双人 eVTOL）。报告围绕四条主线展开：

1. **技术可行性**：880 kg、20 km、20 min、120 m 的包线是否自洽？500 km / 360 km/h 到底是谁的参数？
2. **适航与监管**：LSA 类别意味着什么？TC / PC / AC / OC 卡在哪一步？为什么“能飞”不等于“能商业载客”？
3. **应用场景**：为什么它天然适合 A→A 营地闭环，而不适合 A→B 通勤？
4. **市场可行性**：7,000 个意向订单能否变成收入？营地、培训、保险与单位经济模型是否成立？

核心判断：**技术可行，场景很窄，市场待验证。** 它不是“会飞的车”，而是一套“把飞机带到风景里”的个人飞行系统。

---

## 本地预览

无需安装依赖：

```bash
# 方式一：直接双击 index.html
# 方式二：起一个本地静态服务器（推荐，避免部分浏览器对 file:// 的限制）
python -m http.server 8000
# 然后访问 http://localhost:8000
```

推荐使用最新版 Chrome / Edge / Safari / Firefox。页面为响应式设计，桌面与移动端均可阅读。

---

## 文件结构

```text
.
├─ index.html                 # 唯一入口，所有正文与图表容器
├─ assets/
│  ├─ css/style.css           # 设计系统、版式、响应式、打印样式
│  ├─ js/app.js               # 导航、进度、标签页、计算器、筛选、揭示动画
│  └─ img/
│     ├─ hero-wide.webp       # 首屏图（ARIDGE 官方产品图）
│     ├─ separation.webp      # 分离/收纳过程（ARIDGE 官方产品图）
│     ├─ flight.webp          # 飞行场景（ARIDGE 官方产品图）
│     ├─ car.webp             # 陆行体（ARIDGE 官方产品图）
│     ├─ battery.webp         # 电池包（ARIDGE 官方产品图）
│     ├─ redundancy.webp      # 三余度飞控（ARIDGE 官方产品图）
│     ├─ a868.webp            # A868 官方参数图（用于口径对照）
│     ├─ dimensions.svg       # 原创尺寸图
│     ├─ energy.svg           # 原创能量核算图
│     ├─ positioning.svg      # 原创产品定位图
│     ├─ loop.svg             # 原创 A→A / A→B 架构图
│     ├─ favicon.svg
│     └─ og.jpg
├─ docs/
│  └─ ai-usage.md             # AI 使用记录
├─ README.md
└─ LICENSE.md
```

---

## 提交到 GitHub（按课程要求）

课程要求：**Public 仓库 + 根目录 `index.html` + 把网页链接填入右侧“作业收集”表**。

### 1. 创建仓库

在 GitHub 新建一个 **Public** 仓库，例如 `land-aircraft-carrier`。不要勾选 “Add a README file”，保持空仓库。

### 2. 上传本目录

```bash
cd land-aircraft-carrier
git init
git add .
git commit -m "Course assignment: AeroHT Land Aircraft Carrier case study"
git branch -M main
git remote add origin https://github.com/<你的用户名>/land-aircraft-carrier.git
git push -u origin main
```

> 也可以在 GitHub 网页端 “Add file → Upload files” 直接拖入本目录的全部内容。务必确认 **`index.html` 在仓库根目录**，而不是在子文件夹里。

### 3. 开启 GitHub Pages

仓库页 → **Settings** → **Pages** → **Build and deployment**：

- Source: **Deploy from a branch**
- Branch: **main** / **/(root)**
- 点击 **Save**

等待 1–3 分钟，访问：

```text
https://<你的用户名>.github.io/land-aircraft-carrier/
```

如果页面 404，检查：

- `index.html` 是否在根目录；
- Pages 是否选择了 `main` + `/(root)`；
- 仓库是否为 Public；
- 是否刚推送、需要等待构建。

### 4. 提交链接

把上面的网页链接填入课程幻灯片右侧二维码对应的“飞行汽车技术基础-作业收集”表。建议同时附上 GitHub 仓库链接。

> 如果 GitHub Pages 在当前网络下访问不稳定，可以保留 Public 仓库，同时用 Netlify Drop / Vercel / Cloudflare Pages 部署同一目录，提交可访问的镜像链接；但不要只交一个本地文件。

---

## 证据与边界

- **证据截止**：2026-11-24。
- **证据分级**：A 监管/官方文件；B 主流媒体/公告/管理层表态；C 企业营销材料；D 无法核实/本报告测算。
- **关键校正**：
  - X3-F 的审定参数是 **20 km / 20 min / 120 m / 72 km/h**；“500 km / 360 km/h”属于 6 座 A868。
  - 专用条件基本参数为 **880 kg**，适用范围上限为 **960 kg**；媒体常只写后者。
  - 截至 2026-11-24，**TC 待颁、PC 审查中、AC 未发**；公司最新口径为 **2027 年年中启动量产交付**。
  - 7,000 台是**意向/预售口径**，含中东 600 台协议，不是确认订单、交付量或收入。
  - 2025-09-16 长春航展事故：企业称现场人员安全，截至证据截止日未见公开的最终调查结论。
- 所有测算均为数量级校验，不是官方性能模型或财务预测；假设见页面附录 B。

完整来源见页面第 09 章“参考文献”，关键说法逐条审计见附录 A。

---

## AI 使用记录

详见 [`docs/ai-usage.md`](docs/ai-usage.md)。简要说明：

- AI 用于资料检索辅助、结构梳理、文字草拟、图表计算、图片压缩、前端实现与排版检查。
- 所有事实均要求回溯至公开来源；AI 未用于生成不存在的引用。
- 测算、判断与局限由作者负责；读者应优先核对原始来源。

---

## 图片版权

- 产品照片来自 **ARIDGE 官方产品页**（<https://www.aridge.com/>），版权归原权利人所有，仅用于课程研究与评论，不构成商业使用或官方背书。
- 尺寸图、能量图、定位图、A→A / A→B 架构图为本文原创 SVG，采用 **CC BY 4.0** 许可（署名：本课程作业）。
- 如权利人要求删除某张图片，请联系作者替换。

---

## 许可

- 文字与原创图表：**CC BY 4.0**（见 `LICENSE.md`）。
- 第三方产品图片：版权归原权利人，不在 CC BY 4.0 授权范围内。

---

## 作者信息

提交前可在此补充：

- 姓名：`________`
- 学号：`________`
- 课程：飞行汽车技术基础
- 学期：2026 秋
