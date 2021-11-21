import * as React from 'react';
import { Alert, TouchableOpacity, Image, Text, View, StyleSheet} from 'react-native';
import Phone from './Phone.js';
import NewPhoneModal from './NewPhoneModal.js';

let __key__ = 0;
const KeyGenerator = () => __key__++;

export default function LearnerTable(props){
    const [modalVisible, setModalVisible] = React.useState(false);
    const item = props.item;
    const pushPhone = () => {
        setModalVisible(!modalVisible);
    }
    let listPhones = []
    listPhones = listPhones.concat(<Phone key={KeyGenerator()} 
                             sms_enabled={item.sms_enabled1} 
                             push_enabled={item.push_enabled1} 
                             //number={item.phone1}
                             number={item.real_phone}
                             sigur_id={item.sigur_id}
                             updateState={props.updateState}
                             count={1}/>);
    if (item.phone2){
        listPhones = listPhones.concat(<Phone key={KeyGenerator()} 
                                 sms_enabled={item.sms_enabled2} 
                                 push_enabled={item.push_enabled2} 
                                 number={item.phone2}
                                 sigur_id={item.sigur_id}
                                 updateState={props.updateState}
                                 count={2}/>);
    }
    if (item.phone3){
        listPhones = listPhones.concat(<Phone key={KeyGenerator()} 
                                 sms_enabled={item.sms_enabled3} 
                                 push_enabled={item.push_enabled3} 
                                 number={item.phone3}
                                 sigur_id={item.sigur_id}
                                 updateState={props.updateState}
                                 count={3}/>);
    }                         
    return (
        <View style={styles.body}>
            <NewPhoneModal state={[modalVisible, setModalVisible]} count={item.phone2 ? 3 : 2} sigur_id={item.sigur_id} updateState={props.updateState} phoneValue={"+7"}/>
            <View style={styles.row1}>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>УЧАЩИЙСЯ</Text>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.photo}>
                <Image resizeMode='contain' style={{width: '100%', height: '100%', borderRadius:7}} 
                    source={{uri: 'data:image/png;base64, '+props.item.photo}}/>
                </View>
            </View>
            <View style={styles.row2}>
                <Text style={styles.balanceTitle}>БАЛАНС</Text>
                <Text style={styles.balance}>{props.item.balance + ' ₽'}</Text>
                <TouchableOpacity 
                    activeOpacity={0.65} 
                    style={styles.buttonUpBalance}
                    onPress={()=>props.navigation.navigate('AddBalance', { item : item })} >
                    <Text style={styles.titleUpBalance}>Пополнить баланс</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.55}
                    onPress={()=> props.navigation.navigate('Return', {item: item})}
                    style={styles.buttonReturn}>
                    <Text style={styles.titleReturn}>Вернуть остаток на карту</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>props.navigation.navigate('History', {item: item})}
                    activeOpacity={0.6}>
                    <Text style={styles.history}>ИСТОРИЯ ОПЕРАЦИЙ</Text>
                </TouchableOpacity>
                <Text style={styles.phoneTitle}>Номера для оповещения</Text>
            </View>
            { listPhones }
            { listPhones.length < 3 &&
                <TouchableOpacity 
                style={styles.row4}
                onPress={() => pushPhone()}>
                <Text style={styles.plus}>+</Text>
                <Text style={styles.addPhone}>Добавить ещё номер</Text>
                <Text style={styles.plus}> </Text>
            </TouchableOpacity> }
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flexDirection: 'column',
        width: '96%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
        shadowOffset:{ width: 0, height: 1 },
        shadowRadius: 2,
        shadowColor: '#919CB6',
        shadowOpacity: 0.12,
        elevation: 5,
        paddingLeft: 13,
        paddingTop: 21,
        paddingRight: 13,
        paddingBottom: 10
    },
    title:{
        fontFamily: 'rubik_medium',
        fontSize: 12,
        color: '#9CA3AF'
    },
    phoneTitle:{
        fontSize: 12,
        lineHeight: 15,
        fontFamily: 'rubik_medium',
        color: '#6B7280',
        marginBottom: 10,
    },
    name: {
        fontFamily: 'rubik_medium',
        fontSize: 20,
        lineHeight: 26,
        color: '#1F2937',
        flex: 1,
        marginRight: 16,
    },
    photo:{
        width: 85,
        height: 95,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 7
    },
    balanceTitle:{
        fontFamily: 'rubik_medium',
        fontSize: 12,
        color: '#9CA3AF'
    },
    balance:{
        fontFamily: 'rubik_medium',
        fontSize: 30,
        color: '#00AF31',
        lineHeight: 36,
        marginBottom: 11
    },
    row1:{
        flexDirection: 'row',
        marginBottom: 13
    },
    row2: {
        flexDirection: 'column'
    },
    buttonUpBalance: {
        backgroundColor: '#2376EA',
        borderRadius: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset:{ width: 0, height: 2 },
        shadowRadius: 4,
        shadowColor: '#2376EA',
        shadowOpacity: 0.08,
        elevation: 4,
        marginBottom: 10
    },
    titleUpBalance:{
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'rubik_medium',
    },
    buttonReturn:{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#2376EA54',
        borderStyle: 'dashed',
        marginBottom: 20
    },
    titleReturn:{
        color: '#2376EA',
        fontFamily: 'rubik_medium',
        fontSize: 14
    },
    history:{
        lineHeight: 15,
        fontFamily: 'rubik_medium',
        fontSize: 12,
        color: '#6B7280',
        alignSelf: 'center',
        marginBottom: 39
    },
    addPhone:{
        fontFamily: 'rubik_medium',
        fontSize: 14,
        color: '#6B7280'
    },
    plus:{
        color: '#6B7280',
        fontFamily: 'rubik_regular',
        fontSize: 21,
    },
    row4:{
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginBottom: 10,
        borderColor: '#9CA3AF50',
        borderStyle: 'dashed',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
})