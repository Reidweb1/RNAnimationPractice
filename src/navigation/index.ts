import { Navigation, Navigator } from 'react-native-navigation'

import HomeScreen from './HomeScreen'
import FadeScreen from './FadeScreen'
import SpringScreen from './SpringScreen'

import NavigationStyle from './constants'

/**
 * Register all components with `react-native-navigation`.
 * Naming convention is freeform but it it best practice to
 * follow the {TabBarName}.{ScreenName} format.
 * (ex. 'Main' screen under the 'Home' Tab is 'Home.Main')
 */
export function registerScreens() {
  Navigation.registerComponent('Home.Main', () => HomeScreen)
  Navigation.registerComponent('Fade.Main', () => FadeScreen)
  Navigation.registerComponent('Spring.Main', () => SpringScreen)
}

/**
 * The base interface for the props of any component
 * that is registered via `Navigation`.
 */
interface NavigationProps {
  navigator: Navigator
}

export {
  NavigationStyle,
  NavigationProps
}