import React from 'react'
import { NavigationProps } from './index'
import Logo from '../animated_components/Logo'
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
        <Logo />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
		justifyContent: 'center'
  },
  text: {
    fontSize: 24,
    color: '#2662c1'
  }
})
