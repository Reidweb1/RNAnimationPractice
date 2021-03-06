import React from 'react'
import { NavigationProps } from './index'
import Logo, { LogoStyle } from '../animated_components/Logo'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default class HomeScreen extends React.Component<NavigationProps, any> {

  public render() {
    return (
      <View testID={ 'HomeScreenTest' } style={ styles.container }>
        <Logo animationStyle={ LogoStyle.Spin }/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
		justifyContent: 'center'
  }
})
