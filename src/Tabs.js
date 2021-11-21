import React from 'react';
import {View, Button, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs';
import MessagesScreen from './Screens/MessagesScreen.js';
import NotificationsScreen from './Screens/NotificationsScreen.js';
import Main from './Screens/Main.js';
import PassesScreen from './Screens/PassesScreen.js';
import SettingsScreen from './Screens/SettingsScreen.js';
import InitialScreen from './Screens/InitialScreen.js';
import Bell from '../assets/svg/bell.svg';
import Email from '../assets/svg/email.svg';
import Pass from '../assets/svg/pass.svg';
import Settings  from '../assets/svg/settings.svg';
import EmailActive from '../assets/svg/email_active.svg';
import PassActive from '../assets/svg/pass_active.svg';
import SettingsActive from '../assets/svg/settings_active.svg';
import BellActive from '../assets/svg/bell_active.svg';
import { AuthContext } from "./AuthContext.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function Tabs(props) {
  /* Состояние auth нужно для загрузки правильного стартового экрана (initialScreen). Состояния:
  -1 - экран только для тестирования во время разработки (DevScreen)
  0 - экран загрузки (LoadingScreen)
  1 - номер телефона не указан, нужна авторизация (SimplePhonePass)
  2 - пользователь авторизован, просто приветственный экран (Greeting)
  3 - пользователь не находится на стартовом экране  */ 
  const [Auth, setAuth] = React.useState(0);
  const [state, setState] = props.state;
  const checkPhone = async () => {
    let phone = await AsyncStorage.getItem('PhoneNumber');
    console.log('Phone number (Tabs.js) =',phone)
    if (!phone && Auth != -1){
      setAuth(1);
    }
    else {
      if (Auth == 0)
        setAuth(3);
        //setState(1);
    }
  }
  checkPhone();


  return (
    <AuthContext.Provider value={[Auth, setAuth]}>
      <Tab.Navigator
        initialRouteName='main'
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          
          //tabBarStyle: [styles.tabBar,{display: Auth >= 2 ? 'flex' : 'none'} ],
          tabBarStyle: {display: 'none'},
          //headerShown: Auth == 3 ? false : true,
          headerShown: false,
          headerStyle: styles.header,
          headerTitle: 'SCUD 86',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitle,
          /*tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.button}>
                <View style={styles.buttonIcon}>
                  { route.name === 'Уведомления' && (Auth == 3 && focused ? <BellActive /> : <Bell/>)}
                  { route.name === 'Сообщения' && (Auth == 3 && focused ? <EmailActive /> : <Email />) }
                  { route.name === 'Пропуска' && (Auth == 3 && focused ? <PassActive /> : <Pass />) }
                  { route.name === 'Настройки' && (Auth == 3 && focused ? <SettingsActive /> : <Settings />) }
                </View>
                <Text style={[styles.buttonText, {color: (Auth == 3 && focused ? '#1F2937' : '#9CA3AF')}]}>{route.name}</Text>
              </View>
            );
          },*/
        })}
      >
        <Tab.Screen /*listeners={{tabPress: e => Auth == 3 ? 0 : setAuth(3)}}*/ name="main" component={Auth == 3 ?  Main : InitialScreen} />
        {/*<Tab.Screen listeners={{tabPress: e => Auth == 3 ? 0 : setAuth(3)}} name="Сообщения" component={Auth == 3 ? MessagesScreen : InitialScreen} />
        <Tab.Screen listeners={{tabPress: e => Auth == 3 ? 0 : setAuth(3)}} name="Пропуска" component={Auth == 3 ? PassesScreen : InitialScreen} />
      <Tab.Screen listeners={{tabPress: e => Auth == 3 ? 0 : setAuth(3)}} name="Настройки" component={Auth == 3 ? SettingsScreen : InitialScreen} />*/}
        {/*<Tab.Screen name="Уведомления" component={NotificationsScreen } />
        <Tab.Screen name="Сообщения" component={MessagesScreen } />
        <Tab.Screen name="Пропуска" component={PassesScreen } />
        <Tab.Screen name="Настройки" component={SettingsScreen } />*/ }
      </Tab.Navigator>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  header:{
    height: 56,
    backgroundColor: '#2376EA',
  },
  headerTitle:{
    color: '#EEF2F5',
    fontSize: 22,
    fontFamily: 'rubik_medium',
  },
  tabBar:{
    display:'none',
    height: 56,
    backgroundColor: "#FFFFFF",
  },
  button:{
    alignItems: 'center',
    height: 38
  },
  buttonText:{
    fontSize: 12,
    width: '100%',
    fontFamily: 'rubik_regular',
    color: '#FFF',
  },
  buttonIcon:{
    height: 24,
    flexDirection: 'row',
    alignItems: 'center'
  }
})