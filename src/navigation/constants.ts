/**
 * This interface defines all of the colors and
 * styles we'll need for our TabNavigators and
 * StackNavigators. They're used in `App.tsx` when
 * we create the Navigation Stack.
 */
interface NavigationStyle {
  tabBarBackgroundColor: string
  tabBarButtonColor: string
  tabBarSelectedButtonColor: string
  tabFontFamily: string
  navBarButtonColor: string
  navBarTextColor: string
  navigationBarColor: string
  navBarBackgroundColor: string
  statusBarColor: string
  bottomTabBadgeTextColor: string
  bottomTabBadgeBackgroundColor: string
}

const styleConstants: NavigationStyle = {
  tabBarBackgroundColor: '#FFFFFF',
  tabBarButtonColor: '#A5A6A4',
  tabBarSelectedButtonColor: '#242420',
  tabFontFamily: 'BioRhyme-Bold',
  navBarButtonColor: '#A5A6A4',
  navBarTextColor: '#242420',
  navigationBarColor: '#A5A6A4',
  navBarBackgroundColor: '#A5A6A4',
  statusBarColor: '#002b4c',
  bottomTabBadgeTextColor: '#242420',
  bottomTabBadgeBackgroundColor: '#242420'
}

export default styleConstants