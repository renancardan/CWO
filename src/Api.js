import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firebaseConfig from './services/firebase';

const firebaseApp =  firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();


export default {

      checkToken: async (tel, cod, time, setIrHome, setIrLogin,  setId, ) => {

            var tele =  await tel.toString();
            var codig = await parseInt(cod);
            var temp = await parseInt(time);
                  console.log("tele "+tele)
                  console.log("Temp "+temp)
                  await firestore.collection("users")
                  .where("telefone", "==", tele)
                  .where("DataEnt", "==", temp)
                  .get().then( async(querySnapshot) => {
                 
                    if(querySnapshot.size !== 0){
                      querySnapshot.forEach( async (doc) => {
                       
                        await setId(doc.id);
                        await setIrHome(true);
                        });
                     
               
                    } else {
                      await AsyncStorage.setItem('Tel', "");
                      await AsyncStorage.setItem('@entrada', "");
                      setIrLogin(true);
                    }
                  
               })
               .catch((error) => {
                  
               });
            
                },


          VerWhats: async (Tel, setTelMsg, setNome, setBtn,  setLoading) => {


            var ver = Tel.replace("(", "55");
            var par1 = ver.replace(")", "");
            var par3 = par1.replace("-", "");
            const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
            {
                  method: 'GET',
                  headers:{
                    'Content-Type': 'application/json'
                  },
                  
                });
        
            
              
                const json = await req.json(); 
                setTelMsg(json.exists);
              
        
                if(json.exists === true){
                  
                  setBtn(true);
                } else{
                  setBtn(false);
                }
              
        
              
                await setLoading(false)
          },

    AnaliseTel: async (Tel, setTe1, setNome) => {

      await firestore.collection("users")
      .where("telefone", "==", Tel)
      .get().then((querySnapshot) => {
        if(querySnapshot.size !== 0){
          querySnapshot.forEach((doc) => {
            setTe1(true);
            setNome(doc.data().nome)
            
          })
      
        }
          });
    
    
    },

    signIn: async (Tel, Nome, setIrCad, setIrEnt, setLoading) => {
     
      var tele = Tel.toString();
     
      await AsyncStorage.setItem('Tel', tele);
  
      var data = new URLSearchParams();
      data.append('Nome', Nome);
  
      const req = await fetch("https://us-central1-vigilantesn-3c66a.cloudfunctions.net/api/criarCodigo", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString(),
        json: true,
      });
     
      const json28 = await req.json();
    
      if(json28){
        console.log("Codigo "+json28.Codi)
        var last = json28.Codi;
  
  
        await firestore.collection("users")
   .where("telefone", "==", tele)
   .get().then( async (querySnapshot) => {
     if(querySnapshot.size !== 0){
      querySnapshot.forEach(async (doc) => {
        if(doc.data().conta !== "Empresa"){
          
            let time = new Date().getTime();
            firestore.collection("users")
            .doc(doc.id)
            .update({
              CodigEnt: last,
          })
          .then( async() => {
            var ver = tele.replace("(", "55");
            var par1 = ver.replace(")", "");
            var par3 = par1.replace("-", "");
            data={
              "phone": par3,
              "message": "Código de entrada: "+last,
            }   
            const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
            {
                  method: 'POST',
                  headers:{
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data),
                });
              
                const json = await req.json(); 
                if(doc.data().Tipo === ""){
                  await setIrCad(true);
                  await setLoading(false);
                } else {
                  await setIrEnt(true);
                  await setLoading(false);
                }
                
          })
          .catch((error) => {
          
            
          });
    
         
  
        }  else{
  
          setLoading(false);
          alert("Esse Usuário é de Uma Conta Serv");
        }
      
    
      
    });
  
     } else {
  
      var time = new Date().getTime();
      var Forms = ["off", "off", "off"]
      await firestore.collection("users").add({
        nome:Nome,
        CodigEnt: last, 
        nameComp: "",
        EndCadas: "",
        area: null,
        DataCadas: time,
        Bairro: "",
        telefone: Tel,
        DataEnt: 0,
        entrada:true,
        Rg:"",
        CPF: "",
        localizacao:{lat:0, lng:0},
        conta:"Titular",
        Dependo:null,
        dependentes: ["", "", ""],
        DataVenc: 0,
        ativo:false,
        config:{ChamDep:0, LimDep:true, LimTi:true},
        chamadasTi:0,
        chamadasDep:0,
        AceConfEsp:false,
        confiExp:{QuantCha:0, AceitCha:0, ValorMen:0, ValorCha:0},
        Foto:"",
        FotoPerfil:"",
        SistemVig:"NaoAutorizada",
        Tipo:"",
        SegEmp:["", "", ""],
        redeSocial:{cidade:"", estado:""},
        AreaLoc:{cidade:"", estado:""},
        Status:{Cliente:false, ClienteLoc:false, TicktLivre:false },
        estrelas:0,
        Negociacao:0,
        Excluir:false,
        IdTicket:null,
        DenunPost:[],
        BloqCont:[]
    })
    .then( async (docRef) => {
   
  
      await firestore.collection("historicoUso").add({
        IdCri: docRef.id,
        NomeCri: "",
        IdSof:docRef.id,
        NomeSof:"",
        Colecao:"users",
        Funcao:"Usuario se Cadastrou",
        date:new Date().getTime(),
    })
  
  
    var ver = tele.replace("(", "55");
    var par1 = ver.replace(")", "");
    var par3 = par1.replace("-", "");
    data={
      "phone": par3,
      "message": "Código de entrada: "+last,
    }   
    const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
    {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
      
        const json = await req.json(); 
    
        await setIrCad(true);
        await setLoading(false);
  
      var res = [];
  
      // for(let i in Forms ) {
       
      //     await firestore().collection("users").add({
      //       nameComp: "",
      //       nome:"",
      //       FotoPerfil:"",
      //       telefone: Forms[i],
      //       DataEnt:0,
      //       conta:"Dependente",
      //       Dependo: docRef.id,
      //       entrada:false,
      //       Tipo:"Pessoal",
      //       DataCadas: time,
      //       redeSocial:{cidade:"", estado:""},
      //   }).then((docRef2) => {
      //     res.push(docRef2.id)
      // })
      //   }
  
      //   await firestore().collection("users").doc( docRef.id)
      //   .update({
      //     dependentes: res,
      // }).then((def)=>{
         
      // })
     
    
    })
    .catch((error) => {
        
    });
  
  
     
      
     }
   
  })
  .catch((error) => {
   
  });
  
       
     
    
    
        }
  
  
   
  
  
       
    },

  

}