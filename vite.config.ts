// vite.config.js
export default {
  publicPath: "/vue3.0/",
  proxy: {
    // string shorthand
    "/foo": "http://localhost:4567/foo",
    // with options
    "/api": {
      target: "http://jsonplaceholder.typicode.com",
      changeOrigin: true,
      rewrite: (path: any) => path.replace(/^\/api/, ""),
    },
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        "preprocess-custom-color": "green",
      },
    },
  },
};
