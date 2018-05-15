import { Navigation, Navigator } from 'react-native-navigation'

import HomeScreen from './HomeScreen'
import DetailScreen from './DetailScreen'

import NavigationStyle from './constants'

export function registerScreens() {
  Navigation.registerComponent('Home.Main', () => HomeScreen)
  Navigation.registerComponent('Home.Detail', () => DetailScreen)
}

interface NavigationProps {
  navigator: Navigator
}

export {
  NavigationStyle,
  NavigationProps
}