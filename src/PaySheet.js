import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";

export default function PaySheet(props) {
  const [visible, setVisible] = props.state;

  function toggle() {
    setVisible((visible) => !visible);
  }

  return (
    <BottomSheet
    visible={visible}
    onBackButtonPress={toggle}
    onBackdropPress={toggle}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Выберите способ оплаты</Text>
      <TouchableOpacity 
        activeOpacity={0.55}
        style={styles.cardWay}>
        <Text style={styles.bankCardTitle}>Оплатить банковской картой</Text>
      </TouchableOpacity>
      <View style={styles.cardWay}>
        <Text>Google Pay</Text>
      </View>
    </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({    
    bankCardTitle:{
        fontFamily: 'rubik_medium',
        fontSize: 18,
        textAlign: 'center'
    },
    cardWay: {
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        shadowOffset:{ width: 0, height: 4 },
        shadowRadius: 8,
        shadowColor: '#E4E4E4',
        shadowOpacity: 0.16,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22,
    },
    title:{
        fontFamily: 'rubik_medium',
        fontSize: 22,
        color: '#1F2937',
        marginBottom: 10
    },
    container: {
        backgroundColor: "#F2F2F2",
        justifyContent: "center",
        padding: 12
    },
});