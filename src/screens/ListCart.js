
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text, Linking, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView, } from 'react-native'
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
import { Video, AVPlaybackStatus } from 'expo-av';
import RNPickerSelect from 'react-native-picker-select';

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
  const [P6, setP6] = useState(false);
  const [P7, setP7] = useState(false);
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
  const [MsgErro, setMsgErro] = useState("");
  const [MsgErro1, setMsgErro1] = useState("");
  const [Btn1, setBtn1] = useState(false);
  const [What2, setWhat2] = useState(false);
  const [Listu, setListu] = useState([])
  const [DadoTitu, setDadoTitu] = useState(userState.QN3)
  const [DadoFili, setDadoFili] = useState(userState.QN3)
  const [DadosBet, setDadosBet] = useState(userState.versaoBanco)
  const [ListOc, setListOc] = useState([]);
  const [Lista, setLista] = useState([]);
  const [PesId, setPesId] = useState("");
  const [Status, setStatus] = useState("");
  const [DadCart, setDadCart] = useState({});
  const [LinkDeIn, setLinkDeIn] = useState("")
  const [LimCar, setLimCar] = useState(false);
  const [CodVeri, setCodVeri] = useState("")

   useEffect(() => {
    ListandoOc();
  }, []);

   const Saindo = async()=>{
    await AsyncStorage.setItem('Tel', "");
    await AsyncStorage.setItem('@entrada', "");
    await AsyncStorage.setItem('@Id', "");
    navigation.reset({
      routes:[{name:"Preload"}]
  });
   }

   const Voltar = ()=>{
    navigation.goBack();
  }

  useEffect(() => {
    PesqCod();
  }, [PesId])

  useEffect(() => {
    if(DadCart !== {}){
      setLinkDeIn(`https://cartaoweb.online/perfil/${DadCart}`)
    }
  
    }, [DadCart])

  useEffect(() => {
    console.log(userState.QN3)
    setDadoTitu(userState.QN3)
     setDadoFili(userState.QN3)
     setDadosBet(userState.versaoBanco)
  }, [userState.QN4, userState.QN3, userState.versaoBanco])

  useEffect(() => {
    if(Tel !== "" && Tel.length === 14 ){
  
        TelWhats();
    
    } else {
      setMsgErro("")
    } 
    


   }, [Tel])

   useEffect(() => {
    if(ListOc.length >= 1){
      PegandoLig()
    }

   }, [ListOc])

   useEffect(() => {
    if(Status !== ""){
      StatusLista()
    }
   
   
  }, [Status])

   useEffect(() => {
   setNome(userState.nomeCompleto)
  setTel(userState.telefone)

   }, [userState.nomeCompleto, userState.telefone])

   const TelWhats = ()=>{
   setCarre(true)
    Api.AnaliseTelMudar(Tel, setMsgErro,  setBtn1, setCarre) 
   
 }

 const StatusLista = ()=>{
  var resli = [];
  var resRev = [];

 

    for(let i in ListOc){
     if(Status === "Em Uso"){

      if(ListOc[i].EmUso === true){
        resRev.push(ListOc[i])
      }
      
     } else if(Status === "Descodificados"){
      if(ListOc[i].CartaoConfig === false ){
        resRev.push(ListOc[i])
      }

     }  else if(Status === "Codificados"){
      if(ListOc[i].CartaoConfig === true ){
        resRev.push(ListOc[i])
      }

     }  else if(Status === "Livre"){
      if(ListOc[i].EmUso === false ){
        resRev.push(ListOc[i])
      }

     } else if(Status === "Todos"){
      
        resRev.push(ListOc[i])
      

     }
      
         
  
      }
   
      if(resRev.length !== 0){
        setLista(resRev)
      } else {
        setLista([])
      }
    
      
     
  
 }

 const PesqCod = ()=>{
   
  if(PesId !== ""){
   let listra2 = [];
   for(let i in Lista ) {
   
       if( Lista[i].id.toLowerCase().includes(PesId.toLowerCase())  ) {
         
         listra2.push(Lista[i]);   
       }
      
     
     
     setLista(listra2);
    
   }

  } else {
   PegandoLig()
  }
  
   
 }

 const ListandoOc = ()=>{

  setCarre(true)
  Api.CartoesCriado( ListOc, setListOc, setCarre, );

  
}

