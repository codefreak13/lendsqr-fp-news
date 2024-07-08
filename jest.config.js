module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-setup.js'],
  automock: false,
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native(/.*)?|@react-native-community|react-navigation|@react-navigation/.*|react-native-button|my-project|react-native-gesture-handler|@react-navigation|react-native-router-flux|react-native-raw-bottom-sheet|react-native-responsive-screen|react-native-status-bar-height|@mono.co|@sentry/react-native|react-redux)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    '^@react-native-community/netinfo$': '<rootDir>/jest-setup.js',
    '^react-native-google-signin$': '<rootDir>/jest-setup.js',
    '^@react-native-firebase/remote-config$': '<rootDir>/jest-setup.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
