import * as React from 'react';
import { Text, View, StyleSheet,WebView,Button,ActivityIndicator,TouchableOpacity,SafeAreaView,Platform,BackHandler,Image,Dimensions  } from 'react-native';
//import { Icon } from 'expo';
import { Ionicons } from '@expo/vector-icons';


import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

export default class WVScreen extends React.Component {
/*
  static navigationOptions = ({ navigation }) => {

    return navigation.getParam('this') && navigation.getParam('this').state.canGoBack? {
      title: navigation.getParam('title1', 'GellifiQue'),
      headerLeft: (
        <Button
        onPress={() => {navigation.getParam('this')._onUnLoaded(),navigation.getParam('this').child.goBack()}}
        title="Back"
        color="#000"
        />  
        )
      } : {
        title: navigation.getParam('title1', 'GellifiQue'),
        }
  };
  */

  constructor(){
    super();
    this.state = {
        data: null,
        loading: true,
        error: null,
        canGoBack: false,
        onRoot: true,
        key: 1,
    }
  }
  _onLoaded = ()=>{
    if (this.state.loading) {
        this.setState({loading:false})
        console.log('onLoaded')
    }
    //this.props.navigation.setParams({uri: this.props.uri, this: this})
  }
  _onUnLoaded = ()=>{
    this.setState({loading:true})
    setTimeout(()=>this._onLoaded(),3000)
  }

  /* - doesnt work on ios */
  _onChange = (state)=>{
    this.setState({canGoBack: state.canGoBack})
  }
  
  _onMessage = (event)=>{
    console.log(event.nativeEvent.data.toString());
    if (event.nativeEvent.data.toString().substr(0,5)==='href:') {
        //console.log(event.nativeEvent.data.toString().substr(5));
        if (event.nativeEvent.data.toString().substr(5)===this.props.uri) {
            console.log('on root')
            this.setState({onRoot: true})
        }
        else {
            console.log('not a root')
            this.setState({onRoot: false})
        }
    }
    this._onLoaded()
  }
  /*
  dodo=()=>{
    console.log('dodo')
    this.child.injectJavaScript("setTimeout(() => window.postMessage('With timeout:'+document.title,'*'), 100)")
  }
  */

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    console.log('didmount WV'+this.child)
}

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = ()=>{
      console.log('back')
    this.child.goBack();
    //console.log(this.child)
    return true;
  }

  _reload=()=>{
    console.log('reload')
    this.setState({key: this.state.key + 1})
  }

  render() {
    const dimensions = Dimensions.get('window');
    const imageWidth = Math.round(dimensions.width);
    const imageHeight = imageWidth;

//    injectedJavaScript="$('.header-nav').hide();$('#header').css('height','42px');$(function(){window.postMessage('PostMessaga from webView '+window.location.href,'*')});"

    // need setTimeout for android

    
    var ijs = this.props.search ? (
        "$('.header-nav').hide();" +
        "$('#header').css('height','82px');" +
        "$('#header').css('padding-top','42px');" +
        "$('#header').css('background-color','#fff');" +
        "$('#header .row').css('background-color','#fff');" +
        "$('.page-header').hide();" +
        "$('.sitemap div:nth-child(1)').hide();" +
        "$('.ui-autocomplete-input').get(0).style.setProperty('background-color','#eee','important');" + 
        "$('.ui-autocomplete-input').get(0).style.setProperty('color','#000','important');"
        ) 
        : 
        "$('#header').hide();";

        ijs += "$(function(){" + 
            "setTimeout(()=>window.postMessage('href:' +document.location.href,'*'),100)" +
        "});"

    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',

        }}
        >
            <WebView ref={child => {this.child = child}}
                key={ this.state.key }
                source={{uri: this.props.uri}}
                style={{
                    margin: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    }}      
                injectedJavaScript={ijs}
                onLoadEnd={this._onLoaded}
                onLoadStart={this._onUnLoaded}
                onNavigationStateChange={this._onChange}
                useWebKit={true}
                onMessage={this._onMessage}
            />
            <View style={{height:50,
                backgroundColor: 'transparent',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '20%',
                padding: 10,
                }}
            >
                { (this.state.canGoBack || Platform.OS==='ios') && (
                <View>
                <TouchableOpacity onPress={()=>this.child.goBack()}>
                    <Ionicons
                            name={Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'}
                            size={36}
                            style={{ marginBottom: -3 }}
                            color={Colors.tabIconDefault}
                    />
                </TouchableOpacity>
                </View>
        )}
            </View>
        </View>

        { this.state.loading && (  
        <View
            style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%'
                }}
        >
            <View 
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                width: '100%',
                height: '30%'
                }}
            />
            <View 
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%'
                }}
            >
                <Image source={require('../assets/images/gellifique-03.png')} style={{resizeMode: 'contain', width: imageWidth}}  />
            </View>
            <View 
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                justifyContent: 'center',
                backgroundColor: '#ffffff90',
                width: '100%',
                height: '100%'
                }}
            >
                <Image source={require('../assets/images/rotating-logo.gif')} style={{resizeMode: 'contain', width: imageWidth}}  />
            </View>
        </View>
        )}
      </View>
      </SafeAreaView>
    );
  }
}
