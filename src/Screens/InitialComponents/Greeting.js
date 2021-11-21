import * as React from 'react';
import { Text, StyleSheet, ScrollView, } from 'react-native';

export default function Greenting(){
    console.log('Greeting screen');
    var name = undefined;
    return (
        <ScrollView style={styles.back}
        contentContainerStyle={{
             justifyContent: 'center',
             flexGrow: 1,
         }}>
            <Text style={styles.title1}>
                Добро пожаловать{name ? ', '+name : ''}
            </Text>
            <Text style={styles.title2}>
                Система контроля и управления доступом предназначена для повышения уровня защищенности учеников и помещений образовательных учреждений
            </Text>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    back:{
        backgroundColor: '#FFFFFF',
        padding: 35
    },
    title1:{
        fontFamily: 'rubik_medium',
        fontSize: 24,
        lineHeight: 31,
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 37

    },
    title2:{
        color: '#1F2937',
        fontFamily: 'rubik_regular',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center'
    },
})