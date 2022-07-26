import React, { Component, useEffect, useContext, useState  } from 'react'
import { Text, View, StyleSheet, ImageBackground, Image, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import Api from '../Api';
//import TelIcon from '../assets/telefone.svg';
import Telefone from '../components/NumberTel';

export default () => {
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
    const [Tel, setTel] = useState("");
 

   
  
    
    return (
      <View style={styles.Container}>
        
        
           <ImageBackground source={require("../assets/fundo.png")} 
          resizeMode="cover" 
          style={styles.imageBack} >
            <Image source={require('../assets/logomarca.svg')}  style={styles.ImageVer2 } />
             <View  style={styles.InputArea}>
             <View  style = {styles.InputAra}>
             <Image source={require('../assets/telefone.svg')}  style={styles.image } resizeMode="center" />
             <Telefone
                       
                       placeholder="Digite seu Whatsapp" 
                       value={Tel}
                       onChangeText={t=>setTel(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
                    
                       // TelWhats={TelWhats}
                   /> 
                       </View>

             </View>
       
            
            </ImageBackground> 
      </View>
    )
  }


const styles = StyleSheet.create({
  InputAra :{
   width:"90%",
   height:60,
   backgroundColor: "#fff",
   flexDirection:"row",
   borderRadius:20,
   paddingLeft:50,
   alignItems: "center",
   marginBottom:15,
},

    image: {
      width:  30,
      height: 30,
       flex: 1 ,
       alignItems:"center",
       justifyContent: "center",
       
    },

    imageBack: {
        width:  "100%",
        height: "120%",
         flex: 1 ,
         alignItems:"center",
         justifyContent: "center",
      },
    ImageVer2:{
        width:200,
        height:200,
        marginTop: 300,
    },
       
      InputArea:{
       width: "100%",
       padding: 40,
        
       },  
      Container:{
       backgroundColor: "#FFE767",
       flex:1,
       justifyContent:"center",
       alignItems:"center",
       paddingBottom: 100,
       
      },  
      ContainerImg:{
        width:200,
        height:200,
        backgroundColor: "#000",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
        
       },  
});