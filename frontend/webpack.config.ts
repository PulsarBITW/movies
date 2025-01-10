import path from 'path';
import webpack, {EnvironmentPlugin, ModuleOptions, RuleSetRule} from 'webpack';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

type EnvironmentVariables = {
  mode: ConfigMode;
  port: DevServerConfiguration['port'];
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
type ConfigMode = webpack.Configuration['mode'];

interface ConfigOptions extends EnvironmentVariables {
  isDev: boolean;
  isProd: boolean;
  paths: ConfigPaths;
}

export default (env: EnvironmentVariables): webpack.Configuration => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const configPaths: ConfigPaths = {
    public: path.resolve(),
    indexHtml: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: path.resolve(__dirname, 'build'),
    favicon: path.resolve(__dirname, 'public', 'Favicon.ico'),
  };

  const configOptions: ConfigOptions = {
    ...env,
    mode: env.mode ?? 'development',
    port: env.port ?? '7045',
    showAnalyzer: env.showAnalyzer ? env.showAnalyzer : false,
    paths: configPaths,
    isDev,
    isProd,
  };

  const webpackConfig: webpack.Configuration = {
    mode: configOptions.mode ?? 'development',
    entry: configOptions.paths.entry,
    output: {
      path: configOptions.paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: getPlugins(configOptions),
    devServer: getDevServer(configOptions),
    module: {rules: getRules()},
    devtool: isDev && 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@app': path.resolve(__dirname, './src/app/'),
        '@pages': path.resolve(__dirname, './src/pages/'),
        '@features': path.resolve(__dirname, './src/features/'),
        '@entities': path.resolve(__dirname, './src/entities/'),
        '@shared': path.resolve(__dirname, './src/shared/'),
        '@widgets': path.resolve(__dirname, './src/widgets/'),
        '@layouts': path.resolve(__dirname, './src/layouts/'),
        '@assets': path.resolve(__dirname, './src/assets/'),
      },
    },
  };

  return webpackConfig;
};

const getPlugins = (configOptions: ConfigOptions): webpack.Configuration['plugins'] => {
  const plugins: webpack.Configuration['plugins'] = [];

  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: configOptions.paths.indexHtml,
    favicon: configOptions.paths.favicon,
  });

  const environmentPlugin = new EnvironmentPlugin();

  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css',
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
    const eslintPlugin = new ESLintPlugin({
      context: configOptions.paths.src,
      extensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
      overrideConfigFile: path.resolve(__dirname, 'eslint.config.mjs'),
      configType: 'flat',
      emitError: true,
      emitWarning: false,
      failOnError: true,
      // emitError: false,
      // emitWarning: false,
      // failOnError: false,
    });

    plugins.push(reactRefreshWebpackPlugin, eslintPlugin);
  }

  return plugins;
};

const getRules = (): ModuleOptions['rules'] => {
  const babelLoader: RuleSetRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', {runtime: 'automatic'}],
        ],
        sourceMaps: true,
      },
    },
  };

  const assetLoader: RuleSetRule = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };
  const svgrLoader: RuleSetRule = {
    test: /\.svg$/i,
    use: [{loader: '@svgr/webpack', options: {icon: true}}],
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  };

  const cssLoaders: RuleSetRule = {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader', postcssLoader],
  };

  return [cssLoaders, assetLoader, svgrLoader, babelLoader];
};
const getDevServer = (configOptions: ConfigOptions): DevServerConfiguration => {
  const devServer: DevServerConfiguration = {
    port: configOptions.port ?? '3000',
    open: false,
    historyApiFallback: true,
    hot: configOptions.isDev,
    client: {
      progress: true,
      overlay: {
        // errors: true,
        // warnings: false,
        // runtimeErrors: true,
        errors: false,
        warnings: false,
        runtimeErrors: false,
      },
    },
  };

  return devServer;
};
