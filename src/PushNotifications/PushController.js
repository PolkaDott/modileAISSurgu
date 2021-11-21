import React, {Component} from 'react';
import { Alert} from 'react-native';
import NotifService from './NotifService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Api} from '../Api.js';

export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('push controller is building')

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }
  // в AsyncStorage хранится FCMToken (токен для Firebase Messaging)
  TrySendToken = async (token, phone) => {
    return await Api.SendToken(token, phone)
    .then((response) => response.status == 201 ? true : false)
  }
  StoreToken = async (token) => { return await AsyncStorage.setItem('FCMToken', token) }
  SendOrUpdateToken = async (token) => {
    const phone = await AsyncStorage.getItem('PhoneNumber');
    if (!phone){
      console.log('Пользователь не авторизован, поэтому операция с FCM токеном остановлена');
      return;
    }
    const oldToken = await AsyncStorage.getItem('FCMToken');
    if (!oldToken || oldToken != token){ // токена нету или он обновился
      if (!oldToken) 
        console.log('Отправка нового токена');
      else console.log('Обновление токена на сервере');
      result = await this.TrySendToken(token, phone);
      if (result)
        this.StoreToken(token);
    }
    else console.log('Токен актуален')
  }

  render = () => null;

  onRegister(token) {
    this.SendOrUpdateToken(token.token);
    this.setState({registerToken: token.token});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }
}