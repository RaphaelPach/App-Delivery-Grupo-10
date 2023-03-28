module.exports = {
  include: ['src/**/*.js'],
  exclude: ['**/*.{test,spec}.js', 'src/tests',
    'src/database/{config,migrations,seeders}', 'src/api/server.js'],
};
