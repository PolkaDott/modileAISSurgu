import * as React from 'react';
import {Text, View, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import Home from '../../assets/svg/home.svg';
import Message from './MessagesComponents/Message.js';
import {AuthContext} from '../AuthContext.js';
import {Api} from '../Api.js';
import Loading from '../Loading.js';

let __key__ = 0;
const KeyGenerator = () => __key__++;

function renderMessage({item}){
  return (
      <Message item={item}/>
  );
}

export default function MessagesScreen({navigation}) {
  const [,setAuth] = React.useContext(AuthContext);
  const [messagesList, setMessagesList] = React.useState(undefined);

  console.log('Messages screen');

  React.useEffect(() => {
    Api.GetMessages(setMessagesList);
  }, []);    

  navigation.setOptions({
        headerStyle: styles.header,
        headerTitle: 'Сообщения и новости',
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'left',
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
        headerRight:() => null
  });
  let content = null;
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
      Сообщений нет
    </Text>
  }
  return(
    <View style={styles.back}>
      <View style={{width: '100%', flex: 1}}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messages:{
    width: '100%',
    flex: 1,
    paddingTop: 10,
  },
  back:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eef2f5',
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