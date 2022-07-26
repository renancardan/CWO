import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainStack from './src/stacks/MainStack';
import UserContextProvider from './src/contexts/UserContext';
import {decode, encode} from 'base-64';



if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


export default function App() {
  return (
    <UserContextProvider>
   <MainStack />
   </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
