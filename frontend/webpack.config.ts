import path from "path";
import webpack, {
  EnvironmentPlugin,
  ModuleOptions,
  RuleSetRule,
} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

type EnvironmentVariables = {
  mode: ConfigMode;
  port: DevServerConfiguration["port"];
  paths: ConfigPaths;
  BASE_URL?: string;
  showAnalyzer?: boolean;
};
interface ConfigPaths {
  entry: string;
  output: string;
  indexHtml: string;
  public: string;
  src: string;
  favicon: string;
}
type ConfigMode = webpack.Configuration["mode"];

interface ConfigOptions extends EnvironmentVariables {
  isDev: boolean;
  isProd: boolean;
  paths: ConfigPaths;
}

export default (env: EnvironmentVariables): webpack.Configuration => {
  const isDev = env.mode === "development";
  const isProd = env.mode === "production";

  const configPaths: ConfigPaths = {
    public: path.resolve(),
    indexHtml: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    favicon: path.resolve(__dirname, "public", "Favicon16.ico"),
  };

  const configOptions: ConfigOptions = {
    ...env,
    mode: env.mode ?? "development",
    port: env.port ?? "3000",
    showAnalyzer: env.showAnalyzer ? env.showAnalyzer : false,
    paths: configPaths,
    isDev,
    isProd,
  };

  const webpackConfig: webpack.Configuration = {
    mode: configOptions.mode ?? "development",
    entry: configOptions.paths.entry,
    output: {
      path: configOptions.paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: getPlugins(configOptions),
    devServer: getDevServer(configOptions),
    module: { rules: getRules(configOptions) },
    devtool: isDev && "inline-source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": configOptions.paths.src,
      },
    },
  };

  return webpackConfig;
};

const getPlugins = (
  configOptions: ConfigOptions
): webpack.Configuration["plugins"] => {
  const plugins: webpack.Configuration["plugins"] = [];

  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: configOptions.paths.indexHtml,
    favicon: configOptions.paths.favicon,
  });

  const environmentPlugin = new EnvironmentPlugin();

  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash].css",
    chunkFilename: "css/[name].[contenthash].css",
  });

  plugins.push(htmlWebpackPlugin);
  plugins.push(environmentPlugin);
  plugins.push(miniCssExtractPlugin);

  if (configOptions.showAnalyzer) {
    const webpackAnalyzer = new BundleAnalyzerPlugin();
    plugins.push(webpackAnalyzer);
  }

  if (configOptions.isDev) {
    const reactRefreshWebpackPlugin = new ReactRefreshWebpackPlugin();
    // const eslintPlugin = new ESLintPlugin({
    //   context: configOptions.paths.src,
    //   extensions: ["js", "jsx", "ts", "tsx", "json"],
    //   emitError: true,
    //   emitWarning: true,
    //   failOnError: true,
    // });

    plugins.push(
      reactRefreshWebpackPlugin
      // eslintPlugin
    );
  }

  return plugins;
};
const getRules = (configOptions: ConfigOptions): ModuleOptions["rules"] => {
  const babelLoader: RuleSetRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        // Если не babel-loader тогда настройки в config
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    },
  };

  const assetLoader: RuleSetRule = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };
  const svgrLoader: RuleSetRule = {
    test: /\.svg$/i,
    use: [
      { loader: "@svgr/webpack", options: { icon: true } }, // icon true позволяет работать с svg как с иконками и менять размер содержимого а не контейнера, <AwardsSvg width={250} height={250} />, - даст содержимому 250 250
    ],
  };

  // css
  const cssModuleLoader: RuleSetRule = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: configOptions.isDev
          ? "[path][name]__[local]--[hash:base64:5]"
          : "[hash:base64:16]",
      },
    },
  };

  const cssLoaders: RuleSetRule = {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, cssModuleLoader],
  };

  return [cssLoaders, assetLoader, svgrLoader, babelLoader];
};
const getDevServer = (configOptions: ConfigOptions): DevServerConfiguration => {
  const devServer: DevServerConfiguration = {
    port: configOptions.port ?? "3000",
    open: true,
    historyApiFallback: true,
    hot: configOptions.isDev,
    client: {
      progress: true, // percent in browser console
      overlay: {
        errors: true,
        warnings: true,
        runtimeErrors: true,
      },
    },
  };

  return devServer;
};
