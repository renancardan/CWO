import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/UserContext';
import {Modal, Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import SignInput from '../components/SignInput';

import Api from '../Api';



export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);

    const navigation = useNavigation(); 
    const [Nome, setNome] = useState("");
    const [Tel, setTel] = useState("");
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState(null);
    const [Irpre, setIrpre] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Pos, setPos] = useState(0);
    const [Whats, setWhats] = useState(0);
    const [Tele, setTele] = useState(0);
    const [Inicio, setInicio] = useState("0")

    useEffect( ()=>{                     
        PreencherTel()                       
      }, []);

    useEffect(() => {
        if(Irpre === true){
            confirmCode();
        }
       }, [Irpre])


       const CirandoWhats = ()=>{
        Api.CriandoW(Inicio, setPos, setWhats, setTele)
     }


    const handleMessageButtonClick = () => { 

        if( code != null ) {
        setLoading(true);
        Api.signIn3(Tel, code, setIrpre, setLoading);
         
      
    }  else {
        alert("Preencha Código!");
    }

    }

    const PreencherTel = async ()=>{    
        var tel = await AsyncStorage.getItem('Tel');
        setTel(tel);
       }
      

    const confirmCode= ()=> {
        navigation.reset({
           routes:[{name:'Preload'}]
       });
     }

     const IrcadasSim= ()=> {
        navigation.reset({
           routes:[{name:'CadastroSim'}]
       });
     }
    return (
        <KeyboardAvoidingView style={styles.Container}>
            <ImageBackground source={require("../assets/fundo.png")} 
          resizeMode='cover' 
          style={styles.image} >
            <Image source={require('../assets/logomarca.svg')}  style={styles.ImageVer2 } />
      
           {Loading === false ? 
         
         <View  style={styles.InputArea}>

                   <Text style={styles.TituText}>Quantidade: {Pos}</Text>
                   <Text style={styles.TituText}>Whats:{Whats}</Text>
                   <Text style={styles.TituText}>Tel:{Tele}</Text>
                   <View  style = {styles.InputAra}>
                   <Image source={require('../assets/codigo.svg')}  style={styles.imageIcon } resizeMode="center" />
            <SignInput
                    
                        placeholder="Digite o Código" 
                        value={Inicio}
                        onChangeText={t=>setInicio(t)}
                        autoCapitalize="none"
                        keyboardType={"numeric"}
                    />
                    </View>
                    <TouchableHighlight  style={styles.Btn} onPress={CirandoWhats()} >
                            <Text style={styles.BtnText}>Criar</Text>
                 </TouchableHighlight>
                {/* <CustomButton1 onPress={IrcadasSim} >
                        <CustomButtonText1> Cadastro Simples CLIQUE AQUI!</CustomButtonText1>
                </CustomButton1> */}
    
            </View>
            :
            <Image source={require('../assets/loading-87.gif')}  style={styles.imageLoad } resizeMode="center" />
                }

      
        </ImageBackground> 
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    imageLoad: {
        width:  100,
        height: 100,
          flex: 1 ,
          alignItems:"center",
          justifyContent: "center",
          
      },
    BtnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
      },
      Btn: {
        width:"90%",
        marginTop:10,
       height:60,
       backgroundColor: "#000",
       borderRadius:20,
       justifyContent:"center",
       alignItems: "center",
       
      },
    image: {
      width: '100%',
      height: '100%',
       flex: 1 ,
       alignItems:"center",
       justifyContent: "center",
    },
    imageIcon: {
        width:  30,
        height: 30,
          flex: 1 ,
          alignItems:"center",
          justifyContent: "center",
          
      },
    ImageVer2:{
        width:200,
        height:200,
        marginTop: 100,
    },
    TituText:{
        fontSize: 15,
        color: "#fff",
        marginBottom: 30,
    },
    InputAra :{
        width:"90%",
        height:60,
        backgroundColor: "#fff",
        flexDirection:"row",
        borderRadius:20,
        alignItems: "center",
        marginBottom:15,
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
        
});