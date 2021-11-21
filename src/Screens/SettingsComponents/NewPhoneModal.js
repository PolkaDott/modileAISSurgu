import * as React from 'react';
import { Animated, TouchableOpacity, Pressable, Image, Modal, Text, View, Button, StyleSheet, TouchableHighlight, SafeAreaView, TextInput, ScrollView, FlatList, Alert} from 'react-native';
import {Api} from '../../Api.js';

export default function NewPhoneModal(props){
    const [modalVisible, setModalVisible] = props.state;
    const [newPhone, onChangeCA] = React.useState(props.phoneValue);
    const [shouldUpdate, setShouldUpdate] = props.updateState;
    const count = props.count;
    const ChangePhone = async () => {
      let value = newPhone;
      if (value.length != 0){ // удаление телефона
        value.replace(/[^+\d]/g, '');
        if (value.startsWith('8') || value.startsWith('7'))
          value = '+7' + value.slice(1);
        else if (!value.startsWith('+7'))
          value = '+7' + value;
        if (value.length != 12){
          Alert.alert("Некорректный номер", "Номер телефона должен состоять из 11 цифр. Пример: +79876543210");
          return;
        }
      }
      
      var info = {value : value, sigur_id : props.sigur_id}
      if (props.count == 2)
          info.param_idx = 5
      else if (props.count == 3)
          info.param_idx = 8
      var result = await Api.UpdateStudent(info);
      setModalVisible(!modalVisible);
      setShouldUpdate(!shouldUpdate);
    }
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(!modalVisible); }} >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Введите новый номер телефона:</Text>
                    <TextInput style={styles.textInput} 
                        placeholner='' 
                        value={newPhone}
                        onChangeText={onChangeCA}
                        keyboardType='phone-pad'
                        placeholder="+79876543210"
                        />
                    <View style={{width: '100%',flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity
                            style={styles.buttonCancel}
                            activeOpacity={0.7}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text style={styles.titleButtonCancel}>Отмена</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonApply}
                            activeOpacity={0.7}
                            onPress={() => ChangePhone()}
                            >
                            <Text style={styles.titleButtonApply}>Применить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
  titleButtonApply:{
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'rubik_medium',
  },
  titleButtonCancel:{
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'rubik_medium',
  },
  buttonCancel:{
    backgroundColor: '#4B5563',
    width: '48%',
    borderRadius: 19,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    shadowOffset:{ width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#4B5563',
    shadowOpacity: 0.08,
    elevation: 4,
    marginBottom: 10

  },
  buttonApply:{
    backgroundColor: '#2376EA',
    width: '48%',
    borderRadius: 19,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    shadowOffset:{ width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#2376EA',
    shadowOpacity: 0.08,
    elevation: 4,
    marginBottom: 10
  },
  title:{
    fontFamily: 'rubik_regular',
    fontSize: 18,
    lineHeight: 21,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: "white",
    borderRadius: 12,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput:{
      width: '100%',
      paddingHorizontal: 17,
      height: 50,
      borderWidth: 1,
      borderColor: '#9CA3AF54',
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      borderStyle: 'solid',
      color: '#1F2937',
      fontFamily: 'rubik_regular',
      fontSize: 16,
      lineHeight: 21,
      marginBottom: 17
  },
})