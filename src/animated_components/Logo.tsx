import React from 'react'
import {
  View,
  Image,
  Animated,
  Easing,
  StyleSheet
} from 'react-native'

export default class Logo extends React.Component {

  private spinValue: Animated.Value

  constructor (props: any, state: any) {
    super(props, state)
    this.spinValue = new Animated.Value(0)
  }

  public componentWillMount() {
    this.spinAnimation()
  }

  public render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View style={ styles.container }>
        <Animated.Image style={{
          width: 200,
          height: 50,
          resizeMode: 'contain',
          transform: [{rotate: spin}] }}
          source={ require('../assets/mesh_logo.png') }/>
      </View>
    )
  }

  private spinAnimation = () => {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear
      }
    ).start(() => this.spinAnimation())
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
		justifyContent: 'center'
  }
})
