import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CartScreen from '../screens/CartScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

import AccountScreen from '../screens/AccountScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

_tabBarOnPress=({ navigation, defaultHandler }) => {
  console.log('nnn:'+navigation);
  //console.log(navigation.state.routes[0].params.ths)
  if (navigation.isFocused()) {
    navigation.state.routes[0].params.ths._reload()
  }
  else {
    defaultHandler();
  }
}


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
  tabBarOnPress: _tabBarOnPress
  /*
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    console.log('nnn:'+navigation);
    //console.log(navigation.state.routes[0].params.ths)
    if (navigation.isFocused()) {
      navigation.state.routes[0].params.ths._reload()
    }
    else {
      defaultHandler();
    }
  }
  */
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SearchStack = createStackNavigator({
  Links: LinksScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
  tabBarOnPress: _tabBarOnPress
};


const CartStack = createStackNavigator({
  Orders: CartScreen,
  OrderDetails: OrderDetailsScreen,
});

CartStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
    />
  ),
  tabBarOnPress: _tabBarOnPress
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
  tabBarOnPress: _tabBarOnPress
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
  tabBarOnPress: _tabBarOnPress
};

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  CartStack,
  AccountStack,
  //SettingsStack,
},
{
  initialRouteName: 'HomeStack',
  tabBarOptions: {
      showLabel: false, // hide labels
  }
}

);