const PegandoLig = ()=>{
  var resli = [];
  var resRev = [];
  for(let i in ListOc){

  resRev.push(ListOc[i])
     
   
      resli.push({
        
      })
    


  }

  resli = resli.filter(function (a) {
    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
  }, Object.create(null))
  

  setLista(resRev)
 }

   const AbrirModalP1 = (item)=>{
    setDadCart(item)
    console.log(item)
    setCodVeri(item.CodVeri.Cod)
    setModalVer(true)
    setP1(false)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    setP6(false)
    setP7(false)
    
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
      setMsgErro("");
      setCarre(true)
      Api.GeradorDeCod22(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setModalVer);
    } else {
      
      setMsgErro("Por Favor Clique em NÃO SOU ROBÔ!");
      
    }
   
      
   
     
    }

    const GerarCod2 =  async ()=> {
          
     
      if(Tel.length === 14){
        if(parseInt(Senha)  === CodLast){
          setSenha("")
          setTentativa(0)
          setCodLast(0)
          setMsgErro1("")
        setCarre(true)
        Api.GeradorDeCod44(Tel, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setModalVer, setWhat2);
      } else {
        setTentativa(Tentativa +1)
        setMsgErro1("Código Errado "+(Tentativa+1)+"° tentativa de 3");
       
      }
        } else {
        
          setMsgErro1("O Telefone Está Errado!");
        
        }
        
     
       
      }

   const AbrirModalP2 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    setP6(false)
    setP7(false)
    
   }

   const AbrirModalP3 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(false)
    setP4(false)
    setP5(false)
    setNome(userState.nomeCompleto)
    setMsgErro("")
    setP6(false)
    setP7(false)
   }

   const AbrirModalP4 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(false)
    setP5(false)
    setTel(userState.telefone)
    setP6(false)
    setP7(false)
   }

   const AbrirModalP5 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(false)
    setP6(false)
    setP7(false)
    
   }

   const AbrirModalP6 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(true)
    setP6(false)
    setP7(false)
    
   }

   const AbrirModalP7 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(true)
    setP6(true)
    setP7(false)
    
   }

   const AbrirModalP8 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(true)
    setP6(true)
    setP7(true)
    
   }

   const CriarCartao = ()=>{
    setCarre(true)
    Api.CriandoCartao(ModalVer, setAlert, setAlertTipo, setCarre, setModalVer)
   }



   const FecharModal = ()=>{
    setDadCart({})
    setCodVeri("")
    setModalVer(false)
    setP1(false)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    setP6(false)
    setP7(false)
    setAlert("")
    setAlertTipo(null)
    setMsgErro(false)
    setMsgErro1(false)
    setSenha("")
    setCodG(false)
    setNome("")
    setTel("")
    setCodG(false)
    setTentativa(0);
    setBtn1(false);
    setRobo(true);
    setLimCar(false)
   }

   const AbrirLink = (Link)=>{
    Linking.openURL(Link);
   }


   const BaixarVideo = ()=>{
  
     Api.BaixandoMar(Nome, setAlert, setAlertTipo, setCarre )
 
   }

   const Trocardenome = ()=>{
   if(Nome !== ""){
    if(parseInt(Senha)  === CodLast){
    setCarre(true)
    Api.TrocandoNome(Nome, setAlert, setAlertTipo, setCarre )
  } else {
    setTentativa(Tentativa +1)
    setMsgErro1("Código Errado "+(Tentativa+1)+"° tentativa de 3");
   
  }
    } else {
    
      setMsgErro1("O Nome Não Pode Está Vazio!");
    
    }
  }

  const TrocardeNumero = ()=>{
    if(Tel.length === 14){
     if(parseInt(Senha) === CodLast){
     setCarre(true)
     Api.TrocandoWhats(Tel, setAlert, setAlertTipo, setCarre )
   } else {
     setTentativa(Tentativa +1)
     setMsgErro1("Código Errado "+(Tentativa+1)+"° tentativa de 3");
    
   }
     } else {
     
       setMsgErro1("O Telefone Está Errado!");
     
     }
   }

  const RenviarCod = ()=>{
    setCodG(false);
    setTentativa(0);
    setSenha("");
    setMsgErro1("");
  }

  const placeholder2 = {
    label: 'Todos',
    value: null,
    color: '#000',
};


const MsgDeLimp= ()=>{
  setLimCar(!LimCar)
}


const EditandoCart = ()=>{
 
  setCarre(true)
  Api.ConfigCart(DadCart, CodVeri, setAlert, setAlertTipo, setCarre, setCodVeri, setDadCart )
}

