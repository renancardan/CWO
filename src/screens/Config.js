
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome} from "@expo/vector-icons";
import SignInput from '../components/SignInputIni';
import SignInputCod from '../components/SignInput';
import Telefone from '../components/NumberTel';
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from '../contexts/UserContext';
import moment from 'moment';
import Api from '../Api';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);

  const captcha = useRef(null)
  const [ModalVer, setModalVer] = useState(false);
  const [P1, setP1] = useState(false);
  const [P2, setP2] = useState(false);
  const [P3, setP3] = useState(false);
  const [P4, setP4] = useState(false);
  const [P5, setP5] = useState(false);
  const [LinkEnv, setLinkEnv] = useState("nulo");
  const [Nome, setNome] = useState(userState.nomeCompleto);
  const [Tel, setTel] = useState(userState.telefone);
  const [Robo, setRobo] = useState(true);
  const [Tentativa, setTentativa] = useState(0);
  const [CodLast, setCodLast] = useState(0);
  const [CodG, setCodG] = useState(false);
  const [Senha, setSenha] = useState("");
  const [Alert, setAlert] = useState("");
  const [AlertTipo, setAlertTipo] = useState(null);
  const [Carre, setCarre] = useState(false);
   console.log(userState.nomeCompleto)
   const Saindo = async()=>{
    await AsyncStorage.setItem('Tel', "");
    await AsyncStorage.setItem('@entrada', "");
    navigation.reset({
      routes:[{name:"Preload"}]
  });
   }

   const Voltar = ()=>{
    navigation.goBack();
  }

   const AbrirModalP1 = ()=>{
    setModalVer(true)
    setP1(false)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    
   }

   const onChangeRec = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }

  const GerarCod =  async ()=> {
          
    if(Robo === false){
      
      setCarre(true)
      Api.GeradorDeCod(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend);
    } else {
      setModalVer(true);
      setAlert("Por Favor Clique em NÃO SOU ROBÔ!");
      setAlertTipo("danger")
    }
   
      
   
     
    }

   const AbrirModalP2 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    
   }

   const AbrirModalP3 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(false)
    setP4(false)
    setP5(false)
    
   }

   const AbrirModalP4 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(false)
    setP5(false)
    
   }

   const AbrirModalP5 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(false)
    
   }

   const AbrirModalP6 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(true)
    
   }



   const FecharModal = ()=>{
    setModalVer(false)
    setP1(false)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    setAlert("")
    setAlertTipo(null)
   }
    return (
      <View style={styles.Container}>
         <Modal
            transparent={true}
            animationType="slide"
            visible={ModalVer}
            >
          <View style={styles.viewCalend}>
          {Carre === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
                      
                      
                      </>

                      :
                      <>
          
              {Alert !== "" ?
              <>
               <View  style={styles.ModVie}>
              {AlertTipo === "danger" ?
              <>
               <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext2}>{Alert}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>FecharModal()} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
              
              </>

              :
              <>

              <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext}>{Alert}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>FecharModal()} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
              
              </>

              }
              </View>
              </>

              :
              <>
              <View style={styles.QuadNota} >
            <ScrollView>
               {P1 === false ?
              <>
          <View  style={styles.CaixadeapostaTitulo}  >         
          <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Regras PixBetCash</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
          </View>
          <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Sumário das Regras:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>1° - Como Apostar</Text>
              
              </>
              :
              <>
              {P2 === false ?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Tutoriais PixBetCash</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              </>
              :
              <>
              {P3 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Trocar Nome</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <View  style = {styles.InputAra}>
                            <FontAwesome name="user" size={24} color="black" />
                             <SignInput
                                placeholder="Nome do Cliente" 
                                value={Nome}
                                onChangeText={t=>setNome(t)}
                                autoCapitalize="none"
                                keyboardType={"default"}
                                posi={1000}
                            /> 
                            </View>
              </>
              :
              <>
              {P4 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Trocar Whatsapp</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <View  style = {styles.InputAra}>
                           <FontAwesome name="phone-square" size={24} color="black" />
                            <Telefone                      
                                placeholder="Whatsapp do Cliente" 
                                value={Tel}
                                onChangeText={t=>setTel(t)}
                                autoCapitalize="none"
                                keyboardType={"phone-pad"}
                            
                            /> 
                            </View>
              </>
              :
              <>
              {P5 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>APP PARA ANDROID</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              </>
              :
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>APP PARA IPHONE</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              </>
              }
              </>
              }
              </>
              }
               
              </>
              }
        
              
              </>
              }
           </ScrollView>
            </View> 
              
              </>

              }
              </>

              }
             



           
            
          </View>

            </Modal>
          <ImageBackground source={require("../assets/estadio3.jpg")} 
          resizeMode='cover' 
          style={styles.imageBack} >
                <View style={styles.CaixaTitulo} >
              <TouchableHighlight  onPress={()=>Voltar()} style={styles.CaixaDados}>
                <>
              <FontAwesome name="arrow-circle-left" size={30} color="#fff" />
            
              </>
              </TouchableHighlight>
            
              <Image source={require('../assets/logomarca.svg')}  style={styles.ImageVer2 } />

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
             Configuração
             </Text>
              </TouchableHighlight>
             
            </View >
            <View  style={styles.AreaBtnCima}>
              
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#DDBE0D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP1()}>
                    <>
                    <FontAwesome name="book"  size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Regras</Text>
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>PixBetCash</Text>
                      </> 
                 </TouchableHighlight>
                 <TouchableHighlight style={{width:70, height:100, backgroundColor:"#009DFF", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP2()}>
                     <>
                     <FontAwesome name="youtube-square" size={40} color="#FFF" />
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Tutoriais</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>PixBetCash</Text>
                      </>
                 </TouchableHighlight>
              </View>
              <View  style={styles.AreaBtnCima}>
              
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#30B72D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP3()}>
                    <>
                    <FontAwesome name="user" size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Trocar</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Nome</Text>
                      </> 
                 </TouchableHighlight>
                 <TouchableHighlight style={{width:70, height:100, backgroundColor:"#840D8D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP4()}>
                     <>
                     <FontAwesome name="phone-square" size={40} color="#FFF" />
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Trocar</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Whatsapp</Text>
                      </>
                 </TouchableHighlight>
              </View>
              <View  style={styles.AreaBtnCima}>
              
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#E19807", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP5()}>
                    <>
                    <FontAwesome name="android" size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>APP PARA</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>ANDROID</Text>
                      </> 
                 </TouchableHighlight>
                 <TouchableHighlight style={{width:70, height:100, backgroundColor:"#86E107", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP6()}>
                     <>
                     <FontAwesome name="apple" size={40} color="#FFF" />
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>APP PARA</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>IPHONE</Text>
                      </>
                 </TouchableHighlight>
              </View>
              <View  style={styles.AreaBtnCima}>
              
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#F96868", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Saindo()}>
                    <>
                    <FontAwesome name="power-off" size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sair Do</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sistema</Text>
                      </> 
                 </TouchableHighlight>
                
              </View>
        {/* <TouchableHighlight style={{width:150, height:50, backgroundColor:"#F96868", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Saindo()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sair da Conta</Text>
                          </TouchableHighlight> */}
        </ImageBackground>
      </View>
    )
  
}

const styles = StyleSheet.create({
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
  Avitext2: {
    fontSize: 15,
    color: "red",
    margin:10
  },
  ModVie: {
    backgroundColor: "#FFF",
    width:200,
    height:200,
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
    width:100,
    height:40,
    backgroundColor: "#fff",
    flexDirection:"row",
    borderRadius:20,
    alignItems: "center",
    marginBottom:15,
    paddingLeft:5,
    marginTop:15,
 },

 AraCli:{
  width:200,
  height:40,
  backgroundColor: "#fff",
  flexDirection:"row",
  borderRadius:20,
  alignItems: "center",
  marginBottom:15,
  paddingLeft:5,
  marginTop:15,
},

  Valopre:{
    marginLeft: 10,
    marginBottom: 10,
    width: 250,
    paddingBottom: 10,
    borderColor:"#000",
    borderWidth:1,

  },

  Titupre:{
  width: 248,
  height: 30,
  backgroundColor: "#ccc",
  },

  AvisoJgo:{
   backgroundColor:"red",
   width:20,
   height:20,
   borderRadius:10,
   marginLeft:-30,
   marginTop:-25,
  },

  TexNota1:{
  color:"#fff",
  fontSize:15,
  },

  VerBole:{
   width:50,
   height:50,
   flex: 1,
   flexDirection:"column",
   alignItems:"center",
   justifyContent:"center",
   backgroundColor:"#000",
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

  Caixadeaposta:{
    marginBottom:5,
    width:300,
    height:500,
    flex:1,
    padding:10,
    justifyContent:"center",
    backgroundColor:"#28a745"  
    },


  fechaModal: {
    textAlign:"center",
    width:30,
    height:30,
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#ccc",
    borderRadius:15,
    marginTop:5,
    marginLeft:250,
    color:"#000",
    fontSize:18,
    fontWeight:"bold",
    position:"absolute",
    top:1,
    right:1,
    },

    ExcluirJogo: {
      textAlign:"center",
      width:40,
      height:40,
      flex:1,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"#FFF",
      borderRadius:5,
      marginTop:5,
      marginLeft:250,
      color:"#000",
      fontSize:18,
      fontWeight:"bold",
      position:"absolute",
      top:1,
      right:1,
      },

  modaldiv: {
    
   width:"100%",
   height:"100%",
   backgroundColor:"#000"
   },
  
  
  CaixadeapostaTitulo: {
   flexDirection:"column",
   textAlign: "center",
   width:300,
   height:30,
   flex:1,
   alignItems:"center",
   justifyContent:"center",
   backgroundColor:"#fff"
    
  },


  flatList: {
    paddingLeft: 15,
    paddingRight: 15, // THIS DOESN'T SEEM TO BE WORKING
    // marginRight: 15   I can't use marginRight because it cuts off the box with whitespace
  },

  AreaBox: {
    backgroundColor:"#fff",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    height:30,
    borderRadius:5,
    marginRight:10,
    borderColor:"#000",
    borderWidth:2,
    paddingLeft:5,
    paddingRight:5,
  
  },

  ImageVer5:{
    width:50,
    height:100,
    marginTop: 10,
 
   
  },  
  ImageVer3:{
    width:100,
    height:90,
    marginTop: 140,

   
  },  

  CalendBtn: {
    width:90,
    height:30,
    justifyContent: "center",
    alignItems: "center",
    outlineStyle: 'none'
  },
  CalendTexSim: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  viewCalend: {
    backgroundColor:'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  QuadCalend: {
    backgroundColor: "#FFF",
    width:300,
    height:600,
    borderRadius:20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
   
  },

  QuadNota: {
    backgroundColor: "#FFF",
    width:300,
    height:600,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
   
  },

  



  AreaBtn3: {
    backgroundColor:"#fff",
    width:100,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    height:30,
    marginRight:10,
    borderColor:"#000",
    borderBottomWidth:2,
    borderRightWidth:2,
    borderTopWidth:2,
    borderBottomRightRadius:5,
    borderTopRightRadius:5,
   
  },


  AreaBtn4 :{
    backgroundColor:"#fff",
    width:60,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:30,
    marginLeft:5,
    marginRight:-15,
    borderColor:"#000",
    borderBottomWidth:2,
    borderLeftWidth:2,
    borderTopWidth:2,
    borderBottomLeftRadius:5,
    borderTopLeftRadius:5,

   },


  modalText6: {
    fontSize: 17,
    textAlign: "center",
    color:"#000"
  },

  modalView3: {
    width: '100%',
    height: 100,
    
    backgroundColor: "#fff",
    borderRadius: 5,
   
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },

  InputHora :{
    width:"70%",
    height:30,
    backgroundColor: "#fff",
    flexDirection:"row",
    borderRadius:5,
    alignItems: "center",
    marginBottom:15,
    paddingLeft:5,
    marginTop:15,
    borderColor:"#000",
    borderWidth:2,
    marginLeft:10,
 },

 TextInforma :{

  height:40,
  backgroundColor: "#fff",
  flexDirection:"row",
  borderRadius:5,
  alignItems: "center",
  paddingLeft:5,
  marginTop:-25,
  borderColor:"#000",
  borderWidth:2,
  marginLeft:10,
},
AreaBtnCima :{
  width:300,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",
 
 },
 
  AreaBtn :{
   width:200,
   display:"flex",
   justifyContent:"center",
   alignItems:"center",
   flexDirection:"row",
   marginBottom:10,
   height:40,
   padding:10,
  },
  AreaBtnTopConf :{
    width:150,
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
   },

  AreaBtnLiga :{
    width: "100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginBottom:10,
    height:40,
    padding:10,
   },

  DateNextArea:{
   flex:1,
   alignItems:'flex-start',
  },
  
  
  DateTitle:{
   fontSize:17,
   fontWeight:"bold",
   color:"#000"
     },

  DateTitleArea:{
  width:140,
  justifyContent:"center",
  alignItems:"center"
   },


  DatePrevArea:{
   flex:1,
   justifyContent:'flex-end',
   alignItems:'flex-end',
  },


  DateInfo: {
  flexDirection:"row",
      },
 
 
  TextBody: {
    color:"#000",
    fontSize:15,
 
      },

  BodyBtn: {
    width:80,
    height:40,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FFE767",
      },


  TextTitu: {
    color:"#fff",
    fontSize:12,
 
      },

 TituBtn: {
    width:80,
    height:20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#00A859",
      },
  Btn: {
    width:80,
    height:60,
    marginRight:10,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    backgroundColor:"#fff",
      },
  Botoes: {
    width:"100%",
    height:60,
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row",
    padding:15,
    backgroundColor:"rgba(0,0,0,0.3)"
      },
      BotoesAbaixo: {
        width:400,
        display:"flex",
        flex:1,
        justifyContent:"flex-start",
        alignContent:"center",
        flexDirection:"row",
        padding:15,
        backgroundColor:"rgba(0,0,0,0.3)",
        flexWrap:"wrap"
 
          },

      BotoesTitulo: {
        width:400,
        height:40,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        padding:5,
        backgroundColor:"rgba(0,0,0,0.3)",
      
        marginBottom:5,
          },

  TexMais: {
     color:"#000",
     marginLeft:5,
     fontSize:8,
     fontWeight:"bold"
  
       },
 
  TempDat: {
    width:"30%",
    height:40,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
  
       },

  ImageTime: {
    width:30,
    height:30,
    borderRadius:3,
  
       },
       ImageCamp: {
        width:20,
        height:20, 
           },

  FotoTime: {
   width:30,
   height:30,
   borderRadius:3,
   marginLeft:5,
   marginRight:5,
      },


  Time: {
   color:"#000",
   fontWeight:"bold",
   marginLeft:5,
   fontSize:12
     },

     Data: {
      color:"#000",
      marginLeft:5,
      fontSize:12,
      fontWeight:"bold",

        },
 


  CaixaNome: {

     height:40,
     display:"flex",
     justifyContent:"center",
     alignItems:"flex-start",
     flexDirection:"column",
     },

  Post: {
   backgroundColor:"#FFF",
   width:"100%",
    },

    Header: {
     padding:5,
     flexDirection:"row",
     alignItems:"center",
     justifyContent:"space-around",
     backgroundColor:"#FFF",
     height:60,
     width:400,
     borderBottomWidth:2,
     borderColor:"#ccc"
       },

  TextInfo: {
    fontSize: 23,
    color: "#FFF",
    fontWeight: "bold",
    fontStyle:"italic"
    },
   
    BtnText: {
      fontSize: 18,
      color: "#000",
      fontWeight: "bold",
      },

      CaixaDados:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginLeft:10

      }, 
    
  
        Container:{
            backgroundColor: "#FFFF",
            flex:1,
          justifyContent:"center",
           
          }, 

          imageBack: {
            width:  "100%",
            height: "120%",
              flex: 1 ,
              alignItems:"center",     
          },

          CaixaTitulo:{
           marginTop:10,
           width:"100%",
           height:50,
           display:"flex",
           justifyContent:"space-around",
           alignItems:"center",
           flexDirection:"row",
           backgroundColor:"#000",
           paddingLeft:10,
           paddingRight:10,
           marginBottom:20,
           
          },
          ImageVer2: {
            width:  40,
            height: 40, 
          }, 
});