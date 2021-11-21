import * as React from 'react';
import SmsAuthPhonePass from './InitialComponents/SmsAuthPhonePass.js';
import Greeting from './InitialComponents/Greeting.js';
import SimplePhonePass from './InitialComponents/SimplePhonePass.js';
import LoadingScreen from './InitialComponents/LoadingScreen.js';
import {AuthContext} from '../AuthContext.js';
import DevScreen from './InitialComponents/DevScreen.js';

export default function InitialScreen() {
  console.log('Initial screen');
  const [Auth,setAuth] = React.useContext(AuthContext);
  //const oldToken = await AsyncStorage.getItem('FCMToken');
  /* Состояние auth нужно для загрузки правильного стартового экрана (initialScreen). Состояния:
  -1 - экран только для тестов во время разработки (DevScreen)
  0 - экран загрузки (LoadingScreen)
  1 - номер телефона не указан, нужна авторизация (SimplePhonePass)
  2 - пользователь авторизован, просто приветственный экран (Greeting)
  3 - пользователь не находится на стартовом экране  */ 
  if (Auth == -1)
    return <DevScreen setAuth={setAuth}/>
  else if (Auth == 0)
    return <LoadingScreen/>
  else if (Auth == 1)
    return <SimplePhonePass setAuth={setAuth}/>
  /*else if (Auth == 1){
    return <SmsAuthPhonePass/>
  }*/
  else if (Auth == 2)
    return <Greeting/>
  else if (Auth == 3)
    return null; // этот экран не должен быть загружен
}