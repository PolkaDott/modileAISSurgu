import * as React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableHighlight, } from 'react-native';
import Loading from '../../Loading.js';

export default function LoadingScreen() {
    console.log('Loading screen');
    return <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Loading styles={{height: 140}}/>
    </View>

}
const styles = StyleSheet.create({

})