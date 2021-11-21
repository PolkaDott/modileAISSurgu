import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs.js';
//import PushController from './PushNotifications/PushController.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getPhoneNumber} from 'react-native-device-info';

export default function App() {
  const [state, setState] = React.useState(0);
  React.useEffect(() => {
    //AsyncStorage.removeItem('PhoneNumber');
  }, []);    
    
    /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
  /*let color = null;
  if (state == 0){
    color = '#F5D265' ;
  }
  else{
    color = '#FFF';
  }*/
  return (
    <SafeAreaView style={{flex : 1}}>
      <StatusBar backgroundColor='#F5D265' />
      <NavigationContainer>
        <Tabs state={[state, setState]} />
      </NavigationContainer>
      {/*<PushController />*/}
    </SafeAreaView>
  );
}