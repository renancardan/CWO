import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './pages/main';
import Camera from './pages/camera';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function Routes() {
    return (
      <NavigationContainer>

        <Tab.Navigator>
          <Tab.Screen name="Main" component={Main} />
          <Tab.Screen name="Camera" component={Camera} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }