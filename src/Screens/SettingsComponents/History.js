import * as React from 'react';
import ArrowBack from './../../../assets/svg/arrowback.svg';
import { Text, View, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import {GetDateForHistory, GetDateForMessage} from '../../CountDate.js';
import {Api} from '../../Api.js';
import Loading from '../../Loading.js';

let DATA = undefined;
let __key__ = 0;
const KeyGenerator = () => __key__++;

function render({item, index}){
  if (!DATA){
    return null;
  }
  var content = [];
  var i = index;
  if (i == 0 || i != 0 && DATA[i]['date'].getMonth() != DATA[i-1]['date'].getMonth()){
    content.push(
        <Text style={styles.date} key={-1-i}>{GetDateForHistory(item)}</Text>
    )
  }
  content.push(
    <View key={index} style={styles.historyElement}>        
      <Text style={styles.detailedDate}>{GetDateForMessage(item)}</Text>
      <View style={styles.row}>
          <Text style={styles.type}>{item.title}</Text>
          <Text 
            style={[styles.cash, {color: item.type == 2?'#00AF31' : '#FF8816'}]}>
              {(item.type == 2 ? '+' : '-') + item.price + ' ₽'}
          </Text>
      </View>
      <Text style={styles.comment}>{item.annotation}</Text>
    </View>
  )
  return content;
}

export default function History({navigation, route}){
  const [transList, setTransList] = React.useState(undefined);
  let item = route.params.item;
  DATA = transList;

  React.useEffect(() => {
    Api.GetTransactions(setTransList, route.params.item.tabid);
  }, []);

  navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'История oпераций',
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
    content=<FlatList
      style={styles.container}
      data={transList}
      renderItem={render}
      keyExtractor={KeyGenerator} />
  }
  else{
    content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Транзакций пока нет
    </Text>
  }
  return (
      <View style={styles.back}>
        <View style={styles.card}>
            <Text style={styles.idTitle}>{'№ '+item.tabid}</Text>
            <Text style={styles.balanceTitle}>БАЛАНС</Text>
            <Text style={styles.balance}>{item.balance + ' ₽'}</Text>
        </View>
        <View style={{flex: 1}}>
        {content}
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  comment: {
      color: '#9CA3AF',
      fontFamily: 'rubik_regular',
      fontSize: 12,
      lineHeight: 14,
  },
  detailedDate:{
      fontFamily: 'rubik_medium',
      fontSize: 12,
      lineHeight: 14,
      color: '#6B7280',        
      marginBottom: 11
  },
  type:{
      fontFamily: 'rubik_medium',
      fontSize: 16,
      lineHeight: 19,
      color: '#1F2937',
      width: '80%',
  },
  cash: {
      fontFamily: 'rubik_medium',
      fontSize: 16,
      lineHeight: 20,
      marginLeft: 'auto'
  },
  row:{
    flexDirection: 'row',
    marginBottom: 4
  },
  historyElement:{
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 13,
    borderRadius: 15,
    marginBottom: 6,
    shadowOffset:{ width: 0, height: 10 },
    shadowRadius: 10,
    shadowColor: '#919CB6',
    shadowOpacity: 0.08,
    elevation: 5,
  },
  container:{
    paddingHorizontal: 10,
    flex: 1
  },
  date: {
    fontSize: 16,
    fontFamily: 'rubik_medium',
    lineHeight: 19,
    color: '#374151',
    marginBottom: 10,
    marginTop: 8
  },
  balance:{
      color: '#00AF31',
      fontFamily: 'rubik_medium',
      fontSize: 30,
      lineHeight: 38
  },
  idTitle:{
    color: '#1F2937',
    lineHeight: 21,
    fontSize: 16,
    fontFamily: 'rubik_medium',
    marginBottom: 24
  },
  balanceTitle: {
      fontFamily: 'rubik_medium',
      fontSize: 12,
      lineHeight: 15,
      color: '#1F293754'
  },
  card:{
    paddingBottom: 10,
    paddingTop: 17,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
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