import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Main from '../screens/main';
import Camera from '../screens/camera';
import Preload from '../screens/preload';
import SignIn from '../screens/SignIn';

const Stack = createNativeStackNavigator();
export default function Routes() {

    // const customStyle = {
    //     container: {
    //       backgroundColor: '#e8e8e8',
    //       borderRadius: 10,
    //     },
    //     buttonCancel: {
    //       backgroundColor: '#b51919',
    //       borderRadius: 5,
    //       paddingLeft:10,
    //       paddingRight:10,
    //     },
    //     buttonConfirm: {
    //       backgroundColor: '#4490c7',
    //       borderRadius: 5,
    //       paddingLeft:10,
    //       paddingRight:10,
    //     },
    //     textButtonCancel: {
    //         color: '#fff',
    //         fontWeight: 'bold'
    //     },
    //     textButtonConfirm: {
    //         color: '#fff',
    //         fontWeight: 'bold'
    //     },
    //     title: {
    //       color: '#003d69',
    //       fontSize: 17,
    //       fontWeight: 'bold'
    //     },
    //     message: {
    //       color: '#4f4f4f',
    //       fontSize: 12
    //     }
    //   }
    return (
      <NavigationContainer>
         
        <Stack.Navigator
      initialRouteName={"Preload"}

      >
        <Stack.Screen
     options={{
        headerShown: false
    }}   
     name="Main" component={Main} />
        <Stack.Screen
     options={{
        title: 'Inicio',
        headerShown: false
    }}   
     name="Preload" component={Preload} />
       <Stack.Screen
     options={{
        title: 'Login',
        headerShown: false
    }}   
     name='SignIn' component={SignIn} />

<Stack.Screen
     options={{
        title: 'Interação de Pagamento',
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    name="Camera" component={Camera} />

      </Stack.Navigator>
        {/* <Tab.Navigator>
          <Tab.Screen name="Main" component={Main} />
          <Tab.Screen name="Camera" component={Camera} />
        </Tab.Navigator> */}
      </NavigationContainer>
    );
  }