import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableHighlight, ImageBackground, SafeAreaView, ScrollView, FlatList} from 'react-native';
import Cart from './../../../assets/svg/cart2.svg';
import {Api} from '../../Api.js';

export default function Product(props){
    return (
        <View style={styles.body}>
            <View style={styles.image}>
                <Image resizeMode='contain' style={{ width: '100%', height: '100%'}} source={Api.GetProductImage(props.item.picture)} />
            </View>
            <Text style={styles.title}>
                {props.item.title}
            </Text>
            <View style={styles.bottom}>
                <Text style={styles.price}>
                    {props.item.price+' ₽'}
                </Text>
                <TouchableHighlight 
                    underlayColor={'transparent'}
                    onPress={()=> props.navigation.navigate('Order', {item: props.item})}
                    style={styles.cartButton}>
                    <Cart />
                </TouchableHighlight>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    body:{
        width: '47%',
        height: 256,
        marginLeft: '2%',

        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        marginBottom: 7,
        borderRadius: 5,
        padding: 8,
        paddingBottom: 18,
        shadowOffset:{ width: 0, height: 10 },
        shadowRadius: 10,
        shadowColor: '#919CB6',
        shadowOpacity: 0.08,
        elevation: 5,
    },
    image:{
        width: '100%',
        height: 116,
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 8
    },
    title:{            
        fontFamily: 'rubik_regular',
        fontSize: 16,
        lineHeight: 21,
        color: '#1F2937',
    },
    bottom:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto'
    },
    price: {
        color: '#1F2937',
        fontSize: 20,
        fontFamily: 'rubik_medium',
        alignSelf: 'center'
    },
    cartButton:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 40,
        backgroundColor: '#2376EA14',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#2376EA40'
    }
})