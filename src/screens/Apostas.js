
import React, { Component, useState, useEffect, useRef } from 'react'
import {Modal, Text,FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import { ModalDatePicker } from "react-native-material-date-picker";
import Hora from '../components/Hora';
import SignInput from '../components/SignInputIni';
import Telefone from '../components/NumberTel';
import { Calendar } from 'react-native-calendario';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import Api from '../Api';
import DataTime from '../components/datando';
import Money from '../components/Money';
//import Datand from '../components/datando';

export default () => {
  const captcha = useRef(null)
  const [dataNasc, setdataNasc] = useState(null);
   const [ListOc, setListOc] = useState([]);
  const [Page, setPage] = useState(1);
  const [Load, setLoad] = useState(false);
  const [DataPesq, setDataPesq] = useState(new Date().getTime());
  const [Carreg, setCarreg] = useState(false);
  const [Refreshin, setRefreshin] = useState(false);
  const [hr, sethr] = useState("00:00");
  const [Pcasa, setPcasa] = useState(false);
  const [Varia, setVaria] = useState('');
  const [ModalIr, setModalIr] = useState(false);
  const [AnaliCont, setAnaliCont] = useState(true);
  const [ModalCalend, setModalCalend] = useState(false);
  const [DataMin, setDataMin] = useState(0);
  const [DataMax, setDataMax] = useState(0);
  const [Relogio, setRelogio] = useState(false);
  const [ListLig, setListLig] = useState([]);
  const [VerLiga, setVerLiga] = useState("");
  const [VerLigPais, setVerLigPais] = useState("");
  const [Lista, setLista] = useState([]);
  const [Vencido, setVencido] = useState(false);
  const [DtEsc, setDtEsc] = useState(0)
  const [SimAp, setSimAp] = useState([]);
  const [QuanJog, setQuanJog] = useState(0);
  const [VaToCo, setVaToCo] = useState(0);
  const [ValApos, setValApos] = useState("R$000,00");
  const [ValPremi, setValPremi] = useState(0);
  const [ValPreDemos, setValPreDemos] = useState(0);
  const [Carre, setCarre] = useState(false);
  const [ValorReal, setValorReal] = useState("");
  const [LinkEnv, setLinkEnv] = useState("nulo");
  const [QCash, setQCash] = useState(0);
  const [Cash, setCash] = useState(9);
  const [Cambis, setCambis] = useState(false);
  const [ValCambis, setValCambis] = useState("");
  const [NomeCli, setNomeCli] = useState("");
  const [TelCli, setTelCli] = useState("");
  const [IdAposta, setIdAposta] = useState("")
  const [PgCash, setPgCash] = useState(false);
  const [DCash, setDCash] = useState(0);
  const [VCash, setVCash] = useState(0);
  const [Robo, setRobo] = useState(true);
  const [Tentativa, setTentativa] = useState(0);
  const [CodLast, setCodLast] = useState(0);
  const [CodG, setCodG] = useState(false);
  const [Senha, setSenha] = useState("");
  const [ModalLink, setModalLink] = useState(false);
  const [ModalVer, setModalVer] = useState(true);
  const [VerNotajogo, setVerNotajogo] = useState(false);
  const [Alert, setAlert] = useState("");
  const [AlertTipo, setAlertTipo] = useState(null);
  const [Nome, setNome] = useState("");
  const [Tel, setTel] = useState("");

  useEffect(() => {
    if(dataNasc !== null){
      ListandoOc();
    }
    
  }, [dataNasc, hr]);

  useEffect(() => {
    tempo();
  }, [])
  useEffect(() => {
    if(ListOc.length >= 1){
      PegandoLig()
    }

   }, [ListOc])

   useEffect(() => {
    console.log(SimAp)
   setQuanJog(SimAp.length)
   if(SimAp.length > 0){
     Caulc();
   }
   
  }, [SimAp])

  useEffect(() => {
    ValorPermio();
   }, [ValApos, VaToCo])

   useEffect(() => {
    if(LinkEnv !== "nulo"){
      vaiparala()
    }

   }, [LinkEnv])

  // useEffect( ()=>{ 
  //   if(Page !== 1){
  //     ListandoOc();  
  //   }            
  //  }, [Page]);

  const onChangeRecp = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }

  const PegandoLig = ()=>{
    var resli = [];
    var resRev = [];
    for(let i in ListOc){

    resRev.push(ListOc[i])
       
     
        resli.push({
          nome:ListOc[i].liga.name,
          Pais:ListOc[i].liga.country,
        })
      


    }

    resli = resli.filter(function (a) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))
    
    setListLig(resli)
    setLista(resRev)
   }

   const Pesquisa = async (Pais, Liga)=>{
    setVerLiga(Liga);
    setVerLigPais(Pais)
    var bet = ListOc.filter(word => word.liga.name === Liga);
    setLista(bet);
  }

   const ListandoOc = ()=>{
    setLista([])
    setVerLigPais("");
    setVerLiga("");
    let currentDate1 = '';
    let meg = dataNasc.split("/");
    console.log(meg);
    let Dia1 = meg[0];
    let Mes1 =  meg[1];
    let Ano1 = meg[2];
    Dia1 = Dia1 < 10 ? '0'+Dia1 : Dia1;
    Mes1 = Mes1 < 10 ? '0'+Mes1 : Mes1;
    currentDate1 = Ano1+'-'+Mes1+'-'+Dia1;
    var Ele = new Date().getTime()
   
  Ele = Ele - 3600000;
    let CompDat = new Date(currentDate1+" "+hr+":00.000").getTime();
    CompDat = CompDat;
    let Dat = CompDat;
    let Dat2 =new Date(currentDate1+" 23:59:00.000").getTime();
    console.log("Dat "+ Dat)
    console.log("Dat2 "+ Dat2)
    if(Dat < Dat2){
    setCarreg(true)
    Api.ListJogos( Page, setListOc, setCarreg,  Dat, Dat2, );
  } 
    
  }

  const TirarEsse = (position) =>{
    setSimAp([...SimAp.filter((item, index) => index !== position)]);
   
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
    await ListandoOc();
    await setRefreshin(false);
  }
  const tempo = ()=>{
    let currentDate = '';
    let now =new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let Dia = now.getDate();
    let Mes = (now.getMonth()+1);
    let Ano = now.getFullYear(); 
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Dia+'/'+Mes+'/'+Ano;
    setdataNasc(currentDate)
    setDtEsc(new Date().getTime())
    setDataMin(new Date().getTime())
    setDataMax(new Date().getTime() + 604800000)
    //let currentDate1 = Ano+'-'+Mes+'-'+Dia;
    // let CompDat1 = new Date(currentDate1+"T23:59:59.000").getTime();
    // CompDat1 = CompDat1+10800000;
    // let CompDat3 = CompDat1+10800000;
    // let dif = CompDat3-TimeIni;
    // let div = dif/86400000;
    // console.log(parseInt(div));
    // setQuantD(parseInt(div))
    // setTimeFin(CompDat1);
    // setTimeEve(CompDat1);
    // setDataEve(currentDate);
    // setDataFin(currentDate);
    // setDaExFin(currentDate)
  }

  const Mudedate = (date)=>{
    setModalCalend(false)
    setdataNasc("")
    let currentDate = "";
    let now25 =date.getTime();
    setDtEsc(now25)
    let Dia = date.getDate();
    let Mes = (date.getMonth()+1);
    let Ano = date.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Dia+'/'+Mes+'/'+Ano;
    setdataNasc(currentDate)
    let currentDate1 = Ano+'-'+Mes+'-'+Dia;

  }

   const onDismiss = ()=>{
    setRelogio(false)
   }

   const onChange = ({ hours, minutes })=>{
    
    var hora =parseInt(hours) < 10 ? '0'+hours: hours;
    var min = parseInt(minutes) < 10 ? '0'+minutes: minutes;
    console.log(hora+":"+min)
    sethr(`${hora}:${min}`)
    setRelogio(false)
   }

   const ColocarNota=( item3, item)=>{

    function isCherries(fruit) {
      return fruit.IdCasa === item3.idCasaOlds;
  }
    var dei = new Date().getTime()/1000
   if(dei < item.dataJogo){
    var ListSimu = {
      IdCasa:item3.idCasaOlds,  
      Casa: item3.Casa,
      Grupo:item3.Grupo,
      GrupoEng:item3.GrupoEng,
      CasaEng:item3.CasaEng,
      Olds:item3.Olds,
      CasaTime:item.Casa,
      ForaTime:item.Fora,
      fixture:item.fixture,
      Estadio:item.Estadio,
      dataJogo:item.dataJogo,
      liga:item.liga,
    } 
    if(SimAp.find(isCherries)){
     
      setAlert("Cotação repetida não pode, você já escolheu essa Cotação!");
      setAlertTipo("danger");
      setModalCalend(true);
      setVerNotajogo(false);

    }else {
      console.log(ListSimu)
      setSimAp([...SimAp, ListSimu ])
    }
  } else {
    setAlert("Esse Jogo não está mais disponivel !");
    setAlertTipo("danger");
    setModalCalend(true);
    setVerNotajogo(false);
  }
  
  //  console.log(item3)
  //  console.log(item)
  }

  const Caulc = ()=>{
    var tre = 1
     for(let i in SimAp){
      tre = tre*SimAp[i].Olds;
     }
     setVaToCo(tre.toFixed(2))
    }

    const ValorPermio = ()=>{
      console.log(ValApos)
      var preo =  ValApos.replace("R$", "")
       preo = preo.replace(".", "")
  
      var prai = preo.replace(",", ".")
      console.log(prai)
     var int = parseFloat(prai)*VaToCo
     var intCam = (parseFloat(prai)*VaToCo)*0.1
      int = int.toFixed(2)
      int = int.toString()
      int = int.replace('.', ',')

      intCam = intCam.toFixed(2)
      intCam = intCam.toString()
      intCam = intCam.replace('.', ',')

      setValPremi(parseFloat(prai)*VaToCo);
      setValorReal(parseFloat(prai));
      setVCash(parseFloat(prai)*100);
      setQCash(parseInt(prai)*Cash);
      setValPreDemos(int)
      setValCambis(intCam)
      console.log(int)
        }


        const vaiparala = () => {
          // setModalLink(true);
          // setModalVer(false)
        
            window.location.href = LinkEnv
       
        };

        const Vernota = ()=>{
        
          setModalCalend(true);
          setVerNotajogo(true)
        }

        const Siarnota = ()=>{
         
          setModalCalend(false);
          setVerNotajogo(false)
        }

        const AposCambis = ()=>{
          setCambis(!Cambis);
         }

         const PagandoPix = ()=>{
          var DateVw = parseInt((new Date().getTime() + 60000)/1000);
          console.log(DateVw);
          var verSim = []
  
          for(let i in SimAp){
            console.log(SimAp[i].dataJogo +" - "+DateVw)
             if(SimAp[i].dataJogo < DateVw){
              verSim.push(1)
             } else {
              verSim.push(2)
             }
          }
           console.log(verSim)
          if(verSim.includes(1)){
          
            setAlert("Algum desses jogos já esta preste a começar ou já começou, exclua e escolha outro jogo!");
            setAlertTipo("danger");
            setModalCalend(true);
            setVerNotajogo(false);
  
          } else {
  
            if(ValorReal >= 5){
              if(SimAp.length > 2){
  
                 if(Cambis === false){
                  setCarre(true);
                  Api.Apostando(QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)
                 
                } else {
  
                  if(NomeCli !== ""){
                  
                 
                      setCarre(true);
                      Api.Apostando(QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo  )
                 
                  
  
                  } else {
                    setModalCalend(true);
                    setVerNotajogo(false);
                    setAlert("Preencha o Nome Do Cliente");
                    setAlertTipo("danger");
  
                  }
  
                 
                 
                }
             
             
             
             
              } else {
                setModalCalend(true);
                setVerNotajogo(false);
                setAlert("3 jogos são o minimo para aprovar uma aposta");
                setAlertTipo("danger");
      
              }
    
            } else {
              setModalCalend(true);
              setVerNotajogo(false);
              setAlert("R$ 5,00 é o menor valor que você pode aposta!");
              setAlertTipo("danger");
    
    
            }
  
          }
          
         
         
         
         }

         const SairAlert = ()=>{
          setAlertTipo(null);
          setAlert("");
          setModalCalend(false);
          setVerNotajogo(false);
         }
  
  

    return (
      <View style={styles.Container}>
           <Modal
            transparent={true}
            animationType="slide"
            visible={ModalCalend}
            >
              <View style={styles.viewCalend}>
              {VerNotajogo === false ?
              <>
              {AlertTipo === null?
              <>
  <View  style={styles.QuadCalend}>
               <TouchableHighlight onPress={()=>setModalCalend(false)} style={styles.CalendBtn}>
                  <Text style={styles.CalendTexSim}>Fechar</Text>
                 </TouchableHighlight>
                 <Calendar
                onChange={(range) => console.log(range)}
                onPress={(range1) => Mudedate(range1)}
                minDate={new Date(DataMin)}
                maxDate={new Date(DataMax)}
                startDate={new Date(DtEsc)}
                //endDate={new Date(2018, 4, 5)}
                dayNames={['D', 'S', "T", "Q", "Q", "S", "S"]}
                locale={'pt'}
                theme={{
              activeDayColor: {},
              monthTitleTextStyle: {
                color: '#6d95da',
                fontWeight: '300',
                fontSize: 16,
              },
              emptyMonthContainerStyle: {},
              emptyMonthTextStyle: {
                fontWeight: '300',
              },
              weekColumnsContainerStyle: {},
              weekColumnStyle: {
                paddingVertical: 10,
              },
              weekColumnTextStyle: {
                color: '#b6c1cd',
                fontSize: 13,
              },
              nonTouchableDayContainerStyle: {},
              nonTouchableDayTextStyle: {},
              startDateContainerStyle: {},
              endDateContainerStyle: {},
              dayContainerStyle: {},
              dayTextStyle: {
                color: '#2d4150',
                fontWeight: '300',
                fontSize: 15,
              },
              dayOutOfRangeContainerStyle: {},
              dayOutOfRangeTextStyle: {},
              todayContainerStyle: {},
              todayTextStyle: {
                color: '#6d95da',
              },
              activeDayContainerStyle: {
                backgroundColor: '#6d95da',
              },
              activeDayTextStyle: {
                color: 'white',
              },
              nonTouchableLastMonthDayTextStyle: {},
            }}
          />
              
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                
                </View>
              </>

              :
              <>
              {AlertTipo === "danger"?
              <>
           
               <View  style={styles.ModVie}>
                <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext2}>{Alert}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>SairAlert()} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
               </View>
       
            
              </>

              :
              <>
             
               <View  style={styles.ModVie}>
                <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext}>{Alert}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>SairAlert()} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
               </View>
       
           

              </>

              }

              </>

              }
                 
             
            
              </>

              :
              <>

                {Carre === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
                      
                      
                      </>

                      :
                      <>
                      <View style={styles.QuadNota} >
                        <ScrollView >
                        {PgCash ?
                        <>
                        
                        </>
                        :
                        <>
                        <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Simulador de Aposta</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight></View>
                      </View> 
                      {SimAp.map((item3, index)=>( 
                     <View   style={styles.Caixadeaposta}  >
                   
                     <Text style={styles.TexNota1}>{item3.CasaTime.name.substr(0, 15)}. X {item3.ForaTime.name.substr(0, 15)}.</Text> 
                     <Text style={styles.TexNota1}>Palpite: {item3.Casa} | Cota: {item3.Olds}</Text>
                     <Text style={styles.TexNota1}>({item3.Grupo})</Text>
                     <Text style={styles.TexNota1}><DataTime  data={item3.dataJogo} /> </Text>
                     <TouchableHighlight  style={styles.ExcluirJogo} onPress={()=>TirarEsse(index)}>
                     <FontAwesome name="trash" size={24} color="black" />
                      </TouchableHighlight>
                     {/* <a className="btn btn-danger ExcluirJogo" onClick={()=>TirarEsse(index)}>
                            <i class="fas fa-trash"></i> 
                             </a>  */}
                     </View>             

                              ))}
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Qtd. Jogo(s) {QuanJog} </Text>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Total Cota(s): {VaToCo}</Text> 
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Cash(s) Recebida: {QCash}</Text>  
                   
                    <View style={styles.InputHora}>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor:</Text>  
                    <Money
                       
                       placeholder="Valor R$" 
                       value={ValApos}
                       onChangeText={t=>setValApos(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
        
                   />   
                   </View>
                 
                          <View style={styles.Valopre}>
                            <View style={styles.Titupre}>
                            <Text  style={{fontWeight:"bold", margin:10, fontSize:15  }}>Valor Do Prêmio: R$ {ValPreDemos}</Text>
                            </View>
                            {Cambis === true ?
                            <>
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#F77474", borderRadius:5, margin:20, justifyContent:"center", alignItems:"center" }}  onPress={()=>AposCambis()}>
                            <Text  style={{fontWeight:"bold", margin:10, fontSize:15, color:"#FFF"  }}>Sair Do Modo Cambista</Text>
                            </TouchableHighlight>
                            <View  style = {styles.InputAra}>
                           <FontAwesome name="phone-square" size={24} color="black" />
                            <Telefone                      
                                placeholder="Whatsapp do Cliente" 
                                value={TelCli}
                                onChangeText={t=>setTelCli(t)}
                                autoCapitalize="none"
                                keyboardType={"phone-pad"}
                            
                            /> 
                            </View>
                            <View  style = {styles.InputAra}>
                            <FontAwesome name="user" size={24} color="black" />
                             <SignInput
                                placeholder="Nome do Cliente" 
                                value={NomeCli}
                                onChangeText={t=>setNomeCli(t)}
                                autoCapitalize="none"
                                keyboardType={"default"}
                                posi={18}
                            /> 
                            </View>
                            </>
                            :
                            <>
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1AA6D3", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AposCambis()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Entrar no Modo Cambista</Text>
                          </TouchableHighlight>
                        
                            </>
                              }
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoPix()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar a Aposta</Text>
                          </TouchableHighlight>

                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#9B1AD3", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AposCambis()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Com Cash</Text>
                          </TouchableHighlight>
                          </View>
                          
                        </>
                        }

                        </ScrollView>
                      </View>
                      </>
                  }
            
                {/* 

                        <ScrollView style={styles.QuadNota} >
                          {PgCash ?
                          <> */}
                      {/* <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Banco de Cash</Text> <View  style={styles.fechaModal} ><TouchableHighlight onClick={() =>setModalVer(false)}>X</TouchableHighlight></View>
                      </View> 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:12  }}>Banco de Cash:</Text>{'\n'}
                      <Text  style={{ marginLeft:10, fontSize:12  }}>{DCash} </Text> {'\n'} 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:12  }}>Valor Aposta:</Text> {'\n'} 
                      <Text  style={{ marginLeft:10, fontSize:12  }}>{ValApos} </Text> {'\n'} 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:12  }}>R$ 1,00 vale 100 Cash:</Text> {'\n'} 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:12  }}>Valor da Aposta Em Cash:</Text> {'\n'} 
                      <Text  style={{ marginLeft:10, fontSize:12  }}>{VCash} </Text> {'\n'} 
                      {DCash > VCash ?
                      <>
                        {CodG === false?
                        <>
                        <ReCAPTCHA
                          ref={captcha}
                              sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                              size="normal"
                              hl="pt"
                              theme="dark"
                              onChange={onChangeRecp}
                            />
                         <Butao 
                        style={"btn btn-sm btn-success"}
                        titulo={"Gerar Código de Pagamento"}
                        onClick={()=>GerarCod()}
                        /> 
                     </>
                         :
                        

                        <>
                        {Tentativa >= 3 &&
                        <>
                          <string  style={{ marginLeft:10, fontSize:12  }}>Você atingiu a quantidade máxima de erros</string><br/> 
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                   <string  style={{ marginLeft:10, fontSize:12  }}>Seu Código foi enviado para o Whatsapp do Numero {Dados.Tel}</string><br/> 
                            <Campo 
                          type={"password"}
                          placeholder={"Digite o Código"}
                          icon={"fas fa-lock"}
                          value={Senha}
                          onChange={e=>setSenha(e.target.value)}
                          mask={null}
                            />
                      
                        <Butao 
                        style={"btn btn-sm btn-success"}
                        titulo={"Pagar"}
                        onClick={()=>CompPgCash()}
                        /> 
                        </>
                        }

                        </>

                          }
                        
                        </>
                        :
                        <>
                        <string  style={{ marginLeft:10, fontSize:12, color:"red"  }}>Você não tem Cash Suficiente para pagar essa aposta!</string><br/> 
                        </>
                      }
                      
                             */}
                          
                          {/* </>

                          :
                          <> */}
                      {/* <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Simulador de Aposta</Text> <View  style={styles.fechaModal} ><TouchableHighlight onClick={() =>setModalVer(false)}>X</TouchableHighlight></View>
                      </View>  */}
                    {/* {SimAp.map((item3, index)=>( 
                     <View   style={styles.Caixadeaposta}  >
                   
                     <Text style={{color:"#fff", marginLeft: 10}}>{item3.CasaTime.name.substr(0, 15)}. X {item3.ForaTime.name.substr(0, 15)}.</Text> {'\n'}
                     <Text style={{color:"#fff", marginLeft: 10}}>Palpite: {item3.Casa} | Cota: {item3.Olds}</Text>{'\n'}
                     <Text style={{color:"#fff", fontSize:12, marginLeft: 10}}>({item3.Grupo})</Text>{'\n'}
                     <Text style={{color:"#fff", marginLeft: 10}}><DataTime  DateIni={item3.dataJogo} /> </Text>{'\n'}
                     <a className="btn btn-danger ExcluirJogo" onClick={()=>TirarEsse(index)}>
                            <i class="fas fa-trash"></i> 
                             </a> 
                     </View>             

                              ))}  */}
                    

                    {/* <string  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Qtd. Jogo(s) {QuanJog} </string><br/> 
                    <string  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Total Cota(s): {VaToCo}</string><br/>  
                    <string  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Cash(s) Recebida: {QCash}</string><br/>  
                    <div className="col-sm-8" style={{ margin:10  }}>
                            <div className="form-group">   
                    <Campo 
                                type={"text"}
                                placeholder={"Valor R$"}
                                icon={"fas fa-donate"}
                                value={ValApos}
                                onChange={e=>setValApos(e.target.value)}
                                mask={"R$999,99"}
                                /> 
                       </div>
                            </div> 
                            <div  className="Valopre">
                            <div className="Titupre">
                            <h7  style={{fontWeight:"bold", margin:10  }}>Valor Do Prêmio: R$ {ValPreDemos}</h7>   
                          </div>
                          
                              {Cambis === true ?
                              <>
                               <div className="col-sm-8" style={{marginTop:20 }}>
                              <Butao 
                            style={"btn btn-sm btn-danger"}
                            titulo={"Sair Do Modo Cambista"}
                            onClick={()=>setCambis(false)}
                            /> 
   
                              </div>
                                <string  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Cambista  </string><br/>
                               <string  style={{marginLeft:10, fontSize:12  }}>Aposta Vencedora </string><br/>
                               <string  style={{marginLeft:10, fontSize:12  }}> 10% do Premio para o Cambista. </string><br/>
                               <string  style={{fontWeight:"bold", marginLeft:10, fontSize:13  }}>Valor do Ganho: R$ {ValCambis} </string><br/> 
                               <string  style={{fontWeight:"bold", marginLeft:10, fontSize:13  }}>Nome Do Cliente </string><br/> 
                                  <div className="form-group">   
                    <Campo 
                                type={"text"}
                                placeholder={"Nome Cliente"}
                                icon={"fas fa-user"}
                                value={NomeCli}
                                onChange={e=>setNomeCli(e.target.value)}
                                mask={null}
                                /> 
                       </div> 
                       <string  style={{fontWeight:"bold", marginLeft:10, fontSize:13  }}>Whatsapp Do Cliente </string><br/> 
                                  <div className="form-group">   
                    <Campo 
                                type={"text"}
                                placeholder={"Telefone"}
                                icon={"fas fa-phone"}
                                value={TelCli}
                                onChange={e=>setTelCli(e.target.value)}
                                mask={"(99)99999-9999"}
                                /> 
                       </div> 
                      
                              
                              </>

                              :
                              <div className="col-sm-8" style={{marginTop:20 }}>
                              <Butao 
                            style={"btn btn-sm btn-warning"}
                            titulo={"Aposta de Cambista"}
                            onClick={()=>AposCambis()}
                            /> 
   
                              </div>

                              }
                          <div className="col-sm-8" style={{marginTop:20 }}>
                              <Butao 
                            style={"btn btn-sm btn-success"}
                            titulo={"Pagar a Aposta"}
                            onClick={()=>PagandoPix()}
                            />  
                          
                             

                              </div>
                              <div className="col-sm-8" style={{marginTop:20 }}>
                              <Butao 
                            style={"btn btn-sm btn-info"}
                            titulo={"Pagar com Cash"}
                            onClick={()=>PagandoCash()}
                            />  
                          
                             

                              </div>
                          </div> */}
                          
                          
                          {/* </>

                          }
                      
                          </ScrollView>
                          
                      </>
 
                      }
                */}
              </>
             
              }
             </View>
          </Modal>

          {/* <Modal
              transparent={true}
            animationType="slide"
            visible={ModalVer}
            > */}
             
               
          {/* </Modal> */}
          <ImageBackground source={require("../assets/estadio3.jpg")} 
          resizeMode='cover' 
          style={styles.imageBack} >
            <View style={styles.CaixaTitulo} >
              <TouchableHighlight  style={styles.CaixaDados}>
              <Image source={require('../assets/logomarca.svg')}  style={styles.ImageVer2 } />
              </TouchableHighlight>
            
             

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
              Apostas
             </Text>
              </TouchableHighlight>
              <View  style={styles.AreaBtnTopConf}>

              <TouchableHighlight  style={styles.CaixaDados}>
              <FontAwesome name="money" size={24} color="#fff" />
              </TouchableHighlight>


              <TouchableHighlight  style={styles.CaixaDados}>
                {Vencido === true ?
                <FontAwesome name="calendar-times-o" size={24} color="#fff" />
                :
                <FontAwesome name="calendar-check-o" size={24} color="#fff" />
                }
              
              </TouchableHighlight>

              

              <TouchableHighlight  style={styles.CaixaDados}>
              <FontAwesome name="bell"  size={24} color="#fff" />
              </TouchableHighlight>

              <TouchableHighlight  style={styles.CaixaDados}>
              <FontAwesome name="gear" size={24} color="#fff" />
              </TouchableHighlight>


           </View>
            </View >
          <View  style={styles.AreaBtn}>
          
              
          <TouchableHighlight onPress={()=>setRelogio(true)}  style={styles.InputHora}>
            <>
          <FontAwesome name="clock-o" size={20} color="black" />
          <Text  style={styles.modalText6}> {hr} </Text>
          </>     
                
          </TouchableHighlight>
                       <View  style={styles.AreaBtn4}>
                       <FontAwesome name="calendar" size={20} color="black" />
            </View>
            <TouchableHighlight onPress={()=>setModalCalend(true)}  style={styles.AreaBtn3}>
            <View style={styles.modalView3}><Text  style={styles.modalText6}> {dataNasc} </Text></View>
          {/* <ModalDatePicker
                button={<View style={styles.modalView3}><Text  style={styles.modalText6}> {dataNasc} </Text></View>} 
                locale="pt" 
                onSelect={(date) =>Mudedate(date) }
                isHideOnSelect={true}
                initialDate={new Date()}
                language={require('../services/locales.json')}
                  /> */}
                 
                  </TouchableHighlight>
          
          </View>
          <View  style={styles.AreaBtnLiga}>
          <FlatList
         showsHorizontalScrollIndicator={false}
          style={styles.flatList}
          horizontal
          data={ListLig}
          keyExtractor={post=> String(post.id)}
          renderItem={({item}) => (
  
            <TouchableHighlight onPress={()=>Pesquisa(item.Pais, item.nome)} style={{"backgroundColor": VerLiga===item.nome && VerLigPais ==item.Pais ? "#FFE767":"#fff", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:30, borderRadius:5, marginRight:10, borderColor:"#000", borderWidth:2, paddingLeft:5, paddingRight:5,}} >
            <>
          <Text  style={styles.modalText6}> {item.Pais} - {item.nome} </Text>
          </>     
                
          </TouchableHighlight>
              
          )}
        />
        </View>
          
        <ScrollView>
          { Lista[0] ?
          <>
          {Lista.map((item, key)=>(
           <>
            <View  style={styles.Post}>
              <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View >
       
              <View style={styles.Botoes}>
              {item.Best.map((item3, key)=>( 
                
                  < >
                  
              {item3.Grupo === "Vencedor da partida" &&
               <TouchableHighlight onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>{item3.Casa}</Text>
                </View>

                <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
                </>
               </TouchableHighlight>
                }
                </>

                ))}

             

               <TouchableHighlight style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>+</Text>
                </View>

                <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>+78</Text>
                </View>
                </>
               </TouchableHighlight>
              </View>
               



            </View>
           
              </>

              ))}

              </>
              :
              <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     

              </>
              }
              </ScrollView>
          
            {/* <DatePickerModal
        mode="single"
        visible={Relogio}
        onDismiss={onDismiss}
        date={new Date()}
        onConfirm={onChange}
        saveLabel="Save" // optional
        label="Select date" // optional
        animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        locale={'pt'} // optional, default is automically detected by your system
      /> */}
      <TimePickerModal
        visible={Relogio}
        onDismiss={onDismiss}
        onConfirm={onChange}
        hours={0} // default: current hours
        minutes={0} // default: current minutes
        label="Select time" // optional, default 'Select time'
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale={'pt'} // optional, default is automically detected by your system
      />
         <TouchableHighlight style={styles.VerBole}  onPress={()=>Vernota()}>
         <>
         {SimAp.length > 0 &&
         <View style={styles.AvisoJgo}>
         <Text style={{color:"#fff", fontSize:15}}>{SimAp.length}</Text>
         </View>

         }
         
         <FontAwesome name="th-list" size={24} color="#fff" />
         <Text style={{color:"#fff", fontSize:10}}>Jogos</Text>
         </>
          </TouchableHighlight>   

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
      backgroundColor:"red",
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
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    padding:15,
    backgroundColor:"rgba(0,0,0,0.3)"
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
     width:80,
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
     justifyContent:"flex-start",
     backgroundColor:"#FFF",
     height:60,
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