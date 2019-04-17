import * as React from 'react';
import WVScreen from './WVScreen';

export default class App extends React.Component {
  static navigationOptions = {
    title: ' ',
    headerStyle: {height: 1, backgroundColor: 'transparent',}
  };

  componentDidMount() {
    this.props.navigation.setParams({title1: 'Updated1', ths: this.child})
    console.log('didmount Home:'+this.child)
    console.log('didmount Home:'+this.child.child)
    console.log(this.child.child.props)
  }
  
  render() {
    return (
      <WVScreen ref={child => {this.child = child}} uri='https://www.gellifique.co.uk/sitemap' search={true} />
    );
  }
}
