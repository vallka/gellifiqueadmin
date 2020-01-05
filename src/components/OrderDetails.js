import React from 'react';
import { Dimensions, Text, StyleSheet, View, Image } from 'react-native';
//import { Icon } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { MyButton } from '../components/MyCompo';

export class OrderItem extends React.Component {
    render() {
        const dimensions = Dimensions.get('window');
        const imageHeight = Math.round(dimensions.width * 0.5);
        const imageWidth = Math.round(dimensions.width * 0.5);
        let readyQnt = 0;
        if (this.props.data.processed_items 
            && this.props.data.processed_items['product'+this.props.item.product_id]) 
        {
            readyQnt = this.props.data.processed_items['product'+this.props.item.product_id]
        }

        return (
        <View style={styles.item}>
        <Image
            source={ {uri: 'https://www.gellifique.co.uk/'+this.props.item.id_image+'-medium_default/img.jpg'} }
            style={{ height: imageHeight, width: imageWidth, resizeMode: 'contain', flex: 1}}
        />
        <View style={{flex:1}}>
          <Text style={styles.txtSmall}>
            {this.props.item.product_name +' ('+this.props.item.product_id+')'}
          </Text>
          <Text style={styles.txtSmall}>
            {this.props.item.product_reference}
          </Text>
          <Text style={styles.txtSmall}>
            Quantity: {this.props.item.product_quantity + 
                (this.props.item.unity>1 ? '/'+this.props.item.product_quantity*this.props.item.unity:'') +
                ' : ' + readyQnt + 
                (this.props.item.unity>1 ? '/'+readyQnt*this.props.item.unity:'')
                }
          </Text>
          <Text style={styles.txtSmall}>
            Available: {this.props.item.quantity}
          </Text>
            {(readyQnt < this.props.item.product_quantity) ? ( 
                <MyButton onPress={()=>this.props.onPressItem(this.props.item.product_id)} 
                onLongPress={()=>this.props.onLongPressItem(this.props.item.product_id)} 
                text="+" />
            ) : (
                <View style={styles.txtOk}>
                    <Ionicons
                        name={'md-checkbox-outline'}
                        size={26}
                        color={'#00FF00'}
                    />
                    </View>
            )
            }
        </View>
      </View>
        );
    }
}
export class OrderHeader extends React.Component {
    render() {
        let needed=0;
        let needed_u=0;
        this.props.data.items.forEach((i)=>{needed += i.product_quantity;needed_u += i.product_quantity*i.unity})

        let readyQnt=0;
        let readyQnt_u=0;
        if (this.props.data.processed_items) {
            for (let i in this.props.data.processed_items) {
                if (i.substr(0,7)=='product') {
                    readyQnt += this.props.data.processed_items[i];
                    this.props.data.items.forEach((j)=>{
                        if (i.substr(7)==j.product_id.toString()) {
                            readyQnt_u += this.props.data.processed_items[i]*j.unity;
                        }
                    })
                }
            }
        }


        return (
            <View style={styles.header}>
                    <Text style={styles.headerText}>{
                      this.props.data.date_add.substr(8,2) +'/'+ this.props.data.date_add.substr(5,2) +'/'+this.props.data.date_add.substr(2,2)
                      +' '+this.props.data.date_add.substr(11,5)  
                      }
                    </Text>
                    <Text style={styles.headerText}>
                        { (this.props.data.new? '★ ':'') + this.props.data.firstname_a+' '+this.props.data.lastname_a +
                            ((this.props.data.firstname_a.toUpperCase()!=this.props.data.firstname.toUpperCase() || this.props.data.lastname_a.toUpperCase()!=this.props.data.lastname.toUpperCase()) ? 
                            ' ('+ this.props.data.firstname+' '+this.props.data.lastname +') ' : ' ') + this.props.data.email
                      }
                    </Text>
                    <Text style={styles.headerText}>
                        { this.props.data.address1+' ' 
                          +this.props.data.address2+' ' 
                          +this.props.data.city
                        }
                    </Text>
                    <Text style={styles.headerText}>
                        { this.props.data.postcode.toUpperCase() + ' - ' + this.props.data.country }
                    </Text>
                    <Text style={styles.headerText}>
                      {this.props.data.carrier }
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                    <Text style={styles.headerText1}>
                      Positions: {this.props.data.items.length}
                    </Text>
                    <Text style={styles.headerText1}>
                      Total items: {needed + 
                        (needed_u!=needed ? '/' + needed_u : '')
                        + ' : ' + readyQnt +
                        (readyQnt_u!=readyQnt ? '/' + readyQnt_u : '')
                        }
                    </Text>
                    {this.props.data.processed_items && this.props.data.processed_items.processed_all && (
                    <Ionicons
                        name={'md-checkbox-outline'}
                        size={20}
                        color={'#00FF00'}
                        style={styles.headerIcon}
                    />
                    )}
                    </View>
            </View>    
        );
    }
}

export class OrderFooter extends React.Component {
    render() {
        return (
            <View style={styles.footer}>
                <MyButton onPress={this.props.resetFunc} text="Reset" />
                <View style={styles.footerIcon}>
                {this.props.data.processed_items && this.props.data.processed_items.processed_all && (
                        <Ionicons
                        name={'md-checkbox-outline'}
                        size={28}
                        color={'#00FF00'}
                    />
                )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#C108C780',
        padding: 5,
    },
    headerText: {
        color: '#fff',
        fontSize: 14,
    },
    headerText1: {
        color: '#fff',
        fontSize: 14,
        marginRight: 15,
    },
    headerIcon: {
        marginTop: 0,

    },
    item: {
        backgroundColor: '#00000070',
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    txtSmall: {
        fontSize: 14,
        color: '#fff',
        paddingLeft: 8,
    },
    txtOk: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 25,
        marginBottom: 25,
        padding: 10,
        alignItems: 'center',
    
    },
    footer: {
        backgroundColor: '#C108C780',
        padding: 5,
        flexDirection: 'row',
    },
    footerIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }
  })  
