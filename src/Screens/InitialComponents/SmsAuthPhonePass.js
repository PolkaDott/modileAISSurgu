import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Button, Image, StyleSheet, ScrollView, TouchableHighlight, } from 'react-native';


export default function SmsAuthPhonePass({route, navigation}) {
  const [code, onChangeCode] = React.useState("+7");
  const [number, onChangeNumber] = React.useState("");
  console.log('Sms Auth Phone Pass screen');
  return(
    <ScrollView
      contentContainerStyle={{
          justifyContent: 'center',
          flexGrow: 1,
      }}>
        <View style={styles.back}>
          <Image style={styles.icon} source={require('../../../assets/png/icon.png')} />
          <Text style={styles.numberTitle}>Номер телефона</Text>
          <View style={styles.numberContainer}>
            <TextInput 
              style={styles.numberCode} 
              value={code}
              placeholder='+7'
              onChangeText={onChangeCode}
              keyboardType='numeric' />
            <TextInput 
              style={styles.numberBody} 
              value={number}
              placeholder='9821234567'
              onChangeText={onChangeNumber}
              keyboardType='numeric' />
          </View>
          <Text style={styles.asking}>Укажите номер вашего телефона для получения кода доступа по СМС</Text>
          <TouchableOpacity
            //onPress={()=> navigation.navigate('Payment')}
            style={styles.payButton} >
            <Text style={styles.titlePayButton} >Получить код</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  numberContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  numberCode:{
    textAlign: 'center',
    width: "18%",
    height: 39,
    lineHeight: 29,
    paddingTop: 0,
    paddingBottom: 8,
    borderBottomWidth: 1.6,
    borderColor: '#2376EA',
    fontSize: 22,
  },
  numberBody:{
    height: 39,
    lineHeight: 29,
    width: "78%",
    paddingTop: 0,
    paddingBottom: 8,
    borderBottomWidth: 1.6,
    borderColor: '#2376EA',
    fontSize: 22,
  },
  icon: {
    marginBottom: 26, 
    width: 140, 
    height: 140,
  },
  asking:{
    fontFamily: 'rubik_regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 29
  },
  numberTitle:{
    fontFamily: 'rubik_regular',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 26,
  },
  back:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
  },
  titlePayButton:{
    fontFamily: 'rubik_medium',
    fontSize: 20,
    color: '#FFFFFF',
  },
  payButton:{
    width:'100%',
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
    height: 60,
  },
})