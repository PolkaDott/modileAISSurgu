import * as React from 'react';
import { Alert, TextInput, Text, TouchableOpacity, View, Image, StyleSheet, ScrollView, TouchableHighlight, } from 'react-native';
import {Api} from '../../Api.js';
import PushNotification  from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const SupportMail = "2kr@scud86.ru";

export default function DevScreen(props) {
    console.log('DEV screen');
    const [code, onChangeNumber] = React.useState("+7");
    const onPressAuth = async () => {  
        let phoneNumber = code;
        if (phoneNumber.startsWith('8') || phoneNumber.startsWith('7')){
            phoneNumber = '+7' + phoneNumber.slice(1)
        }
        console.log('Тестировщик выбрал телефон =', phoneNumber);
        let response = null;
        try{
            response = await Api.CheckPhone(phoneNumber);
        }
        catch(e){
            console.log('FETCH ERROR',e);
            Alert.alert('Неизвестная ошибка','Попробуйте перезайти в приложение или убедиться в том, что имеется доступ в интернет. Если ошибка все равно появляется, напишите нам ' + SupportMail);
            return;
        }
        if (response.status == 200){
            await AsyncStorage.setItem('PhoneNumber', phoneNumber);
            props.setAuth(3);
            PushNotification.requestPermissions();
        }
        else if (response.status == 426){
            Alert.alert('Необходимо обновление приложения', 'Эта версия приложения устарела. Пожалуйста, обновите его в Play Market')
        }
        else if (response.status == 409){
            let message = await response.json();
            Alert.alert('Внимание', message);
        }
        else if (response.status == 500){
            Alert.alert('Ошибка', 'Ошибка на сервере. Попробуйте позже или обратитесь в техподдержку: ' + SupportMail)
        }
        else if (response.status == 404){
            Alert.alert('Неудачная авторизация', 'Ваш телефон не удалось найти в базе scud86.ru. Если вы зарегистрированы на сайте, но ошибка все равно появляется, напишите нам ' + SupportMail);
        }
        else {
            Alert.alert('Неизвестная ошибка','Попробуйте перезайти в приложение или убедиться в том, что имеется доступ в интернет. Если ошибка все равно появляется, напишите нам ' + SupportMail);
        }
    }

    return <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={styles.title1}>Этот экран появляется только в режиме разработчика. В релизе приложения на этот экран нельзя будет зайти. Здесь можно выбрать любой номер телефона</Text>
        <View style={styles.container}>
            <TextInput 
              style={styles.numberNumber} 
              value={code}
              placeholder='+7'
              onChangeText={onChangeNumber}
              keyboardType='phone-pad' />
          <TouchableOpacity
            onPress={()=> onPressAuth()}
            style={styles.payButton} >
            <Text style={styles.titlePayButton} >Войти</Text>
          </TouchableOpacity>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title1:{
        marginBottom: 'auto',
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'rubik_regular',
        fontSize: 17,
        paddingVertical: 20
    },
    numberNumber:{
        textAlign: 'center',
        width: '80%',
        height: 39,
        lineHeight: 29,
        paddingTop: 0,
        paddingBottom: 8,
        borderBottomWidth: 1.6,
        borderColor: '#2376EA',
        fontSize: 22,
        marginBottom: 40
        },
        titlePayButton:{
            fontFamily: 'rubik_medium',
            fontSize: 20,
            color: '#FFFFFF',
        },
        payButton:{
            width:'80%',
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