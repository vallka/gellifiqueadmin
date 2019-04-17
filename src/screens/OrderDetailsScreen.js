import React from 'react';
import { 
  StyleSheet, Text, View, Button, ScrollView, Image, FlatList,TouchableOpacity,ActivityIndicator, Dimensions, Alert, Modal ,Vibration
  } from 'react-native';
import { SecureStore } from 'expo';

import { MyBackground } from '../components/MyCompo';
import { OrderHeader,OrderFooter,OrderItem } from '../components/OrderDetails';


export default class AlbumScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Order ' + navigation.getParam('title', '')
        + ' ('+navigation.getParam('id', '') + ')',
      headerStyle: { backgroundColor: 'black' },
      headerTitleStyle: { color: 'white' },
      headerBackTitleStyle: { color: '#C108C7' },
      headerTintColor: '#C108C7',
      };
  };
  
  constructor(){
    super();
    this.state = {
        data: null,
        loading: false,
        error: null,
        albumId: 666,
        modalVisible: false,
    }
  }
  baseURL = 'https://www.gellifique.co.uk/apipy/orders/';

  getData = (ev)=>{
    const itemId = this.props.navigation.getParam('id', '');
    //const itemId = '16';

    this.setState({loading:true, error: null, albumId: itemId});
    let url = this.baseURL + itemId;
    console.log('getData:'+url);
    let req = {
      method: 'GET',
      headers: {},
    };

    fetch(url,req)
    .then(response=>response.json())
    .then(this.showData)
    .catch(this.badStuff)
  }
  showData = async (data)=>{
    console.log('showData========================');
    //console.log(responseDoc);
    console.log(data);
    console.log('showData 1========================');

    try {
      const value = await SecureStore.getItemAsync('order'+this.props.navigation.getParam('id', ''));
      if (value !== null) {
        // We have data!!
        //console.log(JSON.parse(value));
        //console.log(data[0])
        data[0].processed_items = JSON.parse(value)

      }
      else {
        //console.log('no value');

      }
    } catch (error) {
      console.log('Error reading data');
    }

    this.setState({data:data,loading:false});
  }

  badStuff = (err) => {
    this.setState({loading: false, error: err.message});
  }
  componentDidMount(){
    console.log('componentDidMount');
    this.getData();
  }

  _onPressItem = (id) => {
    console.log('Press:'+id+' '+this.state.data[0].id_order);
    Alert.alert('Do you want to add this product?','',[
      {text: 'No'},
      {text: 'Yes',onPress: () => this.addItem(id)},
    ]);
  };

  addItem = async (id) => {
    console.log('Add:'+id+' '+this.state.data[0].id_order);
    let data = this.state.data
    if (data[0].processed_items) {
      console.log('yes')
    }
    else {
      console.log('no')
      data[0].processed_items = {}
    }
    if (data[0].processed_items['product'+id]) {
      data[0].processed_items['product'+id]++;
    }
    else {
      data[0].processed_items['product'+id] = 1;
    }
    await SecureStore.setItemAsync('order'+this.state.data[0].id_order, JSON.stringify(data[0].processed_items));
    Vibration.vibrate(100);
    this.setState({data:data});
  }

  resetOrder = async () => {
    let data = this.state.data
    data[0].processed_items = {}
    await SecureStore.setItemAsync('order'+this.state.data[0].id_order, JSON.stringify(data[0].processed_items));
    Vibration.vibrate([0,100,150,100]);
    this.setState({data:data});
  }

  render() {
    return (
      <View style={styles.container}>
        <MyBackground />
        <View  style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}>
          { this.state.loading && (
            <ActivityIndicator size="large" color="#C108C7" />
            )}
          { this.state.error && (
              <Text style={styles.err}>{this.state.error}</Text>
          )}

              { !this.state.loading && this.state.data && this.state.data.length > 0 && (
                <FlatList
                  ListHeaderComponent={()=>(
                    <OrderHeader data={this.state.data[0]} />
                  )}
                  ListFooterComponent={()=>(
                    <OrderFooter data={this.state.data[0]} resetFunc={this.resetOrder} />
                  )}
                  renderItem={({item})=>(
                    <OrderItem data={this.state.data[0]} item={item} onPressItem={this._onPressItem} onLongPressItem={this.addItem}/>
                  )}

                  data={this.state.data[0].items}
                  keyExtractor={item => item.product_id.toString()}

                />    
                )}


        </View>
      </View>
);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  err:{
      color: 'red',
      fontSize: 30,
      fontWeight: 'bold'
  },
});
