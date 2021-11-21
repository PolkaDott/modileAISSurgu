import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading(props) {
  let addStyles = props.styles;
  return <LottieView source={require('./../assets/animation/loading.json')} style={[styles.anim, addStyles]} autoPlay loop />
  return <Text style={[styles.title, addStyles]}>
    Загрузка...
  </Text>
}

const styles = StyleSheet.create({
  anim:{
    height: 120,
    alignSelf: 'center'
  },
  /*title: {
    textAlign: 'center' ,
    paddingTop: 15,
    fontSize: 18,
    fontFamily: 'rubik_medium',
    color: '#6B7280',
  }*/
})