import * as React from 'react';
import { ScrollView, TouchableOpacity, Text, View, TextInput, StyleSheet, TouchableHighlight, FlatList, Image, StatusBar} from 'react-native';
import Home from '../../assets/svg/home.svg';
import Plus from '../../assets/svg/plus.svg';
import Message from './MessagesComponents/Message.js';
import {AuthContext} from '../AuthContext.js';
import {Api} from '../Api.js';
import Loading from '../Loading.js';

let __key__ = 0;
const KeyGenerator = () => __key__++;

export default function OldDocument({route, navigation}) {
  const [searchInput, onChangeSearch] = React.useState(null);
  const [messagesList, setMessagesList] = React.useState(undefined);
  React.useEffect(() => {
    //Api.GetBills('1', setMessagesList);
    setMessagesList([])
  }, []);    

  navigation.setOptions({
        //headerStyle: styles.header,
        //headerTitle: 'Сообщения и новости',
        headerShown: false,
        //headerTitleStyle: styles.headerTitle,
        //headerTitleAlign: 'left',
        /*headerLeft: () => {
          return (
            <TouchableHighlight 
              underlayColor={'transparent'}
              style={styles.buttonHome}
              onPress={()=> setAuth(2)}> 
              <Home/>
            </TouchableHighlight>
          );
        },*/
        headerRight:() => null
  });
  let item = route.params.item;
  let content = null;
  if (messagesList === undefined){
    content = <Loading/>
  }
  else if (messagesList === 'ERR'){
    content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Ошибка!
    </Text>
  }
  else{
    let date = new Date(item.date);
    let dates = date.getDate() + '.' + (date.getMonth() + 1)+ '.' + date.getFullYear();
    let statuss = '';
    let color = '';
    if (item.status.status == 'Declined'){
        statuss='Отклонено';
        color ='#FF0000' ;
    }
    else if (item.status.status == 'Received'){
        statuss='Принято';
        color = 'green';
    }
    else{
        statuss='На подтверждении';
        color = '#1790F9';
    }

    console.log('item.link',item)
    content = (
        <ScrollView>
            <View>
                <Text style={styles.title1}>Компания предоставляющая</Text>
                <Text style={styles.result}>{item.name}</Text>
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Тип счёта</Text>
                <Text style={styles.result}>{item.type.name}</Text>
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Дата</Text>
                <Text style={styles.result}>{dates}</Text>
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Стоимость</Text>
                <Text style={styles.result}>{item.amount}</Text>
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Валюта</Text>
                <Text style={styles.result}>USD</Text>
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Комментарий</Text>
                <Text style={styles.result}>{item.comment}</Text>
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Частота</Text>
                <Text style={styles.result}>{item.frequency.id} раз в месяц</Text>
                <View style={styles.line}/>
            </View>
            {/*<View>
                <Text style={styles.title1}>Изображение счёта</Text>
                <TouchableOpacity 
                    onPress={()=>1}
                    activeOpacity={0.5}
                    style={styles.button}>
                    <Text style={styles.buttonTitle}>Нажмите чтобы скачать</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
            </View>*/}
            <Image resizeMode='contain' style={{height: 720}} source={{uri : item.link}} />
        </ScrollView>
    )
    
  }
  return(
    <View style={styles.back}>
            {content}
    </View>
  );
}
const styles = StyleSheet.create({
  search:{
      borderColor: '#49A9FC',
      borderWidth: 1,
      paddingLeft: 15,
      paddingVertical: 0,
      height: 37,
      marginBottom: 10, 
      marginLeft: 18,
      marginRight: 98,
  },
  result:{
      fontFamily: 'roboto_bold',
      fontSize: 21,
      marginBottom: 10,
      marginLeft: 18,
  },
  button:{
    borderColor: '#49A9FC',
    borderWidth: 1,
      marginLeft: 18,
    borderRadius: 5,
    width: '60%',
    marginBottom: 10,
    padding: 6,
    paddingLeft: 15,
  },
  buttonTitle:{
      fontFamily: 'roboto_regular',
      fontSize: 15,
  },
  title1:{
    fontFamily: 'roboto_regular',
    fontSize: 21,
    paddingBottom: 10,
    paddingHorizontal: 18,
  },
  line:{
    width: '60%',
    marginLeft: 'auto',
    height: 1.3,
    backgroundColor:  '#49A9FC',
  },
  textarea:{
      borderColor: '#49A9FC',
      borderWidth: 1,
      paddingLeft: 15,
      paddingVertical: 0,
      height: 60,
      marginBottom: 10, 
      marginLeft: 18,
      marginRight: 98,

  },
  back:{
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    paddingTop: 10
  },
  header:{
    height: 56,
    backgroundColor: '#2376EA',
  },
  headerTitle:{
    color: '#EEF2F5',
    fontSize: 20,
    fontFamily: 'rubik_medium',
    marginLeft: 4,
    width: "100%"

  },
  buttonHome:{
    width: 54,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
})