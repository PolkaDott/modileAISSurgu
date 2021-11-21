import * as React from 'react';
import { Animated, TouchableOpacity, Pressable, Image, Modal, Text, View, Button, StyleSheet, TouchableHighlight, SafeAreaView, TextInput, ScrollView, FlatList, Alert} from 'react-native';
import CustomToggle from './CustomToggle.js';
import {Api} from '../../Api.js';
import NewPhoneModal from './NewPhoneModal.js';

export default function ReceivePhone(props){
    const [SMSToggle, SetSMSToggle] = React.useState(props.sms_enabled);
    const [PushToggle, SetPushToggle] = React.useState(props.push_enabled);
    const [modalVisible, setModalVisible] = React.useState(false);
    const changePhone = () => {
        setModalVisible(true);
    }
    const SetSMSToggleAdapter = async (value) => {
        var info = {value : value, sigur_id : props.sigur_id}
        if (props.count == 1)
            info.param_idx = 12
        else if (props.count == 2)
            info.param_idx = 6
        else if (props.count == 3)
            info.param_idx = 9
        var result = await Api.UpdateStudent(info);
        SetSMSToggle(value);
    }
    const SetPushToggleAdapter = async (value) => {
        var info = {value : value, sigur_id : props.sigur_id}
        if (props.count == 1)
            info.param_idx = 13
        else if (props.count == 2)
            info.param_idx = 7
        else if (props.count == 3)
            info.param_idx = 10
        var result = await Api.UpdateStudent(info);
        SetPushToggle(value);
    }
    let number = props.number;
    if (number)
        number = number.slice(0,2)+' '+number.slice(2,5)+' '+number.slice(5,8)+' '+number.slice(8,10)+' '+number.slice(10)
    return(
        <View style={styles.row3}>
            <NewPhoneModal state={[modalVisible, setModalVisible]} count={props.count} sigur_id={props.sigur_id} updateState={props.updateState} phoneValue={props.number}/>
            <View style={styles.row5}>
                <TouchableOpacity 
                    style={[styles.phoneView, {borderColor: props.count == 1 ? 'black' : '#9CA3AF'}]} 
                    activeOpacity={props.count == 1 ? 1 : 0.6}
                    onPress={props.count == 1 ? 
                        () => 1 : 
                        () => changePhone()
                    }>
                    <Text style={styles.phoneNumber}>{number}</Text>
                </TouchableOpacity>
                {props.push_enabled !== undefined && 
                <View style={styles.toggleView} >
                    <Text style={styles.toggleTitle}>PUSH</Text>
                    <CustomToggle state={[PushToggle, SetPushToggleAdapter]} />
                </View>
                }
                {props.sms_enabled !== undefined && 
                <View style={styles.toggleView} >
                    <Text style={styles.toggleTitle}>SMS</Text>
                    <CustomToggle state={[SMSToggle, SetSMSToggleAdapter]} />
                </View>}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    row5:{
        flexDirection: 'row'
    },
    phoneNumber:{
        fontFamily: 'rubik_regular',
        fontSize: 19,
        color: '#1F2937',       
        width: '92%',
        textAlign: 'center',
        
    },
    check:{
        marginLeft: 'auto',
        alignItems:'center',
        marginRight: 10
        
    },
    phoneView:{
        borderWidth: 1,
        borderRadius: 6,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',            
        borderStyle: 'solid',
        flexDirection: 'row',
        flex: 1,
    },
    toggleView:{
        flexDirection: 'column', 
        marginLeft: 13, 
        marginRight: 2,
        justifyContent: 'center'

    },
    row3:{
        flexDirection: 'column',
        marginBottom: 10
    },
    toggleTitle:{
        alignSelf: 'center',
        color: '#1F2937',
        fontSize: 14,
        fontFamily: 'rubik_medium',
        lineHeight: 18,
    },
})