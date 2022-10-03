import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar';
import Main from '../screens/main';
import Camera from '../screens/camera';
import Aposta from '../screens/Apostas';
import Cambista from '../screens/Cambista';
import Jogo from '../screens/Jogos';
import Rede from '../screens/Rede';
import Financeiro from '../screens/Financeiro';
import {FontAwesome} from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
      

        <Tab.Navigator 
        tabBarOptions={{
          style:{
            backgroundColor:"#000",
            borderTopColor: "transparent",
          },
          activeTintColor:"#FFF",
          tabStyle:{
            paddingBottom:5,
            paddingTop:5,
          }
        }}
        >
            <Tab.Screen name="Aposta" component={Aposta} 
             options={{
              tabBarIcon: ({size, color}) => (
                <FontAwesome name="futbol-o" size={size} color={color}/>
  
              )
            }}
          />
          <Tab.Screen name="Jogos" component={Jogo} 
          options={{
            tabBarIcon: ({size, color}) => (
              <FontAwesome name="flag-checkered" size={size} color={color}/>

            )
          }}
          />
        
          <Tab.Screen name="Financeiro" component={Financeiro} 
             options={{
              tabBarIcon: ({size, color}) => (
                <FontAwesome name="dollar" size={size} color={color}/>
  
              )
            }}
          />
          <Tab.Screen name="Rede" component={Rede}
          options={{
            tabBarIcon: ({size, color}) => (
              <FontAwesome name="sitemap" size={size} color={color} />
            )
          }}
          />
          <Tab.Screen name="Cambista" component={Cambista} 
             options={{
              tabBarIcon: ({size, color}) => (
                <FontAwesome name="calculator"  size={size} color={color}/>
  
              )
            }}
          />

        </Tab.Navigator>
      
    );
  }