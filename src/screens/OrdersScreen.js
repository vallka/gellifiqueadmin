import React from 'react';
import { StyleSheet, Text, View, FlatList,ScrollView,TouchableOpacity,ActivityIndicator } from 'react-native';
import axios from "axios";
import { MyButton, MyBackground } from '../components/MyCompo';

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Orders',
    headerStyle: { backgroundColor: 'black' },
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: '#C108C7' },
    headerTintColor: '#C108C7',
  };
  constructor(){
    super();
    this.state = {
        data: null,
        loading: false,
        error: null
    }
  }
  
  //baseURL = 'https://www.gellifique.co.uk/vk/api-xml2json.php?q=https%3A%2F%2Fwww.gellifique.co.uk%2Fapi%2Forders%3Fsort%3D[id_DESC]%26limit%3D[0%2C10]%26display%3D[id%2Creference%2Cdate_add%2Cdate_upd%2Ccurrent_state%2Cshipping_number]%26ws_key%3DXFEV7P23B94VH1PNMITA73CA3G5RJBS1';
  //apiUrl = 'https://www.gellifique.co.uk/api/orders?sort=[id_DESC]&limit=[0,20]&display=[id,reference,date_add,date_upd,current_state,shipping_number]&ws_key=XFEV7P23B94VH1PNMITA73CA3G5RJBS1';
  //baseURL = 'https://www.gellifique.co.uk/vk/api-xml2json.php?q=';
  //let url = this.baseURL + encodeURIComponent(this.apiUrl);

  getData = async (ev)=>{
    console.log('getData');
    this.setState({loading:true, error: null});
    const cnf = require('../_secrets/config.json');
    console.log('getData url:'+cnf.baseUrl);
    let url = cnf.baseUrl;

    try {
      console.log(url);
      const response = await axios.get(url);
      this.setState({data:response.data,loading:false});
    } catch (error) {
      this.setState({loading: false, error: error});
    }
  }

  translateState = (id)=>{
    let States = {
      2: 'Payment accepted',
      3: 'Processing in progress',
      4: 'Shipped',
      5: 'Delivered',
      6: 'Canceled',
      7: 'Refunded',
      8: 'Payment error',
      17: 'Processing - Ready to ship',
    };
    return States[id];
  }

  async componentDidMount(){
    console.log('componentDidMount');
    await this.getData();
  }

  _onPressItem = (id,reference) => {
    console.log('Press'+id);
    //alert('press '+key)
    this.props.navigation.navigate('OrderDetails', {id: id,title: reference})
  };

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
                  data={this.state.data}
                  keyExtractor={item => item.id_order.toString()}
                  onRefresh={this.getData}
                  refreshing={this.state.loading}
                  renderItem={({item})=>(
                    <View >  
                    <View  style={styles.item}>  
                      <TouchableOpacity onPress={()=>this._onPressItem(item.id_order,item.reference)} style={styles.itemHeader}>
                        <Text style={styles.txt}>
                           {item.reference  + ' (' +  item.id_order+')'}
                        </Text>
                        <View style={styles.itemHeaderRight}>
                        <Text style={styles.itemHeaderRight}>
                          { item.date_add.substr(8,2) +'/'+ item.date_add.substr(5,2) +'/'+item.date_add.substr(2,2)
                            }
                        </Text>
                        <Text style={styles.itemHeaderRight}>
                          { item.date_add.substr(11,5)                            }
                        </Text>
                        </View>
                      </TouchableOpacity>

                      <Text  style={styles.txtSmall}>
                          { item.firstname+' '+item.lastname+' '+item.postcode.toUpperCase() }
                      </Text>
                      <Text  style={styles.txtSmall}>
                          { item.email }
                      </Text>
                        <View  style={{
                          flex: 1,
                          flexDirection: 'row',
                        }}>
                          <Text  style={styles.txtSmallButton}>
                            { this.translateState(item.current_state) }
                          </Text>
                          <Text  style={styles.txtSmall}>
                            { item.shipping_number }
                          </Text>
                        </View>
                    </View>  
                    </View>  
                  )}
                  />
                )}

        </View>
      </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#00000070',
    marginBottom: 10,
    justifyContent: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    backgroundColor: '#C108C780',
    alignItems: 'stretch',
    flex: 1,
  },
  itemHeaderRight: {
    flexDirection: 'column',
    color: '#fff',
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
    paddingRight: 5,
  },
  txtView: {
    margin: 0,
    width: '100%',
    alignItems: 'center',

  },
  txt: {
    fontSize: 24,
    color: '#fff',
    padding: 8,
    flex: 3,
  },
  txtSmall: {
    fontSize: 14,
    color: '#fff',
    padding: 8,
  },
  txtSmallButton: {
    fontSize: 14,
    color: '#fff',
    padding: 8,
    backgroundColor: '#0000FF50',
  },
  err:{
      color: 'red',
      fontSize: 30,
      fontWeight: 'bold'
  },
});
