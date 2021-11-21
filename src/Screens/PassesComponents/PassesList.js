import * as React from 'react';
import Home from '../../../assets/svg/home.svg';
import Cart from '../../../assets/svg/cart.svg';
import { Text, View, StyleSheet, TouchableHighlight, SafeAreaView, ScrollView} from 'react-native';
import Product from './Product.js';
import {Api} from '../../Api.js';
import {AuthContext} from '../../AuthContext.js';
import Loading from '../../Loading.js';

export default function PassesList({navigation}){
    const [,setAuth] = React.useContext(AuthContext);

    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(undefined);

    React.useEffect(() => {
      Api.GetProducts(setData);
    }, []);    


    navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'Заказать пропуск',
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
        headerRight:() => {
          return null;
          /*return ( 
            <TouchableHighlight
              underlayColor={'transparent'}
              style={styles.buttonCart}
              onPress={()=> navigation.navigate('Сообщения') }>
              <Cart />
            </TouchableHighlight>
          );*/
        }
    });
    let content = null;
    if (data === undefined){
      content = <Loading/>
    }
    else if (data === 'ERR'){
      content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
        Ошибка!
      </Text>
    }
    else if (data.length > 0){
      let list = data.map((item)=>{
        return (
          <Product item={item} key={item.bitrix_id} navigation={navigation}/>
        )
      })
      content = <ScrollView>
            <Text style={styles.style1}>Выберите вид пропуска</Text>
            <View style={styles.list}>
              {list}
            </View>
          </ScrollView>
    }
    return (
      <View style={styles.back}>
        <SafeAreaView style={{width: '100%', flex: 1}}>
          {content}
        </SafeAreaView>
      </View>
    )
}

const styles = StyleSheet.create({
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
    width: '100%'
  },
  buttonHome:{
    width: 54,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  style1:{
    fontFamily: 'rubik_medium',
    fontSize: 20,
    color: '#1F2937',
    marginTop: 18,
    marginLeft: 10,
    marginBottom: 15
  },
  back:{
    flex: 1,
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
})