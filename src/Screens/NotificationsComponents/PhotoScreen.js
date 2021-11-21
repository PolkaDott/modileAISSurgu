import * as React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableHighlight, } from 'react-native';
import ArrowBack from './../../../assets/svg/arrowback.svg';
import {GetDateForNotification} from '../../CountDate.js';

export default function PhotoScreen({route, navigation}) {
    navigation.setOptions({
        headerTitle: 'Фото входа в школу',
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => {
            return (
            <TouchableHighlight 
                underlayColor={'transparent'}
                style={styles.buttonArrowBack}
                onPress={()=> navigation.goBack() }>
                <ArrowBack />
            </TouchableHighlight>
            );
        },
        headerRight: () => {
            return null
        }
    })
    const data = route.params.item;
    return (
        <View style={styles.back}>
            <ScrollView>
              <View style={styles.photo}>
                {/*<Image resizeMode='contain' style={{width: '100%', height: '100%'}} source={require('../../../assets/png/learner_enters.png')} />*/}
              </View>
              <View style={{paddingHorizontal: 10, flexDirection: 'column', width: '100%'}}>

              <Text style={styles.message}>
                  {data.type == 'in' ? 
                                  data.name + ', совершил(а) вход в школу через Турникет 2'
                                  : data.name + ', совершил(а) выход из школы через Турникет 2'}
              </Text>
              <View style={styles.push}>
                  <View name='3columns' style={{flexDirection: 'row'}}> 
                  <View style={[styles.timeBack, {backgroundColor: data.type == 'in' ? "#D1FAE5" : "#FEF3C7"}]}>
                      <Text style={styles.timeText}>
                          {data.time}
                      </Text>
                  </View>
                      <Text style={styles.timeString}>{GetDateForNotification(data)}</Text>
                  </View>
              </View>

              </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  header:{
      height: 56,
      backgroundColor: '#2376EA',
  },
  push:{
    width: "100%",
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingVertical: 25,
    paddingRight: 10,
    borderRadius: 15,
    shadowOffset:{ width: 0, height: 10 },
    shadowRadius: 10,
    shadowColor: '#919CB6',
    shadowOpacity: 0.08,
    elevation: 5,
    marginBottom: 8
    
  },
  timeString:{
    fontFamily: 'rubik_medium',
    fontSize: 16,
    color: '#1F2937',
    flex: 1
  },
  timeText:{
    fontSize: 16,
    fontFamily: 'rubik_regular',
    color: '#1F2937',
  },
  timeBack: {
    height: 25,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    alignSelf: 'center'
  },
  back:{
    flex: 1,
    backgroundColor: '#eef2f5',
    width: '100%',
  },
  message:{
    fontFamily: 'rubik_medium',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 26

  },
  photo:{
    width: '100%',
    height: 242,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22
  },
  advertisment: {
    height: 116, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', 
    width: '100%'
  },
  headerTitle:{
    color: '#EEF2F5',
    fontSize: 20,
    fontFamily: 'rubik_medium',
    marginLeft: 0,
  },
  buttonArrowBack:{
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',

  }
})