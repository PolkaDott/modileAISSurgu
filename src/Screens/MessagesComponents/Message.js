import * as React from 'react';
import { Image, Text, View, Button, StyleSheet, TouchableHighlight, SafeAreaView, ScrollView, FlatList} from 'react-native';
import {GetDateForMessage} from '../../CountDate.js';
import Polygon from '../../../assets/svg/polygon.svg';

export default function Message(props){
    var item = props.item;
    return (
        <View style={styles.container}>
            <View style={styles.edgecolumn}>
                {<Polygon style={{zIndex: 1}}/>
                }
            </View>
            <View style={styles.body}>
                <View style={styles.shadowBody}>
                <Text style={styles.date}>{GetDateForMessage(item)}</Text>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.message}>{item.text}</Text>

                </View>
            </View>
            <View style={styles.edgecolumn}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    message:{
        fontFamily: 'rubik_regular',
        fontSize: 16,
        lineHeight: 20,
        color: '#1F2937'
    },
    title:{
        fontFamily: 'rubik_medium',
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 6
    },
    date:{
        fontFamily: 'rubik_medium',
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 11
    },
    container: { 
        justifyContent: 'space-between', 
        width: '100%',
        flexDirection: 'row', 
    },
    body:{
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        flex: 1,
        borderRadius: 15,
        padding: 15,
        shadowOffset:{ width: 15, height: 10 },
        shadowRadius: 10,
        shadowColor: '#919CB6',
        shadowOpacity: 0.8,
        elevation: 5,
    },
    shadowBody:{

    },
    edgecolumn:{
        width: 10,
        paddingTop: 24
    }
})