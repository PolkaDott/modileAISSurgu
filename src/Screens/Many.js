import * as React from 'react';
import {TouchableOpacity, Text, View, TextInput, StyleSheet, TouchableHighlight, FlatList, StatusBar} from 'react-native';
import Home from '../../assets/svg/home.svg';
import Plus from '../../assets/svg/plus.svg';
import Message from './MessagesComponents/Message.js';
import {AuthContext} from '../AuthContext.js';
import {Api} from '../Api.js';
import Loading from '../Loading.js';

let __key__ = 0;
const KeyGenerator = () => __key__++;

export default function Many({navigation}) {
  const [,setAuth] = React.useContext(AuthContext);
  const [state, setState] = React.useState(0);
  const [messagesList, setMessagesList] = React.useState(undefined);
  const [searchInput, onChangeSearch] = React.useState(null);

  console.log('Messages screen');

  React.useEffect(() => {
    Api.GetBills('1', setMessagesList);
  }, [state]);    
    const renderMessage = ({item}) => {
        let date = new Date(item.date);
        let dates = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
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
        return(
            <TouchableOpacity 
                style={styless.body}
                activeOpacity={0.5}
                onPress={() =>navigation.navigate('olddocument', {item: item}) }
            >
                <View style={styless.circle} />
                <View style={styless.data}>
                <Text style={styless.name}>{item.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styless.time}>{dates}</Text>
                    <Text style={[styless.status, {color: color}]}>{statuss}</Text>
                </View>
                </View>
            </TouchableOpacity>
        );
    }

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
  let content = null;
  console.log('list', messagesList)
  if (messagesList === undefined){
    content = <Loading/>
  }
  else if (messagesList === 'ERR'){
    content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Ошибка!
    </Text>
  }
  else if (messagesList.length > 0){
    content = <FlatList 
          style={styles.messages}
          data={messagesList}
          renderItem={renderMessage}
          keyExtractor={KeyGenerator}
        />
  }
  else{
    content = <Text style={{ textAlign : 'center', paddingTop: 15, fontSize: 18, fontFamily: 'rubik_medium', color: '#6B7280', }}>
      Чеков нет
    </Text>
  }
  return(
    <View style={styles.back}>
      <StatusBar backgroundColor='#FFF'/>
      <View style={{width: '100%', flex: 1}}>
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-evenly'}}>
          <TextInput
              style={styles.search}
              placeholderTextColor='B4B4B4'
              placeholder='Поиск'
              value={searchInput}
              onChangeText={onChangeSearch}
            />
          
          <TouchableOpacity
            style={styles.pluscontainer}
            activeOpacity={0.5}
            onPress={() =>navigation.navigate('document', {item: [state, setState]}) }>
            <Plus style={styles.plus}/>
          </TouchableOpacity>
        </View>
        
        {content}

      </View>
    </View>
  );
}

const styless = StyleSheet.create({
    circle: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: "#49A9FC",
        marginRight: 14
    },
    body:{
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    data:{
        flexDirection: 'column',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#53AEFD',
    },
    name:{
        fontFamily: 'roboto_bold',
        fontSize: 25,
        marginBottom: 6
    },
    time:{
        fontFamily: 'roboto_regular',
        fontSize: 17, 
        color: '#B4B4B4',
        marginRight: 30
    },
    status:{
        fontSize: 17, 
    },
})


const styles = StyleSheet.create({
  pluscontainer: {
  },
  plus:{
    width: '20%',
    textAlign: 'center',
  },
  search:{
    backgroundColor: '#EFEFEF',
    width: '80%',
    fontSize: 23,
    borderRadius: 10,
    textAlign: 'center'
  },
  messages:{
    width: '100%',
    flex: 1,
    paddingTop: 10,
  },
  back:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
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