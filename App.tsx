/**
 * React Native App (created with react-native init)
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */

import { Platform } from 'react-native'
import { Navigation, TabScreen } from 'react-native-navigation'
import { NavigationStyle, registerScreens } from './navigation'
import { initializeStore } from './models'

/**
 * Will map the components to the corresponding key. The key
 * format should be {TabBarTitle}.{ScreenName}
 */
registerScreens()

/**
 * Will initialize the default local store using Realm
 */
initializeStore()

const tabs: TabScreen[] = [
  {
    label: 'Home',
    screen: 'Home.Main',
    title: 'Home Screen',
    icon: require('./assets/profile_tab.png'),
    selectedIcon: require('./assets/profile_tab_selected.png')
  },
  {
    label: 'Home',
    screen: 'Home.Main',
    title: 'Home Screen',
    icon: require('./assets/profile_tab.png'),
    selectedIcon: require('./assets/profile_tab_selected.png')
  }
]

Navigation.startTabBasedApp({
  tabs,
  tabsStyle: {
    tabBarButtonColor: NavigationStyle.tabBarButtonColor,
    tabBarSelectedButtonColor: NavigationStyle.tabBarSelectedButtonColor,
    tabBarBackgroundColor: NavigationStyle.tabBarBackgroundColor,
    initialTabIndex: 0
  },
  appStyle: {
    orientation: 'portrait',
    bottomTabBadgeTextColor: NavigationStyle.bottomTabBadgeTextColor,
    bottomTabBadgeBackgroundColor: NavigationStyle.bottomTabBadgeBackgroundColor,
    hideBackButtonTitle: true
  }
})
