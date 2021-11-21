import * as React from 'react';
import ArrowBack from './../../../assets/svg/arrowback.svg';
import { Text, View, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import { WebView } from 'react-native-webview';

export default function History({navigation, route}){

  navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'Информация',
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => {
          return (
            <TouchableHighlight
              underlayColor={'transparent'}
              style={styles.buttonArrowBack}
              onPress={()=> navigation.goBack() }> 
              <ArrowBack/>
            </TouchableHighlight>
          );
        },
        headerRight:()=>null
  });
  return <WebView source={{ uri: 'https://scud86.ru:8443/information/' }} />;
  //return <WebView source={{ uri: 'https://www.scud86.ru/contacts/' }} />;
}

const styles = StyleSheet.create({
  header:{
    height: 56,
    backgroundColor: '#2376EA',
  },
  headerTitle:{
    color: '#EEF2F5',
    width: '100%',
    fontSize: 20,
    fontFamily: 'rubik_medium',
    marginLeft: 4
  },
  buttonArrowBack:{
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
  },
  back:{
    flex: 1,
    backgroundColor: '#eef2f5',
    width: '100%',
  },
})