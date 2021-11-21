import * as React from 'react';
import { TouchableOpacity, Text, View, Image, Button, StyleSheet, TouchableHighlight, SafeAreaView, ScrollView, FlatList} from 'react-native';

export default function Learner(props){
    const [choice, setChoice] = props.choiceState;
    let item = props.item;
    return (
        <View style={styles.body}>
          <View style={styles.photo}>
            <Image resizeMode='contain' style={{width: '100%', height: '100%', borderRadius:7}} 
                source={{uri: 'data:image/png;base64, '+item.photo}}/>
          </View>
          <View style={styles.columns}>
              <Text style={styles.title}>УЧАЩИЙСЯ</Text>
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity
                  activeOpacity={props.id == choice ? 1 : 0.4}
                  onPress={()=>{setChoice(props.id)}}
                  style={props.id == choice ? styles.buttonChosen : styles.buttonUnChosen}>
                  <Text 
                    style={props.id == choice ? styles.buttonTitleChosen : styles.buttonTitleUnChosen}>
                      {props.id == choice ? 'Ученик выбран' : 'Выбрать ученика'}
                  </Text>
              </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  photo:{
      width: 85,
      height: 95,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonUnChosen:{
    width: 150,
    borderRadius: 6,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2376EA'
  },
  buttonChosen:{
    width: 150,
    borderRadius: 6,
    borderColor: '#2376EA',
    borderWidth: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2376EA'
  },
  buttonTitleUnChosen:{
    color: '#2376EA',
    fontFamily: 'rubik_medium',
    fontSize: 14
  },
  buttonTitleChosen:{
    color: '#FFFFFF',
    fontFamily: 'rubik_medium',
    fontSize: 14
  },
  title:{
    fontFamily: 'rubik_medium',
    fontSize: 12,
    color: '#9CA3AF'
  },
  name: {
    fontFamily: 'rubik_medium',
    fontSize: 20,
    color: '#1F2937',
    lineHeight: 26,
  },
  body:{
    width: '96%',
    paddingTop: 19,
    paddingBottom: 15,
    paddingLeft: 13,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    shadowOffset:{ width: 0, height: 10 },
    shadowRadius: 10,
    shadowColor: '#919CB6',
    shadowOpacity: 0.12,
    elevation: 5,
    marginBottom: 10
  },
  photo:{
    width: 85,
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  columns:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
  }
})