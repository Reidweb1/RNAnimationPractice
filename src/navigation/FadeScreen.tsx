import React from 'react'
import Logo, { LogoStyle } from '../animated_components/Logo'
import {
  View,
  StyleSheet
} from 'react-native'

export default class FadeScreen extends React.Component {

  public render() {
    return (
      <View style={ styles.container }>
        <Logo animationStyle={ LogoStyle.Fade } />
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
