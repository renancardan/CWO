
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text, FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
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
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import ProfList from '../services/Profissoes.json'
import EstCid from '../services/cidadejson.json'
import Empre from '../services/Empresas.json'
import MultiSelect from 'react-native-multiple-select';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Video, ResizeMode } from 'expo-av';
//import Datand from '../components/datando';


export default ({route}) => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);
  
  const captcha = useRef(null)

  const [dataNasc, setdataNasc] = useState(null);
  const [ListOc, setListOc] = useState([]);
  const [Page, setPage] = useState(1);
  const [Load, setLoad] = useState(false);
  const [DataPesq, setDataPesq] = useState(new Date().getTime());
  const [Carreg, setCarreg] = useState(true);
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
  const [MsgErro1, setMsgErro1] = useState(false);
  const [MsgErro2, setMsgErro2] = useState(false);
  const [Btn, setBtn] = useState(false);
  const [IdTrans, setIdTrans] = useState("")
  const [IdCart, setIdCart] = useState(route.params.id)
  const [Noti, setNot] = useState()
  const [StatusCart, setStatusCart] = useState("")
  const [Loading, setLoading] = useState(false);
  const [Te1, setTe1] = useState(false);
  const [TelMsg, setTelMsg] = useState(true);
  const [TelMsg2, setTelMsg2] = useState(false)
  const [TelMsg3, setTelMsg3] = useState(false)
  const [TelMsg4, setTelMsg4] = useState(false);
  const [TelMsg5, setTelMsg5] = useState(false);
  const [TelMsg6, setTelMsg6] = useState(false);
  const [IrEnt, setIrEnt] = useState(false);
  const [code, setCode] = useState(null);
  const [CodiEmp, setCodiEmp] = useState("");
  const [CartBloq, setCartBloq] = useState(true);
  const [InfCart, setInfCart] = useState({})
  const [IdUser, setIdUser] = useState("");
  const [Uso, setUso] = useState(false);
  const [Ativo, setAtivo] = useState(false);
  const [NomeCart, setNomeCart] = useState("");
  const [AtiImg, setAtiImg] = useState(false);
  const [ImgCart, setImgCart] = useState("")
  const [FundoImg, setFundoImg] = useState("");
  const [FunCart, setFunCart] = useState("");
  const [AtiFun, setAtiFun] = useState(false);
  const [AtiTel, setAtiTel] = useState(false);
  const [TelCart, setTelCart] = useState("");
  const [WhatCart, setWhatCart] = useState("");
  const [AtiWhat, setAtiWhat] = useState(false);
  const [InstCard, setInstCard] = useState("");
  const [AtiInst, setAtiInst] = useState(false);
  const [InstruInst, setInstruInst] = useState(false)
  const [FaceCard, setFaceCard] = useState("");
  const [AtiFace, setAtiFace] = useState(false);
  const [InstruFace, setInstruFace] = useState(false)
  const [SiteCard, setSiteCard] = useState("");
  const [AtiSite, setAtiSite] = useState(false);
  const [InstruSite, setInstruSite] = useState(false)
  const [TwCard, setTwCard] = useState("");
  const [AtiTw, setAtiTw] = useState(false);
  const [InstruTw, setInstruTw] = useState(false)
  const [TikCard, setTikCard] = useState("");
  const [AtiTik, setAtiTik] = useState(false);
  const [InstruTik, setInstruTik] = useState(false)
  const [LocCard, setLocCard] = useState("");
  const [AtiLoc, setAtiLoc] = useState(false);
  const [InstruLoc, setInstruLoc] = useState(false)
  const [YouCard, setYouCard] = useState("");
  const [AtiYou, setAtiYou] = useState(false);
  const [InstruYou, setInstruYou] = useState(false)
  const [TeleCard, setTeleCard] = useState("");
  const [AtiTele, setAtiTele] = useState(false);
  const [InstruTele, setInstruTele] = useState(false)
  const [EmailCard, setEmailCard] = useState("");
  const [AtiEmail, setAtiEmail] = useState(false);
  const [InstruEmail, setInstruEmail] = useState(false)
  const [PixCard, setPixCard] = useState("");
  const [AtiPix, setAtiPix] = useState(false);
  const [InstruPix, setInstruPix] = useState(false);
  const [TipPix, setTipPix] = useState("");
  const [AtiSal, setAtiSal] = useState(false);
  const [AtiCom, setAtiCom] = useState(false);
  const [Logado, setLogado] = useState(false);
  const [SalVer, setSalVer] = useState(false);
  const [Fundos, setFundos] = useState([
    {id:"1", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2Ffundo1.png?alt=media&token=b152a38c-3771-461d-9416-0b5cd16fa574"},
    {id:"2", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F2%20(2).png?alt=media&token=044fa9d4-3316-408f-8808-af8fb36ced55"},
    {id:"3", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F3.png?alt=media&token=9dcdb33f-e854-4b5f-9ff7-5f7400428701"},
    {id:"4", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F4.png?alt=media&token=2dcedcd8-113d-4db3-a7eb-19125504943e"},
    {id:"5", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F5.png?alt=media&token=48beeb1e-56a8-4a93-a72d-b3f64aff9747"},
    {id:"6", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F6.png?alt=media&token=a66e3cc0-8a2c-4c3b-8b84-eb67ab87e192"},
    {id:"7", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F7.png?alt=media&token=435eefc3-54b5-4d7c-b0f6-155d19000d6d"},
    {id:"8", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F8.png?alt=media&token=32b336da-057c-4e29-b6a7-630a38321646"},
    {id:"9", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F9.png?alt=media&token=95110e86-1033-468c-bce3-cea0b13d2b5a"},
    {id:"13", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F13.png?alt=media&token=d8dd4506-aaef-4a38-a7c1-ea42fead88a6"},
    {id:"14", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F14.png?alt=media&token=738bc039-d6d8-4631-a8a3-71bc3d3574bd"},
    {id:"15", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F15.png?alt=media&token=38c288d5-f712-4df2-b31b-de94bfda11f3"},
    {id:"16", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F16.png?alt=media&token=d7c7dde7-69f7-45fc-b94e-84dda2b6b268"},
    {id:"17", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F17.png?alt=media&token=d14456c5-9dda-4c94-8a1e-db6199d95009"},
    {id:"18", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F18.png?alt=media&token=d50a8f82-30b4-43df-804a-80e68467c29a"},
    {id:"20", Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2F20.png?alt=media&token=c0e3553e-0e76-42c3-a16b-ea8cec0e9e1a"},
  ])
  const [AtivFund, setAtivFund] = useState(false);
  const [AtiPrivi, setAtiPrivi] = useState(false)
  const [Pessoal, setPessoal] = useState(false);
  const [Profissao, setProfissao] = useState(["",""]);
  const [profEsco1, setprofEsco1] = useState("")
  const [profEsco2, setprofEsco2] = useState("")
  const [Empresa, setEmpresa] = useState(["",""]);
  const [EscEmp1, setEscEmp1] = useState("");
  const [EscEmp2, setEscEmp2] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Estado, setEstado] = useState("");
  const [Sexo, setSexo] = useState("");
  const [CorCart, setCorCart] = useState("");
  const [IrImg, setIrImg] = useState(false);
  const [ListEmp, setListEmp] = useState([])
  const [selectedItems, setselectedItems] = useState([])
  const [VerCidade, setVerCidade] = useState([]);
  const [ListSexo, setListSexo] = useState([
    {
      id:"Masculino", nome:"Masculino"
    },
    {
      id:"Feminino", nome:"Feminino",
    }
  ])
  const [Cor, setCor] = useState("");
  const [LisCores, setLisCores] = useState(["#168500", "#0DBDE9", "#091A61", "#B59C0C", "#430459", "#0DBDE9", "#B16909", "#9F1F54" ])
  const [Menu, setMenu] = useState(false)
  const [AtivEntrada, setAtivEntrada] = useState(false)
  const [CartAtivod, setCartAtivod] = useState(false)
  const [NomePix, setNomePix] = useState("")
  const [BtnAgora, setBtnAgora] = useState("")
  const [IrConta, setIrConta] = useState(false);
  const [Creden, setCreden] = useState(false);
  const [LisCre, setLisCre] = useState([])
  const [QrCode, setQrCode] = useState("")
  const [DireSite, setDireSite] = useState(false)
  const [FotAnuncio, setFotAnuncio] = useState("")
  const [LinAnun, setLinAnun] = useState("")
  const [IdAnun, setIdAnun] = useState("")
  const [IdVizu, setIdVizu] = useState("")
  console.log(route.params.Lista)
 
  useEffect(() => {
    
      ListandoOc();
    
    
  }, []);

//   useEffect(() => {
    
//     criarListaem()
  
  
// }, []);

//   useEffect(() => {   
//   setTelMsg4(false)

//     }, [Nome]);

//   useEffect(() => {
//     if(Tel !== "" && Tel.length === 14 && Robo === false){
    
//     setTelMsg2(false);
//         TelWhats();
    
//     } else {
//       if(Robo === true && Tel.length > 3 ){
//         setTelMsg2(true);
//       }
//     }
    
// console.log(Robo)

//    }, [Tel, Robo])

//   useEffect(() => {
//     tempo();
//   }, [])

//   useEffect(() => {
   
//   }, [LisCre])


  //  useEffect(() => {
  //   if(IdApos !== ""){
  //     ConcluidoAposta()
  //   }
 
  //  }, [Concluir])

  //  useEffect(() => {
  //   if(SimAp.length !== 0){
  //     AnalisandoOlds();
  //   }
 
  //  }, [SimAp])

   useEffect(() => {
 
    if(DireSite === true){
      if(SiteCard !== ""){
        if(IdUser !== InfCart.IdDono){
          console.log(DireSite)
          console.log(IdUser+" "+InfCart.IdDono)
          console.log(SiteCard)
          window.location.replace(SiteCard);
        }
      }
     
    }
    
 
  }, [DireSite, SiteCard, IdUser])

  // useEffect(() => {
  //   ValorPermio();
  //  }, [ValApos, VaToCo])

   useEffect(() => {
    console.log(IdUser)
    console.log(InfCart)
    if(InfCart !== {}){
      setCartBloq(InfCart.CodVeri?InfCart.CodVeri.Ativo:false)
      setUso(InfCart.EmUso)
      setAtivo(InfCart.Ativo)
      setNomeCart(InfCart.Nome)
      setImgCart(InfCart.Config?InfCart.Config.Foto.Link:"")
      setAtiImg(InfCart.Config?InfCart.Config.Foto.Ativar:"")
      setFundoImg(InfCart.Config?InfCart.Config.Fundo:"")
      setFunCart(InfCart.Config?InfCart.Config.Funcao.Texto:"")
      setAtiFun(InfCart.Config?InfCart.Config.Funcao.Ativar:"")
      setTelCart(InfCart.Config?InfCart.Config.Tel.Texto:"")
      setAtiTel(InfCart.Config?InfCart.Config.Tel.Ativar:"")
      setWhatCart(InfCart.Config?InfCart.Config.Whats.Texto:"")
      setAtiWhat(InfCart.Config?InfCart.Config.Whats.Ativar:"")
      setInstCard(InfCart.Config?InfCart.Config.Intagram.Link:"")
      setAtiInst(InfCart.Config?InfCart.Config.Intagram.Ativar:"")
      setFaceCard(InfCart.Config?InfCart.Config.Facebook.Link:"")
      setAtiFace(InfCart.Config?InfCart.Config.Facebook.Ativar:"")
      setSiteCard(InfCart.Config?InfCart.Config.Site.Link:"")
      setAtiSite(InfCart.Config?InfCart.Config.Site.Ativar:"")
      setTwCard(InfCart.Config?InfCart.Config.Twitter.Link:"")
      setAtiTw(InfCart.Config?InfCart.Config.Twitter.Ativar:"")
      setTikCard(InfCart.Config?InfCart.Config.Tiktok.Link:"")
      setAtiTik(InfCart.Config?InfCart.Config.Tiktok.Ativar:"")
      setLocCard(InfCart.Config?InfCart.Config.Localizacao.Link:"")
      setAtiLoc(InfCart.Config?InfCart.Config.Localizacao.Ativar:"")
      setYouCard(InfCart.Config?InfCart.Config.youtube.Link:"")
      setAtiYou(InfCart.Config?InfCart.Config.youtube.Ativar:"")
      setTeleCard(InfCart.Config?InfCart.Config.Telegram.Link:"")
      setAtiTele(InfCart.Config?InfCart.Config.Telegram.Ativar:"")
      setEmailCard(InfCart.Config?InfCart.Config.Email.Link:"")
      setAtiEmail(InfCart.Config?InfCart.Config.Email.Ativar:"")
      setPixCard(InfCart.Config?InfCart.Config.Pix.Pix:"")
      setAtiPix(InfCart.Config?InfCart.Config.Pix.Ativar:"")
      setTipPix(InfCart.Config?InfCart.Config.Pix.Tipo:"")
      setNomePix(InfCart.Config?InfCart.Config.Pix.Nome:"")
      setAtiSal(InfCart.Config?InfCart.Config.Salvar.Ativar:"")
      setAtiCom(InfCart.Config?InfCart.Config.Compartilhar.Ativar:"")
      setAtiPrivi(InfCart.ListCidade?InfCart.ListCidade:false)
      setPessoal(InfCart.Pessoal?InfCart.Pessoal:false)
      setCorCart(InfCart.CorNalist?InfCart.CorNalist:"#000")
    setCartAtivod(InfCart.Ativo?InfCart.Ativo:false)
    setSexo(InfCart.Sexo?InfCart.Sexo:"");
    setEstado(InfCart.Estado?InfCart.Estado:"")
    setCidade(InfCart.Cidade?InfCart.Cidade:"")
    setProfissao(InfCart.Profissao?InfCart.Profissao:["",""])
    setEmpresa(InfCart.Empresa?InfCart.Empresa:["",""])
    setLisCre(InfCart.ListCredenciais?InfCart.ListCredenciais:[])
    setQrCode(InfCart.FotoQRCODE?InfCart.FotoQRCODE:"")
    setDireSite(InfCart.direcionamento?InfCart.direcionamento:false)
     if(InfCart.Estado !== ""){
      for(let i in EstCid){
        if(EstCid[i].nome === InfCart.Estado){
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
    // if(InfCart.Empresa.length !== 0 ){
    //   console.log(InfCart.Empresa[0])
    // }
     

     //if(InfCart.Profissao !=)
    
    
    //  for(let i in Empre){
    //   if(Empre[i].id === InfCart.Empresa[0]){
    //     setEscEmp1(Empre[i].Emp)
    //   }
    //  }
     
    
 
    //  for(let i in Empre){
    //   if(Empre[i].id === InfCart.Empresa[1]){
    //     setEscEmp2(Empre[i].Emp)
    //   }
    //  }
     
    

    //  for(let i in ProfList){
    //   if(ProfList[i].id === InfCart.Profissao[0]){
    //     setprofEsco1(ProfList[i].profissao)
    //   }
    //  }
     
   
    

    
    
      
    }
   }, [InfCart])

   useEffect( ()=>{ 
    if(Profissao.length !== 0){
     console.log(Profissao[0])
        for(let i in ProfList){
      if(ProfList[i].id === Profissao[0]){
        setprofEsco1(ProfList[i].profissao)
      }
     }

       for(let i in ProfList){
      if(ProfList[i].id === Profissao[1]){
        setprofEsco2(ProfList[i].profissao)
      }
     }
    }            
   }, [Profissao]);

   useEffect( ()=>{ 
    if(Empresa.length !== 0){
      for(let i in Empre){
      if(Empre[i].id === Empresa[0]){
        setEscEmp1(Empre[i].Emp)
      }
     }
     
    
 
     for(let i in Empre){
      if(Empre[i].id === Empresa[1]){
        setEscEmp2(Empre[i].Emp)
      }
     }
    }            
   }, [Empresa]);

   useEffect(() => {
    if(LinkEnv !== "nulo"){
      vaiparala()
    }

   }, [LinkEnv])

   useEffect(() => {
    if(IrConta === true){
      irParaHome()
    }

   }, [IrConta])
   useEffect(() => {
    if(IdUser !== "" && LisCre.length !== 0){
      if(LisCre.includes(IdUser)){
        setCreden(true)
       
      
       } 
    }

   }, [LisCre, IdUser])

 
  const criarListaem = ()=>{
    var listinha = []
     for(let i in Empre){
       listinha.push({
        id:Empre[i].id,
        name:Empre[i].Emp,
        })
     }
     setListEmp(listinha)
  }

  const SalvandoCartao = ()=>{
    setLoad(true)
      Api.SalvCart(IdCart, DireSite, NomePix, IrImg, Ativo, AtiPrivi, Pessoal, Profissao, Empresa, Cidade, Estado, Sexo, CorCart, NomeCart, ImgCart, AtiImg, FundoImg, FunCart, AtiFun, TelCart, AtiTel, WhatCart, AtiWhat, InstCard, AtiInst, FaceCard, AtiFace, SiteCard, AtiSite, TwCard, AtiTw, TikCard, AtiTik, LocCard, AtiLoc, PixCard, TipPix, AtiPix, AtiSal, AtiCom, AtiYou, YouCard, TeleCard, AtiTele, EmailCard, AtiEmail, setAlert, setAlertTipo, setLoad, )
  }

  const compartir = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Tú dispositivo no soporta esta funcionalidad");
      return;
    }
    await Sharing.shareAsync(`https://cartaoweb.online/perfil/${IdCart}`).catch((error) => {
      console.log(error);
    });
  };

  const irParaHome = ()=>{
    window.open(`https://cartaoweb.online/`, '_blank');
   }


 const SalvandoNumero = ()=>{
  setBtnAgora("Salvar")
  if(IdUser !== ""){
    if(InfCart.IdDono !== IdUser){
      if(InfCart.SalvouNum.includes(IdUser)){
        setAlert("Esse Cartão já foi salvo por você!");
        setAlertTipo("danger");
        setModalCalend(true);
        setVerNotajogo(false);
      } else {
        var IDSAO = IdUser;
        setCarre(true)
        Api.SalvandoNum(IdCart, IDSAO, setAlert, setAlertTipo, setCarre, setModalCalend, setVerNotajogo, setIrConta)

      }

    } else {
      setAlert("Esse Cartão é Seu você Não Pode Salvar!");
      setAlertTipo("danger");
      setModalCalend(true);
      setVerNotajogo(false);
    }

  } else {
    setSalVer(true)
  }
   
 }
 const EntrandoConta = ()=>{
  setBtnAgora("Entrando")
  if(IdUser !== ""){
    window.open(`https://cartaoweb.online/`, '_blank');
  } else {
    setSalVer(true)
  }
   
 }

 const CredenciandoCartao = ()=>{
  setBtnAgora("Credenciar")
  if(IdUser !== ""){
    if(InfCart.IdDono !== IdUser){
      if(InfCart.ListCredenciais.includes(IdUser)){
        setAlert("Esse Cartão já foi Credenciado por você!");
        setAlertTipo("danger");
        setModalCalend(true);
        setVerNotajogo(false);
      } else {
        var IDSAO = IdUser;
        setCarre(true)
        Api.CredenciandoNum(IdCart, IDSAO, setAlert, setAlertTipo, setCarre, setModalCalend, setVerNotajogo, setIrConta, setCreden)

      }

    } else {
      setAlert("Esse Cartão é Seu você Não Pode Salvar!");
      setAlertTipo("danger");
      setModalCalend(true);
      setVerNotajogo(false);
    }

  } else {
    setSalVer(true)
  }
   
 }

 const DesCredenciandoCartao = ()=>{
  setBtnAgora("Credenciar")
  if(IdUser !== ""){
    if(InfCart.IdDono !== IdUser){
     
        var IDSAO = IdUser;
        setCarre(true)
        Api. DesCredenciandoNum(IdCart, IDSAO, setAlert, setAlertTipo, setCarre, setModalCalend, setVerNotajogo, setIrConta, setCreden, setLisCre)

      

    } else {
      setAlert("Esse Cartão é Seu você Não Pode Salvar!");
      setAlertTipo("danger");
      setModalCalend(true);
      setVerNotajogo(false);
    }

  } else {
    setSalVer(true)
  }
   
 }

 const OutroFundo = (item)=>{
  setAtivFund(false)
  setFundoImg(item)
  }

  const OutraCor = (item)=>{
    
    setCorCart(item)
    }

    const AtivandoDireci = ()=>{
      setDireSite(!DireSite)
     }

    const AtivandoCartAtivo = ()=>{
      setCartAtivod(!CartAtivod)
     }

    const AtivandoMenu = ()=>{
      setMenu(!Menu)
     }
     const CliqueAnun = ()=>{
      window.open(LinAnun, '_blank');
      Api.ClicandoAnun(IdAnun, IdVizu)
     }

  const AtivandoPessoal = ()=>{
    setPessoal(!Pessoal)
   }

  const AtivandoFund = ()=>{
    setAtivFund(!AtivFund)
   }
 
 const AtivandoSal = ()=>{
  setAtiSal(!AtiSal)
 }
 const AtivandoCom = ()=>{
  setAtiCom(!AtiCom)
 }

 const AtivandoPriv = ()=>{
  setAtiPrivi(!AtiPrivi)
 }


  const AtivandoPix = ()=>{
    setAtiPix(!AtiPix)
   }
   const InstrucaoPix = ()=>{
    setInstruPix(!InstruPix)
   }
   const VendoPix = ()=>{
  
  
    window.open(`mailto:${PixCard}`, '_blank');
   }

  const AtivandoEmail = ()=>{
    setAtiEmail(!AtiEmail)
   }
   const InstrucaoEmail = ()=>{
    setInstruEmail(!InstruEmail)
   }
   const VendoEmail = ()=>{
  
   
  
  
    window.open(`mailto:${EmailCard}`, '_blank');
   }

  const AtivandoTele = ()=>{
    setAtiTele(!AtiTele)
   }
   const InstrucaoTele = ()=>{
    setInstruTele(!InstruTele)
   }
   const VendoTele = ()=>{
  
   
  
  
    window.open(`${TeleCard}`, '_blank');
   }

  const AtivandoYou = ()=>{
    setAtiYou(!AtiYou)
   }
   const InstrucaoYou = ()=>{
    setInstruYou(!InstruYou)
   }
   const VendoYou = ()=>{
  
   
  
  
    window.open(`${YouCard}`, '_blank');
   }

  const AtivandoLoc = ()=>{
    setAtiLoc(!AtiLoc)
   }
   const InstrucaoLoc = ()=>{
    setInstruLoc(!InstruLoc)
   }
   const VendoLoc = ()=>{
  
    var Loc1 = LocCard.split(" ")
    console.log(Loc1[0])
    var Loc3 =Loc1[0].replace("+", "%2B") 
  
  
    window.open(`https://www.google.com/maps/search/${Loc3}`, '_blank');
   }

  const AtivandoTik = ()=>{
    setAtiTik(!AtiTik)
   }
   const InstrucaoTik = ()=>{
    setInstruTik(!InstruTik)
   }
   const VendoTik = ()=>{
    
  
     window.open(`https://${TikCard}`, '_blank');
   }

  const AtivandoTw = ()=>{
    setAtiTw(!AtiTw)
   }
   const InstrucaoTw = ()=>{
    setInstruTw(!InstruTw)
   }
   const VendoTw = ()=>{
    
  
     window.open(`${TwCard}`, '_blank');
   }

  const AtivandoSite = ()=>{
    setAtiSite(!AtiSite)
   }
   const InstrucaoSite = ()=>{
    setInstruSite(!InstruSite)
   }
   const VendoSite = ()=>{

    
    console.log(SiteCard)
  
     window.open(`${SiteCard}`);
   }



 const AtivandoInst = ()=>{
  setAtiInst(!AtiInst)
 }
 const InstrucaoInst = ()=>{
  setInstruInst(!InstruInst)
 }
 const VendoInst = ()=>{
  

   window.open(`${InstCard}`, '_blank');
 }

 const AtivandoFace = ()=>{
  setAtiFace(!AtiFace)
 }
 const InstrucaoFace = ()=>{
  setInstruFace(!InstruFace)
 }
 const VendoFace = ()=>{
  

   window.open(`${FaceCard}`, '_blank');
 }

 const VendoLiga = ()=>{
  let ver = TelCart.replace("(", "");
  let par1 = ver.replace(")", "");
  let par3 = par1.replace("-", "");

  window.open(`tel:${par3}`, '_blank');
}
 const AtivandoImg = ()=>{
  setAtiImg(!AtiImg)
 }

 const AtivandoFunc = ()=>{
  setAtiFun(!AtiFun)
 }

 const AtivandoTel = ()=>{
  setAtiTel(!AtiTel)
 }

 const AtivandoWhat = ()=>{
  setAtiWhat(!AtiWhat)
 }
 const VendoWhat = ()=>{
  let ver = WhatCart.replace("(", "+55");
  let par1 = ver.replace(")", "");
  let par3 = par1.replace("-", "");

  window.open(`https://wa.me/${par3}?text=Ola`, '_blank');
}




  const TelWhats = ()=>{
   
 
   setLoading(true)
   Api.VerWhats(Tel,   setTe1 , setTelMsg, setNome, setBtn, setLoading)
}


  const LiberarAcesso = ()=>{
     if(InfCart.CodVeri.Cod === CodiEmp){
        setCartBloq(false)
     } else {
       setTelMsg3(true)
     }
  
  }
  const AnalisandoOlds = ()=>{
    setCarre(true)
    Api.AnaliseOlds(SimAp, IdApos, setAnliAp, setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)
  }

  const Pegandodados = ()=>{
    
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

    resRev.push(ListOc[i])
       
     
        resli.push({
          
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
  
  
   
      setCarreg(true)
      Api.PegaAnuncio(IdCart, TelCam, setIdVizu,  setFotAnuncio, setLinAnun, setIdAnun, setCarreg, setNot,  );
    



  
 
    
  }

  const TirarEsse = (position) =>{
    setSimAp([...SimAp.filter((item, index) => index !== position)]);
   
  }
  const Voltar = ()=>{
    navigation.goBack();
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
    await ListandoOc();
    await setRefreshin(false);
  }
  const tempo = ()=>{
    setdataNasc(moment().format("DD/MM/YYYY"))
    // setDtEsc(new Date().getTime())
    // setDataMin(new Date().getTime())
    // setDataMax(new Date().getTime())
   
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

   const onChange = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
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
           
       
        }

        const IrNoti = ()=>{
           navigation.navigate("Notific") 
        }

        const IrInfInsta = ()=>{
          navigation.navigate("InfInsta") 
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
           setPago("");
           setConcluir("");
           setValPreDemos("");
           setValorReal("");
           setSimAp([]);
           setValCambis("");
           setVaToCo("");
           setValApos(""); 
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
         
          setModalCalend(false);
          setVerNotajogo(false);
          setCriarCli(false)
          setMsgErro1(false);
          setMsgErro2(false);
          setNome("");
          setNomeCli("");
          setTelCli("");
          setBtn(false);
          setIdTrans("");
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
  
          }
          
         
         
         
         }
         const SairAlertExtra = ()=>{
          setAlertTipo(null);
          setAlert("");
          setModalCalend(false);
          setVerNotajogo(false);
          window.open(`https://cartaoweb.online/`, '_blank');
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
          setPgCash(true);
          setVerNotajogo(true)
          setModalCalend(true)

         }

         const GerarCod =  async ()=> {
         

            
            setCarre(true)
            Api.GeradorDeCod(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend);
         
      
         
            
         
           
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
            setLoad(true)
            Api.TranfCash(NomeCli, TelCli, IdTrans,  setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad  )
          } else {
            setTentativa(Tentativa +1)
           setAlertTipo("danger")
            setAlert("Código Errado "+(Tentativa+1)+"° tentativa de 3");
            setModalCalend(true);
            setVerNotajogo(false);
          }
          }

          const SacarCash = ()=>{

            if(parseInt(Senha)  === CodLast){
            setLoad(true)
            Api.SacarCash(NomeCli, TelCli, IdTrans,  setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad, setCriarCli  )
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
            
            ListandoOc()
        //     navigation.reset({
        //      routes:[{name:"Preload"}]
        //  });
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

          const AbrirEnviar = ()=>{
            setModalCalend(true);
            setPgCash(true);
            setVerNotajogo(false);
            
           
           
           
          }
          const AbrirEstilizar = ()=>{
            setModalCalend(true);
            setPgCash(true);
            setVerNotajogo(true);
            
           
           
           
          }

          const AbrirLiberar = ()=>{
            setModalCalend(true);
            setPgCash(false);
            setVerNotajogo(true);
            
           
           
           
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
           setPago("");
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

         const handleMessageButtonClick = () => {
   
        
             if(Tel !== '' && Nome !== '' ) {
                 setLoading(true);
                 Api.signInSecund(Tel, Nome, setIrEnt, setLoading);
                  
               
             }  else {
               
              setTelMsg4(true)
             }
     
        
           
          
     
         }
         const EntrandoRel = () => {
          console.log(Tentativa)
          if(Tentativa <3){
            setLoading(true);
            if(BtnAgora === "Salvar"){
              Api.EntSalvando(IdCart, code, Tel, Nome, Tentativa, setTentativa, setIrEnt, setLoading, setTelMsg5, setUso, setAtivo,  setSalVer, setAlert, setAlertTipo, setModalCalend, setVerNotajogo );
            } else  if(BtnAgora === "Credenciar"){
              Api.EntCredenci(IdCart, code, Tel, Nome, Tentativa, setTentativa, setIrEnt, setLoading, setTelMsg5, setUso, setAtivo,  setSalVer, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCreden );
            } else if(BtnAgora === "Entrando"){
              Api.EntContCart(IdCart, code, Tel, Nome, Tentativa, setTentativa, setIrEnt, setLoading, setTelMsg5, setUso, setAtivo, setIrConta, setSalVer  );
            }
          
          }else {
            
            setIrEnt(false)
            setTelMsg5(false)
            setTentativa(0)
            ListandoOc();
          }
             
               
  
         }

         const CadastrandoAgora = () => {
          console.log(Tentativa)
          if(Tentativa <3){
            setLoading(true);
            Api.EntCod(IdCart, code, Tel, Nome, Tentativa, setTentativa, setIrEnt, setLoading, setTelMsg5, setUso, setAtivo, setSalVer );
          }else {
            console.log("tenrou")
            setIrEnt(false)
            setTelMsg5(false)
            setTentativa(0)
            ListandoOc();
          }
             
               
  
         }

         const openImagePickerAsync = async () => {
          let pickerResult = await ImagePicker.launchImageLibraryAsync();
          setImgCart(pickerResult.uri);
          setIrImg(true)
     
         
        }

        const SeleciSexo = (item)=>{
          setSexo(item[0])
        
         
        }
        const SeleciEmp1 = (item)=>{
          setEmpresa([item[0], Empresa[1]])
         for(let i in Empre){
          if(Empre[i].id === item[0]){
            setEscEmp1(Empre[i].Emp)
          }
         }
         
        }
        const SeleciEmp2 = (item)=>{
          setEmpresa([Empresa[0], item[0]])
         for(let i in Empre){
          if(Empre[i].id === item[0]){
            setEscEmp2(Empre[i].Emp)
          }
         }
         
        }
        const SeleciProf1 = (item)=>{
          setProfissao([item[0], Profissao[1]])
         for(let i in ProfList){
          if(ProfList[i].id === item[0]){
            setprofEsco1(ProfList[i].profissao)
          }
         }
         
        }

        const SeleciProf2 = (item)=>{
          setProfissao([ Profissao[0], item[0]])
         for(let i in ProfList){
          if(ProfList[i].id === item[0]){
            setprofEsco2(ProfList[i].profissao)
          }
         }
         
        }

        const SeleciEmp = (item)=>{
  
          console.log(item[0])
        }
        const EntrandoItem = (item)=>{
          console.log(item)
        }
        const EscoEstado = (item)=>{
          console.log(item)
         
          for(let i in EstCid){
            if(EstCid[i].sigla === item[0]){
              setCidade("")
              setEstado(EstCid[i].nome)
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

    return (
      <View style={styles.Container}>
 
            
            <ImageBackground source={require("../assets/fundo.png")} 
          resizeMode="cover" 
          style={styles.imageBack} >
                 {Carreg ?
                 <>
                 <Image source={require('../assets/loading-87.gif')}  style={{marginTop:300, width:200, height:100}} />
                 </>

                 :
                 <>
              
                <View style={styles.CaixaTitulo} >
                  {StatusCart !== "Link" ?
                  <TouchableHighlight  onPress={()=>Voltar()} style={styles.CaixaDados}>
                  <>
                <FontAwesome name="arrow-circle-left" size={30} color="#000" />
              
                </>
                </TouchableHighlight>
                  :
                  <TouchableHighlight  style={styles.CaixaDados}>
                  <>
              
              
                </>
                </TouchableHighlight>
                  }
              
              
                {/* <Image source={require('../assets/logoTop.png')}  style={styles.ImageVer2 } /> */}
  
                <TouchableHighlight  style={styles.CaixaDados}>
               <Text style={styles.TextInfo} >
               
               </Text>
                </TouchableHighlight>
                {/* <TouchableHighlight  onPress={()=>AtivandoMenu()}  style={styles.CaixaDados}>
                <FontAwesome name="tasks" size={24} color="#fff" />
                </TouchableHighlight> */}
              </View >
              
              <ScrollView  >
              <View  style={styles.Post}>
              <View  style={{padding:10,  flexDirection:"column",  alignItems:"center", justifyContent:"center",  width:wp('100%'), borderBottomWidth:1, marginBottom:5, borderColor:"#000",}}>
              <View  style={styles.CaixaNome}>
              <Text style={{marginLeft:30, marginBottom:5 , color:"#fff", fontSize:15, }}>{moment(Noti.dataCriacao).format("DD/MM/YYYY")}</Text>
              <Text style={{color:"#fff", marginBottom:10, fontSize:25, fontWeight:"bold"}}>{Noti.Titulo}</Text>
              </View>
              {Noti.Video &&
              <View  style={styles.CaixaNomeVideo}>
              <Video
             
             style={{width:280, height:500, marginBottom:20, borderRadius:10,  borderWidth:2, borderColor:"#FFE767", }}
             source={{
               uri:Noti.LinkVideo,
             }}
             useNativeControls
             resizeMode={ResizeMode.CONTAIN}
             isLooping
             onPlaybackStatusUpdate={status => setStatus(() => status)}
           /> 
              
              </View>
              }
              <View  style={styles.CaixaNome}>
                {Noti.Url1 &&
                <Image source={{uri:Noti.Url1}} style={{width:300, height:300, borderRadius:10,  borderWidth:2, borderColor:"#FFE767", }} />
                
                }
              
              </View>
              <View  style={styles.CaixaNome}>
           
              <Text style={{color:"#fff", marginBottom:10, fontSize:15, marginTop:10}}>{Noti.Not1}</Text>
              </View>
              <View  style={styles.CaixaNome}>
                 {Noti.Url2 &&
              <Image source={{uri:Noti.Url2}} style={{width:300, height:300, borderRadius:10,  borderWidth:2, borderColor:"#FFE767", }} />
             
                }
              </View>
              <View  style={styles.CaixaNome}>
           
              <Text style={{color:"#fff", marginBottom:10, fontSize:15, marginTop:10 }}>{Noti.Not2}</Text>
              </View>
              
              {FotAnuncio &&
                <>
              <TouchableHighlight  onPress={()=>CliqueAnun()}  style={styles.CaixaNome}>
                <>
                  <Text style={{marginLeft:30, marginBottom:5 , color:"#fff", fontSize:15, }}>Anúncio</Text>
              <Image source={{uri:FotAnuncio}} style={{width:300, height:300, borderRadius:10,  borderWidth:2, borderColor:"#FFE767", }} />
               
            </>
              </TouchableHighlight>
              </>

              }
              <View  style={styles.CaixaNome}>
           
              <Text style={{color:"#fff", marginBottom:10, fontSize:15, marginTop:10 }}>{Noti.Not3}</Text>
              </View>
              <View  style={styles.CaixaNome}>
              {Noti.Url3 &&
                <Image source={{uri:Noti.Url3}} style={{width:300, height:300, borderRadius:10,  borderWidth:2, borderColor:"#FFE767", }} />
                }
              
              </View>
              <View  style={styles.CaixaNome}>
           
              <Text style={{color:"#fff", marginBottom:10, fontSize:15, marginTop:10 }}>{Noti.Not4}</Text>
              </View>
              <View  style={styles.CaixaNome}>
              {Noti.Url4 &&
              <Image source={{uri:Noti.Url4}} style={{width:300, height:300, borderRadius:10,  borderWidth:2, borderColor:"#FFE767", }} />
                }
              </View>
              <View  style={styles.CaixaNome}>
           
              <Text style={{color:"#fff", marginBottom:10, fontSize:15, marginTop:10}}>{Noti.Not5}</Text>
              </View>
                </View>
                </View>
                </ScrollView>
                </>

}
              
                      
  
          
         
         


        
          
              
            
       
            
  
          </ImageBackground>
           
           
          
            
          
           
            
               
          {/* </Modal> */}
        
      </View>
    )
}

const styles = StyleSheet.create({
  TexTitu: {
    fontSize: 20,
    color: "#FFF",
    fontWeight:"bold",
    marginTop:5,
    marginBottom:5,
  },
  TexTitu2: {
    fontSize: 20,
    color: "#00B30D",
    fontWeight:"bold",
    marginTop:5,
    marginBottom:5,
  },
  AreaLogin :{

    width:300,
    flexDirection:"column",
    alignItems: "center",
    justifyContent:"center",
    marginBottom:15,
    paddingLeft:5,
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
  Avitext2: {
    fontSize: 15,
    color: "red",
    margin:10
  },

  TexMsg: {
    fontSize: 16,
    color: "red",
    marginBottom: 15,
    marginTop: -10,
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
    
  },
  ModVieBtnBtn: {
    width:90,
    height:30,
    justifyContent: "center",
    alignItems: "center",
    outlineStyle: 'none'
  },
  ModVieBtnBtn2: {
  paddingRight:10, 
  paddingLeft:10,
    height:30,
    justifyContent: "center",
    alignItems: "center",
    outlineStyle: 'none',
    borderRadius:10,
    borderColor:"#FFF212",
    borderWidth:2,
    borderStyle:"solid",
    backgroundColor:"#1ED31A",
    marginTop:10
  },
  ModVieTexSim: {
    fontSize: 18,
    color: "#00C9FB",
    fontWeight: "bold",
  },
  ModVieTexSim2: {
    fontSize: 18,
    color: "#FFF212",
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
 InputAra15 :{
  width:"90%",
  height:60,
  backgroundColor: "#fff",
  flexDirection:"row",
  borderRadius:20,
  alignItems: "center",
  marginBottom:15,
  paddingLeft:5,
  borderColor:"#000",
  borderWidth:1,
  marginLeft:10,
 
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
   width:300,
   height:300,
   flex: 1,
   flexDirection:"column",
   alignItems:"center",
   justifyContent:"center",
   backgroundColor:"#fff",
   marginRight:10,
   marginTop:10,
   textAlign:"center",
   position:"absolute",
   top:30,
   right:20,
   borderRadius:5,
   fontWeight:"bold",
   paddingTop:10,
   color:"#fff",
   zIndex:1

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
   backgroundColor:"#fff",
   zIndex:1,
  
    
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
    height:300,
    borderRadius:20,
    alignItems: "center",
    flexDirection:"column",
   
  },

  QuadNota: {
    backgroundColor: "#FFF",
    width:350,
    height:600,
   
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
  marginBottom:10,
  padding:10,
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

BtnEdi: {
 
 marginTop:10,
 height:30,
 backgroundColor: "#00A859",
 borderRadius:20,
 justifyContent:"center",
 alignItems: "center",
borderColor:"#FFF212",
borderWidth:2,
marginRight:5,
paddingRight:10,
paddingLeft:10
},
BtnEdi2: {
  width:150,
  marginTop:10,
  height:30,
  backgroundColor: "#000",
  borderRadius:20,
  justifyContent:"center",
  alignItems: "center",
 borderColor:"#FFF212",
 borderWidth:2,
 marginBottom:10,
 marginRight:5,
 

 },
 BtnEdi3: {
  width:180,
  marginTop:10,
  height:30,
  backgroundColor: "red",
  borderRadius:20,
  justifyContent:"center",
  alignItems: "center",
 borderColor:"#FFF212",
 borderWidth:2,
 marginBottom:10,
 marginRight:5
  
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
        CaixaNomeVideo: {
          width:300,
          marginLeft:-30,
           display:"flex",
           justifyContent:"center",
           alignItems:"center",
           flexDirection:"column",
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
    color: "#FFF",
    fontWeight: "bold",
    fontStyle:"italic"
    },
   
    BtnText: {
      fontSize: 18,
      color: "#FFF212",
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
            width: wp('100%') ,
            
              flex: 1 ,
              alignItems:"center",     
          },

          CaixaTitulo:{
           marginTop:20,
           width:"100%",
           height:20,
           display:"flex",
           justifyContent:"space-between",
           alignItems:"center",
           flexDirection:"row",
           paddingLeft:10,
           paddingRight:10,
           marginBottom:20,
           
          },
          ImageVer2:{
            width:250,
            height:200,
            marginTop: 10,
           
            
        },
        ImageVer63:{
          width:180,
          height:50,
          marginTop: 10,
         
          
      },
           
});