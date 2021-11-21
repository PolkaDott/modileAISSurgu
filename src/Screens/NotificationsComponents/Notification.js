import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight } from 'react-native';
import CameraOn from '../../../assets/svg/cameraon.svg';
import CameraOff from '../../../assets/svg/cameraoff.svg';

function fixTime(date){ // исправить время "16:2" -> "16:02"
  var min = date.getMinutes();
  if (min < 10)
      min = '0'+min;
  var hours = date.getHours();
  if (hours < 10)
      hours = '0'+hours;
  return hours + ':' + min;
}

export default function Notification(props){
  let params = props.params;


  let name = params.name.split(' ');//убрать отчество
  name = name[0] + ' ' + name[1];

  return (
    <View style={{width:'100%'}}>
      <View name="block" style={styles.body}>
        <View name='3columns' style={{flexDirection: 'row'}}>
          <View style={[styles.timeBack, {backgroundColor: params.type == 2 ? "#D1FAE5" : "#FEF3C7"}]}>
            <Text style={styles.timeText}>
                {fixTime(params.date)}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.type}>{params.type == 2 ? 'Вход в школу' : 'Выход из школы'}</Text>
          </View>
            {/*<View style={styles.camera}>
                {params.photo ? <CameraOn /> : <CameraOff />}
            </View>*/}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body:{
    width: "100%",
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 10,
    borderRadius: 15,
    shadowOffset:{ width: 0, height: 10 },
    shadowRadius: 10,
    shadowColor: '#919CB6',
    shadowOpacity: 0.08,
    elevation: 5,
  },
  timeBack: {
    height: 25,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  timeText:{
    fontSize: 16,
    fontFamily: 'rubik_regular',
    color: '#1F2937'
  },
  name:{
    fontFamily: 'rubik_medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 5
  },
  type:{
    fontFamily: 'rubik_regular',
    fontSize: 16,
    color: '#1F2937',
  },
  camera:{
    marginLeft: 'auto',
    justifyContent: 'center',
  }
})