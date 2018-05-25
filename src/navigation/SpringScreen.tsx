import React from 'react'
import Logo, { LogoStyle } from '../animated_components/Logo'
import {
  View,
  StyleSheet
} from 'react-native'

export default class SpringScreen extends React.Component {

  public render() {
    return (
      <View style={ styles.container }>
        <Logo animationStyle={ LogoStyle.Spring } />
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
