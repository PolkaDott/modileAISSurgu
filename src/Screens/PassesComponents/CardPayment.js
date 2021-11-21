import * as React from 'react';
import { Text, Image, View, Button, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, ScrollView, FlatList} from 'react-native';
import ArrowBack from './../../../assets/svg/arrowback.svg';
import Cart from '../../../assets/svg/cart.svg';
import Clode from '../../../assets/svg/clode.svg';
import {Api} from '../../Api.js';
import Loading from '../../Loading.js';
import { WebView } from 'react-native-webview';

//const SupportMail = "2kr@scud86.ru";

export default function CardPayment({route, navigation}) {      
  const [formUrl, setFormUrl] = React.useState(undefined);
  const item = route.params.item;
  const child_id = route.params.child_id;
  navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'Оплата',
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
        headerRight:() => {
          return null;
        }
  });

  React.useEffect(() => {
    Api.MakeCardPayment(setFormUrl, {item : item, child_tabid : child_id});
  }, []);

  let content = null;
  if (formUrl === undefined){
    content = <Loading/>
  }
  else if (formUrl === 'ERR'){
    content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Ошибка!
    </Text>
  }
  else {
    return <WebView source={{uri : formUrl}} />;
  }
  return (
      <View>
        {content}
      </View>
  )
 /*
  return(
    <View>
        <Text>{child_id}</Text>
    </View>
  );
  */
}

const styles = StyleSheet.create({
  titlePayButton:{
    fontFamily: 'rubik_medium',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  payButton:{
    width: '80%',
    backgroundColor: '#2376EA',
    borderRadius: 6,
    shadowOffset:{ width: 0, height: 4 },
    shadowRadius: 8,
    shadowColor: '#1D74E9',
    shadowOpacity: 0.16,
    elevation: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 'auto'
  },
  title:{
    fontFamily: 'rubik_medium',
    fontSize: 20,
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 10,
    width: '94%',
    alignSelf: 'center',
  },
  clode:{
    marginLeft: 'auto', 
    width: 30, 
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'

  },
  passName:{
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 21,
    fontFamily: 'rubik_regular',
  },
  passPrice:{
    fontFamily: 'rubik_medium',
    fontSize: 20,
    color: '#1F2937'
  },
  pass:{
    width: '96%',
    paddingBottom: 22,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 9,
    borderRadius: 5,
    shadowOffset:{ width: 0, height: 10 },
    shadowRadius: 10,
    shadowColor: '#919CB6',
    shadowOpacity: 0.08,
    elevation: 5,
  },
  passImage:{
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  back:{
    flex: 1,
    backgroundColor: '#eef2f5',
    width: '100%',
    paddingTop: 10,
  },
  header:{
    height: 56,
    backgroundColor: '#2376EA',
  },
  buttonCart:{
    width: 56,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle:{
    color: '#EEF2F5',
    fontSize: 20,
    fontFamily: 'rubik_medium',
    marginLeft: 4,
    width: '100%',
  },
  buttonArrowBack:{
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',

  }
})