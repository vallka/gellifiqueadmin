import React from 'react';
import { TouchableOpacity, TouchableHighlight, Text, StyleSheet, View, Image } from 'react-native';

export class MyButton extends React.Component {
    render() {
      return (
          <TouchableHighlight style={styles.button} onPress={this.props.onPress} onLongPress ={this.props.onLongPress}>
            <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
          </TouchableHighlight>
      );
    }
}
export class MyBackground extends React.Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          style={{
            flex: 1,
            resizeMode: 'cover',
            width: null,
            height: null,
            }}
          source={require ("../assets/images/bg.png")}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#C108C7',
      marginLeft: 40,
      marginRight: 40,
      marginTop: 20,
      marginBottom: 20,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
  
    },
    buttonText: {
      color: '#fff',
      fontSize: 24,
    },
})  
