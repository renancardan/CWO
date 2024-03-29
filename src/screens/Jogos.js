
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text, FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView, Linking, } from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import { ModalDatePicker } from "react-native-material-date-picker";
import Hora from '../components/Hora';
import SignInput from '../components/SignInputIni';
import SignInputCod from '../components/SignInput';
import Telefone from '../components/NumberTel';
import { Calendar } from 'react-native-calendario';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import Api from '../Api';
import DataTime from '../components/datando';
import Money from '../components/Money';
import { useNavigation } from '@react-navigation/native';
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from '../contexts/UserContext';
import moment from 'moment';
import MultiSelect from 'react-native-multiple-select';
import ProfList from '../services/Profissoes.json'
import EstCid from '../services/cidadejson.json'
import Empre from '../services/Empresas.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//import Datand from '../components/datando';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);
  
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
  const [IdApos, setIdApos] = useState("")
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
  const [AdrirMais, setAdrirMais] = useState("");
  const [AbMoney, setAbMoney] = useState(false);
  const [AbVenc, setAbVenc] = useState(false);
  const [CriarCli, setCriarCli] = useState(false);
  const [Concluir, setConcluir] = useState(false);
  const [NomeCam, setNomeCam] = useState("");
  const [TelCam, setTelCam] = useState("");
  const [Pago, setPago] = useState(false);
  const [EnviLin, setEnviLin] = useState(false);
  const [Premio, setPremio] = useState(false);
  const [Aprov, setAprov] = useState(false);
  const [Analisado, setAnalisado] = useState(false)
  const [AproPag, setAproPag] = useState(false);
  const [StatusAp, setStatusAp] = useState([]);
  const [AnliAp, setAnliAp] = useState(false);
  const [open, setOpen] = useState(false);
  const [Cidade, setCidade] = useState("");
  const [Estado, setEstado] = useState("");
  const [ListSexo, setListSexo] = useState([
    {
      id:"Masculino", nome:"Masculino"
    },
    {
      id:"Feminino", nome:"Feminino",
    }
  ]);
  const [VerCidade, setVerCidade] = useState([]);
  const [selectedItems, setselectedItems] = useState([])
  const [ListTipo, setListTipo] = useState([
    {
      id:true, nome:"Pessoal"
    },
    {
      id:false, nome:"Empresarial",
    }
  ]);
  const [TipoCart, setTipoCart] = useState(null);
  const [Empresa, setEmpresa] = useState("");
  const [NumEmp, setNumEmp] = useState("");
  const [Profissao, setProfissao] = useState("");
  const [NumProf, setNumProf] = useState("");
  const [Sexo, setSexo] = useState("");
  const [EsCart, setEsCart] = useState("");
  const [IdNoticia, setIdNoticia] = useState("")
  
 
  useEffect(() => { 
      ListandoOc();
  }, []);

  // useEffect(() => { 
  //     ListandoOc();
  //     console.log("Estado"+Estado)
  //     console.log("Cidade"+Cidade)
  //     console.log("TipoCart"+TipoCart)
  //     console.log("Sexo"+Sexo)
  //     console.log("NumProf"+NumProf)
  //     console.log("NumEmp"+NumEmp)
  // }, [TipoCart, Estado, Cidade, Sexo, NumProf, NumEmp]);

  useEffect(() => {
    tempo();
  }, [])
  useEffect(() => {
    if(ListOc.length >= 1){
      PegandoLig()
    }
  console.log(ListOc)
   }, [ListOc, TipoCart, Estado, Cidade, Sexo, NumProf, NumEmp])

   useEffect(() => {
    if(IdApos !== ""){
      ConcluidoAposta()
    }
 
   }, [Concluir])

   useEffect(() => {
    if(SimAp.length !== 0 && Pago === true){
      AnalisandoOlds();
    }
 
   }, [SimAp, Pago])

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
   useEffect(() => {
    EntrandoLinks()
   }, [])

  // useEffect( ()=>{ 
  //   if(Page !== 1){
  //     ListandoOc();  
  //   }            
  //  }, [Page]);


  const EntrandoLinks = async () => {
    const Site = window.location.href;
  const VerSite =  Site.split("/");
 
  if(VerSite[3] === "Noticias"){
      navigation.navigate("CartaoVisita", {
            id:VerSite[4],
          
          })

    await AsyncStorage.setItem('Tel', VerSite[5]);    
 
  }   
   
  }
  const EscoEstado = (item)=>{
   
   
    for(let i in EstCid){
      if(EstCid[i].sigla === item[0]){
        setCidade("")
        setEstado(EstCid[i].nome)
        console.log(EstCid[i].nome)
        var listacid = []
        for(let j in EstCid[i].cidades){
           listacid.push({
            id:EstCid[i].cidades[j],
            nome:EstCid[i].cidades[j],
           })
        }
        setVerCidade(listacid)
      }
    }
  }
  const EscoCidade = (item)=>{
    setCidade(item[0])
  }

  const IrWhats = ()=>{
    Linking.openURL(`https://wa.me/+5599984136843?text=Ola`)
  }

  const IrInsta = ()=>{
    Linking.openURL(`https://www.instagram.com/routecitybacabal/`)
  }

  const EscoTipoCart = (item)=>{
    setTipoCart(item[0])
    if(item[0]){
      setEsCart("Pessoal")
      setNumEmp("")
      setEmpresa("")
    } else {
      setEsCart("Empresarial")
      setSexo("")
      setNumProf("")
      setProfissao("")
    }
  }
  const SeleciSexo = (item)=>{
    setSexo(item[0])
  
   
  }

  const SeleciProf1 = (item)=>{
    setNumProf(item[0])
   for(let i in ProfList){
    if(ProfList[i].id === item[0]){
      setProfissao(ProfList[i].profissao)
    }
   }
   
  }

  const ConcluidoAposta = ()=>{
    Api.TiraConcluidoApos(IdApos, Concluir)
  
  }
  const AnalisandoOlds = ()=>{
    setCarre(true)
    Api.AnaliseOlds(SimAp, IdApos, setAnliAp, setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)
  }

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

  
    
            
            if(Estado === "" && Cidade === "" && TipoCart === null){
              
              resRev.push(ListOc[i])
              
            } else if(Estado !== "" && Cidade === "" && TipoCart === null){
              
              if(ListOc[i].Estado === Estado){
                resRev.push(ListOc[i])
              }
             
             
           
            } else if(Estado !== "" && Cidade !== "" && TipoCart === null){
              
              if(ListOc[i].Estado === Estado && ListOc[i].Cidade === Cidade){
                resRev.push(ListOc[i])
              }
            
           
            }  else if(Estado !== "" && Cidade === "" && TipoCart !== null && Sexo === "" && NumProf === "" && NumEmp === "" ){
              
              if(ListOc[i].Estado === Estado && ListOc[i].Pessoal === TipoCart){
                resRev.push(ListOc[i])
              }
             
         
            }  else if(Estado === "" && Cidade === "" && TipoCart !== null && Sexo === "" && NumProf === "" && NumEmp === "" ){
              
              if( ListOc[i].Pessoal === TipoCart){
                resRev.push(ListOc[i])
              }
              
             
            }   else if(Estado !== "" && Cidade !== "" && TipoCart !== null  && Sexo === "" && NumProf === "" && NumEmp === "" ){
              
             
              if(ListOc[i].Estado === Estado && ListOc[i].Pessoal === TipoCart && ListOc[i].Cidade === Cidade){
                resRev.push(ListOc[i])
              }
            
               
            }  else if(Estado !== "" && Cidade === "" && TipoCart === true && Sexo !== "" && NumProf === "" && NumEmp === "" ){
              
              
              if(ListOc[i].Estado === Estado && ListOc[i].Pessoal === TipoCart && ListOc[i].Sexo === Sexo ){
                resRev.push(ListOc[i])
              }

          
                } else if(Estado === "" && Cidade === "" && TipoCart === true && Sexo !== "" && NumProf === "" && NumEmp === ""){
                  if( ListOc[i].Pessoal === TipoCart && ListOc[i].Sexo === Sexo ){
                    resRev.push(ListOc[i])
                  }
           
             
            }   else if(Estado !== "" && Cidade !== "" && TipoCart === true && Sexo !== "" && NumProf === "" && NumEmp === ""){
              
              if(ListOc[i].Estado === Estado && ListOc[i].Pessoal === TipoCart && ListOc[i].Sexo === Sexo && ListOc[i].Cidade === Cidade){
                resRev.push(ListOc[i])
              }
            
            
            } else if(Estado !== "" && Cidade === "" && TipoCart === true && Sexo === "" && NumProf !== "" && NumEmp === "" ){
              
              if(ListOc[i].Estado === Estado && ListOc[i].Pessoal === TipoCart && ListOc[i].Profissao.includes(NumProf) ){
                resRev.push(ListOc[i])
              }
             
                } else if(Estado === "" && Cidade === "" && TipoCart === true && Sexo === "" && NumProf !== "" && NumEmp === ""){
                  
                  if( ListOc[i].Pessoal === TipoCart && ListOc[i].Profissao.includes(NumProf) ){
                    resRev.push(ListOc[i])
                  }
             
              
            }   else if(Estado !== "" && Cidade !== "" && TipoCart === true && Sexo === "" && NumProf !== "" && NumEmp === ""){
              
              if(ListOc[i].Estado === Estado &&  ListOc[i].Pessoal === TipoCart && ListOc[i].Profissao.includes(NumProf) && ListOc[i].Cidade === Cidade ){
                resRev.push(ListOc[i])
              }
              
              
            } else if(Estado !== "" && Cidade === "" && TipoCart === true && Sexo !== "" && NumProf !== "" && NumEmp === "" ){
              if(ListOc[i].Estado === Estado &&  ListOc[i].Pessoal === TipoCart && ListOc[i].Profissao.includes(NumProf) && ListOc[i].Sexo === Sexo ){
                resRev.push(ListOc[i])
              }
            
             
           
                } else if(Estado === "" && Cidade === "" && TipoCart === true && Sexo !== "" && NumProf !== "" && NumEmp === ""){
                  if( ListOc[i].Pessoal === TipoCart && ListOc[i].Profissao.includes(NumProf) && ListOc[i].Sexo === Sexo ){
                    resRev.push(ListOc[i])
                  }
              
               
            }   else if(Estado !== "" && Cidade !== "" && TipoCart === true && Sexo !== "" && NumProf !== "" && NumEmp === ""){
              if(ListOc[i].Estado === Estado &&  ListOc[i].Pessoal === TipoCart && ListOc[i].Profissao.includes(NumProf) && ListOc[i].Sexo === Sexo && ListOc[i].Cidade === Cidade){
                resRev.push(ListOc[i])
              }
            
           
              
            } else if(Estado !== "" && Cidade === "" && TipoCart === false && Sexo === "" && NumProf === "" && NumEmp !== "" ){
              if(ListOc[i].Estado === Estado &&  ListOc[i].Pessoal === TipoCart && ListOc[i].Empresa.includes(NumEmp) ){
                resRev.push(ListOc[i])
              }
           
            
              
                } else if(Estado === "" && Cidade === "" && TipoCart === false && Sexo === "" && NumProf === "" && NumEmp !== ""){
             
                  if(  ListOc[i].Pessoal === TipoCart && ListOc[i].Empresa.includes(NumEmp)){
                    resRev.push(ListOc[i])
                  }
              
            
             
            }   else if(Estado !== "" && Cidade !== "" && TipoCart === false && Sexo === "" && NumProf === "" && NumEmp !== ""){
              
              if(ListOc[i].Estado === Estado &&  ListOc[i].Pessoal === TipoCart && ListOc[i].Empresa.includes(NumEmp)  && ListOc[i].Cidade === Cidade){
                resRev.push(ListOc[i])
              }
             
            
            
            } 
 
           
           
 
      
   
     
        resli.push({
          
        })
      


    }


    
    
    setLista(resRev)
   }

   const Pesquisa = async (Pais, Liga)=>{
    setVerLiga(Liga);
    setVerLigPais(Pais)
    var bet = ListOc.filter(word => word.liga.name === Liga);
    setLista(bet);
  }

   const ListandoOc = ()=>{
    
    setCarreg(true)
    Api.PegandoContato(Page, setListOc, setCarreg  );
 
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
    setdataNasc(moment().format("DD/MM/YYYY"))
   
    setDtEsc(moment().unix()*1000)
    setDataMin(moment().unix()*1000)
    setDataMax(moment().unix()*1000)
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

  const AbrindoClend = ()=>{
    setModalCalend(true);
    setOpen(true);
  }

  const FecharCalend = ()=>{
    setModalCalend(false);
    setOpen(false);
  }

  const Mudedate = (date)=>{
    console.log("entrou data")
    console.log(date.date)
    setModalCalend(false)
    setOpen(false);
    setdataNasc("")
    let currentDate = "";
    let now25 =date.date.getTime();
    setDtEsc(now25)
    let Dia = date.date.getDate();
    let Mes = (date.date.getMonth()+1);
    let Ano = date.date.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Dia+'/'+Mes+'/'+Ano;
    setdataNasc(currentDate)
    let currentDate1 = Ano+'-'+Mes+'-'+Dia;

  }

  const onChangeRec = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
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
          // navigation.navigate("Pagar", {
          //   Site:LinkEnv
          // })
           n
       
        }

        const IrNoti = ()=>{
           navigation.navigate("Notific") 
        }

        const IrConfig = ()=>{
          navigation.navigate("Config") 
       }

       const IrCartao= (item, list)=>{
        navigation.navigate("CartaoVisita", {
          id:item,
        });
     }

        const Vernota = ()=>{
        
          setModalCalend(true);
          setVerNotajogo(true)
        }

        const Siarnota = ()=>{
          setNomeCam("");
            setTelCam("");
           setTelCli("");
           setNomeCli("")
           setPago(false);
           setConcluir("");
           setValPreDemos("");
           setValorReal("");
           setSimAp([]);
           setValCambis("");
           setVaToCo("");
           setValApos(""); 
           setQCash("");
           setIdApos("");
           setQuanJog("");
           setPremio(false)
           setAnalisado(false)
           setAprov(false)
           setCambis(true);
           setVCash("");
           setAnliAp(false);
           setStatusAp([]);
           setAproPag(false);
           setPgCash(false)
          setModalCalend(false);
          setVerNotajogo(false);
          setCriarCli(false)
        }
        const BaixandoPag = ()=>{
          window.location.reload(true);
        }
      
        const VerLinkMsg2 = ()=>{
      
          if(userState.versaoBanco.LinkMsg2 !== ""){
            Linking.openURL(userState.versaoBanco.LinkMsg2);
          }
          
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
            if(ValorReal <= 1000 ){
            if(ValorReal >= 5){
              if(SimAp.length > 2){
  
                 if(Cambis === false){
                  setCarre(true);
                  Api.PagandoJogo(IdApos, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)
                 
                } else {
  
                  if(NomeCli !== ""){
                  
                 
                      setCarre(true);
                      Api.PagandoJogo(IdApos, QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo  )
                 
                  
  
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
          } else {
            setModalCalend(true);
            setVerNotajogo(false);
            setAlert("R$ 1000,00 é o Maior valor que você pode aposta!");
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

         const SairCriar = ()=>{
          setAlertTipo(null);
          setAlert("");
          setModalCalend(false);
          setVerNotajogo(false);
          setCriarCli(false);
          setEnviLin(false);
          setIdApos("");
         }

         const PagandoCash = ()=>{
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
            setModalCalend(true);
            setVerNotajogo(false);
            setAlert("Algum desses jogos já esta preste a começar ou já começou, exclua e escolha outro jogo!");
            setAlertTipo("danger");
  
  
          } else {
            if(ValorReal <= 1000 ){
            if(ValorReal >= 5){
              if(SimAp.length > 2){
  
                 if(Cambis === false){
                  setCarre(true);
                  Api.PagandoJogoCASH(IdApos, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)
                 
                } else {
  
                  if(NomeCli !== ""){
                  
                 
                      setCarre(true);
                      Api.PagandoJogoCASH(IdApos, QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)
                 
                  
  
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
          } else {
            setModalCalend(true);
            setVerNotajogo(false);
            setAlert("R$ 1000,00 é o Maior valor que você pode aposta!");
            setAlertTipo("danger");
  
  
          }
  
          }
          
         
         
         
         }

         const SeleciEmp1 = (item)=>{
          setNumEmp(item[0])
         for(let i in Empre){
          if(Empre[i].id === item[0]){
            setEmpresa(Empre[i].Emp)
          }
         }
         
        }
        const loadPage = (pageNumber = Page)=>{
          
           setPage(pageNumber + 1)
          
           
       }

         const GerarCod =  async ()=> {
          
          if(Robo === false){
            
            setCarre(true)
            Api.GeradorDeCod(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend);
          } else {
            setModalCalend(true);
            setVerNotajogo(false);
            setAlert("Por Favor Clique em NÃO SOU ROBÔ!");
            setAlertTipo("danger")
          }
         
            
         
           
          }

          const CriandoCliente =  async ()=> {
            if(NomeCli !== ""){
              if(TelCli !== ""){
            if(Robo === false){
              setCarre(true)
              Api.CriandoCli(NomeCli,  TelCli, setRobo, setNomeCli, setTelCli, setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli);
            } else {
             
              setAlert("Por Favor Clique em NÃO SOU ROBÔ!");
              setAlertTipo("danger")
            }
         
        } else {
           
          setAlert("Preencha o Whatsapp Do Cliente");
          setAlertTipo("danger");

        }
      } else {
           
        setAlert("Preencha o Nome Do Cliente");
        setAlertTipo("danger");

      }
           
              
           
             
            }


            const EnviandoLink =  async ()=> {
              if(Pago === true){

              
             
              if(Robo === false){
                setCarre(true)
                Api.EnviandoNota(IdApos,  setPago, setRobo,  setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli, setEnviLin, setIdApos);
              } else {
               
                setAlert("Por Favor Clique em NÃO SOU ROBÔ!");
                setAlertTipo("danger")
              }     
         
      } else {
             
        setAlert("Esse Jogo Não Pode ser Enviado, pois Não Está Pago!");
        setAlertTipo("danger");

      }
        
             
                
             
               
              }

          const CompPgCash = ()=>{

            if(parseInt(Senha)  === CodLast){
            setCarre(true)
            Api.PgCshAti(VCash, IdAposta, setCarre, setLinkEnv, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash, setValApos, setVCash, setRobo, setCodG, setTentativa, setSenha  )
          } else {
            setTentativa(Tentativa +1)
           setAlertTipo("danger")
            setAlert("Código Errado "+(Tentativa+1)+"° tentativa de 3");
            setModalCalend(true);
            setVerNotajogo(false);
          }
          }
        
          const RenviarCod = ()=>{
            setCodG(false);
            setTentativa(0);
            setSenha("");
          }

          const AbrindoMais = (item)=>{
            if(AdrirMais === ""){
              setAdrirMais(item)
            } else {
              setAdrirMais("")
            }
            
          }

          const Atualizar = ()=>{
          setNumEmp("")
          setEmpresa("")
          setTipoCart(null)
          setEsCart("")
          setNumProf("")
          setProfissao("")
          setEstado("")
          setVerCidade([]);
          setCidade("");
          setSexo("")
        
         }

          const AbrinoMoney = ()=>{
            setAbMoney(!AbMoney)
            setAbVenc(false)
          }

          const AbrindoVenc = ()=>{
            setAbVenc(!AbVenc)
            setAbMoney(false)
          }

          const AbrirCriar = ()=>{
            setModalCalend(true);
            setCriarCli(true)
          }

          const AbrirEnviar = (item)=>{
            setModalCalend(true);
            setCriarCli(true)
            setEnviLin(true);
            setPago(item.Pago);
            setIdApos(item.id);
           
           
          }

          const AbrirModal = (item)=>{
            
             setNomeCam(item.NomeCam);
             setTelCam(item.TelCam);
            setTelCli(item.TelCli);
            setNomeCli(item.Nome)
            setPago(item.Pago);
            setValPreDemos(item.ValPreDemos);
            setValorReal(item.ValorReal);
            setSimAp(item.SimAp);
            setValCambis(item.ValCambis);
            setVaToCo(item.VaToCo);
            setValApos(item.ValApos); 
            setQCash(item.Cash);
            setIdApos(item.id);
            setQuanJog(item.SimAp.length);
            setPremio(item.PremioPago)
            setAnalisado(item.AnaliTotal)
            setAprov(item.Aprovado)
            setCambis(item.Cambista);
            setVCash(item.ValorReal*100);
            setVerNotajogo(true);
            setModalCalend(true)
           
            
          }

          const FechaModal = ()=>{
            
            setNomeCam("");
            setTelCam("");
           setTelCli("");
           setNomeCli("")
           setPago(false);
           setConcluir("");
           setValPreDemos("");
           setValorReal("");
           setSimAp([]);
           setValCambis("");
           setVaToCo("");
           setValApos(""); 
           setQCash("");
           setIdApos("");
           setQuanJog("");
           setPremio(false)
           setAnalisado(false)
           setAprov(false)
           setCambis(true);
           setVCash("");
           setVerNotajogo(false);
           setModalCalend(false);
           
           
         }
         const PagarDinheiro = ()=>{
          setCarre(true)
            Api.Enviandopaga(IdApos, ValPreDemos, setPremio, setCarre)
         }
  

    return (
      <View style={styles.Container}>
           <Modal
            transparent={true}
            animationType="slide"
            visible={ModalCalend}
            >
              <View style={styles.viewCalend}>
              {CriarCli === true ?

              <>
                {Carre === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
                      
                      
                      </>

                      :
                      <>
                <View style={styles.QuadNota} >
                <ScrollView>
                  {EnviLin === true ?
                  <>
                   <View  style={styles.CaixadeapostaTitulo}  >
                   <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Enviar Link</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>SairCriar()}><Text>X</Text></TouchableHighlight></View>
                     </View> 
                     <View  style = {styles.AraCli}>
                         
                            </View>
                           
                  </>
                  :
                  <>
                  <View  style={styles.CaixadeapostaTitulo}  >
                  <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Criar Cliente</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>SairCriar()}><Text>X</Text></TouchableHighlight></View>
                  </View> 
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
                  }
                       
                      
               <ReCAPTCHA
                          ref={captcha}
                          sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                          size="normal"
                          hl="pt"
                          theme="dark"
                          onChange={onChangeRec}
                            />
                            {Alert !== "" &&
                              <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"red"  }}>{Alert}</Text> 
                            }

                            {EnviLin === true ?
                              <TouchableHighlight style={{width:250, height:50, backgroundColor:"#00A859", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>EnviandoLink()}>
                              <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Enviando Link</Text>
                            </TouchableHighlight>
                            :
                            <TouchableHighlight style={{width:250, height:50, backgroundColor:"#00A859", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>CriandoCliente()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Criar Cliente para Jogo</Text>
                          </TouchableHighlight>

                            }
                           
                          </ScrollView>
              </View>
              </>
                }
              </>


              :
              <>

{VerNotajogo === false ?
              <>
              {AlertTipo === null?
              <>
  <View  style={styles.QuadCalend}>
               <TouchableHighlight onPress={()=>setModalCalend(false)} style={styles.CalendBtn}>
                  <Text style={styles.CalendTexSim}>Fechar</Text>
                 </TouchableHighlight>
                 <DatePickerModal
                  locale="pt"
                  mode="single"
                  visible={open}
                  onDismiss={FecharCalend}
                  date={new Date(DtEsc)}
                  saveLabelDisabled={true} 
                  onChange={(range1) => Mudedate(range1)}
                editIcon={false} // optional, default is "pencil"
                
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
                        <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Banco de Cash</Text><TouchableHighlight style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
                      </View> 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Banco de Cash:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>{DCash} </Text>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor Aposta:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>{ValApos} </Text>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>R$ 1,00 vale 100 Cash</Text>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor da Aposta Em Cash:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>{VCash} </Text> 
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
                          onChange={onChangeRec}
                            />
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código de Pagamento</Text>
                          </TouchableHighlight>

              
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
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>CompPgCash()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar</Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }

                        </>

                          }

                        </>
                        :
                        <>
                           <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>Você Não Tem Cash Suficiente!</Text> 
                        </>
                      }
                          
                        
                       
                       
                        </>
                        :
                        <>
                        <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Simulador de Aposta</Text> <TouchableHighlight style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
                      </View> 
                      {SimAp.map((item3, index)=>( 
                     <View   style={styles.Caixadeaposta}  >
                   
                     <Text style={styles.TexNota1}>{item3.CasaTime.name.substr(0, 15)}. X {item3.ForaTime.name.substr(0, 15)}.</Text> 
                     <Text style={styles.TexNota1}>Palpite: {item3.Casa} | Cota: {item3.Olds}</Text>
                     <Text style={styles.TexNota1}>({item3.Grupo})</Text>
                     <Text style={styles.TexNota1}><DataTime  data={item3.dataJogo*1000} /> </Text>
                     
                     {StatusAp.map((item25, index)=>(
                      <>
                      {item25.id === item3.IdCasa &&
                      <>
                      {item25.Resultado === "Reprovado" ?
                        <View  style={styles.ExcluirJogo} >
                        <FontAwesome name="remove" size={24} color="red" />
                        </View>
                        :
                        <>
                        {item25.Resultado === "Aprovado"?
                        <View  style={styles.ExcluirJogo} >
                        <FontAwesome name="check" size={24} color="green" />
                        </View>
                        :
                        <View  style={styles.ExcluirJogo} >
                        <FontAwesome name="spinner" size={24} color="black" />
                        </View>
                        }
                        
                        </>
                      }
                        
                     </> 

                      }
                     </>
                        ))}
                    
                     </View>             

                              ))}
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Qtd. Jogo(s) {QuanJog} </Text>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Total Cota(s): {VaToCo}</Text> 
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Cash(s) Recebida: {QCash}</Text>  
                    


                    <View style={styles.InputHora}>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor:</Text>  
               
              <Text  style={{ margin:10, fontSize:17  }}>{ValApos}</Text>
                  
                  
                   </View>
                 
                          <View style={styles.Valopre}>
                            <View style={styles.Titupre}>
                            <Text  style={{fontWeight:"bold", margin:10, fontSize:15  }}>Valor Do Prêmio: R$ {ValPreDemos}</Text>
                            </View>
                            {Cambis === true ?
                            <>
                           <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Cambista</Text>
                            <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Aposta Vencedora</Text>
                            <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>10% do Premio para o Cambista.</Text>
                            <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Valor do Ganho: R$ {ValCambis}</Text>
                            <View  style = {styles.AraCli}>
                           <FontAwesome name="phone-square" size={24} color="black" />
                             <Text  style={{ margin:10, fontSize:17  }}>{TelCli}</Text>
                            </View>
                            <View  style = {styles.AraCli}>
                            <FontAwesome name="user" size={24} color="black" />
                             <Text  style={{ margin:10, fontSize:17  }}>{NomeCli}</Text>
                            </View>
                            </>
                            :
                            <>
                          
                        
                            </>
                              }
                              {Pago === false &&
                              <>
                          
                           
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoPix()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar a Aposta</Text>
                          </TouchableHighlight>

                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#9B1AD3", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoCash()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Com Cash</Text>
                          </TouchableHighlight>


                              
                              </>

                              }
                         
                           {AproPag=== true &&
                          <>
                          {Premio === false ?
                          <>
                          {Pago === true &&
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#E77E1E", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagarDinheiro()}>
                          <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Receber Prêmio</Text>
                          </TouchableHighlight>
                          }
                         
                         </>
                         :
                         <>
                           <Text  style={{ marginLeft:10, fontSize:15  }}>1° - O Nome da sua Conta da PixBetCash tem que ser o mesmo nome que aparecerá na sua conta de transferência Pix, quando efetuarmos a transferência via Pix</Text>
                           <Text  style={{ marginLeft:10, fontSize:15  }}>2° - O Numéro do Whatsapp Que está Registrado Tem que Ser o Mesmo Da Chave Pix, aonde A Empresa fará a trasnferencia dos seus pagamentos.</Text>
                         <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Premio Enviado Para Pagamento</Text>
                         </> 
                          } 
                          </>

                          }
                      {Pago === true &&
                      <>
                          {Analisado === false &&
                          <>
                          {AnliAp === false &&
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#F96868", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AnalisandoOlds()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Analisar Resultado</Text>
                          </TouchableHighlight>

                          }
                        
                        </>
                          }
                          </>
                        }
                       

                         
                        
                          </View>
                          
                        </>
                        }

                        </ScrollView>
                      </View>
                      </>
                  }
            
               
                     
                          
                         
              </>
             
              }
              
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
          {Carreg ?
          <>
            <Image source={require('../assets/loading-87.gif')}  style={{marginTop:300, width:200, height:100}} />
          </>

          :
          <>
          <ImageBackground source={require("../assets/fundo.png")} 
          resizeMode="cover" 
          style={styles.imageBack} >
            <View style={styles.CaixaTitulo} >
              <TouchableHighlight  style={styles.CaixaDados}>
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
              </TouchableHighlight>
            
             

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
              Notícias
             </Text>
              </TouchableHighlight>
              <View  style={styles.AreaBtnTopConf}>

            
              <TouchableHighlight  onPress={()=>IrConfig()}  style={styles.CaixaDados}>
              <FontAwesome name="gear" size={24} color="#000" />
              </TouchableHighlight>

              <TouchableHighlight  onPress={()=>Atualizar()}  style={styles.CaixaDados}>
              <FontAwesome name="refresh" size={24} color="#000" />
              </TouchableHighlight>

           </View>
            </View >
            {AbMoney === true &&
             <View style={styles.TextInforma}>
             <Text style={{margin:10, fontSize:17, color:"green", fontWeight:"bold"}} >RECEBER: R${userState.nome.toFixed(2)}</Text>
             </View>


            }

            {AbVenc === true &&
            <View style={styles.TextInforma}>

          <Text style={{margin:10, fontSize:17, color:"#000", fontWeight:"bold"}} >VENCIMENTO: {userState.data_nasc}</Text>
            </View>

            }
       <FlatList
        data={Lista}
        onEndReached={()=>loadPage()}
        ListFooterComponent={ Load &&   <LoadingIcon size="large" color="#FFFFFF" /> }
        keyExtractor={item => item.id}
        renderItem={({item}) => 
        <>
         <View  style={styles.Post}>
                            <TouchableHighlight onPress={()=>IrCartao(item.id, item)} style={{padding:10,  flexDirection:"column",  alignItems:"center", justifyContent:"center",  width:wp('100%'), borderBottomWidth:1, marginBottom:5, borderColor:"#FFE767",}}>
                            <>
                            <View  style={styles.CaixaNome}>
                            {/* {item.Foto.Ativar === true &&
                            <Image source={{uri:item.Foto.Link}} style={{width:50, height:50, borderRadius:25,  borderWidth:2, borderColor:"#fff", }} />
                            } */}
                             <Image source={{uri:item.Url1}} style={{width:300, height:300, borderRadius:10,  borderWidth:2, borderColor:"#FFE767", }} />

                            </View> 

                            <View  style={styles.CaixaNome}>

                              <Text style={{color:"#fff", fontSize:25, fontWeight:"bold"}}>{item.Titulo}</Text>
                              {/* <Text style={{color:"#FFF", fontSize:14,}}>{item.ListCredenciais.length} Credências</Text>
                              <Text style={{color:"#FFF", fontSize:14,}}>{item.SalvouNum.length} Salvamentos</Text> */}
                            </View> 
                            {/* <View  style={styles.CaixaNome}>
                            {item.ListCredenciais.length >= 10 &&  item.ListCredenciais.length < 100 &&
                            <Image source={require('../assets/bronze.png')}  style={{width:40, height:60}}  />
                            }
                            {item.ListCredenciais.length >= 0 &&  item.ListCredenciais.length < 10 &&
                            <Image source={require('../assets/Zerado.png')}  style={{width:40, height:60}}  />
                            }
                            {item.ListCredenciais.length >= 100 &&  item.ListCredenciais.length < 1000 &&
                            <Image source={require('../assets/prata.png')}  style={{width:40, height:60}}  />
                            }
                            {item.ListCredenciais.length >= 1000 &&  
                            <Image source={require('../assets/ouro.png')}  style={{width:40, height:60}}  />
                            }

                            </View>  */}



                            </>
                            </TouchableHighlight>

                            <Text style={{marginLeft:30, marginBottom:5 , color:"#FFE767", fontSize:15, }}>{moment(item.dataCriacao).format("DD/MM/YYYY")}</Text>



                            </View>
        
        </>

        }
      
      />
      
      <TouchableHighlight style={styles.VerBole} onPress={()=>IrWhats()}>
         <>
       
         <Image source={require('../assets/whatsapp.png')}  style={{width:40, height:40}}  />   
         
       
         </>
          </TouchableHighlight> 
          <TouchableHighlight style={styles.VerBole5} onPress={()=>IrInsta()}>
         <>
       
         <Image source={require('../assets/instagram.png')}  style={{width:40, height:40}}  /> 
  
       
         </>
          </TouchableHighlight> 
     
  
        </ImageBackground>  
          </>
          }
            

        
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
  VerBole5:{
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
    bottom:120,
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
    width:70,
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
 
        CaixaNomeTest: {
   
    
          flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
          },

  CaixaNome: {
   width:300,
    marginLeft:-30,
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     flexDirection:"column",
     },

  Post: {
   backgroundColor:"#000",
   width: wp('90%'),
   borderRadius:10,
   marginBottom:10,
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
    color: "#000",
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
            backgroundColor: "#FFE767",
            flex:1,
          justifyContent:"center",
          alignItems:"center",
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
          
           paddingLeft:10,
           paddingRight:10,
           marginBottom:20,
           
          },
          ImageVer2: {
            width:  80,
            height: 80, 
          }, 
           
});