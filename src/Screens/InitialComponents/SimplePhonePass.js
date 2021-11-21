import * as React from 'react';
import { Text, View, Alert, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, TextInput} from 'react-native';
import SmsRetriever from 'react-native-sms-retriever';
import {Api} from '../../Api.js';
import PushNotification  from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const DEBUG = false; // НЕ ДЛЯ РЕЛИЗА
//const SupportMail = "2kr@scud86.ru";

export default function SimplePhonePass(props){
    const [loginInput, onChangeLogin] = React.useState(null);
    const [passwordInput, onChangePassword] = React.useState(null);
    // Если нажата кнопка авторизации, то запрашивается телефон, а затем он проверяется на сервере
    const onPressAuth = async () => {
        let response = await Api.Auth(loginInput, passwordInput);
        if (response){
            await AsyncStorage.setItem('PhoneNumber', 'authed');
            props.setAuth(3);
        }
        else{
            Alert.alert('Неверный логин/пароль', 'Введены неверные данные');
        }
    }
    var item = {};

    return (
        <View>
            <LinearGradient start={{x: 0, y:0}} end={{x:0,y:1}} colors={['#F5D265', '#EC9E87']} style={styles.gradient}>
                <Text style={styles.nameTitle}>CheckItEasy</Text>
                <View style={styles.authView}>
                    <Text style={styles.authTitle}>Авторизация</Text>
                    <TextInput 
                        style={styles.input}
                        placeholderTextColor="#FFF"
                        placeholder={'Логин'}
                        value={loginInput}
                        onChangeText={onChangeLogin}
                     />
                    <TextInput 
                        style={[styles.input, styles.passInput]}
                        placeholderTextColor="#FFF"
                        placeholder={'Пароль'}
                        value={passwordInput}
                        onChangeText={onChangePassword}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onPressAuth}
                        /*onPress={ async ()=> {
                            console.log('Hey');
                            res = await fetch('http://192.168.43.210:5000/Bill/api/bill-types');
                            console.log('res', res);
                        }
                        }*/
                        style={styles.button}>
                        <Text style={styles.buttonTitle}>Вход</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            {DEBUG && 
                <TouchableOpacity
                    style={styles.dev_mode}
                    onPress={() => props.setAuth(-1)}
                    >
                    <Text style={styles.dev_mode_title}>АКТИВИРОВАТЬ РЕЖИМ РАЗРАБОТЧИКА</Text>
                </TouchableOpacity>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    authView:{
        height: '65%',
        justifyContent: 'center',
    },
    input:{
        fontFamily: 'roboto_regular',
        borderColor: '#FFF',
        borderBottomWidth: 2,
        color: '#FFF',
        fontSize: 18,
        marginBottom: 15,
    },
    passInput:{
        marginBottom: 25,

    },
    button:{
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle:{
        color: "#F0B3A1",
        fontFamily: 'roboto_regular',
        fontSize: 20,
    },
    authTitle:{
        fontSize: 36,
        fontFamily: 'roboto_regular',
        color: '#FFF',
        marginBottom: 30
    },
    nameTitle:{
        fontFamily: 'comfortaa_bold',
        fontSize: 45,
        color: '#FFF',
        textAlign: 'center',
    },
    gradient:{
        width: '100%',
        height: '100%',
        paddingHorizontal: 50,
        paddingTop: 30,
    },
    dev_mode:{
        marginTop: 'auto',
    },
    dev_mode_title:{
        color: 'red',
        textAlign: 'center'
    },
    back:{
        backgroundColor: '#FFFFFF',
        padding: 35,
        height: '100%',
    },
})