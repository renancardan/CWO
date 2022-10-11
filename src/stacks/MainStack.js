import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Camera from '../screens/camera';
import Preload from '../screens/preload';
import SignIn from '../screens/SignIn';
import AvisoLoc from '../screens/AvisoLoc';
import SignInCod from '../screens/SignInCod';
import MainTab from '../stacks/MainTab';
import main from '../screens/main';
import Pagar from '../screens/Pagar';
import Config from '../screens/Config';
import Notific from '../screens/Notific';
 //import cadastroSim from '../screens/cadastroSim';

const Stack = createNativeStackNavigator();
export default function Ret() {

    
    return (
      <NavigationContainer  >
         
        <Stack.Navigator
      initialRouteName={"Preload"}

      >
         <Stack.Screen

        options={{
          headerShown: false
        }}   
        name="Pagar" component={Pagar} />

       <Stack.Screen
     options={{
        title: 'Configuração',
        headerShown: false
    }}   
     name="Config" component={Config} />

<Stack.Screen
     options={{
        title: 'Notificação',
        headerShown: false
    }}   
     name="Notific" component={Notific} />
        
          <Stack.Screen
     options={{
        title: 'Aviso',
        headerShown: false
    }}   
     name="AvisoLoc" component={AvisoLoc} />
     
        <Stack.Screen
     options={{
        title: 'PixBetCash',
        headerShown: false
    }}   
     name="Preload" component={Preload} />
       <Stack.Screen
     options={{
      title: 'Codigo',
        headerShown: false
    }}   
    name="SignInCod" component={SignInCod} />
      {/* <Stack.Screen
     options={{
      title: 'Cadastro',
        headerShown: false
    }}   
    name="CadastroSim" component={cadastroSim} /> */}
       <Stack.Screen
     options={{
        title: 'Login',
        headerShown: false
    }}   
     name='SignIn' component={SignIn} />
     
      <Stack.Screen 
     options={{
        title: '',
        headerTransparent:true,
        headerShown: false,
    }}   
    name="MainTab" component={MainTab} />

<Stack.Screen 
     options={{
        headerShown: false
    }}   
    name="Main" component={main} />

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