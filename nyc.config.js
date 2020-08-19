module.exports = {
  'check-coverage': true,
  'per-file': true,
  lines: 0,
  statements: 0,
  functions: 0,
  branches: 0,
  include: [
    'packages/**/*.{js,vue}'
  ],
  reporter: [
    'lcov',
    'text',
    'text-summary'
  ],
  extension: [
    '.js',
    '.vue'
  ],
  'report-dir': './tests/coverage',
  cache: true,
  all: true
}
