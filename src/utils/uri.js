import { Platform } from 'react-native'
import defaults from '../../config/default.json'
import local from '../../config/local.json'

const config = { ...defaults, ...local }
export const CLIENT_URI = config.clientUri
export const URI = Platform.OS === 'android' ? config.androidGraphqlUri : config.graphqlUri
export const IMAGES_URI = Platform.OS === 'android' ? config.androidImagesUri : config.imagesUri
