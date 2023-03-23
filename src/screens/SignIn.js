import React, { Component, useEffect, useContext, useState, useRef  } from 'react'
import {Platform, Linking, Modal, Alert, useWindowDimensions, Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import Api from '../Api';
import Telefone from '../components/NumberTel';
import SignInput from '../components/SignInputIni';
import ReCAPTCHA from "react-google-recaptcha";
import {FontAwesome} from "@expo/vector-icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default () => {
  const Tamamnho = useWindowDimensions();
  const captcha = useRef(null)
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
    const [Nome, setNome] = useState("");
    const [Tel, setTel] = useState("");
    const [Te1, setTe1] = useState(false);
    const [TelMsg, setTelMsg] = useState(true)
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState(null);
    const [IrEnt, setIrEnt] = useState(false);
    const [IrCad, setIrCad] = useState(false)
    const [Loading, setLoading] = useState(false);
    const [Carreg, setCarreg] = useState(false)
    const [Btn, setBtn] = useState(false);
    const [ModalLoad, setModalLoad] = useState(false);
    const [ModalText, setModalText] = useState("");
    const [ModalAlert, setModalAlert] = useState(false);
    const [Robo, setRobo] = useState(true);
    const [IdInd2, setIdInd2] = useState("");
    const [VerSite2, setVerSite2] = useState("");
    const [LGeral, setLGeral] = useState(0)
    const [HGeral, setHGeral] = useState(0)
    const [Parte1, setParte1] = useState("")
 
   useEffect(() => {
    
    TamanhoSite()
  
   }, [Tamamnho.width, Tamamnho.height])
 
    useEffect(() => {
      EntrandoLinks()
     }, [Te1])

  useEffect(() => {
      if(IrEnt === true){
          Entrando();
      }
     }, [IrEnt])

     useEffect(() => {
      if(IrCad === true){
          Cadastrado();
      }
     }, [IrCad])

     useEffect(() => {
      if(Tel !== "" && Tel.length === 14 && Robo === false){
    
          TelWhats();
      
      } else {
        if(Robo === true && Tel.length > 3 ){
          setModalAlert(true);
          setModalText("Clique no Não sou Robô!")
        }
      }
      


     }, [Tel, Robo])

     const TamanhoSite = ()=>{
      console.log(Tamamnho.width);
      console.log(Tamamnho.height);
      setLGeral(Tamamnho.width)
      setHGeral(Tamamnho.height)

     }

     const EntrandoLinks = () => {
      const Site = window.location.href;
    const VerSite =  Site.split("/");
   
    if(VerSite[3] === "indicacao"){
    setIdInd2(VerSite[4])
    setVerSite2(VerSite[3])
    }   
     
    }
    const ComprandoCartao = ()=>{
      
      Linking.openURL("https://produto.mercadolivre.com.br/MLB-3259614305-carto-de-visitas-web-cwo-_JM")
    }

    const IrWhats= ()=>{
      
      Linking.openURL("https://wa.me/+5599984136843?text=Ola")
    }

   const handleMessageButtonClick = () => {
   
     if(Robo === false){
      if(TelMsg === true){
        if(Tel !== '' && Nome !== '' ) {
            setLoading(true);
            Api.signIn(Tel, Nome, IdInd2, VerSite2, setIrCad, setIrEnt, setLoading);
             
          
        }  else {
          setModalAlert(true);
          setModalText("Preencha todos os campos!")
      
        }

    } else {
      setModalAlert(true);
      setModalText("Este Telefone Não é um Whatsapp!")
    }

     } else {
      setModalAlert(true);
      setModalText("Clique no Não Sou Robô!")
    }
      
     

    }

  const Cadastrado = ()=> {
      navigation.navigate("AvisoLoc", { 
          Nome:Nome,
          Tel:Tel, 
          Tipo:"Cadastro"
        });
   }

 
   const Entrando = async () => {
      navigation.navigate("SignInCod", { 
          Nome:Nome,
          Tel:Tel, 
          Tipo:"Entrada"
        });
   
      
      }

    const TelWhats = ()=>{
       setLoading(true)
      Api.VerWhats(Tel,   setTe1 , setTelMsg, setNome, setBtn, setLoading)
      Api.AnaliseTel(Tel, setTe1, setNome) 
     
   }

  //  const onMessage = (event)=>{
  //   if (event && event.nativeEvent.data) {
  //     if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
  //       captcha.current.hide();
  //         return;
  //     } else {
  //         console.log('Verified code from Google', event.nativeEvent.data);
  //         setTimeout(() => {
  //           captcha.current.hide();
  //             // do what ever you want here
  //         }, 1500);
  //     }
  // }
  //  }

  const onChange = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }

   
  
    
    return (
      <ImageBackground source={require("../assets/estadio3.jpg")} 
      resizeMode="cover" style={styles.Container}>
       <Modal
                       transparent={true}
                      animationType="slide"
                      visible={ModalAlert}
                      >
                <View style={styles.centeredView4}>
               <View  style={styles.ModVie}>
                <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext}>{ModalText}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>setModalAlert(false)} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
               </View>
       
             </View>
          </Modal>
         
        <ScrollView  >
           {/* Sessão 1  ---  Imagens */}
        <View 
          style={styles.imageBack} >

          <Image source={require('../assets/topoapp.png')}  style={styles.TopoApp } resizeMode="cover" />

             </View> 


              {/* Sessão 2  ---  Entrando  */}
             <View style={{backgroundColor:"#000",  width:wp("100%"), display:"flex", justifyContent:"center", alignItems:"center"}}>

              <View style={{backgroundColor:"#000", width:wp("90%"),  display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap"}}>

              <View style={{backgroundColor:"#000", width:300, margin:20,  display:"flex", justifyContent:"center", alignItems:"center",}}>
              <Image source={require('../assets/logomarca.png')}  style={styles.ImageVer2 } />
              </View>

              <View style={{backgroundColor:"#000", width:300,  margin:20, display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Text style={styles.TexTitu} >ENTRAR NA AGENDA CWO</Text>
                                       <ReCAPTCHA
                                    ref={captcha}
                                        sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                                        size="normal"
                                        hl="pt"
                                        theme="dark"
                                        onChange={onChange}
                                      />
             <View  style = {styles.InputAra}>
             <FontAwesome name="phone-square" size={40} color="black" />
             <Telefone
                       
                       placeholder="Digite seu Whatsapp" 
                       value={Tel}
                       onChangeText={t=>setTel(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
                      TelWhats={TelWhats}
                   /> 
                  
                
                       </View>
                       {Loading === false ?   
            <>      
            {Btn === true ?
            <>
              <View  style = {styles.InputAra}>
              <FontAwesome name="user" size={40} color="black" />
             <SignInput
                        placeholder="Digite Nome Completo" 
                        value={Nome}
                        onChangeText={t=>setNome(t)}
                        autoCapitalize="none"
                        keyboardType={"default"}
                        posi={1000}
                    /> 
                
                       </View>
           
             <TouchableHighlight  style={styles.Btn} onPress={handleMessageButtonClick} >
                            <Text style={styles.BtnText}>Criar Código</Text>
                 </TouchableHighlight>
                        
            </>
            :
            <>
            {TelMsg=== false &&
                <Text style={styles.TexMsg} >Este Telefone Não é um Whatsapp!</Text>
                }
            </>
            }

            </>  
                :
               <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
  
               </>
                        }
                         <Text style={styles.TexTitu2} >TRANSFORME EM APLICATIVO </Text>
                         <View style={{backgroundColor:"#000", width:wp("100%"), display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap"}}>
          <TouchableHighlight style={{width:126, marginTop:10, marginRight:20}}>
        <Image source={require('../assets/android.svg')}  style={styles.ImageVer63 } />
        </TouchableHighlight>
        <TouchableHighlight style={{width:126, marginTop:10, marginRight:20}}>
        <Image source={require('../assets/ios.svg')}  style={styles.ImageVer63 } />
        </TouchableHighlight>
                </View>
              </View>

              </View>
              </View>


          
           {/* Sessão 3  ---   */}
             <View style={{backgroundColor:"#FEFEFE", width:wp("100%"), display:"flex", justifyContent:"center", alignItems:"center"}}>

             <View style={{backgroundColor:"#FEFEFE", width:wp("90%"), paddingTop:40, paddingBottom:40,  display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap-reverse"}}>
            
           

              <View style={{backgroundColor:"#FEFEFE", width:300, height:300, margin:20, display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Text style={{marginLeft:20, marginBottom:10, color:"#706C6F", fontSize:25, fontWeight:"bold" }} >Como Funciona a Tecnológia CWO</Text>
               <Text style={{marginLeft:20, marginBottom:10, color:"#000", fontSize:20, fontWeight:""  }} >O CWO é um cartão de visitas tecnológico e digital, perfeito para pessoas e empresas. Basta aproximar seu cartão CWO de um Smartphone, para compartilhar suas informações rapidamente. </Text>
               <TouchableHighlight  style={styles.BtnCompre} onPress={ComprandoCartao} >
                            <Text style={styles.BtnText}>COMPRE AGORA</Text>
                 </TouchableHighlight>
              </View>
              <View style={{backgroundColor:"#FEFEFE", width:300, margin:20, marginLeft:50, height:300, display:"flex", justifyContent:"center", alignItems:"center",}}>
             <Image source={require('../assets/VideoApre.gif')}  style={styles.ImageVerGif } />
              </View>

              </View>
              </View>

            {/* Sessão 4  ---   */}
              <View style={{ width:wp("100%"),  display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Text style={{margin:30, color:"#FFF", fontSize:27, fontWeight:"bold", textAlign:"center", }} >CONFIGURANDO</Text>
              <View style={{ width:wp("90%"), display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap", paddingTop:20}}>

              <View style={{backgroundColor:"#E8E9E8", padding:10, margin:10, marginBottom:20, width:250, height:400, display:"flex",  alignItems:"center", marginTop:10, borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              <View  style={{width:50, height:50, shadowColor:"#171717", shadowOffset:{width:5, height:5}, shadowOpacity:0.2, shadowRadius:5,  borderRadius:25, marginTop:10, backgroundColor:"#00A859", display:"flex", justifyContent:"center", alignItems:"center", }}>
                <Text style={{fontSize:25, fontWeight:"bold"}}>1</Text>
              </View>
              <Text style={{fontSize:20,  marginTop:10, textAlign:"center", fontFamily:"Impact, fantasy"}}>Compre Seu Cartão</Text>
              <Image source={require('../assets/carttoes.png')}  style={{width:180, height:100, marginTop:20, borderRadius:10, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5, }} />
              <Text style={{fontSize:16,  textAlign:"center",  marginTop:10  }}>Adquira seu cartão no Mercado Livre.</Text>
              <TouchableHighlight  style={styles.BtnCompre2} onPress={ComprandoCartao} >
                            <Text style={styles.BtnText}>COMPRE AGORA</Text>
                 </TouchableHighlight>
              </View>

              <View style={{backgroundColor:"#E8E9E8", padding:10, margin:10, marginBottom:20, width:250, height:400, display:"flex",  alignItems:"center", marginTop:10, borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              <View  style={{width:50, height:50, shadowColor:"#171717", shadowOffset:{width:5, height:5}, shadowOpacity:0.2, shadowRadius:5,  borderRadius:25, marginTop:10, backgroundColor:"#00A859", display:"flex", justifyContent:"center", alignItems:"center", }}>
                <Text style={{fontSize:25, fontWeight:"bold"}}>2</Text>
              </View>
              <Text style={{fontSize:20,  marginTop:10, textAlign:"center", fontFamily:"Impact, fantasy"}}>Escanear ou Aproximar</Text>
              <Image source={require('../assets/aproxime.png')}  style={{width:180, height:100, marginTop:20, borderRadius:10, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5, }} />
              <Text style={{fontSize:16,  textAlign:"center", marginTop:10 }}>Caso seu celular tenha a tecnologia NFC, aproxime o cartão do seu celular para começar a configurar. Caso não tenha a tecnologia NFC, escanei o Qr code com a câmera do seu celular.</Text>
      
              </View>
              <View style={{backgroundColor:"#E8E9E8", padding:10, margin:10, marginBottom:20, width:250, height:400, display:"flex",  alignItems:"center", marginTop:10, borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              <View  style={{width:50, height:50, shadowColor:"#171717", shadowOffset:{width:5, height:5}, shadowOpacity:0.2, shadowRadius:5,  borderRadius:25, marginTop:10, backgroundColor:"#00A859", display:"flex", justifyContent:"center", alignItems:"center", }}>
                <Text style={{fontSize:25, fontWeight:"bold"}}>3</Text>
              </View>
              <Text style={{fontSize:20, marginTop:10, textAlign:"center", fontFamily:"Impact, fantasy"}}>Edite Seu Perfil</Text>
              <Image source={require('../assets/edite2.png')}  style={{width:180, height:100, marginTop:20, borderRadius:10, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5, }} />
              <Text style={{fontSize:16,  textAlign:"center",  marginTop:10 }}>Edite colocando sua foto, e os redirecionamentos que deseja para suas redes sociais, também estilize colocando um fundo caracterizado.</Text>
      
              </View>

              </View>
              </View>

              {/* Sessão 5  ---   */}
              <View style={{backgroundColor:"#fff", marginBottom:0, width:wp("100%"),  display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Text style={{margin:30, color:"#706C6F", fontSize:27, fontWeight:"bold" }} >COMPARTILHAMENTO</Text>
              <ImageBackground source={require("../assets/estadio3.jpeg")} 
       imageStyle={{ borderRadius: 20}} style={{backgroundColor:"#ccc", marginBottom:30, borderRadius:20, width:wp("70%"), display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap", paddingTop:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>

            <View style={{backgroundColor:"#fff", padding:5, margin:10, marginBottom:20, width:200, height:300, display:"flex",  alignItems:"center", marginTop:10, borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              
              <Text style={{fontSize:20,  marginTop:10, textAlign:"center",  fontFamily:"Impact, fantasy"}}>Aproximação</Text>
              <Image source={require('../assets/aproximacao.png')}  style={{width:180, height:100, marginTop:20, borderRadius:10, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5, }} />
              <Text style={{fontSize:16,  textAlign:"center",  marginTop:10  }}>Aproxime seu cartão nos celulares com tecnologia NFC, para compatilhar suas informações.</Text>
             
              </View>

              <View style={{backgroundColor:"#fff", padding:5, margin:10, marginBottom:20, width:200, height:300, display:"flex",  alignItems:"center", marginTop:10, borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
             
              <Text style={{fontSize:20,  marginTop:10, textAlign:"center",  fontFamily:"Impact, fantasy"}}>Escaneamento</Text>
              <Image source={require('../assets/escaneamento.png')}  style={{width:180, height:100, marginTop:20, borderRadius:10, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5, }} />
              <Text style={{fontSize:16,  textAlign:"center",  marginTop:10 }}> Caso o celular não tenha tecnologia NFC, escanei o QR code do cartão, para poder compartilhar suas informações.</Text>
      
              </View>
              <View style={{backgroundColor:"#fff", padding:5, margin:10, marginBottom:20, width:200, height:300, display:"flex",  alignItems:"center", marginTop:10, borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              
              <Text style={{fontSize:20,  marginTop:10, textAlign:"center", fontFamily:"Impact, fantasy"}}>Link</Text>
              <Image source={require('../assets/compartilhe.png')}  style={{width:180, height:100, marginTop:20, borderRadius:10, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5, }} />
              <Text style={{fontSize:16,  textAlign:"center",  marginTop:10 }}>Compartilhe o link do seu cartão nas redes sociais. Para que as pessoas possa ter mais informações suas.</Text>
      
              </View>
              <View style={{backgroundColor:"#fff", padding:5, margin:10, marginBottom:20, width:200, height:300, display:"flex",  alignItems:"center", marginTop:10, borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              
              <Text style={{fontSize:20,  marginTop:10, textAlign:"center", fontFamily:"Impact, fantasy"}}>Cartão Web</Text>
              <Image source={require('../assets/compartilhar1.png')}  style={{width:180, height:100, marginTop:20, borderRadius:10, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5, }} />
              <Text style={{fontSize:16,  textAlign:"center",  marginTop:10 }}>Caso não esteja com o  cartão físico, abra o QR code do seu cartão web para poder compartilhar suas informações.</Text>
      
              </View>

              </ImageBackground>
              </View>

              {/* Sessão 6  ---   */}
              {/* <View style={{backgroundColor:"#ccc", width:wp("100%"),  display:"flex", justifyContent:"center", alignItems:"center"}}>
              
              <ImageBackground source={require("../assets/Vantagens.jpg")} 
       imageStyle={{ borderRadius: 20}} style={{backgroundColor:"#ccc", marginTop:30, marginBottom:30, borderRadius:20, width:wp("60%"), display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap", paddingTop:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>

              <View style={{backgroundColor: 'rgba(0,0,0,0.7)', margin:10, marginBottom:20,  width:wp("40%"), height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>
              <Text style={{margin:30, color:"#fff", fontSize:27, fontWeight:"bold" }} >VANTAGENS</Text>
              </View>

            

              </ImageBackground>
              </View> */}

             {/* Sessão 7  ---   */}
              {/* <View style={{ width:wp("100%"),  display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Text style={{margin:30, color:"#FFF", fontSize:27, fontWeight:"bold", textAlign:"center", }} >TRANSFORME EM UM APP</Text>
              <View style={{ width:wp("90%"), display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap", paddingTop:20}}>

              <View style={{backgroundColor:"#fff", margin:10, marginBottom:20, width:200, height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              
              </View>

              <View style={{backgroundColor:"#fff", margin:10, marginBottom:20, width:200, height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              
              </View>
              

              </View>
              </View> */}

              {/* Sessão 8  ---   */}
              {/* <View style={{backgroundColor:"#fff", width:wp("100%"), marginBottom:0,  display:"flex", justifyContent:"center", alignItems:"center"}}>
              
              <ImageBackground source={require("../assets/agendacwo.jpg")} 
              imageStyle={{ borderRadius: 20}} style={{backgroundColor:"#ccc", marginTop:30, marginBottom:30, borderRadius:20, width:wp("60%"), display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap", paddingTop:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>

              <View style={{backgroundColor: 'rgba(0,0,0,0.7)', margin:10, marginBottom:20,  width:wp("40%"), height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>
              <Text style={{margin:30, color:"#fff", fontSize:27, textAlign:"center", fontWeight:"bold" }} >AGENDA CWO</Text>
              </View>

            

              </ImageBackground>
              </View> */}
               {/* Sessão 9  ---   */}
               {/* <View style={{backgroundColor:"#fff", marginBottom:0, width:wp("100%"),  display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Text style={{margin:30, color:"#706C6F", fontSize:27, textAlign:"center", fontWeight:"bold" }} >FUNCIONALIDADES DA AGENDA</Text>
              <View  style={{backgroundColor:"#ccc", marginBottom:30, borderRadius:20, width:wp("70%"), display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap", paddingTop:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>

              <View style={{backgroundColor:"#fff", margin:10, marginBottom:20, width:200, height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>
              
              </View>

              <View style={{backgroundColor:"#fff", margin:10, marginBottom:20, width:200, height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              
              </View>
              <View style={{backgroundColor:"#fff", margin:10, marginBottom:20, width:200, height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              
              </View>
              <View style={{backgroundColor:"#fff", margin:10, marginBottom:20, width:200, height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5}}>
              
              </View>

              </View>
              </View> */}
           {/* Sessão 10  ---   */}
           {/* <View style={{backgroundColor:"#fff", width:wp("100%"),  display:"flex", justifyContent:"center", alignItems:"center"}}>
              
              <ImageBackground source={require("../assets/distribuidor.jpg")} 
              imageStyle={{ borderRadius: 20}} style={{backgroundColor:"#ccc", marginTop:30, marginBottom:30, borderRadius:20, width:wp("60%"), display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", flexWrap:"wrap", paddingTop:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>

              <View style={{backgroundColor: 'rgba(0,0,0,0.7)', margin:10, marginBottom:20,  width:wp("40%"), height:300, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20, shadowColor:"#171717", shadowOffset:{width:10, height:10}, shadowOpacity:0.2, shadowRadius:5 }}>
              <Text style={{margin:30, color:"#fff", fontSize:27, fontWeight:"bold" }} >SEJA UM REVENDEDOR</Text>
              </View>

            

              </ImageBackground>
              </View> */}



             </ScrollView>
            
             <TouchableHighlight style={styles.VerBole}  onPress={IrWhats}>
         <>
        
        
         <Image source={require('../assets/WhatCar.png')}  style={{width:50, height:50}} />
         
        
         </>
          </TouchableHighlight>  
    
      </ImageBackground>
    )
  }


const styles = StyleSheet.create({
  VerBole:{
    width:50,
    height:50,
    flex: 1,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
    marginTop:10,
    textAlign:"center",
    position:"absolute",
    bottom:50,
    right:10,
    borderRadius:5,
    fontWeight:"bold",
    paddingTop:10,
    color:"#fff",
 
   },
  TexTitu2: {
    fontSize: 20,
    color: "#00B30D",
    fontWeight:"bold",
    marginTop:5,
    marginBottom:5,
  },

  contentContainer: {
   
   
  },
  imageBack: {
    width:  wp("100%"),
    height: hp("100%"),
      flex: 1 ,
      alignItems:"center",
      justifyContent: "center",
    
  },
  centeredView4: {
    backgroundColor:'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  BtnText: {
    fontSize: 18,
    color: "#FFF212",
    fontWeight: "bold",
  },
  Avitext: {
    fontSize: 15,
    color: "#000",
  },
  ModVie: {
    backgroundColor: "#FFF",
    width:200,
    height:100,
    borderRadius:20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column"
  },
  ModVieTex: {
    width:180,
    height:70,
    justifyContent: "center",
    alignItems: "center",
  },
  ModVieBtn: {
    width:180,
    height:30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row"
  },
  ModVieBtnBtn: {
    width:90,
    height:30,
    justifyContent: "center",
    alignItems: "center",
    outlineStyle: 'none'
  },
  ModVieTexSim: {
    fontSize: 18,
    color: "#00C9FB",
    fontWeight: "bold",
  },
  ModVieTexNao: {
    fontSize: 18,
    color: "#EB7560",
    fontWeight: "bold",
  },
InputAra :{
   width:"90%",
   height:60,
   backgroundColor: "#fff",
   flexDirection:"row",
   borderRadius:20,
   alignItems: "center",
   marginBottom:15,
   paddingLeft:5,
   marginTop:15,
},

AreaLogin :{

  width:300,
  flexDirection:"column",
  alignItems: "center",
  justifyContent:"center",
  marginBottom:15,
  paddingLeft:5,
},

Btn: {
  width:"90%",
  marginTop:10,
 height:60,
 backgroundColor: "#00A859",
 borderRadius:20,
 justifyContent:"center",
 alignItems: "center",
borderColor:"#FFF212",
borderWidth:2,
marginBottom:10
 
},
ImageVer63:{
  width:126,
  height:35,
  marginTop: 10,
 
  
},

BtnCompre: {
  width:200,
  marginTop:10,
  marginBottom:10,
paddingTop:10,
paddingBottom:10,
 backgroundColor: "#00A859",
 borderRadius:20,
 justifyContent:"center",
 alignItems: "center",
borderColor:"#FFF212",
borderWidth:2,
marginLeft:10,
 
},

BtnCompre2: {
  width:170,
  marginTop:10,
  marginBottom:10,
paddingTop:10,
paddingBottom:10,
 backgroundColor: "#00A859",
 borderRadius:20,
 justifyContent:"center",
 alignItems: "center",
borderColor:"#FFF212",
borderWidth:2,
marginLeft:10,
 
},


TexMsg: {
  fontSize: 16,
  color: "red",
  marginBottom: 15,
  marginTop: -10,
},

TexTitu: {
  fontSize: 20,
  color: "#FFF",
  fontWeight:"bold",
  marginTop:5,
  marginBottom:5,
},

image: {
  width:  30,
  height: 30,
    flex: 1 ,
    alignItems:"center",
    justifyContent: "center",
    
},

imageLoad: {
  width:  100,
  height: 100,
    flex: 1 ,
    alignItems:"center",
    justifyContent: "center",
    
},



  Scrow: {
   
      flex: 1 ,
      alignItems:"center",
      justifyContent: "center",
    
  },
ImageVer2:{
    width:250,
    height:200,
    marginTop: 10,
   
    
},

TopoApp:{
  width:wp('100%'),
  height:hp("70%"),

 
  
},
    
  InputArea:{
    width: "100%",
    padding: 40,
    
    },  
  Container:{
    // backgroundColor: "#000",
    // flex:1,
    // alignItems:"center",
    width:  "100%",
    height: "100%",
      flex: 1 ,
      alignItems:"center",
      justifyContent: "center",

    
  },  
  ContainerImg:{
    width:200,
    height:200,
    backgroundColor: "#000",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
    
    },
    ImageVer5:{
      width:50,
      height:100,
      marginTop: 10,
   
     
    },  
    ImageVer3:{
      width:200,
      height:200,
      marginTop: 40,
  
     
    },  
    ImageVerGif:{
      width:420,
      height:260,
      marginTop: 10,
  
     
    }    
});