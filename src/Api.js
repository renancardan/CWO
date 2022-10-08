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
                  .where("Telefone", "==", tele)
                  .where("DataEntCel", "==", temp)
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
      console.log("Nome ")
      await firestore.collection("users")
      .where("Telefone", "==", Tel)
      .get().then((querySnapshot) => {
       
        if(querySnapshot.size !== 0){
          querySnapshot.forEach((doc) => {
           
            setTe1(true);
            setNome(doc.data().Nome)
            
          })
      
        }
          });
    
    
    },

    AnaliseTel: async (Tel, setTe1, setNome) => {

      await firestore.collection("users")
      .where("Telefone", "==", Tel)
      .get().then((querySnapshot) => {
        if(querySnapshot.size !== 0){
          querySnapshot.forEach((doc) => {
            setTe1(true);
            setNome(doc.data().Nome)
            
          })
      
        }
          });
    
    
    },

    QuantiWhats: async (Inicio, setPos, setWhats, setTele) => {

      await firestore.collection("TelefonesWhats")
      .where("Interesse", "array-contains", 4)
      .onSnapshot((querySnapshot) => {
        setWhats(querySnapshot.size) 
        // if(querySnapshot.size !== 0){
        //   querySnapshot.forEach((doc) => {
        //     setTe1(true);
        //     setNome(doc.data().nome)
            
        //   })
      
        // }
          });
    
    
    },

    CriandoW: async (Inicio, setPos, setWhats, setTele) => {
      var Posi= 0;
      var Num = 0;
      var Tel = parseInt(Inicio);
      var Numeros = '+55 11 5197-3568, +55 11 5461-1585, +55 11 91161-3786, +55 11 94168-8111, +55 11 94527-3499, +55 11 95303-8849, +55 11 95793-0066, +55 11 96166-0166, +55 11 96431-0722, +55 11 96571-4900, +55 11 96804-8087, +55 11 96914-3746, +55 11 97429-1423, +55 11 97431-7078, +55 11 97486-5964, +55 11 97628-6636, +55 11 97741-6987, +55 11 97756-5825, +55 11 97959-4668, +55 11 98115-2830, +55 11 98149-0190, +55 11 98266-2374, +55 11 98476-7056, +55 11 98585-1990, +55 11 98754-0266, +55 11 98947-4063, +55 11 99150-0056, +55 11 99202-0436, +55 11 99291-0826, +55 11 99315-8986, +55 11 99638-6036, +55 11 99699-6764, +55 11 99737-8170, +55 11 99787-1222, +55 11 99849-8988, +55 11 99900-6225, +55 11 99948-9057, +55 12 98125-7790, +55 12 99121-9140, +55 13 99759-1094, +55 14 99121-1020, +55 14 99826-9292, +55 15 98803-3349, +55 16 98803-6850, +55 16 99175-6100, +55 16 99255-0263, +55 17 99110-5866, +55 17 99777-7778, +55 18 99168-0045, +55 18 99703-3270, +55 18 99793-0110, +55 19 97420-8833, +55 19 98163-4105, +55 19 99556-3478, +55 19 99644-1851, +55 21 97602-4174, +55 21 97731-2073, +55 21 97993-7098, +55 21 98238-3089, +55 21 98303-9333, +55 21 98353-8951, +55 21 98392-1055, +55 21 98626-2059, +55 21 98680-9051, +55 21 98853-0314, +55 21 98897-9207, +55 21 99398-0569, +55 21 99427-2847, +55 21 99531-1410, +55 21 99760-6266, +55 24 98841-2372, +55 24 99871-2627, +55 24 99939-7148, +55 27 98153-4721, +55 27 99764-0312, +55 27 99798-5946, +55 28 99884-0690, +55 28 99967-3406, +55 31 8597-9823, +55 31 8809-6986, +55 31 9228-2783, +55 31 9267-6924, +55 31 9314-9761, +55 31 9779-9335, +55 31 9822-0004, +55 31 9880-2470, +55 31 9883-0893, +55 32 9198-6175, +55 35 9848-8008, +55 37 9836-3385, +55 41 9780-8436, +55 41 9853-5077, +55 41 9890-6043, +55 42 9942-9526, +55 42 9963-3449, +55 43 9871-6513, +55 44 9976-4304, +55 47 8436-3236, +55 47 9600-7372, +55 48 8493-6836, +55 48 9822-3183, +55 48 9943-3749, +55 49 9139-8067, +55 51 9106-6667, +55 53 9137-9935, +55 54 8113-2214, +55 54 9271-4172, +55 54 9368-3538, +55 55 9216-8336, +55 61 3686-2230, +55 61 8101-8261, +55 61 8133-2675, +55 61 8161-7014, +55 61 8324-6233, +55 61 8418-7666, +55 61 8469-1575, +55 61 8474-5021, +55 61 9105-2009, +55 61 9204-8761, +55 61 9214-9760, +55 61 9376-3883, +55 61 9411-1050, +55 61 9618-0911, +55 61 9653-1005, +55 61 9842-5106, +55 61 9944-5500, +55 61 9995-7042, +55 62 8100-9894, +55 62 8151-0101, +55 62 8189-6336, +55 62 8426-7576, +55 62 9632-7166, +55 62 9924-7727, +55 63 8129-2369, +55 63 9208-2825, +55 63 9972-1290, +55 65 9951-0772, +55 66 9219-5464, +55 67 9815-0498, +55 67 9903-6655, +55 68 9239-0551, +55 69 9346-1955, +55 69 9397-1457, +55 71 8685-7840, +55 71 8687-1645, +55 71 9186-2334, +55 71 9251-3240, +55 71 9605-5856, +55 71 9669-3364, +55 71 9670-4453, +55 71 9709-3212, +55 71 9944-5908, +55 73 8887-0969, +55 73 8895-9045, +55 73 9155-6776, +55 74 8805-9274, +55 75 8118-6737, +55 75 8141-3006, +55 75 8202-6994, +55 75 8701-2004, +55 75 9178-9364, +55 75 9283-3008, +55 75 9818-1568, +55 75 9934-2127, +55 77 8822-8556, +55 77 9104-3730, +55 77 9129-0536, +55 77 9134-7838, +55 77 9150-0512, +55 77 9812-9369, +55 79 8864-7279, +55 79 9876-6867, +55 79 9900-2175, +55 79 9966-1869, +55 79 9972-0542, +55 81 8257-7227, +55 81 8957-1424, +55 81 9320-0708, +55 81 9400-1541, +55 81 9724-3486, +55 81 9755-0250, +55 81 9805-9589, +55 81 9884-3261, +55 81 9964-7381, +55 81 9981-7684, +55 82 8873-9896, +55 82 9101-2269, +55 82 9174-3164, +55 82 9627-0369, +55 82 9830-9284, +55 82 9910-0187, +55 82 9955-2539, +55 83 8614-2587, +55 83 9100-0682, +55 83 9317-6743, +55 83 9350-4656, +55 83 9696-8008, +55 83 9877-0003, +55 84 8602-6513, +55 84 8734-1905, +55 84 8879-5251, +55 84 9807-3083, +55 84 9837-6575, +55 84 9981-9178, +55 85 9162-8235, +55 85 9739-7999, +55 85 9776-5034, +55 85 9857-8286, +55 85 9925-8140, +55 85 9956-3468, +55 86 8830-8783, +55 86 9903-8496, +55 86 9983-5706, +55 87 8822-2703, +55 87 9648-4343, +55 88 8112-6789, +55 88 9354-9497, +55 88 9735-6059, +55 88 9908-2958, +55 88 9984-3618, +55 91 8431-1999, +55 91 8563-7143, +55 91 8575-5594, +55 91 8606-7643, +55 91 9113-8194, +55 91 9225-6291, +55 91 9233-8551, +55 91 9240-8300, +55 92 8279-3400, +55 92 9507-9860, +55 94 9180-2369, +55 94 9908-5782, +55 97 8111-2708, +55 97 9144-5396, +55 98 8420-2037, +55 98 8459-2691, +55 98 8470-5496, +55 98 8734-8820, +55 98 9112-1359, +55 99 8446-2657, +55 99 8539-2407, +55 99 9120-3530';
      console.log(Numeros)
      var Telefones = Numeros.split(', ');

     for(let i in Telefones){
      Posi = Posi+1
      console.log(Posi)

    var ver = Telefones[i].replace("+", "");
    var par1 = ver.replace(" ", "");
    var par3 = par1.replace(" ", "");
    var par4 = par3.replace("-", "");
    console.log(par4);
              await firestore.collection("TelefonesWhats")
                .where("Telefone", "==", par4)
                .get()
                .then(async (querySnapshot) => {
            
                  if(querySnapshot.size  === 0){
                   console.log("Sim")
                    await firestore.collection("TelefonesWhats").add({
                      Telefone:par4,
                      Cidade:"",
                      Estado:"",
                      Interesse:[4],
                      Ativo:true,
                 
                   })
                   .then((docRef) => {
                 
                    })
                 
            
                  } else {
                   // Mudar Algo
                    querySnapshot.forEach(async (doc) => {
                      
                      // await firestore.collection("TelefonesWhats").doc(doc.id)
                      // .update({
                      //   Ativo:true,
                      //   }).then((docRef) => {
                      //     console.log("Pronto")
                      //   });
                  
                      });
                 
                }
                });

               }
   



    
      // 82 ao 83
    //   for  (var i = Tel; i < 5599983000000; i++) {
        
    //     setTele(i)
    //       Posi = Posi+1;
    //       setPos(Posi)
    //       const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${i}`, 
    //         {
    //               method: 'GET',
    //               headers:{
    //                 'Content-Type': 'application/json'
    //               },
                
    //             });
    //             const json = await req.json(); 
    //             if(json.exists){

                 
    //               console.log("Sim")
             
    //               await firestore.collection("WhatsAtomatico")
    //             .where("Telefone", "==", i)
    //             .get()
    //               .then(async (querySnapshot) => {
            
    //               if(querySnapshot.size  === 0){
            
    //                 await firestore.collection("WhatsAtomatico").add({
    //                   Telefone:i,
    //                   Cidade:"",
    //                   Estado:"Maranhão",
                 
    //                })
    //                .then((docRef) => {
    //                 Num = Num+1;
    //                 setWhats(Num);
    //                 firestore.collection("NumeroWhats").doc("5uqO4Zwh6uj10bHsd2cQ")
    //                 .update({
    //                   PosiNotBook: Posi,
    //                   WhatsNotBook: Num,
    //               })
    //               })
                 
            
    //               }
    //             });

    //             }else {

    //               console.log("Não")
    //             firestore.collection("NumeroWhats").doc("5uqO4Zwh6uj10bHsd2cQ")
    //               .update({
    //                 PosiNotBook: Posi
    //             })

    //             }
         
  
  
  
      
      
        
    //  }

     
   

    },

    signIn: async (Tel, Nome, setIrCad, setIrEnt, setLoading) => {
      let temp = new Date().getTime();
      var tele = Tel.toString();
     console.log(Tel);
      await AsyncStorage.setItem('Tel', tele);
  
   
      var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
  
        await firestore.collection("users")
        .where("Telefone", "==", Tel)
        .get().then( async (querySnapshot) => {
          console.log(querySnapshot.size);
     if(querySnapshot.size !== 0){
      querySnapshot.forEach(async (doc) => {
          
            let time = new Date().getTime();
            firestore.collection("users")
            .doc(doc.id)
            .update({
              CodigEnt: last,
          })
          .then( async() => {
            var ver = Tel.replace("(", "55");
            var par1 = ver.replace(")", "");
            var par3 = par1.replace("-", "");
            var data={
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
              
                  await setIrEnt(true);
                  await setLoading(false);
                
                
          })
          .catch((error) => {
          
            
          });
    
         
  
      
      
    
      
    });
  
     } else {
  
      var time = new Date().getTime();
      var Forms = ["off", "off", "off"]
      await firestore.collection("users").add({
        CodigEnt: last,
        Telefone:Tel,
        DataEntCel:0,
        Nome:Nome,
        Indicados:[],
        Extrato:[],
        DataCadas: temp,
        Cash:0,
        Dinheiro:0,
        DataVenc:0,
        ADM:false,
    })
    .then( async (docRef) => {
   
      var id = docRef.id
   
  
    var ver = Tel.replace("(", "55");
    var par1 = ver.replace(")", "");
    var par3 = par1.replace("-", "");
    var data={
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
        var IdBanco = "";
        var IdInd = "";

        await firestore.collection("BancoWhats")
        .where("Telefone", "==", Tel)
        .where("DataFin", ">=", temp)
        .get().then((querySnapshot2) => {
        
          if(querySnapshot2.size !== 0){
          querySnapshot2.forEach(async (doc2) => {
            IdBanco = doc2.id;
            IdInd = doc2.data().IdUser;
          });
            firestore.collection("users")
            .doc(IdInd)
            .update({
              Indicados: firebase.firestore.FieldValue.arrayUnion(id)
             })
  
            firestore.collection("BancoWhats")
            .doc(IdBanco)
            .update({
              Aprovado:true, 
              })
  
          
        }
  
        });
        
  
  
  
  
    
        await setIrEnt(true);
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
  
       
     
    
    
       
  
   
  
  
       
    },
    
    signIn3: async (Tel, code, Tentativa, setIrpre, setLoading, setModalAlert, setModalText, setTentativa) => {
      var tel = await AsyncStorage.getItem('Tel');
      var codig = await parseInt(code); 
      console.log(codig)
   await firestore.collection("users")
   .where("Telefone", "==", tel)
   .where("CodigEnt", "==", codig)
   .get().then((querySnapshot) => {
     if(querySnapshot.size !== 0){
      querySnapshot.forEach(async (doc) => {
       
            await AsyncStorage.setItem('Id', doc.id);
  
            let time = new Date().getTime();
            firestore.collection("users")
            .doc(doc.id)
            .update({
              DataEntCel: time,
          })
          .then( async() => {
           
            let temp = await time.toString();
            
            await AsyncStorage.setItem('@entrada', temp);
            await setIrpre(true);
          })
          .catch((error) => {
          
            
          });
    
       
      
    
      
    });
  
     } else {
      setLoading(false);
      setTentativa(Tentativa+1)
       setModalAlert(true)
       setModalText("Código Errado "+(Tentativa+1)+"° tentativa de 3")
     }
   
  })
  .catch((error) => {
   
  });
  
  
  
       
    },

    ListJogos: async(Page, setListOc, setCarreg,  Dat, Dat2,)=> {
   
      let Antes = Dat/1000;
      let Depois = Dat2/1000;
      console.log(Antes);
      console.log(Depois);
       
             await firestore.collection("JogosCirados")
               .where("DiaJogo", ">=", Antes)
               .where("DiaJogo", "<=", Depois)
               .get().then((querySnapshot) => {

               var res = []; 
               console.log("q "+querySnapshot.size)
               querySnapshot.forEach((doc) => {

                let currentDate = '';
                let now =new Date(doc.data().DiaJogo*1000);
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let Dia = now.getDate();
                let Mes = (now.getMonth()+1);
                let Ano = now.getFullYear();
                let seg = now.getSeconds(); 
                hours = hours < 10 ? '0'+hours : hours;
                minutes = minutes < 10 ? '0'+minutes : minutes;
                seg = seg < 10 ? '0'+seg : seg;
                Dia = Dia < 10 ? '0'+Dia : Dia;
                Mes = Mes < 10 ? '0'+Mes : Mes;
                currentDate = Dia+'/'+Mes+'/'+Ano;
                currentDate += ' ';
                currentDate += hours+':'+minutes;
                 
                   res.push({
                     id: doc.id,
                     dataJogo: doc.data().DiaJogo,
                     Analisado:doc.data().Analisado,
                     AtualApi:doc.data().AtualApi,
                     Atualizei:doc.data().Atualizei,
                     Best:doc.data().Best,
                     Casa:doc.data().Casa,
                     CasaDeAposta:doc.data().CasaDeAposta,
                     Estadio:doc.data().Estadio,
                     Fora:doc.data().Fora,
                     dataCriacao:doc.data().dataCriacao,
                     fixture:doc.data().fixture,
                     liga:doc.data().liga,
                     dataForm:currentDate,
   
                    
                   });    
                 
                 
               });
               
               res.sort((a,b)=>{
                 if(a.dataJogo > b.dataJogo) {
                   return 1;
                 } else {
                   return -1;
                 }
               });
               console.log(res)
               setListOc(res);
               setCarreg(false);  
       
                 });
   
             
             
           
      
        
       
       
     },
     Apostando: async(QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)=> {
      var Msg = ""
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){
          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id,
            Nome = doc.data().Nome

            });

            if(Cambis === false){
     
              await firestore.collection("CompApostas")
              .add({
      
              Nome:Nome,
              Tel:tel,
              IdCri:IdUser,
              Cambista:Cambis,
              NomeComp:NomeCli,
              TelComp:TelCli,
              Pago:false,
              PremioPago:false,
              AnaliTotal:false,
              Aprovado:false,
              DataApost:new Date().getTime(),
              ValorPremio: ValPreDemos,
              ValorAposta: ValorReal,
              Bets:SimAp,
              ValCambis:ValCambis,
              CotaGeral:VaToCo,
              valorAposSimb:ValApos,
      
           
              }).then(async (def) => {
              
               var data = new URLSearchParams();
                 data.append('Valor', ValorReal);
                 data.append('Nome', Nome);
                 data.append('Tel', tel);
                 data.append('IdApos', def.id);
           
             const req = await fetch(" https://us-central1-pixbetcash.cloudfunctions.net/api/criarPagamento", {
               method: 'POST',
               headers:{
                 'Content-Type': 'application/x-www-form-urlencoded'
               },
               body: data.toString(),
               json: true,
             });
            
             const json = await req.json();
           
             if(json){
              
               setLinkEnv(json.resposta.response.init_point);
               setCarre(false);
               setAlert("Aposta Criada Com Sucesso!");
               setAlertTipo("success");
               setVerNotajogo(false);
               setModalCalend(true)
               setSimAp([]);
               setValCambis("");
               setValorReal(0);
               setValPremi(0);
               setTelCli("");
               setNomeCli("");
               setCambis(false);
               setValPreDemos("");
               setVaToCo(0)
      
              
              }
           
           
              
           
             
           
           })
            .catch((error) => {
                console.error("Error adding document: ", error);
            }); 
           
           
          } else {
      
            
            var ver = TelCli.replace("(", "55");
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
                
                if(json.exists === true){
      
                  await firestore.collection("CompApostas")
                  .add({
          
                  Nome:Nome,
                  Tel:tel,
                  IdCri:IdUser,
                  Cambista:Cambis,
                  NomeComp:NomeCli,
                  TelComp:TelCli,
                  Pago:false,
                  PremioPago:false,
                  Aprovado:false,
                  AnaliTotal:false,
                  DataApost:new Date().getTime(),
                  ValorPremio: ValPreDemos,
                  ValorAposta: ValorReal,
                  Bets:SimAp,
                  ValCambis:ValCambis,
                  CotaGeral:VaToCo,
                  valorAposSimb:ValApos,
          
               
                  }).then(async (def) => {
                    console.log(def.id)
                   var data = new URLSearchParams();
                     data.append('Valor', ValorReal);
                     data.append('Nome', Nome);
                     data.append('Tel', tel);
                     data.append('IdApos', def.id);
               
                 const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/criarPagamento", {
                   method: 'POST',
                   headers:{
                     'Content-Type': 'application/x-www-form-urlencoded',
                   },
                   body: data.toString(),
                   json: true,
                 });
                
                 const json = await req.json();
               
                 if(json){
                   console.log(json.resposta.response.init_point)
                   setLinkEnv(json.resposta.response.init_point);
                   setCarre(false);
                   setAlert("Aposta Criada Com Sucesso!");
                   setAlertTipo("success");
                   setVerNotajogo(false)
                   setModalCalend(true)
                   setSimAp([]);
                   setValCambis("");
                   setValorReal(0);
                   setValPremi(0);
                   setTelCli("");
                   setNomeCli("");
                   setCambis(false);
                   setValPreDemos("");
                   setVaToCo(0)
          
                  
                  }
               
               
                  
               
                 
               
               })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                }); 
      
                
                } else {
      
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setAlert("O Telefone do Cliente Não é um Whatsapp!");
                  setAlertTipo("danger");
                  setCarre(false);
               
               
               
                }
          
          
          
          
          
          
          
          }
      

          } else {
            setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
            setAlertTipo("danger")
            setVerNotajogo(false)
            setModalCalend(true)
            setCarre(false);
          }
        });


    
     
     
         
     
     
     
     
     
     
     
     
              
     
         
       
       },
  

}