import * as React from 'react';
import { Animated, TouchableOpacity, Image, Text, View, Button, StyleSheet, TouchableHighlight, SafeAreaView, ScrollView, FlatList} from 'react-native';

export default function CustomToggle(props){
    const [Enabled, setEnabled] = props.state;
    const Coords = React.useRef(new Animated.Value(Enabled ? 20 : 0)).current;
    const toggleOnOff = () => {
        Animated.timing(Coords, {
            toValue: Enabled ? 0 : 20,
            duration: 60,
            useNativeDriver: true,
        }).start();
        setEnabled(Enabled ? 0 : 1);
    };
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                width: 40, 
                height: 24, 
                justifyContent: 'center'
            }}
            onPress={toggleOnOff}
        >
            <Animated.View 
                style={{
                    backgroundColor: Enabled?'#2376EA24': '#C8CFDC',
                    width: 34,
                    height: 14,
                    borderRadius: 22,
                    position: 'absolute',
                    padding: 4,
                    alignSelf: 'center'

                }} />
            <Animated.View 
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: 14,
                    backgroundColor: Enabled?'#2376EA':'#ECECEC',
                    transform: [{
                        translateX: Coords
                    }],
                    shadowOffset:{ width: 0, height: 1 },
                    shadowRadius: 1,
                    shadowColor: '#000000',
                    shadowOpacity: 0.25,
                    elevation: 2,
                }}
            />
        </TouchableOpacity>
    )
}