const LimpandoCar = ()=>{
 
  setCarre(true)
  Api.LimpCart(DadCart, setAlert, setAlertTipo, setCarre, setLimCar )
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
          <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Editar Cartão</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
          </View>
          <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>{DadCart.id}</Text>
          <View  style = {styles.InputAra}>
                   <FontAwesome name="link" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder="Link Recortado" 
                       value={LinkDeIn}
                       onChangeText={t=>setLinkDeIn(t)}
                       autoCapitalize="none"
                       keyboardType={"numeric"}
                       posi={18}
                   />
                  
                   </View>
                   <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>Codigo de Acesso</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="expeditedssl" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder="Crie Codigo de Acesso" 
                       value={CodVeri}
                       onChangeText={t=>setCodVeri(t)}
                       autoCapitalize="none"
                       keyboardType={"numeric"}
                       posi={18}
                   />
                  
                   </View>
              
                  <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>EditandoCart()}>
                  <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Cartão Codificado</Text>
                  </TouchableHighlight>
                   

            {LimCar === false ?
                   <>
                   <TouchableHighlight style={{width:150, height:50, backgroundColor:"#9B1AD3", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>MsgDeLimp()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Limpar Cartão</Text>
                          </TouchableHighlight>
                   </>

                   :
                   <>
                    <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Você Tem certeza que Limpar Esse Cartão?</Text> 
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#0589CD", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>LimpandoCar()}>
                           <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sim</Text>
                      </TouchableHighlight>
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#F34E4E", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>MsgDeLimp()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Não</Text>
                          </TouchableHighlight>
                   </>

                   }
         
          
              </>
              :
              <>
              {P2 === false ?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Tutoriais PixBetCash</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              {Listu.map((item, key)=>( 
                <>
                <TouchableHighlight  style={{margin:10}} onPress={() =>AbrirLink(item.Link)}>
                  <>
                  <Text style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>{item.Titulo}</Text>
                  <Text style={{ marginLeft:10, fontSize:15, color:"blue"  }}>Clique Aqui...</Text>
                  </>
                  </TouchableHighlight>

                </>

              ))}
              </>
              :
              <>
              {P3 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Trocar Nome</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras para Trocar O Nome:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>1° - Coloque seu Nome Completo</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>2° - Esse Nome tem que ser o mesmo nome que aparecerá na sua conta, quando efetuarmos a transferência via Pix</Text>
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
                   {CodG === false?
                        <>
                        
                        <>
                         <ReCAPTCHA
                          ref={captcha}
                          sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                          size="normal"
                          hl="pt"
                          theme="dark"
                          onChange={onChangeRec}
                            />
                            {MsgErro !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro}</Text>    
                            }
                        
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código Segurança</Text>
                          </TouchableHighlight>
                              

                        </>

                        
                      

              
                     </>
                         :
                        

                        <>
                        {Tentativa >= 3 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15  }}>Você atingiu a quantidade máxima de erros</Text> 
                         <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>RenviarCod()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Reenviar Codigo</Text>
                      </TouchableHighlight>
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                   <Text  style={{ marginLeft:10, fontSize:15  }}>Seu Código foi enviado para o Whatsapp</Text> 
                                   <View  style = {styles.InputAra}>
                   <FontAwesome name="expeditedssl" size={40} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Código" 
                              value={Senha}
                              onChangeText={t=>setSenha(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   {MsgErro1 !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro1}</Text>    
                            }
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Trocardenome()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Trocar de Nome</Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }

                        </>

                          }
              </>
              :
              <>
              {P4 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Trocar Whatsapp</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras para Trocar de Whatsapp:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>1° - Digite Um Número de Whatsapp</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>2° - O Número Não Pode está registrado no Sistema</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>3° - O Número do Whatsapp Que está Registrando Tem que Ser o Mesmo Da Chave Pix, aonde A Empresa fará a trasnferencia dos seus pagamentos.</Text>
              {CodG === false?
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

              :
              <View  style = {styles.InputAra}>
                           <FontAwesome name="phone-square" size={24} color="black" />
                           <View  style={{width:250 , height:50 }}>
                           <Text  style={{ marginLeft:10, fontSize:20}}>{Tel}</Text>
                           </View>
                            </View>

              }
              
                      {MsgErro !== "" &&
                      <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro}</Text>    
                      }
                      {Btn1 === true &&
                      <>
                       {CodG === false ?
                        <>
                        
                        <>
                         <ReCAPTCHA
                          ref={captcha}
                          sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                          size="normal"
                          hl="pt"
                          theme="dark"
                          onChange={onChangeRec}
                            />
                            {MsgErro !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro}</Text>    
                            }
                        
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código Segurança</Text>
                          </TouchableHighlight>
                              

                        </>

                        
                      

              
                     </>
                         :
                        

                        <>
                        {Tentativa >= 3 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15  }}>Você atingiu a quantidade máxima de erros</Text> 
                        
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                  {What2 === false ?
                                  <Text  style={{ marginLeft:10, fontSize:15  }}>Seu Código foi enviado para o seu Whatsapp Antigo</Text> 
                                  :
                                  <Text  style={{ marginLeft:10, fontSize:15  }}>Seu Código foi enviado para o seu Whatsapp Novo</Text> 
                                  }
                                 
                                   <View  style = {styles.InputAra}>
                   <FontAwesome name="expeditedssl" size={40} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Código" 
                              value={Senha}
                              onChangeText={t=>setSenha(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   {MsgErro1 !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro1}</Text>    
                            }
                            {What2 === false ?
                          <TouchableHighlight style={{width:250, height:50, backgroundColor:"#840D8D", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod2()}>
                          <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Codigo de Segurança Para O Novo WhatsApp</Text>
                        </TouchableHighlight>
                            :
                            <TouchableHighlight style={{width:250, height:50, backgroundColor:"#840D8D", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>TrocardeNumero()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Trocar o Whatsapp</Text>
                          </TouchableHighlight>

                            }
                  
                      
                      
                        </>
                        }

                        </>

                          }

                      </>

                      }
                     
              </>
              :
              <>
              {P5 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>APP PARA ANDROID</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Primeiro Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Entre no Site da PixBetCash pelo Google com o Link, e depois clique nos 3 pontos no topo do lado direito.</Text>
               <Image source={require('../assets/PrimeiroAndroid.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Segundo Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Agora Clique em Adicionar à tela  Inicial.</Text>
               <Image source={require('../assets/SegundoAndroid.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Terceiro Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Clique no Adicionar na Caixa de Dialogo.</Text>
               <Image source={require('../assets/TerceiroAndroid.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Quarto Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>- Seu aplicativo vai aparecer na sua tela inicial.</Text>
               <Image source={require('../assets/QuartoAndroid.png')}  style={{width:300, height:600}} />
              </>
              
              :
              <>
              {P6 === false ?
              <>
                 <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>APP PARA IPHONE</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Primeiro Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Entre no Site da PixBetCash pelo Safari com o Link, e depois clique no menu abaixo.</Text>
               <Image source={require('../assets/Primeiro.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Segundo Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Agora Clique em Adicionar à tela  de Início.</Text>
               <Image source={require('../assets/Segundo.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Terceiro Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Clique no Adicionar na Caixa de Dialogo.</Text>
               <Image source={require('../assets/Terceiro.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Quarto Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>- Seu aplicativo vai aparecer na sua tela inicial.</Text>
               <Image source={require('../assets/Quarto.png')}  style={{width:300, height:600}} />

              </>

              :
              <>
              {P7 === false ?
              <>
               <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Meta</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Image source={require('../assets/MetasPixbetCash.png')}  style={{width:300, height:1400}} />

              </>

              :
              <>
               <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Baixar O Marketing</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View >
              <View  style={{ margin:10,}}  >
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:22  }}>Instruções de Como Baixar</Text>
              <Text style={{ marginLeft:10, fontSize:17  }}>1° passo: Segure o clique na foto ou no vídeo por 5 segundos</Text>
              <Text style={{ marginLeft:10, fontSize:17  }}>2° passo: Aparecerá um menu, clique em fazer download </Text>
              </View>
              {userState.versaoBanco.MarkLink.reverse().map((item, key)=>( 
                <>
                <View  style={{margin:10}} >
                  <>
                  <Text style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>{item.Titulo}</Text>
                
                  {item.Tipo === "imagem" ?
                 <Image source={{uri:item.Link}}  style={{ width:item.L, height:item.H}} />  
                  :
                 
                  <Video
                  style={{ width:item.L, height:item.H}}
                  source={{
                    uri: item.Link,
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  
                />
                  }
                 
                  </>
                  </View>

                </>

              ))}
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

                <View style={styles.CaixaTitulo} >
              <TouchableHighlight  onPress={()=>Voltar()} style={styles.CaixaDados}>
                <>
              <FontAwesome name="arrow-circle-left" size={30} color="#fff" />
            
              </>
              </TouchableHighlight>
            
              {userState.QN4 >= 8000 ?
              <>
              {userState.QN4 >= 64000 ?
              <>
               {userState.QN4 >= 216000 ?
              <>
  <Image source={require('../assets/Ouro.png')}  style={styles.ImageVer2 } />
              </>
              :
              <>
              <Image source={require('../assets/Prata.png')}  style={styles.ImageVer2 } />
              </>
              }

              </>
              :
              <>
              <Image source={require('../assets/bronze.png')}  style={styles.ImageVer2 } />
              </>
              }

              </>
              :
              <>
              <Image source={require('../assets/logoTop.png')}  style={styles.ImageVer2 } />
              </>
              }

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
             Lista de Cartão
             </Text>
              </TouchableHighlight>
             
            </View >
            {Carre === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
              
                      
                      
                      </>

                      :
                      <>
            <ScrollView>
              <View style={styles.CaixaDados}>]
              <View  style={styles.AreaBtn}>
              <RNPickerSelect
           placeholder={placeholder2}
            onValueChange={(value) =>setStatus(value)}
            items={[
              {label:"Em Uso", value:"Em Uso", },
              {label:"Descodificados", value:"Descodificados", },
              {label:"Codificados", value:"Codificados", },
              {label:"Livre", value:"Livre", },
            ]}
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: 'eggplant',
              borderRadius: 8,
              color: 'black',
              paddingRight: 30, // to ensure the text is never behind the icon
              textAlign :'right',
            }}
            
        />
        </View>
            <View style={styles.InputHora}>
                  
                  <SignInput
                     
                     placeholder="Digite o Código do Cartão" 
                     value={PesId}
                     onChangeText={t=>setPesId(t)}
                     autoCapitalize="none"
                     keyboardType={"default"}
      
                 />   
                 </View>
                 </View>
               {Lista.map((item, key)=>(
           <>
            <View  style={styles.Post}>
              <TouchableHighlight onPress={()=>AbrirModalP1(item)} style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:70, width:400, borderBottomWidth:1, marginBottom:5, borderColor:"#ccc", backgroundColor:item.EmUso? "#168500":item.CartaoConfig? "#0DBDE9":"#000",}}>
              <>
               
                <View  style={styles.CaixaNome}>
                
                  <Text style={{color:"#FFF", fontSize:17, fontWeight:"bold"}}>Id: {item.id}</Text>
                  <Text style={{color:"#FFF", fontSize:14,}}>Data Cri: {item.dataForm}</Text>
                
                </View> 
                <View  style={styles.CaixaNome}>
                {item.EmUso ?
                  <Text style={{color:"#FFF", fontSize:14,}}>Em Uso</Text>
                :
                <Text style={{color:"#FFF", fontSize:14,}}>Livre</Text>
                }

              {item.CartaoConfig ?
                  <Text style={{color:"#FFF", fontSize:14,}}>Codificado</Text>
                :
                <Text style={{color:"#FFF", fontSize:14,}}>Descodificado</Text>
                }
                </View> 
    
                {/* <View  style={styles.TempDat}>
                <TouchableHighlight onPress={()=>AbrirEnviar(item)} style={{backgroundColor:"#DDBE0D", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:25, marginBottom:5, borderRadius:5, marginRight:10, paddingLeft:5, paddingRight:5,}} >
                <>
              <Text  style={{fontSize:15, color:"#fff", margin:5}}>Enviar Nota</Text>
              </>            
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>AbrirModal(item)} style={{backgroundColor:"#009DFF", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:25, borderRadius:5, marginRight:10, paddingLeft:5, paddingRight:5,}} >
                <>
              <Text  style={{fontSize:15, color:"#fff", margin:5}}>Vizualizar</Text>
              </>            
              </TouchableHighlight>
                </View> */}


              </>
              </TouchableHighlight>
       
             
           


            </View>
           
              </>

              ))}
            
           
            
              </ScrollView>
              </>
            }
        {/* <TouchableHighlight style={{width:150, height:50, backgroundColor:"#F96868", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Saindo()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sair da Conta</Text>
                          </TouchableHighlight> */}
    
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
    width:200,
    height:200,
    marginTop: 40,

   
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
            backgroundColor: "#000",
            flex:1,
          
          alignItems:"center",
          }, 

          imageBack: {
           
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
          ImageVer10: {
            width:  300,
            height: 160, 
          },  
});