import * as React from 'react';
import { Alert, Text, View, Button, StyleSheet, TouchableHighlight, SafeAreaView, FlatList, RecyclerViewBackedScrollViewComponent  } from 'react-native';
import Notifications from './NotificationsComponents/Notifications.js';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoScreen from './NotificationsComponents/PhotoScreen.js';

const Stack = createStackNavigator();

export default function NotificationsScreen({navigation}) {
  console.log('Notifications screen');
  return (
    <Stack.Navigator>
      <Stack.Screen name='List' component={Notifications}/>
      <Stack.Screen name='Photo' component={PhotoScreen} />
    </Stack.Navigator>
  );
}