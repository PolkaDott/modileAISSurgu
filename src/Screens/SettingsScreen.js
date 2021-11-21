import * as React from 'react';
import { Alert, Text, View, Button, StyleSheet, TouchableHighlight, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './SettingsComponents/Settings.js';
import Return from './SettingsComponents/Return.js';
import History from './SettingsComponents/History.js';
import Info from './SettingsComponents/Info.js';
import CardPayment from './PassesComponents/CardPayment.js';
import AddBalance from './SettingsComponents/AddBalance.js';

const Stack = createStackNavigator();

export default function SettingsScreen({navigation, route}) {
  console.log('Settings screen');
  return(
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={Settings}/>
      <Stack.Screen name='Return' component={Return}/>
      <Stack.Screen name='History' component={History} />
      <Stack.Screen name='Info' component={Info} />
      <Stack.Screen name='CardPayment' component={CardPayment} />
      <Stack.Screen name='AddBalance' component={AddBalance} />
    </Stack.Navigator>
  );
}