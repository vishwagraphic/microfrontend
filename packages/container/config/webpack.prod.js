const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleContainerPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTIONS_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/"
  },
  plugins: [
    new ModuleContainerPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@/marketing/latest/remoteEntry.js`,
        auth: "auth@auth/latest/remoteEntry.js",
        dashboard: "dashboard@dashboard/latest/remoteEntry.js"
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
