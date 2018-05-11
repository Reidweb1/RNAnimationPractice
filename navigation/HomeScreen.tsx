import React from 'react'
import { NavigationProps } from './index'
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
        <TouchableOpacity onPress={ this.navigation }>
          <Text style={ styles.text }>Navigate</Text>
        </TouchableOpacity>
      </View>
    )
  }

  private navigation = () => {
    this.props.navigator.push({
      screen: 'Home.Detail',
      title: 'Detail Screen'
    })
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
