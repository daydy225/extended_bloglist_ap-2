// vite.config.js
import { defineConfig } from "file:///D:/full-stack-course-workspace/extended_bloglist_app/node_modules/vite/dist/node/index.js";
import react from "file:///D:/full-stack-course-workspace/extended_bloglist_app/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react()
    // react({
    //   babel: {
    //     plugins: ['@babel/plugin-syntax-jsx'],
    //     babelrc: true,
    //     configFile: true,
    //   },
    // }),
  ],
  // server: {
  //   port: 3000,
  //   host: '127.0.0.1',
  proxy: {
    "/api": {
      target: "http://localhost:3003",
      changeOrigin: true,
      secure: false
    }
  }
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmdWxsLXN0YWNrLWNvdXJzZS13b3Jrc3BhY2VcXFxcZXh0ZW5kZWRfYmxvZ2xpc3RfYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmdWxsLXN0YWNrLWNvdXJzZS13b3Jrc3BhY2VcXFxcZXh0ZW5kZWRfYmxvZ2xpc3RfYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mdWxsLXN0YWNrLWNvdXJzZS13b3Jrc3BhY2UvZXh0ZW5kZWRfYmxvZ2xpc3RfYXBwL3ZpdGUuY29uZmlnLmpzXCI7LyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIC8vIHJlYWN0KHtcclxuICAgIC8vICAgYmFiZWw6IHtcclxuICAgIC8vICAgICBwbHVnaW5zOiBbJ0BiYWJlbC9wbHVnaW4tc3ludGF4LWpzeCddLFxyXG4gICAgLy8gICAgIGJhYmVscmM6IHRydWUsXHJcbiAgICAvLyAgICAgY29uZmlnRmlsZTogdHJ1ZSxcclxuICAgIC8vICAgfSxcclxuICAgIC8vIH0pLFxyXG4gIF0sXHJcbiAgLy8gc2VydmVyOiB7XHJcbiAgLy8gICBwb3J0OiAzMDAwLFxyXG4gIC8vICAgaG9zdDogJzEyNy4wLjAuMScsXHJcbiAgcHJveHk6IHtcclxuICAgICcvYXBpJzoge1xyXG4gICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDMnLFxyXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFSO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQTtBQUVGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
