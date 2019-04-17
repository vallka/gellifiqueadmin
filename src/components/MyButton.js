import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

export class MyButton extends React.Component {
    render() {
      return (
          <TouchableHighlight style={styles.button} onPress={this.props.onPress} onLongPress ={this.props.onLongPress}>
            <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
          </TouchableHighlight>
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
