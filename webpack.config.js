const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// Function to get all pages from src/pages directory
function getPages() {
  const pagesDir = path.resolve(__dirname, 'src/pages');
  const pages = {};
  
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.twig'));
    
    pageFiles.forEach(file => {
      const name = path.basename(file, '.twig');
      pages[name] = {
        template: path.join(pagesDir, file),
        filename: `${name}.html`,
        chunks: ['main', name]
      };
    });
  }
  
  // Default page if no pages found
  if (Object.keys(pages).length === 0) {
    pages.index = {
      template: path.resolve(__dirname, 'src/pages/index.twig'),
      filename: 'index.html',
      chunks: ['main']
    };
  }
  
  return pages;
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const pages = getPages();
  
  // Generate HtmlWebpackPlugin instances for each page
  const htmlPlugins = Object.keys(pages).map(pageName => {
    return new HtmlWebpackPlugin({
      template: pages[pageName].template,
      filename: pages[pageName].filename,
      chunks: pages[pageName].chunks,
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : false,
    });
  });

  return {
    entry: {
      main: './src/js/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      assetModuleFilename: 'assets/[name].[hash][ext]',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.twig$/,
          use: [
            'raw-loader', // Use raw-loader to load Twig files as strings first
            {
              loader: 'twig-html-loader',
              options: {
                data: (context) => {
                  // You can pass global data to all templates here
                  const dataPath = path.resolve(__dirname, 'src/data/global.json');
                  let globalData = {};
                  
                  if (fs.existsSync(dataPath)) {
                    try {
                      globalData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                    } catch (e) {
                      console.warn('Could not parse global.json:', e.message);
                    }
                  }
                  
                  return {
                    ...globalData,
                    isDev: !isProduction,
                    year: new Date().getFullYear()
                  };
                }
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            'html-loader', // Processes HTML files for assets (like images, links)
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(txt|md|svg)$/,
          use: 'raw-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'src/scss')],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]',
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...htmlPlugins,
      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[id].[contenthash].css',
        }),
      ] : []),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/images'),
            to: path.resolve(__dirname, 'dist/images'),
            noErrorOnMissing: true,
          },
          {
            from: path.resolve(__dirname, 'src/assets/fonts'),
            to: path.resolve(__dirname, 'dist/fonts'),
            noErrorOnMissing: true,
          },
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: true,
      watchFiles: [
        'src/**/*.twig',
        'src/**/*.scss',
        'src/**/*.sass',
        'src/**/*.js',
        'src/data/**/*.json',
      ],
    },
    resolve: {
      extensions: ['.js', '.scss', '.sass', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@scss': path.resolve(__dirname, 'src/scss'),
        '@js': path.resolve(__dirname, 'src/js'),
        '@images': path.resolve(__dirname, 'src/assets/images'),
        '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      },
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};