import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Image, Text, View, Button, TextInput, StyleSheet, ScrollView, FlatList, SafeAreaViewBase} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Check from '../../../assets/svg/check1.svg';


export default function ReturnSuccess(props){
    return(
        <ScrollView
         contentContainerStyle={{
             justifyContent: 'center',
             flexGrow: 1,
         }}>
            <View style={styles.back}>
                <Check style={{marginBottom: 52}} />
                <Text style={styles.title1}>Ваша заявка на возврат денег отправлена на обработку</Text>
                <Text style={styles.title2}>Возврат будет произведен не позднее чем через 15 дней. Узнать статус платежа можно в истории операций.</Text>
                <TouchableOpacity 
                    activeOpacity={0.6}
                    onPress={()=> props.navigation.navigate('History', {item: props.item}) }>
                    <Text style={styles.button}>ПОСМОТРЕТЬ</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    back:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    title1:{
        fontFamily: 'rubik_medium',
        fontSize: 20,
        textAlign: 'center',
        color: '#1F2937',
        marginBottom: 22
    },
    title2:{
        fontFamily: 'rubik_regular',
        fontSize: 14,
        textAlign: 'center',
        color: '#6B7280',
        marginBottom: 40

    },
    button:{
        color: '#FF8816',
        fontFamily: 'rubik_medium',
        fontSize: 14
    },
})