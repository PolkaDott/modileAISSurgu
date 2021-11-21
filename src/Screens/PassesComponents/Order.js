import * as React from 'react';
import { Text, Image, View, Button, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, ScrollView, FlatList} from 'react-native';
import ArrowBack from './../../../assets/svg/arrowback.svg';
import Cart from '../../../assets/svg/cart.svg';
import Clode from '../../../assets/svg/clode.svg';
import Child from './Child.js';
import {Api} from '../../Api.js';
import PaySheet from '../../PaySheet.js';
import Loading from '../../Loading.js';

let __key__ = 0;
const KeyGenerator = () => __key__++;
//const SupportMail = "2kr@scud86.ru";

export default function Order({route, navigation}) {
  const [choice, setChoice] = React.useState(0);
  const [studList, setStudList] = React.useState(undefined);
  const [payVisible, setPayVisible] = React.useState(false);
  navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'Оформление пропуска',
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

  React.useEffect(() => {
    Api.GetStudents(setStudList);
  }, []);

  let content = null;
  if (studList === undefined){
    content = <Loading/>
  }
  else if (studList === 'ERR'){
    content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Ошибка!
    </Text>
  }
  else if (studList.length > 0){
    const mapStudents = (student, index) => {
      const id = KeyGenerator();
      return <Child key={id} id={index} choiceState={[choice, setChoice]} item={student}/>
    }
    content = <View style={{marginBottom: 30}}>
      <Text style={styles.title}>
        Выберите для кого пропуск
      </Text>
      <View style={styles.list}>
        {studList.map(mapStudents)}
      </View>
      <TouchableOpacity
        activeOpacity={0.65}
        //onPress={()=> setPayVisible(true)}
        onPress={() => navigation.navigate('CardPayment', {child_id : studList[choice].tabid, item : route.params.item})}
        style={styles.payButton} >
        <Text style={styles.titlePayButton} >{"Оплатить банковской картой " +route.params.item.price + ' ₽'}</Text>
      </TouchableOpacity>
    </View>
  }
  else {
    content = <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 25, paddingHorizontal: 20}}>
        <Text style={{fontSize: 20, fontFamily: 'rubik_regular', color: '#1F2937', textAlign: 'center'}}>В базе scud86.ru не найдено обучающихся для вашей учётной записи. Если произошла ошибка, напишите, пожалуйста, на почту {SupportMail}</Text>
    </View>
  }

  return(
    <ScrollView style={styles.back}>
      <View style={styles.pass}>
        <View style={styles.passImage} >
          <Image resizeMode='contain' style={{ width: '100%', height: '100%'}} source={Api.GetProductImage(route.params.item.picture)} />
        </View>
        <View style={{flexDirection: 'column', marginLeft: 20, flex: 1, justifyContent:'space-evenly'}}>
          <Text style={styles.passName}>{route.params.item.title}</Text>
          <Text style={styles.passPrice}>{route.params.item.price + ' ₽'} </Text>
        </View>
        <TouchableHighlight 
          underlayColor={'transparent'}
          style={styles.clode}
          onPress={()=> navigation.goBack()}>
          <Clode />
        </TouchableHighlight>
      </View>
      {content}
      <PaySheet state={[payVisible, setPayVisible]} />
    </ScrollView>
  );
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