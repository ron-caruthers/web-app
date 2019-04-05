module.exports = ({ file, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'autoprefixer': {},
    'postcss-import': {},
    'cssnano':  env === 'production'  ? {} : false
  }
});
