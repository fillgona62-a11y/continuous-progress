# 乔天宇 · 無限進步 — 个人主页

酷炫科技风静态个人主页，纯 HTML / CSS / 原生 JS，无构建、无依赖。

## 预览

直接双击 `index.html` 即可在浏览器中预览。

## 文件结构

```
index.html          页面结构
styles.css          样式（深色科技风 + 四套撞色）
script.js           星空背景、打字机、滚动显现、技能条动画
assets/avatar.svg   无限符号头像（四色渐变）
.nojekyll           告诉 GitHub Pages 跳过 Jekyll 处理
README.md           本文件
```

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库，推荐命名为 `你的用户名.github.io`
   （这样网址是 `https://你的用户名.github.io`）
2. 把本目录下所有文件复制到仓库根目录并推送：

```bash
git init
git add .
git commit -m "init: personal page"
git branch -M main
git remote add origin https://github.com/<用户名>/<仓库名>.git
git push -u origin main
```

3. 仓库 → Settings → Pages → Source: Deploy from a branch
   → Branch: `main` / `(root)` → Save
4. 1~2 分钟后访问 `https://<用户名>.github.io`

## 更新内容

修改文件后重新推送即可：

```bash
git add .
git commit -m "update"
git push
```
