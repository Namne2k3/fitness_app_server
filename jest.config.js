export default {
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' } }]] }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // để Jest resolve các file .js
  },
  forceExit: true,           // Ép dừng tiến trình test
  detectOpenHandles: true, 
};
