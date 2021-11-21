import * as React from 'react';
import { ScrollView, TouchableOpacity, Text, View, TextInput, StyleSheet, TouchableHighlight, FlatList, StatusBar} from 'react-native';
import Home from '../../assets/svg/home.svg';
import Plus from '../../assets/svg/plus.svg';
import Message from './MessagesComponents/Message.js';
import {AuthContext} from '../AuthContext.js';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Api} from '../Api.js';
import ModalDropdown from 'react-native-modal-dropdown';
import Loading from '../Loading.js';
import Vector from '../../assets/svg/vector.svg';

let __key__ = 0;
const KeyGenerator = () => __key__++;


export default function Document({route, navigation}) {

  const [searchInput, onChangeSearch] = React.useState(null);
  const [inp1, onInp1] = React.useState(null);
  const [inp2, onInp2] = React.useState(null);
  const [inp3, onInp3] = React.useState(null);
  const [inp4, onInp4] = React.useState(null);
  const [inp5, onInp5] = React.useState(null);
  const [inp6, onInp6] = React.useState(null);
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
    content = (
        <View>
            <View>
                <Text style={styles.title1}>Тип счёта</Text>
                <ModalDropdown
                    style={styles.search}
                    textStyle={styles.searchText} 
                    defaultValue="Sports"
                    dropdownTextStyle={styles.text2}
                    dropdownStyle={styles.searchCont}
                    onSelect={(hz)=>onInp1(hz)}
                    options={['Sports', 'Coworking', 'Education']}/>
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Компания предоставляющая услугу</Text>
                <TextInput 
                    style={styles.search}
                    placeholderTextColor='B4B4B4'
                    placeholder='Название компании'
                    value={inp2}
                    onChangeText={onInp2}
                    />
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Стоимость</Text>
                <TextInput 
                    style={styles.search}
                    placeholderTextColor='B4B4B4'
                    placeholder='Стоимость услуги'
                    value={inp3}
                    onChangeText={onInp3}
                    />
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Валюта</Text>
                <ModalDropdown 
                    style={styles.search} 
                    textStyle={styles.searchText} 
                    defaultValue="USD"
                    dropdownTextStyle={styles.text2}
                    dropdownStyle={styles.searchCont}
                    options={['USD', 'RUB', 'EUR']}/>
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Дата</Text>
                <TextInput 
                    style={styles.search}
                    placeholderTextColor='B4B4B4'
                    placeholder='08.09.2021'
                    value={inp5}
                    keyboardType="numeric"
                    onChangeText={onInp5}
                    />
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Комментарий</Text>
                <TextInput 
                    style={styles.textarea}
                    placeholderTextColor='B4B4B4'
                    placeholder='Ваш комментарий'
                    value={inp4}
                    onChangeText={onInp4}
                    />
                <View style={styles.line}/>
            </View>
            <View>
                <Text style={styles.title1}>Изображение счёта</Text>
                <TouchableOpacity 
                    onPress={()=>{
                        let options = {
                            title: 'Select Image',
                            customButtons: [
                                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
                            ],
                            storageOptions: {
                                skipBackup: true,
                                path: 'images',
                            },
                            };
                            launchImageLibrary(options, (e) => {console.log(e)})
                    }}
                    activeOpacity={0.5}
                    style={styles.button}>
                    <Text style={styles.buttonTitle}>Нажмите для загрузки файла</Text>
                </TouchableOpacity>
                <View style={[styles.line, {marginBottom: 18}]}/>
            </View>
            <View>
                <TouchableOpacity 
                    onPress={async ()=>{
                        var year = inp5.slice(6,11);
                        var month = inp5.slice(3,5);
                        var day = inp5.slice(0,2);
                        let str = year+'-'+month+'-'+day+"T07:00:00.000Z"
                        console.log(str, day, month, year);
                        let date = new Date(str);
                        //let date = new Date(year+'-'+month+'-'+day+"2016-02-29T17:00:00.000Z");
                        console.log(inp5, date);
                        await Api.SendBill(1, inp1+1, date, inp2, Number(inp3), inp4)
                        const [state, setState] = route.params.item;
                        setState(state+1);
                        navigation.navigate('many');                         
                    }}
                    activeOpacity={0.5}
                    style={styles.loadbutton}>
                    <Text style={styles.loadbuttontitle}>Загрузить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    
  }
  return(
    <View style={styles.back}>
        <ScrollView>
            {content}
        </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  search:{
    borderColor: '#49A9FC',
    borderWidth: 1,
    paddingLeft: 20,
    paddingVertical: 0,
    height: 37,
    marginBottom: 10, 
    marginLeft: 18,
    marginRight: 98,
  },
  text2:{
      fontSize: 21
  },
  searchText:{
    fontSize: 21,
    
  },
  searchCont:{
    width: '50%',
    fontSize: 22

  },
  button:{

    borderColor: '#49A9FC',
    borderWidth: 1,
    marginLeft: 18,
    borderRadius: 5,
    width: '70%',
    marginBottom: 10,
    padding: 6,
    paddingLeft: 15,
  },
  buttonTitle:{
      fontFamily: 'roboto_regular',
      fontSize: 15,
  },
  loadbutton:{
    borderColor: '#49A9FC',
    alignSelf: 'center',
    borderWidth: 1,
    marginLeft: 18,
    borderRadius: 5,
    width: '70%',
    marginBottom: 10,
    padding: 6,
    paddingLeft: 15,
    paddingVertical: 20,
  },
  loadbuttontitle:{
      textAlign: 'center',
      fontFamily: 'roboto_regular',
      fontSize: 22,
      color: '#49A9FC',
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