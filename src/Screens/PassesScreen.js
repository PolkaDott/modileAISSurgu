import * as React from 'react';
import { Alert, Text, View, Button, StyleSheet, TouchableHighlight, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PassesList from './PassesComponents/PassesList.js';
import Payment from './PassesComponents/Payment.js';
import Order from './PassesComponents/Order.js';
import CardPayment from './PassesComponents/CardPayment.js';

const Stack = createStackNavigator();

export default function PassesScreen({navigation, route}) {
   React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Order"){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }else {
            navigation.setOptions({tabBarStyle: {height: 56}});
        }
    }, [navigation, route]);
  console.log('Passes screen');
  return(
    <Stack.Navigator>
      <Stack.Screen name='PassesList' component={PassesList}/>
      <Stack.Screen name='Order' component={Order} />
      <Stack.Screen name='Payment' component={Payment} />
      <Stack.Screen name='CardPayment' component={CardPayment} />
    </Stack.Navigator>
  );
}