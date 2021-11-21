import * as React from 'react';
import Home from '../../../assets/svg/home.svg';
import { Image,Text, View, StyleSheet, TouchableHighlight, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import LearnerTable from './LearnerTable.js';
import {AuthContext} from '../../AuthContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {Api} from '../../Api.js';
import Loading from '../../Loading.js';

//const SupportMail = "2kr@scud86.ru";
let __key__ = 0;
const KeyGenerator = () => __key__++;

export default function Settings({navigation}){
  const [,setAuth] = React.useContext(AuthContext);
  const [shouldUpdate, setShouldUpdate] = React.useState(0);
  const [studList, setStudList] = React.useState(undefined);

  navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'Настройки',
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
        headerRight:()=>{
          return (
            <TouchableHighlight 
              underlayColor={'transparent'}
              style={styles.buttonInfo}
              onPress={()=> navigation.navigate('Info')}>
              <Image style={{width: 30, height: 30}} source={require('../../../assets/png/info.png')} />
            </TouchableHighlight>
          );
        }
  });

  React.useEffect(() => {
    Api.GetStudents(setStudList);
  }, [shouldUpdate]);

  let content = null;
  if (studList === undefined){
    //content = <Loading styles={{marginBottom: 25}}/>
    content = <Loading />
  }
  else if (studList === 'ERR'){
    content = <Text style={{ marginBottom: 25, textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Ошибка!
    </Text>
  }
  else if (studList.length > 0){
    const mapStudents = (student) => {
      return <LearnerTable key={KeyGenerator()} navigation={navigation} item={student} updateState={[shouldUpdate, setShouldUpdate]}/>
    }
    content = studList.map(mapStudents);
  }
  else {
    content = <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 25, paddingHorizontal: 20}}>
        <Text style={{fontSize: 20, fontFamily: 'rubik_regular', color: '#1F2937', textAlign: 'center'}}
          >В базе scud86.ru не найдено обучающихся для вашей учётной записи. Если произошла ошибка, напишите, пожалуйста, на почту {SupportMail}</Text>
    </View>
  }

  return (
      <View style={styles.back}>
          <SafeAreaView style={{flex: 1, width: '100%'}}>
              <ScrollView style={styles.learners}>
                {content}
                <TouchableOpacity
                style={styles.exitBlock}
                onPress={()=>{
                  AsyncStorage.removeItem('PhoneNumber');
                  setAuth(1);
                  PushNotification.abandonPermissions();
                  
                }}>
                  <Text style={styles.exitTitle}>ВЫЙТИ ИЗ ЛИЧНОГО КАБИНЕТА</Text>
                </TouchableOpacity>
              </ScrollView>
          </SafeAreaView>
      </View>
  )
}

const styles = StyleSheet.create({
  buttonInfo:{
    width: 54,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitBlock:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 57,
    paddingTop: 10
  },
  exitTitle:{
    color: '#9CA3AF',
    fontFamily: 'rubik_medium',
    fontSize: 14,
    lineHeight: 17,
  },
  learners:{
    flex: 1,
    width: '100%',
    paddingTop: 10,
  },
  back:{
    flex: 1,
    alignItems: 'center',
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
  buttonHome:{
    width: 54,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
})