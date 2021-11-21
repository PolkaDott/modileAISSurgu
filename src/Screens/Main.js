import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, Text, View, TextInput, StyleSheet, TouchableHighlight, FlatList, StatusBar} from 'react-native';
import Home from '../../assets/svg/home.svg';
import Plus from '../../assets/svg/plus.svg';
import Message from './MessagesComponents/Message.js';
import {AuthContext} from '../AuthContext.js';
import {Api} from '../Api.js';
import Loading from '../Loading.js';
import Many from './Many.js';
import Document from './Document.js';
import OldDocument from './OldDocument.js';

let __key__ = 0;
const KeyGenerator = () => __key__++;
const Stack = createStackNavigator();

export default function Main({navigation}) {
  return(

    <Stack.Navigator>
      <Stack.Screen name='many' component={Many}/>
      <Stack.Screen name='document' component={Document} />
      <Stack.Screen name='olddocument' component={OldDocument} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  pluscontainer: {
  },
  plus:{
    width: '20%',
    textAlign: 'center',
  },
  search:{
    backgroundColor: '#EFEFEF',
    width: '80%',
    fontSize: 23,
    borderRadius: 10,
    textAlign: 'center'
  },
  messages:{
    width: '100%',
    flex: 1,
    paddingTop: 10,
  },
  back:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
  },
  header:{
    height: 56,
    backgroundColor: '#2376EA',
  },
  headerTitle:{
    color: '#EEF2F5',
    fontSize: 20,
    fontFamily: 'rubik_medium',
    marginLeft: 4,
    width: "100%"

  },
  buttonHome:{
    width: 54,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
})