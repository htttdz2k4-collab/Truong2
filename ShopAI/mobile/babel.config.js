module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@/assets': './src/assets',
            '@assets': './src/assets',
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@data': './src/data',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@types': './src/types',
            '@contexts': './src/contexts',
          },
        },
      ],
    ],
  };
};