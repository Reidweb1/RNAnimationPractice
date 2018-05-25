import React from 'react'
import {
  View,
  Image,
  Animated,
  Easing,
  StyleSheet
} from 'react-native'

export enum LogoStyle {
  Spin,
  Fade,
  Spring
}

interface LogoProps {
  animationStyle: LogoStyle
}

export default class Logo extends React.Component<LogoProps, any> {

  private spinValue: Animated.Value
  private fadeValue: Animated.Value
  private springValue: Animated.Value

  constructor (props: any, state: any) {
    super(props, state)
    this.spinValue = new Animated.Value(0)
    this.fadeValue = new Animated.Value(0)
    this.springValue = new Animated.Value(1)
  }

  public componentWillMount() {
    if (this.props.animationStyle === LogoStyle.Spin) {
      this.spinAnimation()
    } else if (this.props.animationStyle === LogoStyle.Fade) {
      this.fadeAnimation()
    } else {
      this.springAnimation()
    }
  }

  public render() {
    return (
      <View style={ styles.container }>
        { this.getComponentForStyle(this.props.animationStyle) }
      </View>
    )
  }

  private getComponentForStyle = (style: LogoStyle) => {
    if (this.props.animationStyle === LogoStyle.Spin) {
      const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
      return (
        <Animated.Image style={{
          width: 200,
          height: 50,
          resizeMode: 'contain',
          transform: [ { rotate: spin } ] }}
          source={ require('../assets/mesh_logo.png') }/>
      )
    } else if (this.props.animationStyle === LogoStyle.Fade) {
      const opacity = this.fadeValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
      })
      return (
        <Animated.Image style={{
          width: 200,
          height: 50,
          resizeMode: 'contain',
          opacity: opacity}}
          source={ require('../assets/mesh_logo.png') }/>
      )
    } else {
      const springStyle = {
        transform: [{ scale: this.springValue }]
      }
      const imageStyle = {
        width: 200,
        height: 50,
        resizeMode: 'contain',
      }
      return (
        <Animated.Image style={ [ imageStyle, springStyle] }
          source={ require('../assets/mesh_logo.png') }/>
        )
    }
    
  }

  private springAnimation = () => {
    Animated.spring(
      this.springValue,
      {
        toValue: 0.5,
      }
    ).start(() => {
      Animated.spring(
        this.springValue,
        {
          toValue: 1
        }
      ).start(() => this.springAnimation())
    })
  }

  private fadeAnimation = () => {
    this.fadeValue.setValue(0)
    Animated.timing(
      this.fadeValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear
      }
    ).start(() => this.fadeAnimation())
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
