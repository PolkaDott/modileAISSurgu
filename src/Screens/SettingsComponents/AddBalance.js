import * as React from 'react';
import ArrowBack from './../../../assets/svg/arrowback.svg';
import { Image, Text, View, Alert, Button, TextInput, StyleSheet, TouchableHighlight, SafeAreaView, ScrollView, FlatList, SafeAreaViewBase} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export default function Return({navigation, route}){
  const [cashAmount, onChangeCA] = React.useState(null);
  var item = route.params.item;
  navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'Пополнить баланс',
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

  const validate = () => {
    if (Number(cashAmount) > 0){
        navigation.navigate('CardPayment', {
            child_id : item.tabid, 
            item : {
                price: cashAmount,
                title: 'Пополнение счёта',
                bitrix_id: 'Не товар',
            }
        })
    }
    else{
        Alert.alert("Ошибка!", "Введите положительное число")
    }
  }

  return (
    <ScrollView>
    <View style={styles.back}>
        <LinearGradient start={{x: 0, y:0}} end={{x:1,y:0}} colors={['#3FC364', '#A8E063']} style={styles.card}>
            <Text style={styles.id}>{'№ '+ item.tabid}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{}}>
                <Text style={styles.balanceTitle}>БАЛАНС</Text>
                <Text style={styles.balance}>{item.balance + ' ₽'}</Text>
            </View>
            <Image style={{width: 50, height: 50}} source={require('../../../assets/png/iconincircle.png')} />
            </View>
        </LinearGradient>
        <View style={styles.container2}>
            <Text style={styles.cardNumberTitle}>Введите сумму</Text>
            <TextInput style={[styles.cardNumber, {marginBottom: 32}]} 
                placeholner='' 
                value={cashAmount}
                onChangeText={onChangeCA}
                keyboardType='numeric'
                placeholder="0"
                />
            <TouchableOpacity 
                style={styles.returnButton}
                activeOpacity={0.7}
                onPress={()=> validate()}>
                <Text style={styles.returnTitle}>Пополнить с банковской карты</Text>
            </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  balance:{
    fontFamily: 'rubik_medium',
    fontSize: 30, 
    color: '#FFFFFF',

  },
  balanceTitle:{
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'rubik_medium',
  },
  id:{
    fontFamily: 'rubik_medium',
    fontSize: 16,
    lineHeight: 21,
    color: '#FFFFFF'
  },
  returnButton:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2376EA',
    borderRadius: 6,
    shadowOffset:{ width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#263238',
    shadowOpacity: 0.08,
    elevation: 4,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  returnTitle:{
    fontFamily: 'rubik_medium',
    fontSize: 14,
    color: "#FFFFFF",
  },
  cardNumberTitle:{
      fontFamily: 'rubik_regular',
      fontSize: 14,
      color: '#111827',
      lineHeight: 18,
      marginBottom: 9
  },
  cardNumber:{
      width: '100%',
      paddingHorizontal: 17,
      height: 50,
      borderWidth: 1,
      borderColor: '#9CA3AF54',
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      borderStyle: 'solid',
      color: '#1F2937',
      fontFamily: 'rubik_regular',
      fontSize: 16,
      lineHeight: 21,
      marginBottom: 17
  },
  card: {
    backgroundColor: '#3FC364',
    justifyContent: 'space-between',
    width: '100%',
    height: 175,
    borderRadius: 20,
    marginBottom: 29,
    paddingBottom: 19,
    paddingLeft: 19,
    paddingTop: 25,
    paddingRight: 21,
    shadowOffset:{ width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  container2:{
      paddingHorizontal: 20,
      width: '100%',
      flex: 1,
  },
  header:{
    height: 56,
    backgroundColor: '#2376EA',
  },
  headerTitle:{
    color: '#EEF2F5',
    fontSize: 20,
    fontFamily: 'rubik_medium',
    width: '100%',
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
    alignItems: 'center',
    backgroundColor: '#eef2f5',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 17
  },
})