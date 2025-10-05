# 项目部署指南

## 项目概述

这是一个基于 Vite + React + TanStack Router + React Query 的现代前端单页应用（SPA）。

## 构建和部署

### 1. 构建项目

```bash
# 安装依赖
npm install
# 或者使用 pnpm
pnpm install

# 构建生产版本
npm run build
# 或者使用 pnpm
pnpm build
```

构建完成后，会在项目根目录生成 `dist` 文件夹，包含以下文件：
- `index.html` - 主页面文件
- `favicon.svg` - 网站图标
- `assets/` - 静态资源文件夹
  - `index-[hash].js` - 打包后的 JavaScript 文件
  - `index-[hash].css` - 打包后的 CSS 文件

### 2. 部署到 Nginx

#### 方法一：直接拷贝 dist 文件夹

**是的，可以直接将 `dist` 文件夹拷贝到 nginx 服务器！**

1. 将整个 `dist` 文件夹拷贝到 nginx 的网站根目录：
   ```bash
   # 示例：拷贝到 nginx 默认目录
   cp -r dist/* /var/www/html/
   
   # 或者拷贝到自定义目录
   cp -r dist /var/www/your-site/
   ```

2. 配置 nginx（参考项目根目录的 `nginx.conf` 文件）

3. 重启 nginx 服务：
   ```bash
   sudo systemctl reload nginx
   ```

#### 方法二：使用 Docker

创建 `Dockerfile`：
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：
```bash
docker build -t my-react-app .
docker run -p 80:80 my-react-app
```

### 3. Nginx 配置要点

#### 关键配置说明：

1. **SPA 路由支持**：
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```
   这确保所有路由都返回 `index.html`，让 React Router 处理客户端路由。

2. **静态资源缓存**：
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Gzip 压缩**：
   减少传输大小，提高加载速度。

### 4. 部署检查清单

- [ ] 构建成功，生成 `dist` 文件夹
- [ ] 拷贝 `dist` 文件夹到服务器
- [ ] 配置 nginx 虚拟主机
- [ ] 设置正确的文件权限
- [ ] 测试网站访问
- [ ] 测试路由跳转（确保 SPA 路由正常工作）
- [ ] 检查静态资源加载
- [ ] 配置 HTTPS（生产环境推荐）

### 5. 常见问题

#### 问题1：刷新页面出现 404
**原因**：nginx 没有正确配置 SPA 路由支持
**解决**：确保 nginx 配置中有 `try_files $uri $uri/ /index.html;`

#### 问题2：静态资源加载失败
**原因**：资源路径不正确或权限问题
**解决**：
- 检查文件权限：`chmod -R 644 /var/www/html/`
- 检查目录权限：`chmod -R 755 /var/www/html/`

#### 问题3：API 请求跨域
**解决**：在 nginx 中配置 API 代理或在后端设置 CORS

### 6. 性能优化建议

1. **启用 Gzip 压缩**：减少传输大小
2. **设置静态资源缓存**：提高重复访问速度
3. **使用 CDN**：加速全球访问
4. **启用 HTTP/2**：提高并发性能
5. **配置 HTTPS**：安全且现代浏览器性能更好

### 7. 监控和维护

- 定期检查 nginx 访问日志和错误日志
- 监控网站性能和可用性
- 定期更新 SSL 证书（如果使用 HTTPS）
- 备份配置文件和网站内容

## 总结

这个项目完全可以通过简单的静态文件部署方式部署到 nginx。构建后的 `dist` 文件夹包含了所有必要的静态资源，可以直接拷贝到 nginx 服务器使用。关键是要正确配置 nginx 以支持 SPA 路由和静态资源服务。