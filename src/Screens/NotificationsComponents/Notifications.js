import * as React from 'react';
import Home from '../../../assets/svg/home.svg';
import { Text, View, Image, Button, StyleSheet, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import Notification from './Notification.js'; 
import {AuthContext} from '../../AuthContext.js';
import {GetDateForNotification} from '../../CountDate.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Api} from '../../Api.js';
import Loading from '../../Loading.js';

let DATA = undefined;
let __key__ = 0;
const KeyGenerator = () => __key__++;

function render({item, index}) {
  let content = [];
  let i = index;
  if (i == 0 || i != 0 && DATA[i]['date'].getDate() != DATA[i-1]['date'].getDate()){
    content.push(
        <Text style={styles.date} key={-1-i}>{GetDateForNotification(item)}</Text>
    )
  }
  content.push(
      <View key={i}>
        <Notification params={item}/>
      </View>
  )
  /*list.push(
      <TouchableHighlight key={i}
        underlayColor={'transparent'}
        onPress={()=> item.navigator.navigate('Photo', {item: item})}>
        <Notification params={not}/>
      </TouchableHighlight>
  )*/
  return content;
}
export default function Notifications({navigation}){
  const [,setAuth] = React.useContext(AuthContext);
  const [passesList, setPassesList] = React.useState(undefined);
  DATA = passesList;

  React.useEffect(() => {
    Api.GetPasses(setPassesList);
  }, []);    

  navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'Уведомления',
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => {
          return (
            <TouchableHighlight 
              underlayColor={'transparent'}
              style={styles.buttonHome}
              onPress={()=> setAuth(2)}>
              <Home/>
            </TouchableHighlight>
          );
        },
        headerRight:()=>{
          return null;
          ///////////////////////////////////////////////////
          return (
            <TouchableHighlight underlayColor={'transparent'} >
              <Text style={styles.buttonFilter}>
                Фильтр
              </Text>
            </TouchableHighlight>
          )
        }
  });

  let content = null;
  if (DATA === undefined){
    content = <Loading/>
  }
  else if (DATA === 'ERR'){
    content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Ошибка!
    </Text>
  }
  else if (DATA.length > 0){
    content= <FlatList 
          data={DATA}
          renderItem={render}
          keyExtractor={KeyGenerator}
        />
  }
  else{
    content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Уведомлений нет
    </Text>
  }
  return(
    <View style={styles.back}>
      <SafeAreaView style={styles.notifications}>
        {content}
      </SafeAreaView>
    </View>
  ); 
}

const styles = StyleSheet.create({
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
  buttonFilter:{
    fontFamily: 'rubik_medium',
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 14
  },
  back:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eef2f5',
    width: '100%',
  },
  advertisment: {
    height: 116, 
    backgroundColor: '#FFF', 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  notifications:{
      width: '100%',
      paddingHorizontal: 10,
      flex: 1,
  },
  date: {
      marginTop: 12,
      marginBottom: 10,
      fontFamily: 'rubik_medium',
      fontSize: 16,
      color: '#374151'
  }
});
