module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.ios.js', '.android.js', '.json'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@common_components': './src/components/Common',
          '@utils': './src/utils',
          '@hooks_utils': './src/hooks/utils',
          '@hooks_mutation': './src/hooks/mutation',
          '@hooks_subscription': './src/hooks/subscription',
          '@hooks_actions': './src/hooks/actions',
          '@hooks_query': './src/hooks/query',
          '@gql_mutation': './src/gql/mutation',
          '@gql_actions': './src/gql/actions',
          '@gql_query': './src/gql/query',
          '@gql_subscription': './src/gql/subscription'
        },
      },
    ],
  ],
}
