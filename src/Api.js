import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import firebaseConfig from './services/firebase';

const firebaseApp =  firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();

var URL_SITE = "https://cartaoweb.online";
var APIWHATS = "https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/"; 

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


          VerWhats: async (Tel,  setTe1, setTelMsg, setNome, setBtn,  setLoading) => {
         

            var ver = Tel.replace("(", "55");
            var par1 = ver.replace(")", "");
            var par3 = par1.replace("-", "");
            const req = await fetch(`${APIWHATS}phone-exists/${par3}`, 
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

                await firestore.collection("users")
                .where("Telefone", "==", Tel)
                .get().then((querySnapshot) => {
                 
                  if(querySnapshot.size !== 0){
                    querySnapshot.forEach((doc) => {
                     
                      setTe1(true);
                      setNome(doc.data().NomeComp)
                      
                    })
                
                  }
                  });
              
        
              
                await setLoading(false)
          },

    AnaliseTel: async (Tel, setTe1, setNome) => {
      console.log("Nome ")
     
    
    
    },

    VerWhatsInd: async (TelCli, setTelMsg, setNomeCli, setBtn,  setLoading) => {


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
          setTelMsg(json.exists);
        
  
          if(json.exists === true){
           
            setBtn(true);
          } else{
            setBtn(false);
          }
       
  
       
          await setLoading(false)
    },

    AnaliseTelIndic: async (TelCli, setTe1, setNomeCli, setBtn1,  setTe2, setBtn2, setDateInd) => {
      var tim = new Date().getTime();
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)

      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){


      await firestore.collection("users")
      .where("Telefone", "==", TelCli)
      .get().then((querySnapshot) => {
        if(querySnapshot.size !== 0){
          querySnapshot.forEach((doc) => {
            setTe1(true);
            setBtn1(false);
            setNomeCli(doc.data().Nome)
          })
      
        } else {
          setTe1(false);
          setBtn1(true);
    
        }
         });
    
         await firestore.collection("BancoWhats")
        .where("Telefone", "==", TelCli)
        .where("DataFin", ">", tim)
        .where("Aprovado", "==", false)
        .get().then((querySnapshot) => {
          console.log("Existe aqui")
        if(querySnapshot.size !== 0){
       
          querySnapshot.forEach((doc) => {
            let currentDate = '';
            let now =new Date(doc.data().DataFin);
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
            currentDate += hours+':'+minutes+":"+seg;
            setTe2(true);
            setBtn2(false);
            setDateInd(currentDate)
          })
      
        } else {
          setTe2(false);
          setBtn2(true);
    
        }
         });

        }
      });
    
    
    
    },

    VerWhatsTransf: async (TelCli, setMsgErro1, setCarre) => {


      // var ver = TelCli.replace("(", "55");
      // var par1 = ver.replace(")", "");
      // var par3 = par1.replace("-", "");
      // const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
      // {
      //       method: 'GET',
      //       headers:{
      //         'Content-Type': 'application/json'
      //       },
            
      //     });
  
      
        
      //     const json = await req.json(); 
      //     setTelMsg(json.exists);
        
  
      //     if(json.exists === true){
            
      //       setMsgErro1(true);
      //     } else{
      //       setMsgErro1(false);
      //     }
        
  
        
        
    },

AnaliseTelTransf: async (TelCli, setMsgErro2, setNome, setLoad, setBtn, setIdTrans) => {

await firestore.collection("users")
.where("Telefone", "==", TelCli)
.get().then((querySnapshot) => {
 
  if(querySnapshot.size !== 0){
    querySnapshot.forEach((doc) => {
     
      setIdTrans(doc.id)
      setNome(doc.data().Nome)
      setBtn(true);
    })

  } else {
    setMsgErro2(true);
  }
    });

    setLoad(false)


},

AnaliseTelMudar: async (Tel, setMsgErro,  setBtn1, setCarre) => {

  await firestore.collection("users")
  .where("Telefone", "==", Tel)
  .get().then((querySnapshot) => {
   
    if(querySnapshot.size !== 0){
      querySnapshot.forEach((doc) => {
       
        setMsgErro("Já Existe Uma Conta Com Esse Whatsapp!");
       
      })
  
    } else {
       setBtn1(true);
      setMsgErro("")
    }
      });
  
      setCarre(false)
  
  
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

    signIn: async (Tel, Nome, IdInd2, VerSite2, setIrCad, setIrEnt, setLoading) => {
      let temp = new Date().getTime();
      var tele = Tel.toString();
   
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
            const req = await fetch(`${APIWHATS}send-messages`, 
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
        NomeComp:Nome,
        Nome:"",
        Indicados:[],
        Extrato:[],
        DataCadas: temp,
        Cash:0,
        Dinheiro:0,
        DataVenc:0,
        ADM:false,
        Nivel3:0,
        Nivel4:0,
        mensagem:[
          {
            date:new Date().getTime(),
            autor:"Sistema",
            body:"Aqui você terá total atenção da empresa CWO, Fique a vontade e Bom uso do Sistema!",
            nome:"CWO",
            type:"text"

          }
        ],
        DigiS:false,
        DigiV:false,
        vizualS:0,
        vizualV:0,
        ultimaMsg:{
          data:new Date().getTime(),
          id:"Sistema",
          msg:"Aqui você terá total atenção da empresa CWO, Fique a vontade e Bom uso do Sistema!",
          nome:"CWO"
        },
        userchat:[{}],
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
    const req = await fetch(`${APIWHATS}send-messages`, 
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

        // await firestore.collection("BancoWhats")
        // .where("Telefone", "==", Tel)
        // .where("DataFin", ">=", temp)
        // .get().then((querySnapshot2) => {
        
        //   if(querySnapshot2.size !== 0){
        //   querySnapshot2.forEach(async (doc2) => {
        //     IdBanco = doc2.id;
        //     IdInd = doc2.data().IdUser;
        //   });
        //     firestore.collection("users")
        //     .doc(IdInd)
        //     .update({
        //       Indicados: firebase.firestore.FieldValue.arrayUnion(id)
        //      })
  
        //     firestore.collection("BancoWhats")
        //     .doc(IdBanco)
        //     .update({
        //       Aprovado:true, 
        //       })

        //   firestore.collection("users")
        //   .where("Indicados", "array-contains", IdInd)
        //   .get()
        //   .then((querySnapshot) => {
        //     var IdNive3 = "";
        //     var Nive3Q = 0;
        //     if(querySnapshot.size !== 0){

        //       querySnapshot.forEach((doc) => {
        //         IdNive3 = doc.id;
        //         Nive3Q =  doc.data().Nivel3;                 
        //        });
        //        firestore.collection("users")
        //        .doc(IdNive3)
        //        .update({
        //         Nivel3: Nive3Q + 1
        //       })

        //       firestore.collection("users")
        //       .where("Indicados", "array-contains", IdNive3)
        //       .get()
        //       .then((querySnapshot3) => {
        //         var IdNive4 = "";
        //         var Nive4Q = 0;
        //         if(querySnapshot3.size !== 0){
    
        //           querySnapshot3.forEach((doc3) => {
        //             IdNive4 = doc3.id;
        //             Nive4Q =  doc3.data().Nivel4;                 
        //            });
        //            firestore.collection("users")
        //            .doc(IdNive4)
        //            .update({
        //             Nivel4: Nive4Q + 1
        //           })
    
                  
    
    
        //         }
                 
        //       })



        //     }
             
        //   })
          
          
        // } else{
        //   if(VerSite2 === "indicacao"){

        //     firestore.collection("users")
        //     .doc(IdInd2)
        //     .update({
        //       Indicados: firebase.firestore.FieldValue.arrayUnion(id)
        //      })

        //      firestore.collection("users")
        //      .where("Indicados", "array-contains", IdInd2)
        //      .get()
        //      .then((querySnapshot) => {
        //        var IdNive3 = "";
        //        var Nive3Q = 0;
        //        if(querySnapshot.size !== 0){
   
        //          querySnapshot.forEach((doc) => {
        //            IdNive3 = doc.id;
        //            Nive3Q =  doc.data().Nivel3;                 
        //           });
                 
        //           firestore.collection("users")
        //           .doc(IdNive3)
        //           .update({
        //            Nivel3: Nive3Q + 1
        //          })
   
        //          firestore.collection("users")
        //          .where("Indicados", "array-contains", IdNive3)
        //          .get()
        //          .then((querySnapshot3) => {
        //            var IdNive4 = "";
        //            var Nive4Q = 0;
        //            if(querySnapshot3.size !== 0){
       
        //              querySnapshot3.forEach((doc3) => {
        //                IdNive4 = doc3.id;
        //                Nive4Q =  doc3.data().Nivel4;                 
        //               });
        //               console.log(Nive4Q)
        //               console.log(Nive4Q.length)
        //               firestore.collection("users")
        //               .doc(IdNive4)
        //               .update({
        //                Nivel4: Nive4Q + 1
        //              })
       
                     
       
       
        //            }
                    
        //          })
   
   
   
        //        }
                
        //      })

             
  
   
        //   }

        // }
  
        // });
        
  
  
  
  
    
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

    signInSecund: async (Tel, Nome, setIrEnt, setLoading) => {
      let temp = new Date().getTime();
      var tele = Tel.toString();
   
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
            const req = await fetch(`${APIWHATS}send-messages`, 
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
        NomeComp:Nome,
        Nome:"",
        Indicados:[],
        Extrato:[],
        DataCadas: temp,
        Cash:0,
        Dinheiro:0,
        DataVenc:0,
        ADM:false,
        Nivel3:0,
        Nivel4:0,
        mensagem:[
          {
            date:new Date().getTime(),
            autor:"Sistema",
            body:"Aqui você terá total atenção da empresa CWO, Fique a vontade e Bom uso do Sistema!",
            nome:"CWO",
            type:"text"

          }
        ],
        DigiS:false,
        DigiV:false,
        vizualS:0,
        vizualV:0,
        ultimaMsg:{
          data:new Date().getTime(),
          id:"Sistema",
          msg:"Aqui você terá total atenção da empresa CWO, Fique a vontade e Bom uso do Sistema!",
          nome:"CWO"
        },
        userchat:[{}],
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
    const req = await fetch(`${APIWHATS}send-messages`, 
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

        // await firestore.collection("BancoWhats")
        // .where("Telefone", "==", Tel)
        // .where("DataFin", ">=", temp)
        // .get().then((querySnapshot2) => {
        
        //   if(querySnapshot2.size !== 0){
        //   querySnapshot2.forEach(async (doc2) => {
        //     IdBanco = doc2.id;
        //     IdInd = doc2.data().IdUser;
        //   });
        //     firestore.collection("users")
        //     .doc(IdInd)
        //     .update({
        //       Indicados: firebase.firestore.FieldValue.arrayUnion(id)
        //      })
  
        //     firestore.collection("BancoWhats")
        //     .doc(IdBanco)
        //     .update({
        //       Aprovado:true, 
        //       })

        //   firestore.collection("users")
        //   .where("Indicados", "array-contains", IdInd)
        //   .get()
        //   .then((querySnapshot) => {
        //     var IdNive3 = "";
        //     var Nive3Q = 0;
        //     if(querySnapshot.size !== 0){

        //       querySnapshot.forEach((doc) => {
        //         IdNive3 = doc.id;
        //         Nive3Q =  doc.data().Nivel3;                 
        //        });
        //        firestore.collection("users")
        //        .doc(IdNive3)
        //        .update({
        //         Nivel3: Nive3Q + 1
        //       })

        //       firestore.collection("users")
        //       .where("Indicados", "array-contains", IdNive3)
        //       .get()
        //       .then((querySnapshot3) => {
        //         var IdNive4 = "";
        //         var Nive4Q = 0;
        //         if(querySnapshot3.size !== 0){
    
        //           querySnapshot3.forEach((doc3) => {
        //             IdNive4 = doc3.id;
        //             Nive4Q =  doc3.data().Nivel4;                 
        //            });
        //            firestore.collection("users")
        //            .doc(IdNive4)
        //            .update({
        //             Nivel4: Nive4Q + 1
        //           })
    
                  
    
    
        //         }
                 
        //       })



        //     }
             
        //   })
          
          
        // } else{
        //   if(VerSite2 === "indicacao"){

        //     firestore.collection("users")
        //     .doc(IdInd2)
        //     .update({
        //       Indicados: firebase.firestore.FieldValue.arrayUnion(id)
        //      })

        //      firestore.collection("users")
        //      .where("Indicados", "array-contains", IdInd2)
        //      .get()
        //      .then((querySnapshot) => {
        //        var IdNive3 = "";
        //        var Nive3Q = 0;
        //        if(querySnapshot.size !== 0){
   
        //          querySnapshot.forEach((doc) => {
        //            IdNive3 = doc.id;
        //            Nive3Q =  doc.data().Nivel3;                 
        //           });
                 
        //           firestore.collection("users")
        //           .doc(IdNive3)
        //           .update({
        //            Nivel3: Nive3Q + 1
        //          })
   
        //          firestore.collection("users")
        //          .where("Indicados", "array-contains", IdNive3)
        //          .get()
        //          .then((querySnapshot3) => {
        //            var IdNive4 = "";
        //            var Nive4Q = 0;
        //            if(querySnapshot3.size !== 0){
       
        //              querySnapshot3.forEach((doc3) => {
        //                IdNive4 = doc3.id;
        //                Nive4Q =  doc3.data().Nivel4;                 
        //               });
        //               console.log(Nive4Q)
        //               console.log(Nive4Q.length)
        //               firestore.collection("users")
        //               .doc(IdNive4)
        //               .update({
        //                Nivel4: Nive4Q + 1
        //              })
       
                     
       
       
        //            }
                    
        //          })
   
   
   
        //        }
                
        //      })

             
  
   
        //   }

        // }
  
        // });
        
  
  
  
  
    
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
            await AsyncStorage.setItem('@Id', doc.id);
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

    EntCod: async (IdCart, code, Tel, Nome, Tentativa, setTentativa, setIrEnt, setLoading, setTelMsg5, setUso, setAtivo  ) => {
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
           
           await firestore.collection("Cartoes")
            .doc(IdCart)
            .update({
              IdDono:doc.id,
              DataIniUso:new Date().getTime(),
              DataVenc:new Date().getTime()+31536000000,
              Ativo:true,
              EmUso:true,
          })
          .then( async() => {

            let time = new Date().getTime();
            await firestore.collection("users")
            .doc(doc.id)
            .update({
              DataEntCel: time,
          })
          .then( async() => {
           
            let temp = await time.toString();
            
            await AsyncStorage.setItem('@entrada', temp);
            await AsyncStorage.setItem('@Id', doc.id);
            setUso(true);
            setAtivo(true);
            await setIrEnt(true);
            setLoading(false);
          })
          .catch((error) => {
          
            
          });

          });


         
    
       
      
    
      
    });
  
     } else {
      setTelMsg5(true)
      setLoading(false);
      setTentativa(Tentativa+1)
      
     }
   
  })
  .catch((error) => {
   
  });
  
  
  
       
    },

    EntContCart: async (IdCart, code, Tel, Nome, Tentativa, setTentativa, setIrEnt, setLoading, setTelMsg5, setUso, setAtivo, setIrConta, setSalVer    ) => {
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
            await firestore.collection("users")
            .doc(doc.id)
            .update({
              DataEntCel: time,
          })
          .then( async() => {
           
            let temp = await time.toString();
            
            await AsyncStorage.setItem('@entrada', temp);
            await AsyncStorage.setItem('@Id', doc.id);
           
            setIrConta(true)
            setLoading(false);
            setSalVer(false)
          })
          .catch((error) => {
          
            
          });

       


         
    
       
      
    
      
    });
  
     } else {
      setTelMsg5(true)
      setLoading(false);
      setTentativa(Tentativa+1)
      
     }
   
  })
  .catch((error) => {
   
  });
  
  
  
       
    },

    EntSalvando: async (IdCart, code, Tel, Nome, Tentativa, setTentativa, setIrEnt, setLoading, setTelMsg5, setUso, setAtivo, setSalVer, setAlert, setAlertTipo, setModalCalend, setVerNotajogo  ) => {
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
           
           await firestore.collection("Cartoes")
            .doc(IdCart)
            .update({
            SalvouNum:firebase.firestore.FieldValue.arrayUnion(doc.id),
          })
          .then( async() => {

            let time = new Date().getTime();
            await firestore.collection("users")
            .doc(doc.id)
            .update({
              DataEntCel: time,
          })
          .then( async() => {
           
            let temp = await time.toString();
            
            await AsyncStorage.setItem('@entrada', temp);
            await AsyncStorage.setItem('@Id', doc.id);
            await setIrEnt(true);
            setLoading(false);
            setSalVer(false);
            setAlert("O Cartão Foi Salvo Na sua Conta!");
            setAlertTipo("Salve");
            setModalCalend(true);
            setVerNotajogo(false);

          })
          .catch((error) => {
          
            
          });

          });


         
    
       
      
    
      
    });
  
     } else {
      setTelMsg5(true)
      setLoading(false);
      setTentativa(Tentativa+1)
      
     }
   
  })
  .catch((error) => {
   
  });
  
  
  
       
    },

    EntCredenci: async (IdCart, code, Tel, Nome, Tentativa, setTentativa, setIrEnt, setLoading, setTelMsg5, setUso, setAtivo, setSalVer, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCreden   ) => {
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
           
           await firestore.collection("Cartoes")
            .doc(IdCart)
            .update({
              ListCredenciais:firebase.firestore.FieldValue.arrayUnion(doc.id),
          })
          .then( async() => {

            let time = new Date().getTime();
            await firestore.collection("users")
            .doc(doc.id)
            .update({
              DataEntCel: time,
          })
          .then( async() => {
           
            let temp = await time.toString();
            
            await AsyncStorage.setItem('@entrada', temp);
            await AsyncStorage.setItem('@Id', doc.id);
            await setIrEnt(true);
            setLoading(false);
            setSalVer(false);
            setAlert("O Cartão Credenciado com Sucesso!");
            setAlertTipo("Salve");
            setModalCalend(true);
            setVerNotajogo(false);
            setCreden(true);

          })
          .catch((error) => {
          
            
          });

          });


         
    
       
      
    
      
    });
  
     } else {
      setTelMsg5(true)
      setLoading(false);
      setTentativa(Tentativa+1)
      
     }
   
  })
  .catch((error) => {
   
  });
  
  
  
       
    },
    
    ListJogos: async(Page, setListOc, setCarreg,  Dat, Dat2,)=> {
      let time = new Date().getTime();
      let Antes = Dat/1000;
      let Depois = Dat2/1000;
      console.log(Antes);
      console.log(Depois);
       
             await firestore.collection("JogosCirados")
              .where("DiaJogo", ">=", Antes)
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

     AnaliseOlds: async(SimAp, IdApos,  setAnliAp,  setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)=> {
      var res = [];
      var rever=[]
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
            console.log(SimAp)
            for(let i in SimAp){

           await  firestore.collection("CasaOlds")
            .doc(SimAp[i].IdCasa)
            .get().then((doc) => {

            console.log(doc.id)

            res.push({
              id:doc.id,
              Resultado:doc.data().Resultado,
            })

            rever.push(doc.data().Resultado)
         
          
            });
          }
          console.log(res)
          console.log(rever)
          setStatusAp(res);
          setAnliAp(true);
          setCarre(false);
          if(rever.includes("Em Analise")){
            
            await firestore.collection("CompApostas").doc(IdApos,)
              .update({
                AnaliTotal:false,
                Aprovado:false,

              });
      
   

          } else if(rever.includes("Reprovado") ){
            
            await firestore.collection("CompApostas").doc(IdApos,)
            .update({
              AnaliTotal:true,
              Aprovado:false,

            });

          } else {
            await firestore.collection("CompApostas").doc(IdApos,)
            .update({
              AnaliTotal:true,
              Aprovado:true,

            });
            setAproPag(true);
    

          }


   
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              })  
             
           
      
        
       
       
     },

     Enviandopaga: async(IdApos, ValPreDemos, setPremio, setCarre)=> {
      var res = [];
      var rever=[]
      var IdUser = ""
      var Nome = ""
      var Dinheiro = 0;
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){
          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id;
            Nome = doc.data().Nome;
            Dinheiro = doc.data().Dinheiro;
            });
            
           var din =  ValPreDemos.replace(",", ".");
           var diner = parseFloat(din) + Dinheiro;
        
          
            await firestore.collection("CompApostas").doc(IdApos)
            .update({
              PremioPago:true,
            });
            
            await firestore.collection("Premios")
            .add({
              IdUser: IdUser,
              Tel:tel,
              DateDinheiro:new Date().getTime(),
              IdApos: IdApos,
              ValorPremi:din,
          })
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
          })
        
            await firestore.collection("users").doc(IdUser)
            .update({
              Dinheiro:diner,
              DateDinheiro:new Date().getTime(),
            });
          
            setPremio(true)
            setCarre(false);
          


   
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              })  
             
           
      
        
       
       
     },

    

     MeusJogos: async(Page, setListOc, setCarreg,  Dat, Dat2,)=> {
   
      let Antes = Dat;
      let Depois = Dat2;
      console.log(Antes);
      console.log(Depois);
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var IdUser = await AsyncStorage.getItem('@Id');
   
      var temp = parseInt(time)
     
       
             await firestore.collection("CompApostas")
               .where("DataApost", ">=", Antes)
               .where("DataApost", "<=", Depois)
               .where("IdCri", "==", IdUser)
               .onSnapshot((querySnapshot) => {

               var res = []; 
               console.log("q "+querySnapshot.size)
               querySnapshot.forEach((doc) => {
              
                let currentDate = moment(doc.data().DataApost).format("DD/MM/YYYY HH:mm");
               
                 
                   res.push({
                    id: doc.id,
                   dataJogo:doc.data().DataApost,
                   NomeCam:doc.data().Nome,
                   TelCam :doc.data().Tel,
                   Nome:doc.data().NomeComp,
                   TelCli:doc.data().TelComp,
                   Pago:doc.data().Pago,
                   Aprovado:doc.data().Aprovado,
                   PremioPago:doc.data().PremioPago,
                   AnaliTotal:doc.data().AnaliTotal,
                   ValPreDemos:doc.data().ValorPremio,
                   ValorReal:doc.data().ValorAposta,
                   SimAp:doc.data().Bets,
                   ValCambis:doc.data().ValCambis,
                   VaToCo:doc.data().CotaGeral,
                   ValApos:doc.data().valorAposSimb,
                   Cash:doc.data().CashGanha, 
                   dataForm:currentDate,
                  Cambista:doc.data().Cambista,
   
                    
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

     CartoesCriado: async(ListOc, setListOc, setCarre,  )=> {
   
     
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var IdUser = await AsyncStorage.getItem('@Id');
   
      var temp = parseInt(time)
     
       
             await firestore.collection("Cartoes")
               .onSnapshot((querySnapshot) => {

               var res = []; 
               console.log("q "+querySnapshot.size)
               querySnapshot.forEach((doc) => {
              
                let currentDate = moment(doc.data().DataCri).format("DD/MM/YYYY HH:mm");
                let currentDate3 = moment(doc.data().DataVenc).format("DD/MM/YYYY HH:mm");
               
                 
                   res.push({
                  id: doc.id,
                  dataForm:currentDate,
                  dataCri:doc.data().DataCri,
                  EmUso:doc.data().EmUso,
                  DataVenc:doc.data().DataVenc,
                  DataVenFor:currentDate3,
                  CartaoConfig:doc.data().CartaoConfig,
                  CodVeri:doc.data().CodVeri?doc.data().CodVeri:{Ativo:false, Cod:""},
                  QrCode:doc.data().FotoQRCODE, 
                   });    
                 
                 
               });
               
               res.sort((a,b)=>{
                 if(a.dataCri > b.dataCri) {
                   return 1;
                 } else {
                   return -1;
                 }
               });
               console.log(res)
               setListOc(res);
               setCarre(false);  
       
                 });
   
               
             
           
      
        
       
       
     },

     DadosGraficos: async( Page, setNiveis, setJogos, setGanhos,  setCarreg,  Dat, Dat2, )=> {
   
      let Antes = Dat ;
      let Depois = Dat2;
      let Indicados = [];
      let Extrato = [];
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
          var N2Q = 0;
          var N3Q = 0;
          var N4Q = 0;
          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id;
            Nome = doc.data().Nome;
            Indicados = doc.data().Indicados;
            Extrato = doc.data().Extrato;
            N2Q = doc.data().Indicados.length;
            N3Q = doc.data().Nivel3;
            N4Q = doc.data().Nivel4;
            });
            console.log(Extrato)
          var N1ganhos = 0
          var N2ganhos = 0
          var N3ganhos = 0
          var N4ganhos = 0

          var N1Jogos = 0
          var N2Jogos = 0
          var N3Jogos = 0
          var N4Jogos = 0
          var TotalJogos = 0;

            for(let i in Extrato){
                    
              if(Extrato[i].Nivel === "1" &&  Extrato[i].Status === "Ganhou" && Extrato[i].Moeda === "Cash" && Extrato[i].Data >= Dat  ){
                 var Div = Extrato[i].Valor;
                 N1ganhos = N1ganhos + Div; 
                 N1Jogos = N1Jogos + 1; 
                 TotalJogos = TotalJogos +1;
              } else if(Extrato[i].Nivel === "2" &&  Extrato[i].Status === "Ganhou" && Extrato[i].Moeda === "Cash" && Extrato[i].Data >= Dat  ){
                var Div2 = Extrato[i].Valor;
                N2ganhos = N2ganhos + Div2;
                N2Jogos = N2Jogos + 1; 
                TotalJogos = TotalJogos +1; 
             } else  if(Extrato[i].Nivel === "3" &&  Extrato[i].Status === "Ganhou" && Extrato[i].Moeda === "Cash" && Extrato[i].Data >= Dat ){
              var Div3 = Extrato[i].Valor;
              N3ganhos = N3ganhos + Div3;
              N3Jogos = N3Jogos + 1; 
              TotalJogos = TotalJogos +1; 
           } else if(Extrato[i].Nivel === "4" &&  Extrato[i].Status === "Ganhou" && Extrato[i].Moeda === "Cash" && Extrato[i].Data >= Dat ){
            var Div4 = Extrato[i].Valor;
            N4ganhos = N4ganhos + Div4; 
            N2Jogos = N2Jogos + 1; 
            TotalJogos = TotalJogos +1;
           } 
          }

          
        

         
        
   
    setJogos([N1Jogos/TotalJogos, N2Jogos/TotalJogos, N3Jogos/TotalJogos, N4Jogos/TotalJogos]) 
    setGanhos([N1ganhos, N2ganhos, N3ganhos, N4ganhos])
    setNiveis([N2Q, N3Q, N4Q])
    console.log([N1Jogos, N2Jogos, N3Jogos, N4Jogos]) 
    console.log(TotalJogos)       
                 
                
                 
                 
             
               
            
              
              
               setCarreg(false);  
       
          
   
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              })  
             
           
      
        
       
       
     },
     
     PegaCartao: async(IdCart, setLogado, setCarreg, setInfCart, setIdUser )=> {
   
     
      var IdUse = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
      console.log(tel)
      console.log(time) 
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
        console.log(querySnapshot.size)
        if(querySnapshot.size !== 0){
          querySnapshot.forEach( async (doc1) => {
            IdUse = doc1.id
       
            });
            setLogado(true);
            setIdUser(IdUse)
          } else {
            setLogado(false);
          }
        });
      
    
       
             await firestore.collection("Cartoes")
            .doc(IdCart).get().then((doc) => {

            
                setInfCart(doc.data())
                setCarreg(false);  
                 
               });
               
            
              
              
           
       
               
   
              
             
           
      
        
       
       
     },

     MeusIndicados: async(Page, setListOc, setCarreg,  Dat, Dat2,)=> {
   
      let Antes = Dat ;
      let Depois = Dat2;
    
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var IdUser = await AsyncStorage.getItem('@Id');
      var temp = parseInt(time)
    
       
       console.log(IdUser)
             await firestore.collection("BancoWhats")
               .where("IdUser", "==", IdUser)
               .orderBy("Aprovado", "desc")
               .onSnapshot((querySnapshot) => {

               var res = []; 
               console.log("q "+querySnapshot.size)
               querySnapshot.forEach((doc) => {

                let currentDate = '';
                let now =new Date(doc.data().DataFin);
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
                currentDate += hours+':'+minutes+":"+seg;
      
                  res.push({
                    id:doc.id,
                    Nome:doc.data().NomeConv,
                    Telefone:doc.data().Telefone,
                    Data:currentDate,
                    DataFin:doc.data().DataFin,
                    Aprovado:doc.data().Aprovado,
                  })
                 
                
                 
                 
               });
               
            
              
               setListOc(res);
               setCarreg(false);  
       
                 });
   
              
             
           
      
        
       
       
     },


     ListJogosCambis: async(Page, setListOc, setCarreg,  Dat, Dat2,)=> {
   
      let Antes = Dat;
      let Depois = Dat2;
      console.log(Antes);
      console.log(Depois);
      var Nome = ""
      var IdUser = await AsyncStorage.getItem('@Id');
     
      
       
             await firestore.collection("NotaCambista")
               .where("dataCriar", ">=", Antes)
               .where("dataCriar", "<=", Depois)
               .where("IdCri", "==", IdUser)
               .onSnapshot((querySnapshot) => {

               var res = []; 
               console.log("q "+querySnapshot.size)
               querySnapshot.forEach((doc) => {

                let currentDate = '';
                let now =new Date(doc.data().dataCriar);
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
                   dataJogo:doc.data().dataCriar,
                   NomeCam:doc.data().Nome,
                   TelCam :doc.data().Tel,
                   Nome:doc.data().NomeComp,
                   TelCli:doc.data().TelComp,
                   Pago:doc.data().Pago,
                   Concluir:doc.data().Conscluido,
                   ValPreDemos:doc.data().ValorPremio,
                   ValorReal:doc.data().ValorAposta,
                   SimAp:doc.data().Bets,
                   ValCambis:doc.data().ValCambis,
                   VaToCo:doc.data().CotaGeral,
                   ValApos:doc.data().valorAposSimb,
                   Cash:doc.data().CashGanha, 
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

     JogoCriadoCamb: async(id, setVaToCo, setValPreDemos, setValorReal, setSimAp, setValApos,setNome, setTelCli, setNomeCam, setTelCam, setConcluir, setPago, setValCambis, setQCash,  )=> {
   
      await firestore.collection("NotaCambista").doc(id)
      .get()
      .then((doc) => {
          
  
  
          setNomeCam(doc.data().Nome);
          setTelCam(doc.data().Tel);
          setNome(doc.data().NomeComp);
          setTelCli(doc.data().TelComp);
          setPago(doc.data().Pago);
          setConcluir(doc.data().Conscluido);
          setValPreDemos(doc.data().ValorPremio);
          setValorReal(doc.data().ValorAposta);
          setSimAp(doc.data().Bets);
          setValCambis(doc.data().ValCambis);
          setVaToCo(doc.data().CotaGeral);
          setValApos(doc.data().valorAposSimb); 
          setQCash(doc.data().CashGanha);
      });
      
    },

    ConcluirApost: async(id, setConcluir, setPago)=> {
   
   
      await firestore.collection('NotaCambista')
        .doc(id).onSnapshot((doc) => {
         setConcluir(doc.data().Conscluido)
         setPago(doc.data().Pago)
         
      });
   
   
  },

  ConfigCart: async(Img, IrImg,  DadCart, CodVeri, setAlert, setAlertTipo, setCarre, setCodVeri, setDadCart)=> {
    var Url1 = "";
    if(IrImg === true){
      var Imagem = Img.split(',');

          
      const fileName = await Date.now() + Math.random()*100;
      const storageRef = await storage.ref();
      const fileRef = await storageRef.child(`arquivo/${fileName}`);
      await await fileRef.putString(Imagem[1], 'base64').then((doc)=> {
        
      });
      Url1 =  await fileRef.getDownloadURL();

     } else {
      Url1 = Img;
     }


    if(CodVeri === ""){
      await firestore.collection("Cartoes").doc(DadCart.id)
      .update({
        FotoQRCODE:Url1,  
        CartaoConfig:true,
        CodVeri:{Ativo:false, Cod:""}
    
      });
      setAlert("Cartão Codificado")
      setAlertTipo("success")
      setCarre(false)
      setDadCart({})
      setCodVeri("")

    } else {
      await firestore.collection("Cartoes").doc(DadCart.id)
      .update({
          
        CartaoConfig:true,
        CodVeri:{Ativo:true, Cod:CodVeri}
    
      });
      setAlert("Cartão Codificado")
      setAlertTipo("success")
      setCarre(false)
      setDadCart({})
      setCodVeri("")
    }
      
    
   
    
  },

  SalvCart: async(IdCart, DireSite, NomePix, IrImg, Ativo, AtiPrivi, Pessoal, Profissao, Empresa, Cidade, Estado, Sexo, CorCart, NomeCart, ImgCart, AtiImg, FundoImg, FunCart, AtiFun, TelCart, AtiTel, WhatCart, AtiWhat, InstCard, AtiInst, FaceCard, AtiFace, SiteCard, AtiSite, TwCard, AtiTw, TikCard, AtiTik, LocCard, AtiLoc, PixCard, TipPix, AtiPix, AtiSal, AtiCom, AtiYou, YouCard, TeleCard, AtiTele, EmailCard, AtiEmail, setAlert, setAlertTipo, setLoad,)=> {
    var Url1 = "";
    if(IrImg === true){
      var Imagem = ImgCart.split(',');

          
      const fileName = await Date.now() + Math.random()*100;
      const storageRef = await storage.ref();
      const fileRef = await storageRef.child(`arquivo/${fileName}`);
      await await fileRef.putString(Imagem[1], 'base64').then((doc)=> {
        
      });
      Url1 =  await fileRef.getDownloadURL();

     } else {
      Url1 = ImgCart;
     }


    await firestore.collection("Cartoes").doc(IdCart)
    .update({
        
   
      Nome:NomeCart,
      direcionamento:DireSite,
      Config:{
        Fundo:FundoImg,
        Foto:{Ativar:AtiImg, Link:Url1},
        Funcao:{Ativar:AtiFun, Texto:FunCart},
        Tel:{Ativar:AtiTel, Texto:TelCart},
        Whats:{Ativar:AtiWhat, Texto:WhatCart},
        Intagram:{Ativar:AtiInst, Link:InstCard},
        Facebook:{Ativar:AtiFace, Link:FaceCard},
        Site:{Ativar:AtiSite, Link:SiteCard},
        Twitter:{Ativar:AtiTw, Link:TwCard},
        Tiktok:{Ativar:AtiTik, Link:TikCard},
        Localizacao:{Ativar:AtiLoc, Link:LocCard},
        Pix:{Ativar:AtiPix, Tipo:TipPix, Pix:PixCard, Nome:NomePix},
        Salvar:{Ativar:AtiSal, Link:""},
        Compartilhar:{Ativar:AtiCom, Link:""},
        youtube:{Ativar:AtiYou, Link:YouCard},
        Telegram:{Ativar:AtiTele, Link:TeleCard},
        Email:{Ativar:AtiEmail, Link:EmailCard},
      },
      ListCidade:AtiPrivi,
      Pessoal:Pessoal,
      Profissao:Profissao,
      Empresa:Empresa,
      Cidade:Cidade,
      Estado:Estado,
      Sexo:Sexo,
      CorNalist:CorCart,
      Ativo:Ativo,
  

  
    });
    setAlert("Cartão Salvo")
    setAlertTipo("success")
    setLoad(false)
    
    
  },

  SalvandoNum: async(IdCart, IDSAO, setAlert, setAlertTipo, setCarre, setModalCalend, setVerNotajogo,  setIrConta)=> {
    
    await firestore.collection("Cartoes").doc(IdCart)
    .update({
        
    
      SalvouNum:firebase.firestore.FieldValue.arrayUnion (IDSAO),
    
  

  
    });
    setAlert("O Cartão Foi Salvo Na sua Conta!");
    setAlertTipo("Salve");
    setModalCalend(true);
    setVerNotajogo(false);
    setCarre(false);
    //setIrConta(true)
    
  },

  CredenciandoNum: async(IdCart, IDSAO, setAlert, setAlertTipo, setCarre, setModalCalend, setVerNotajogo,  setIrConta, setCreden)=> {
    
    await firestore.collection("Cartoes").doc(IdCart)
    .update({
        
    
      ListCredenciais:firebase.firestore.FieldValue.arrayUnion (IDSAO),
    
  

  
    });
    setAlert("O Cartão Credenciado com Sucesso!");
    setAlertTipo("Salve");
    setModalCalend(true);
    setVerNotajogo(false);
    setCarre(false);
    setCreden(true)
    //setIrConta(true)
    
  },

  DesCredenciandoNum: async(IdCart, IDSAO, setAlert, setAlertTipo, setCarre, setModalCalend, setVerNotajogo,  setIrConta, setCreden,  setLisCre)=> {
    var List = []
    await firestore.collection("Cartoes").doc(IdCart)
    .get().then( async(doc) => {
       List = doc.data().ListCredenciais
        
       
       setLisCre(List.filter(word => word !== IDSAO))
       await firestore.collection("Cartoes").doc(IdCart)
       .update({
           
       
         ListCredenciais:List.filter(word => word !== IDSAO)
       
     
   
     
       });
       setAlert("O Cartão Descredenciado com Sucesso!");
       setAlertTipo("Salve");
       setModalCalend(true);
       setVerNotajogo(false);
       setCarre(false);
       setCreden(false)
    
    
      })




 
    //setIrConta(true)
    
  },


  LimpCart: async(DadCart, setAlert, setAlertTipo, setCarre, setLimCar)=> {
    
    await firestore.collection("Cartoes").doc(DadCart.id)
    .update({
        
      IdDono:"",
      SalvouNum:[],
      NumExtrCredem:0,
      ListCredenciais:[],
      Nome:"CARLA CWO",
      direcionamento:false,
      Config:{
        Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2Ffundo1.png?alt=media&token=b152a38c-3771-461d-9416-0b5cd16fa574",
        Foto:{Ativar:true, Link:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2FperfilCWO.png?alt=media&token=454c9582-4fc3-45ef-8429-6dbf2fc85120"},
        Funcao:{Ativar:true, Texto:"Marketing"},
        Tel:{Ativar:true, Texto:""},
        Whats:{Ativar:true, Texto:""},
        Intagram:{Ativar:true, Link:""},
        Facebook:{Ativar:true, Link:""},
        Site:{Ativar:true, Link:""},
        Twitter:{Ativar:true, Link:""},
        Tiktok:{Ativar:true, Link:""},
        Localizacao:{Ativar:true, Link:""},
        Pix:{Ativar:true, Tipo:"", Pix:""},
        Salvar:{Ativar:true, Link:""},
        Compartilhar:{Ativar:true, Link:""},
        youtube:{Ativar:true, Link:""},
        Telegram:{Ativar:true, Link:""},
        Email:{Ativar:true, Link:""},
      },
      ListCidade:false,
      Pessoal:true,
      Profissao:["",""],
      Empresa:["",""],
      Cidade:"",
      Estado:"",
      Sexo:"",
      EmUso:false,
      DataIniUso:0,
      DataCri:new Date().getTime(),
      CartaoConfig:false,
      DataVenc:0,
      Pago:false,
      CodVeri:{Ativo:false, Cod:""},
      Ativo:false,
  

  
    });
    setAlert("Cartão Limpo")
    setAlertTipo("success")
    setCarre(false)
    setLimCar(false)
    
  },


    EnviadoAposCam: async(id, VaToCo, ValPreDemos, ValorReal, SimAp, ValApos, Nome, TelCli, NomeCam, TelCam, Concluir, Pago, ValCambis, QCash)=> {
      console.log(ValPreDemos)
      await firestore.collection("NotaCambista").doc(id)
      .update({
          
        Pago:Pago,
        Conscluido:Concluir,
        ValorPremio:ValPreDemos,
        ValorAposta:ValorReal,
        Bets:SimAp,
        ValCambis:ValCambis,
        CotaGeral:VaToCo,
        valorAposSimb:ValApos,
        CashGanha:QCash,
  
    
      });
      
    },

    TiraConcluidoApos: async(IdApos, Concluir)=> {
 
      await firestore.collection("NotaCambista").doc(IdApos)
      .update({
  
        Conscluido:Concluir,
  
      }).then(()=>{
       
      });
      
    },
    PegandoCartao: async(Page, TipoCart, Estado, Cidade, Sexo, NumProf, NumEmp, setLista, setCarreg )=>{
      console.log(Estado)
      let fur = Page*20;
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
            
            if(Estado === "" && Cidade === "" && TipoCart === null){
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot1) => {
                console.log(querySnapshot1.size)
                   querySnapshot1.forEach((doc1) => {
                     res.push({
                       id: doc1.id,
                       Nome: doc1.data().Nome,
                       Foto: doc1.data().Config.Foto,
                       SalvouNum:doc1.data().SalvouNum,
                       ListCredenciais:doc1.data().ListCredenciais,
                       CorNalist:doc1.data().CorNalist,

                     })
                   });
                
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            } else if(Estado !== "" && Cidade === "" && TipoCart === null){
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Estado", "==", Estado)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            } else if(Estado !== "" && Cidade !== "" && TipoCart === null){
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Estado", "==", Estado)
               .where("Cidade", "==", Cidade)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            }  else if(Estado !== "" && Cidade === "" && TipoCart !== null && Sexo === "" && NumProf === "" && NumEmp === "" ){
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Estado", "==", Estado)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            }  else if(Estado === "" && Cidade === "" && TipoCart !== null && Sexo === "" && NumProf === "" && NumEmp === "" ){
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            }   else if(Estado !== "" && Cidade !== "" && TipoCart !== null  && Sexo === "" && NumProf === "" && NumEmp === "" ){
              
              var res = [];
              await firestore.collection("Cartoes")
              .where("Estado", "==", Estado)
              .where("Cidade", "==", Cidade)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            }  else if(Estado !== "" && Cidade === "" && TipoCart === true && Sexo !== "" && NumProf === "" && NumEmp === "" ){
              
              var res = [];
              await firestore.collection("Cartoes")
                .where("Sexo", "==", Sexo)
               .where("Estado", "==", Estado)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
                } else if(Estado === "" && Cidade === "" && TipoCart === true && Sexo !== "" && NumProf === "" && NumEmp === ""){
              console.log("entrado Aqi")
              var res = [];
              await firestore.collection("Cartoes")
                .where("Sexo", "==", Sexo)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            }   else if(Estado !== "" && Cidade !== "" && TipoCart === true && Sexo !== "" && NumProf === "" && NumEmp === ""){
              
              var res = [];
              await firestore.collection("Cartoes")
              .where("Sexo", "==", Sexo)
              .where("Estado", "==", Estado)
              .where("Cidade", "==", Cidade)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            } else if(Estado !== "" && Cidade === "" && TipoCart === true && Sexo === "" && NumProf !== "" && NumEmp === "" ){
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Estado", "==", Estado)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("Profissao", "array-contains", NumProf)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
                } else if(Estado === "" && Cidade === "" && TipoCart === true && Sexo === "" && NumProf !== "" && NumEmp === ""){
              console.log("entrado Aqi")
              var res = [];
              await firestore.collection("Cartoes")
              .where("Profissao", "array-contains", NumProf)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            }   else if(Estado !== "" && Cidade !== "" && TipoCart === true && Sexo === "" && NumProf !== "" && NumEmp === ""){
              
              var res = [];
              await firestore.collection("Cartoes")
              .where("Profissao", "array-contains", NumProf)
              .where("Estado", "==", Estado)
              .where("Cidade", "==", Cidade)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            } else if(Estado !== "" && Cidade === "" && TipoCart === true && Sexo !== "" && NumProf !== "" && NumEmp === "" ){
              
              var res = [];
              await firestore.collection("Cartoes")
              .where("Sexo", "==", Sexo)
               .where("Estado", "==", Estado)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("Profissao", "array-contains", NumProf)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
                } else if(Estado === "" && Cidade === "" && TipoCart === true && Sexo !== "" && NumProf !== "" && NumEmp === ""){
              console.log("entrado Aqi")
              var res = [];
              await firestore.collection("Cartoes")
              .where("Sexo", "==", Sexo)
              .where("Profissao", "array-contains", NumProf)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            }   else if(Estado !== "" && Cidade !== "" && TipoCart === true && Sexo !== "" && NumProf !== "" && NumEmp === ""){
              
              var res = [];
              await firestore.collection("Cartoes")
              .where("Sexo", "==", Sexo)
              .where("Profissao", "array-contains", NumProf)
              .where("Estado", "==", Estado)
              .where("Cidade", "==", Cidade)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            } else if(Estado !== "" && Cidade === "" && TipoCart === false && Sexo === "" && NumProf === "" && NumEmp !== "" ){
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Estado", "==", Estado)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("Empresa", "array-contains", NumEmp)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
                } else if(Estado === "" && Cidade === "" && TipoCart === false && Sexo === "" && NumProf === "" && NumEmp !== ""){
              console.log("entrado Aqi")
              var res = [];
              await firestore.collection("Cartoes")
              .where("Empresa", "array-contains", NumEmp)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            }   else if(Estado !== "" && Cidade !== "" && TipoCart === false && Sexo === "" && NumProf === "" && NumEmp !== ""){
              
              var res = [];
              await firestore.collection("Cartoes")
              .where("Empresa", "array-contains", NumEmp)
              .where("Estado", "==", Estado)
              .where("Cidade", "==", Cidade)
               .where("Pessoal", "==", TipoCart)
               .where("Ativo", "==", true)
               .where("ListCidade", "==", true)
               .limit(fur)
               .get()
               .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     res.push({
                       id: doc.id,
                       Nome: doc.data().Nome,
                       Foto: doc.data().Config.Foto,
                       SalvouNum:doc.data().SalvouNum,
                       ListCredenciais:doc.data().ListCredenciais,
                       CorNalist:doc.data().CorNalist,

                     })
                   });
                   setLista(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            } 
 
           
           }
 
       });
     },

     PegandoContato: async(Page, setListOc, setCarreg )=>{
      let fur = Page*20;
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
            
          
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Ativo", "==", true)
               .where("SalvouNum", "array-contains", IdUser)
               .get()
               .then((querySnapshot1) => {
                console.log(querySnapshot1.size)
                   querySnapshot1.forEach((doc1) => {
                     res.push({
                       id: doc1.id,
                       Nome: doc1.data().Nome,
                       Foto: doc1.data().Config.Foto,
                       SalvouNum:doc1.data().SalvouNum,
                       ListCredenciais:doc1.data().ListCredenciais,
                       CorNalist:doc1.data().CorNalist,
                       Pessoal:doc1.data().Pessoal,
                       Profissao:doc1.data().Profissao,
                       Empresa:doc1.data().Empresa,
                       Cidade:doc1.data().Cidade,
                       Estado:doc1.data().Estado,
                       Sexo:doc1.data().Sexo,

                     })
                   });
                
                   setListOc(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            
 
           
           }
 
       });
     },

     PegandoMeuscartoes: async(Page, setListOc, setCarreg )=>{
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
            
          
              
              var res = [];
              await firestore.collection("Cartoes")
               .where("Ativo", "==", true)
               .where("IdDono", "==", IdUser)
               .get()
               .then((querySnapshot1) => {
                console.log(querySnapshot1.size)
                   querySnapshot1.forEach((doc1) => {
                     res.push({
                       id: doc1.id,
                       Nome: doc1.data().Nome,
                       Foto: doc1.data().Config.Foto,
                       SalvouNum:doc1.data().SalvouNum,
                       ListCredenciais:doc1.data().ListCredenciais,
                       CorNalist:doc1.data().CorNalist,
                       Pessoal:doc1.data().Pessoal,
                       Profissao:doc1.data().Profissao,
                       Empresa:doc1.data().Empresa,
                       Cidade:doc1.data().Cidade,
                       Estado:doc1.data().Estado,
                       Sexo:doc1.data().Sexo,
                       
                     })
                   });
                
                   setListOc(res)
                   setCarreg(false)
               })
               .catch((error) => {
                 
               });
            
 
           
           }
 
       });
     },
 

    CriandoCartao: async(ModalVer, setAlert, setAlertTipo, setCarre, setModalVer)=>{
     var num = Math.floor(Math.random() * (7 - 0 + 1)) + 0
      var Cores = ["#168500", "#0DBDE9", "#091A61", "#B59C0C", "#430459", "#0DBDE9", "#B16909", "#9F1F54" ]
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

            await firestore.collection("Cartoes")
            .add({
            IdDono:"",
            SalvouNum:[],
            NumExtrCredem:0,
            ListCredenciais:[],
            Nome:"CARLA CWO",
            direcionamento:false,
            Config:{
              Fundo:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2Ffundo1.png?alt=media&token=b152a38c-3771-461d-9416-0b5cd16fa574",
              Foto:{Ativar:true, Link:"https://firebasestorage.googleapis.com/v0/b/cwoapp-bd594.appspot.com/o/arquivo%2FperfilCWO.png?alt=media&token=454c9582-4fc3-45ef-8429-6dbf2fc85120"},
              Funcao:{Ativar:true, Texto:"Marketing"},
              Tel:{Ativar:true, Texto:""},
              Whats:{Ativar:true, Texto:""},
              Intagram:{Ativar:true, Link:""},
              Facebook:{Ativar:true, Link:""},
              Site:{Ativar:true, Link:""},
              Twitter:{Ativar:true, Link:""},
              Tiktok:{Ativar:true, Link:""},
              Localizacao:{Ativar:true, Link:""},
              Pix:{Ativar:true, Tipo:"", Pix:"",  Nome:""},
              Salvar:{Ativar:true, Link:""},
              Compartilhar:{Ativar:true, Link:""},
              youtube:{Ativar:true, Link:""},
              Telegram:{Ativar:true, Link:""},
              Email:{Ativar:true, Link:""},
            },
            ListCidade:false,
            Pessoal:true,
            Profissao:["",""],
            Empresa:["",""],
            Cidade:"",
            Estado:"",
            Sexo:"",
            FotoQRCODE:"",
            EmUso:false,
            DataIniUso:0,
            DataCri:new Date().getTime(),
            CartaoConfig:false,
            DataVenc:0,
            Pago:false,
            CorNalist:Cores[num],
            CodVeri:{Ativo:false, Cod:""},
            Ativo:false,

     
         
            }).then(async (def) => {
              setCarre(false);
              setModalVer(true)
              setAlert("Criado com Sucesso!");
              setAlertTipo("success");
            })
          }

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

       PagandoJogo: async(IdApos, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)=> {
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
       
              
                
                 var data = new URLSearchParams();
                   data.append('Valor', ValorReal);
                   data.append('Nome', Nome);
                   data.append('Tel', tel);
                   data.append('IdApos', IdApos);
             
               const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/criarPagamento", {
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
                 setAlert("Iniciando Pagamento!");
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

                     var data = new URLSearchParams();
                       data.append('Valor', ValorReal);
                       data.append('Nome', Nome);
                       data.append('Tel', tel);
                       data.append('IdApos', IdApos);
                 
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
                     setAlert("Iniciando Pagamento!");
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


         CompCash: async( QCash,  NomeCli, setNomeCli, setQCash, setLoad, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend,)=> {
          var ValorReal = (NomeCli/100).toFixed(2);
          var ValorCash = parseInt(NomeCli)
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
    
             
                firestore.collection("NotaCash").add({
                  IdUser: IdUser,
                  Valor: ValorReal,
                  ValorCash:ValorCash,
                  Pago:false,
              })
              .then(async (docRef) => {

                 var idNot = docRef.id
                  var data = new URLSearchParams();
                  data.append('Valor', ValorReal);
                  data.append('IdApos', idNot);
            
              const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoCash", {
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
                setLoad(false);
                setAlert("Iniciando Pagamento!");
                setAlertTipo("success");
                setVerNotajogo(false);
                setModalCalend(true)
                setNomeCli("");
               
            
            
           } 
              
              
                })
              .catch((error) => {
                  console.error("Error adding document: ", error);
              });
                
                  
                 
          
    
              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            });
           
           },

         EnviandoNota: async(IdApos, setPago, setRobo,  setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli, setEnviLin, setIdApos)=> {
       
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

              await firestore.collection("CompApostas")
              .doc(IdApos)
              .get().then(async(doc) => {
            


            if(doc.data().Cambista === true){

                let currentDate25 = '';
                let now25 =new Date(doc.data().DataApost);
                let hours25 = now25.getHours();
                let minutes25 = now25.getMinutes();
                let Dia25 = now25.getDate();
                let Mes25 = (now25.getMonth()+1);
                let Ano25 = now25.getFullYear(); 
                hours25 = hours25 < 10 ? '0'+hours25 : hours25;
                minutes25 = minutes25 < 10 ? '0'+minutes25 : minutes25;
                Dia25 = Dia25 < 10 ? '0'+Dia25 : Dia25;
                Mes25 = Mes25 < 10 ? '0'+Mes25 : Mes25;
                currentDate25 = Dia25+'/'+Mes25+'/'+Ano25;
                currentDate25 += ' ';
                currentDate25 += hours25+':'+minutes25;

                  var Msg = ""

                  Msg = Msg + `----- Boleto de Aposta PixBetCash -----\n`
                  Msg = Msg + `Nome: ${doc.data().NomeComp}\n`
                  Msg = Msg + `Telefone: ${doc.data().TelComp}\n`
                  Msg = Msg + `Pagamento Aprovado\n`
                  Msg = Msg + `Data: ${currentDate25}\n`
                  Msg = Msg + `----------------------------------------------\n`
                  
                  for(let i in doc.data().Bets){

                  let currentDate = '';
                  let now =new Date((doc.data().Bets[i].dataJogo) * 1000);
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
                  currentDate += ' ';
                  currentDate += hours+':'+minutes;


                  Msg = Msg + `⚽${doc.data().Bets[i].CasaTime.name.substr(0, 15)} X  ${doc.data().Bets[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${doc.data().Bets[i].Casa} | Cota: ${doc.data().Bets[i].Olds} \n 🥅 (${doc.data().Bets[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                  }

                  Msg = Msg + `Cota Total: ${doc.data().CotaGeral}\n`;
                  Msg = Msg + `Valor Prêmio: R$ ${doc.data().ValorPremio}\n`;
                  Msg = Msg + `Valor Pago: ${doc.data().valorAposSimb}\n`;
                  Msg = Msg + `Cambista: --------------------\n`;
                  Msg = Msg + `Nome: ${doc.data().Nome}\n`;
                  Msg = Msg + `Telefone: ${doc.data().Tel}\n`;
                  Msg = Msg + `Cambista Ganhará 10% em Cima do Prêmio:\n`;
                  Msg = Msg + `Valor: R$ ${doc.data().ValCambis}\n`;
                  


                  var ver = doc.data().TelComp.replace("(", "55");
                  var par1 = ver.replace(")", "");
                  var par3 = par1.replace("-", "");

                  var data={
                    "phone": par3,
                    "message": Msg,
                  }   
                  const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                  {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                     });


                } else {

                let currentDate25 = '';
                      let now25 =new Date(doc.data().DataApost);
                      let hours25 = now25.getHours();
                      let minutes25 = now25.getMinutes();
                      let Dia25 = now25.getDate();
                      let Mes25 = (now25.getMonth()+1);
                      let Ano25 = now25.getFullYear(); 
                      hours25 = hours25 < 10 ? '0'+hours25 : hours25;
                      minutes25 = minutes25 < 10 ? '0'+minutes25 : minutes25;
                      Dia25 = Dia25 < 10 ? '0'+Dia25 : Dia25;
                      Mes25 = Mes25 < 10 ? '0'+Mes25 : Mes25;
                      currentDate25 = Dia25+'/'+Mes25+'/'+Ano25;
                      currentDate25 += ' ';
                      currentDate25 += hours25+':'+minutes25;

                  var Msg = ""

                  Msg = Msg + `----- Boleto de Aposta PixBetCash -----\n`
                  Msg = Msg + `Nome: ${doc.data().Nome}\n`
                  Msg = Msg + `Telefone: ${doc.data().Tel}\n`
                  Msg = Msg + `Pagamento Aprovado\n`
                  Msg = Msg + `Data: ${currentDate25}\n`
                  Msg = Msg + `----------------------------------------------\n`
                  
                  for(let i in doc.data().Bets){

                  let currentDate = '';
                  let now =new Date((doc.data().Bets[i].dataJogo) * 1000);
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
                  currentDate += ' ';
                  currentDate += hours+':'+minutes;


                  Msg = Msg + `⚽${doc.data().Bets[i].CasaTime.name.substr(0, 15)} X  ${doc.data().Bets[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${doc.data().Bets[i].Casa} | Cota: ${doc.data().Bets[i].Olds} \n 🥅 (${doc.data().Bets[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                  }

                  Msg = Msg + `Cota Total: ${doc.data().CotaGeral}\n`;
                  Msg = Msg + `Valor Premio: R$ ${doc.data().ValorPremio}\n`;
                  Msg = Msg + `Valor Pago: ${doc.data().valorAposSimb}\n`;
                  


                  var ver = doc.data().Tel.replace("(", "55");
                  var par1 = ver.replace(")", "");
                  var par3 = par1.replace("-", "");

                  var data={
                    "phone": par3,
                    "message": Msg,
                  }   
                  const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                  {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                     });

                  



                  }

           setAlert("Link Enviado Com Sucesso!")
            setAlertTipo("sucess")
            setVerNotajogo(false)
            setModalCalend(true)
            setCarre(false);
            setCriarCli(false);
            setEnviLin(false)
            setRobo(true)
            setIdApos("");
            setPago(false);
                
              });
          } else {
            setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
            setAlertTipo("danger")
            setVerNotajogo(false)
            setModalCalend(true)
            setCarre(false);
            setCriarCli(false);
            setEnviLin(false)
            setRobo(true)
            setIdApos("");
            setPago(false);
          }
        })



       
       },

       ApostandoCASH: async(QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)=> {
       
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
              setDCash(doc.data().Cash)
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
                 setCarre(false);
                 setIdAposta(def.id);
                 setPgCash(true);
             
             
                
             
               
             
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
                     setCarre(false);
                     setIdAposta(def.id);
                     setPgCash(true);
                   
                 
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
          })


  
         
         },

         PagandoJogoCASH: async(IdApos, QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)=> {
       
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
                setDCash(doc.data().Cash)
                });
  
                if(Cambis === false){
         
  
                 
                   setCarre(false);
                   setIdAposta(IdApos);
                   setPgCash(true);
  
               
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
          
                 
                       setCarre(false);
                       setIdAposta(IdApos);
                       setPgCash(true);
                     
                   
                 
          
                    
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
            })
  
  
    
           
           },

         DadosCli:async (Venc, setVersBanc, setVenc, setRec, setDatVenc, setNotif, setNomeComp, setTel, setNi2, setNi3, setNi4)=>{
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var IdUser = await AsyncStorage.getItem('@Id');
          var temp = parseInt(time)
          await firestore.collection("users")
         .doc(IdUser)
          .onSnapshot((doc) => {
         
          
                let currentDate = '';
                let now =new Date(doc.data().DataVenc);
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
                 setVenc(currentDate)
                 setRec(doc.data().Dinheiro)
                 setDatVenc(doc.data().DataVenc)
                 setNotif(doc.data().mensagem.length - doc.data().vizualV)
                 setNomeComp(doc.data().NomeComp)
                 setTel(doc.data().Telefone)
                 setNi2(doc.data().Indicados.length)
                 setNi3(doc.data())
                 setNi4(doc.data().Nivel4)
              
            })

            await firestore.collection("Vesao")
            .doc("lPqmXvy9YyaQv5tz1vkq")
             .onSnapshot((doc2) => {
              setVersBanc(doc2.data())

             })
             
                
           
        },

        EnviadoApp: async (NomeCli, TelCli, setAlertTipo, setAlert, setLoading, setModalCalend, setBtn, setBtn1, setBtn2, setCodG, setSenha, setTentativa, setRobo, setNomeCli, setTelCli, setCodLast, setDateInd, setTelMsg, setTe1, setTe2) => {
          let tempVenc = new Date().getTime() + 86400000;
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
             


        
          await firestore.collection("BancoWhats").add({
            Telefone:TelCli,
            DataFin:tempVenc,
            Aprovado:false,
            Soteado:false,
            IdUser:IdUser,
            NomeConv:NomeCli,
        })
        .then(async (docRef) => {
          console.log("Tel ")
          var ver = TelCli.replace("(", "55");
          var par1 = ver.replace(")", "");
          var par3 = par1.replace("-", "");

          var data={
            "phone": par3,
            "message": `Olá ${NomeCli}, ${Nome} lhe enviou Esse Link da PixBetCash, para você se Cadastrar, e começar a usar os benefícios da PixBetCash. ${URL_SITE}`,
            "image": "https://firebasestorage.googleapis.com/v0/b/pixbetcash.appspot.com/o/arquivo%2FLogoPixBetMp.png?alt=media&token=5ff20c89-022e-4dd1-8a87-e1becebde7f9",
            "linkUrl": `${URL_SITE}`,
            "title": "Link para Cadastro",
            "linkDescription": ` ${Nome} lhe enviou Esse Link, para você poder se cadasdtrar de maneira mais facil!`
          }
          const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-link", 
          {
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              });
  
       
        
              const json = await req.json();  
             if(json){
              setLoading(false)
              setAlert("Indicação Realizada!")
              setAlertTipo("Sucesss")
              setModalCalend(true)
              setBtn(false);
              setBtn1(false)
              setBtn2(false);
              setNomeCli("");
              setTelCli("");
              setCodG(false);
              setCodLast(0);
              setSenha("");
              setTentativa(0);
              setRobo(true)
              setTe1(false)
              setTe2(false)
              setTelMsg(true)
              setDateInd(0)

             }
             
        })
      }
    });
        
          
        
        
        },

        PegarConversas: async (Ocorre, setTmpMsg, setOcorre, setTemUlt, setCont, setDig, setVizuS) => {
          let tempVenc = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          var IdUser = await AsyncStorage.getItem('@Id');
          var temp = parseInt(time)
          await firestore.collection("users")
         .doc(IdUser)
          .onSnapshot((doc) => {
              setOcorre(doc.id);
              setTmpMsg(doc.data().mensagem);
              setCont(doc.data().mensagem.length);
              setTemUlt(doc.data().ultimaMsg.data);
              setDig(doc.data().DigiS);
              setVizuS(doc.data().vizualS);
                
            });
        
         

            
          
          
    
           
  },

  enviandoMsg: async (Msg) => {
    let tempVenc = new Date().getTime() + 86400000;
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

    let temp = new Date().getTime();
    let now = temp 
    firestore.collection("users")
    .doc(IdUser).update({
      mensagem: firebase.firestore.FieldValue.arrayUnion ({
        autor:IdUser,
        nome: Nome,
        body: Msg,
        date: now,
        type:"text"
      }),
      'ultimaMsg':{id:IdUser, nome: Nome, data:now, msg:Msg} 
  });

    var Add = firestore.collection("users").doc(IdUser);
    return firestore.runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(Add).then((sfDoc) => {
          if (!sfDoc.exists) {
              throw "Document does not exist!";
          }
  
          // Add one person to the city population.
          // Note: this could be done without a transaction
          //       by updating the population using FieldValue.increment()
          var Vizual = sfDoc.data().vizualV + 1;
          transaction.update(Add, {vizualV : Vizual });
      });
  }).then(() => {
   
  }).catch((error) => {
      console.log("Transaction failed: ", error);
  });

    }
});      

      
        
  },

  enviandoImgMsg: async (Img, setImg, setModalCalend, setVerImg, setCarre) => {
    let tempVenc = new Date().getTime() + 86400000;
    var IdUser = ""
    var Nome = ""
    var Imagem = Img.split(',');
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

          var Url1 = "";
        
    
          
            const fileName = await Date.now() + Math.random()*100;
            const storageRef = await storage.ref();
            const fileRef = await storageRef.child(`arquivo/${fileName}`);
            await await fileRef.putString(Imagem[1], 'base64').then((doc)=> {
              
            });
            Url1 =  await fileRef.getDownloadURL();
          

    let temp = new Date().getTime();
    let now = temp 
    firestore.collection("users")
    .doc(IdUser).update({
      mensagem: firebase.firestore.FieldValue.arrayUnion ({
        autor:IdUser,
        nome: Nome,
        body: Url1,
        date: now,
        type:"image"
      }),
      'ultimaMsg':{id:IdUser, nome: Nome, data:now, msg:"image"} 
  });

    var Add = firestore.collection("users").doc(IdUser);
    return firestore.runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(Add).then((sfDoc) => {
          if (!sfDoc.exists) {
              throw "Document does not exist!";
          }
  
          // Add one person to the city population.
          // Note: this could be done without a transaction
          //       by updating the population using FieldValue.increment()
          var Vizual = sfDoc.data().vizualV + 1;
          transaction.update(Add, {vizualV : Vizual });
      });
  }).then(() => {
    setModalCalend(false);
    setImg("");
    setVerImg("");
    setCarre(false);
  }).catch((error) => {
      console.log("Transaction failed: ", error);
  });

    }
});      

      
        
  },

  VizualVit: async (Ocorre, Cont) => {
   
    await firestore.collection("users")
    .doc(Ocorre)
    .update({
     vizualV: Cont,
  });
      

     
},

      CriandoCli:async (NomeCli,  TelCli, setRobo, setNomeCli, setTelCli, setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli)=>{
         
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

 
               firestore.collection("NotaCambista").add({
                

                 Nome:Nome,
                 Tel:tel,
                 IdCri:IdUser,
                 Cambista:true,
                 NomeComp:NomeCli,
                 TelComp:TelCli,
                 Pago:false,
                 Conscluido:false,
                 dataCriar: new Date().getTime(),
                 ValorPremio: 0,
                 ValorAposta: 0,
                 Bets:[],
                 ValCambis:"",
                 CotaGeral:"",
                 valorAposSimb:"R$000,00",
                 CriarJogoCambio:0,



                 }).then(async (doc)=>{

                   var res= doc.id;
                  
                  var data={
                     "phone": par3,
                     "message": `Olá ${NomeCli}, O Cambista ${Nome} lhe enviou Esse Link da PixBetCash, para você criar uma aposta, registre o numero da pixbetcash em sua lista de contato para ter acesso a entrada do link de forma facil. ${URL_SITE}/links/${res}`,
                     "image": "https://firebasestorage.googleapis.com/v0/b/pixbetcash.appspot.com/o/arquivo%2FLogoPixBetMp.png?alt=media&token=5ff20c89-022e-4dd1-8a87-e1becebde7f9",
                     "linkUrl": `${URL_SITE}/links/${res}`,
                     "title": "Link para Palpites de Aposta",
                     "linkDescription": `O Cambista ${Nome} lhe enviou Esse Link, para você construir sua aposta, clique nesse Link e construa sua aposta!`
                   }
                   const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-link", 
                   {
                         method: 'POST',
                         headers:{
                           'Content-Type': 'application/json'
                         },
                         body: JSON.stringify(data),
                       });
           
                       const json = await req.json();

                   setRobo(true)
                  setCarre(false);
                   setAlert("Criado com Sucesso, O Link Foi enviado Para Seu Cliente!");
                   setAlertTipo("success");
                   setCriarCli(false)
                   setVerNotajogo(false)
                   setModalCalend(true)
                   setTelCli("")
                   setNomeCli("")
                 });
               
                } else {
                  setAlert("Esse Whatsapp Não Existe!")
                  setAlertTipo("danger")
                  setCarre(false);
                  setRobo(true);
                }

              } else {
                setRobo(true)
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado, Saia e entre Novamente!")
                setAlertTipo("danger")
                setCriarCli(false)
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })

             
                
           
        },

        PegarDados:async (QCash , setListOc, setQCash, setCarre)=>{
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          var IdUser = await AsyncStorage.getItem('@Id');
          var temp = parseInt(time)
          await firestore.collection("users")
         .doc(IdUser)
          .onSnapshot((doc) => {
                
                IdUser = doc.id,
                Nome = doc.data().Nome
                setListOc(doc.data().Extrato)
                setQCash(doc.data().Cash)

                });
                setCarre(false)
               

       

           
             
                
           
        },
        PegarDadosIndiq:async (QCash , setId, setListOc, setQCash, setCarre,  Dat, Dat2)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          var IdUser = await AsyncStorage.getItem('@Id');
          var temp = parseInt(time)
          await firestore.collection("users")
         .doc(IdUser)
         .get()
         .then(async (doc)=>{
            var res = []
            var resList = []
            var QC = 0;
         
                setId(doc.id)
              
                res = doc.data().Indicados
           
                
                console.log(res[0])
               
                for(let i in res){
                  await firestore.collection("users")
                   .doc(res[i])
                   .get()
                   .then((dec)=>{

                    var resLoa = 0;
                    console.log(Dat)
                    for(let j in dec.data().Extrato){
                    
                      if(dec.data().Extrato[j].Nivel === "1" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat  ){
                         var Div = (dec.data().Extrato[j].Valor/9)*6;
                         resLoa = resLoa + Div; 
                      } else  if(dec.data().Extrato[j].Nivel === "2" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat ){
                        var Div = (dec.data().Extrato[j].Valor/6)*3;
                        resLoa = resLoa + Div;
                     } else  if(dec.data().Extrato[j].Nivel === "3" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat ){
                      var Div = (dec.data().Extrato[j].Valor/3)*1;
                      resLoa = resLoa + Div;
                   }
                  }
                   
                    resList.push({
                     id:dec.id,
                     Extrato:dec.data().Extrato,
                     Nome:dec.data().Nome,
                     Telefone:dec.data().Telefone,
                     dataCadas:dec.data().DataCadas,
                     Indicados:dec.data().Indicados,
                     Rendeu:resLoa,
                    })
                    QC= QC + resLoa;
                   })
                 
                }

                setListOc(resList)
                setQCash(QC)
                console.log(resList)




                setCarre(false)


              });  

       

            

             
                
           
        },

        PegarDadosIndiq3:async (item , setList3, setQcash3, setCarre, setNive3, Dat, Dat2)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get()
          .then(async (querySnapshot)=>{
            var res = []
            var resList = []
            var QC = 0;
            if(querySnapshot.size !== 0){
            
              
               
                for(let i in item){
                  await firestore.collection("users")
                   .doc(item[i])
                   .get()
                   .then((dec)=>{

                    var resLoa = 0;
                    console.log(Dat)
                    for(let j in dec.data().Extrato){
                    
                      if(dec.data().Extrato[j].Nivel === "1" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat  ){
                         var Div = (dec.data().Extrato[j].Valor/9)*3;
                         resLoa = resLoa + Div; 
                      } else  if(dec.data().Extrato[j].Nivel === "2" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat ){
                        var Div = (dec.data().Extrato[j].Valor/6)*1;
                        resLoa = resLoa + Div;
                     } 
                  }
                   
                    resList.push({
                     id:dec.id,
                     Extrato:dec.data().Extrato,
                     Nome:dec.data().Nome,
                     Telefone:dec.data().Telefone,
                     dataCadas:dec.data().DataCadas,
                     Indicados:dec.data().Indicados,
                     Rendeu:resLoa,
                    })
                    QC= QC + resLoa;
                   })
                 
                }

                setList3(resList)
                setQcash3(QC)
                console.log(resList)



                setNive3(true)
                setCarre(false)


               

       

              } else {
                setRobo(true)
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado, Saia e entre Novamente!")
                setAlertTipo("danger")
                setCriarCli(false)
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })

             
                
           
        },

        PegarDadosIndiq4:async (item , setList4, setQcash4, setCarre, setNive4, Dat, Dat2)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get()
          .then(async (querySnapshot)=>{
            var res = []
            var resList = []
            var QC = 0;
            if(querySnapshot.size !== 0){
            
              
               
                for(let i in item){
                  await firestore.collection("users")
                   .doc(item[i])
                   .get()
                   .then((dec)=>{

                    var resLoa = 0;
                    console.log(Dat)
                    for(let j in dec.data().Extrato){
                    
                      if(dec.data().Extrato[j].Nivel === "1" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat  ){
                         var Div = (dec.data().Extrato[j].Valor/9)*1;
                         resLoa = resLoa + Div; 
                      } 
                  }
                   
                    resList.push({
                     id:dec.id,
                     Extrato:dec.data().Extrato,
                     Nome:dec.data().Nome,
                     Telefone:dec.data().Telefone,
                     dataCadas:dec.data().DataCadas,
                     Indicados:dec.data().Indicados,
                     Rendeu:resLoa,
                    })
                    QC= QC + resLoa;
                   })
                 
                }

                setList4(resList)
                setQcash4(QC)
                console.log(resList)



                setNive4(true)
                setCarre(false)


               

       

              } else {
                setRobo(true)
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado, Saia e entre Novamente!")
                setAlertTipo("danger")
                setCriarCli(false)
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })

             
                
           
        },


        EnviarLink:async (IdApos, NomeCli,  TelCli, setRobo, setNomeCli, setTelCli, setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli, setEnviLin, setIdApos)=>{
          var temp = new Date().getTime();
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
             

                
        var ver = TelCli.replace("(", "55");
        var par1 = ver.replace(")", "");
        var par3 = par1.replace("-", "");
    
                
                  var data={
                     "phone": par3,
                     "message": `Olá ${NomeCli}, O Cambista ${Nome} lhe enviou Esse Link da PixBetCash, para você criar uma aposta, registre o numero da pixbetcash em sua lista de contato para ter acesso a entrada do link de forma facil. ${URL_SITE}/links/${IdApos}`,
                     "image": "https://firebasestorage.googleapis.com/v0/b/pixbetcash.appspot.com/o/arquivo%2FLogoPixBetMp.png?alt=media&token=5ff20c89-022e-4dd1-8a87-e1becebde7f9",
                     "linkUrl": `${URL_SITE}/links/${IdApos}`,
                     "title": "Link para Palpites de Aposta",
                     "linkDescription": `O Cambista ${Nome} lhe enviou Esse Link, para você construir sua aposta, clique nesse Link e construa sua aposta!`
                   }
                   const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-link", 
                   {
                         method: 'POST',
                         headers:{
                           'Content-Type': 'application/json'
                         },
                         body: JSON.stringify(data),
                       });
           
                       const json = await req.json();
                       setEnviLin(false)
                       setRobo(true)
                       setAlert("Link Enviado Com Sucesso!")
                       setAlertTipo("sucess")
                       setCriarCli(false)
                       setVerNotajogo(false)
                       setModalCalend(true)
                       setCarre(false);
                       setNomeCli("");
                       setTelCli("");
                       setIdApos("")
                 
               
             

              } else {
                setEnviLin(false)
                setRobo(true)
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado, Saia e entre Novamente!")
                setAlertTipo("danger")
                setCriarCli(false)
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
                setNomeCli("");
                setTelCli("");
                setIdApos("")
              }
            })

             
                
           
        },

         GeradorDeCod:async (Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend)=>{
          var temp = new Date().getTime();
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
             
                var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
                setCodLast(last); 
                var ver = tel.replace("(", "55");
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
                   setCarre(false)                 
                    setCodG(true)


              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })
             
                
           
        },

        GeradorDeCod22:async (Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setModalVer)=>{
          var temp = new Date().getTime();
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
             
                var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
                setCodLast(last); 
                var ver = tel.replace("(", "55");
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
                   setCarre(false)                 
                    setCodG(true)


              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setModalVer(true)
                setCarre(false);
              }
            })
             
                
           
        },

        GeradorDeCod44:async (Tel, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setModalVer, setWhat2)=>{
          var temp = new Date().getTime();
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
             
                var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
                setCodLast(last); 
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
                   setCarre(false)                 
                    setCodG(true)
                  setWhat2(true)

              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setModalVer(true)
                setCarre(false);
              }
            })
             
                
           
        },

        SacarCash: async(NomeCli, TelCli, IdTrans,  setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad,  setCriarCli  )=> {
          console.log(NomeCli);
          var res = parseFloat(NomeCli)/100;
          var rever=[]
          var IdUser = ""
          var Nome = ""
          var Dinheiro = 0;
          var CashBn = 0;
          var CashTran = parseInt(NomeCli);
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          var tempReal = new Date().getTime();
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                Nome = doc.data().Nome;
                Dinheiro = doc.data().Dinheiro;
                CashBn = doc.data().Cash;
                });
                var CashAt = CashBn - CashTran ;  
               var din =  res;
               var diner = parseFloat(din) + Dinheiro;
            
               await firestore.collection("users")
               .doc(IdUser)
               .update({
                 Cash: CashAt,
                 Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Sacou", Nivel:"1", Valor:CashTran, Moeda:"Cash", IdInf:"" })
               })
               
            
                await firestore.collection("users").doc(IdUser)
                .update({
                  Dinheiro:diner,
                  DateDinheiro:new Date().getTime(),
                });

                await firestore.collection("Cash")
                .add({
                  IdUser: IdUser,
                  Tel:tel,
                  DateDinheiro:new Date().getTime(),
                  Valor:din,
              })
              .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
              })
            
              
                  setNomeCli("");
                  setTelCli("");
                  setIdTrans("");
                  setCarre(false);
                  setAlert("Saque feita com Sucesso, Seu dinheiro foi pra Lista de transferência da pixbetcash!");
                  setAlertTipo("success");
                  setModalCalend(true);
                  setVerNotajogo(false);
                  setPgCash(false);
                  setCodG(false)
                  setTentativa(0)
                  setSenha("")
                  setRobo(true)
                  setLoad(false);
                  setNome("");
                  setBtn(false);
                  setMsgErro2(false);
                  setCriarCli(false);
              
    
    
       
                    } else {
                      setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                      setAlertTipo("danger")
                      setVerNotajogo(false)
                      setModalCalend(true)
                      setCarre(false);
                      setLoad(false);
                    }
                  })  
                 
               
          
            
           
           
         },

        TranfCash: async(NomeCli, TelCli,  IdTrans, setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad )=> {
          var Msg = ""
          var CashBn = 0;
          var CashTran = parseInt(NomeCli);
          var IdUser = ""
          var Nome = ""
          var tempReal = new Date().getTime();
          var Time =(new Date().getTime());
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
                CashBn = doc.data().Cash;
                });
                var CashAt = CashBn - CashTran ;

                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  Cash: CashAt,
                  Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Transferiu", Nivel:"1", Valor:CashTran, Moeda:"Cash", IdInf:TelCli })
                })

              var sfDocRef = firestore.collection("users").doc(IdTrans);

               firestore.runTransaction((transaction) => {
             
              return transaction.get(sfDocRef).then((sfDoc) => {
                 
                  var newPopulation = sfDoc.data().Cash + CashTran;
                  transaction.update(sfDocRef, {
                    Cash: newPopulation, 
                    Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Recebeu", Nivel:"1", Valor:CashTran, Moeda:"Cash", IdInf:tel })
                  });
              });
              }).then(async () => {

                var ver = TelCli.replace("(", "55");
                var par1 = ver.replace(")", "");
                var par3 = par1.replace("-", "");

                var data={
                  "phone": par3,
                  "message": `${Nome} Transferiu ${NomeCli} Cash Para Você`,
                }   
                const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                {
                      method: 'POST',
                      headers:{
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data),
                   });



                  setNomeCli("");
                  setTelCli("");
                  setIdTrans("");
                  setCarre(false);
                  setAlert("Transferência feita com Sucesso!");
                  setAlertTipo("success");
                  setModalCalend(true);
                  setVerNotajogo(false);
                  setPgCash(false);
                  setCodG(false)
                  setTentativa(0)
                  setSenha("")
                  setRobo(true)
                  setLoad(false);
                  setNome("");
                  setBtn(false);
                  setMsgErro2(false);

                  


              }).catch((error) => {
                  console.log("Transaction failed: ", error);
              });
              

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")
              setVerNotajogo(false)
              setModalCalend(true)
              setCarre(false);
              setLoad(false);
            }

          })
        },

        BaixandoMar: async(Nome, setAlert, setAlertTipo, setCarre )=> {
          var IdUser = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                
                });
              console.log("ent")
               
                //const url = await storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/pixbetcash.appspot.com/o/marketing%2FUntitled.mp4?alt=media&token=c4e52d02-1d05-4920-8169-330daf78aff9').getDownloadURL();
               //var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/pixbetcash.appspot.com/o/marketing%2FUntitled.mp4?alt=media&token=c4e52d02-1d05-4920-8169-330daf78aff9');
               const storageRef = storage.ref();

               // [START storage_download_via_url]
               storageRef.child('marketing/Untitled.mp4').getDownloadURL()
                 .then((url) => {
                   // `url` is the download URL for 'images/stars.jpg'
                 
                   // This can be downloaded directly:
                   var xhr = new XMLHttpRequest();
                   xhr.responseType = 'blob';
                   xhr.onload = (event) => {
                     var blob = xhr.response;
                   };
                   xhr.open('GET', url);
                   xhr.send();
                 
                   // Or inserted into an <img> element
                   var img = document.getElementById('myimg');
                   img.setAttribute('src', url);
                 })
                 .catch((error) => {
                   // Handle any errors
                 });
               
                  setCarre(false);
                  setAlert("Nome Trocado com Sucesso!");
                  setAlertTipo("success");
               

                  


             

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")   
              setCarre(false);

            }

          })
        },

        TrocandoNome: async(Nome, setAlert, setAlertTipo, setCarre )=> {
          var IdUser = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                
                });
            

                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  NomeComp: Nome,
                 
                })

                

               
                  setCarre(false);
                  setAlert("Nome Trocado com Sucesso!");
                  setAlertTipo("success");
               

                  


             

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")   
              setCarre(false);

            }

          })
        },

        TrocandoWhats: async(Tel, setAlert, setAlertTipo, setCarre )=> {
          var IdUser = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                
                });
            

                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  Telefone: Tel,
                 
                })


                await AsyncStorage.setItem('Tel', Tel);
               
                  setCarre(false);
                  setAlert("Whatsapp Trocado com Sucesso!");
                  setAlertTipo("success");
               

                  


             

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")   
              setCarre(false);

            }

          })
        },

        PgCshAti: async( VCash, IdAposta, setCarre, setLinkEnv, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash, setValApos, setVCash, setRobo, setCodG, setTentativa, setSenha   )=> {
          var Msg = ""
          var CashBn = 0;
          var IdUser = ""
          var Nome = ""
          var tempReal = new Date().getTime();
          var Time =(new Date().getTime());
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
                CashBn = doc.data().Cash;
                });

                if(CashBn >= VCash){
                  var CashAt = CashBn-VCash;
                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  Cash: CashAt,
                  Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Pagou", Nivel:"1", Valor:VCash, Moeda:"Cash", IdInf:IdAposta })
                })
                .then(async () => {
      
                  await firestore.collection("CompApostas")
                  .doc(IdAposta)
                  .update({
                    Pago: true,
                    DatePago:tempReal,
                    PgCash:true,
                  })
                  .then(async () => {
                    var Id1nivel = "";
                    var Id2nivel = "";
                    var Id3nivel = "";
                    var Id4nivel = "";
                    var ValorApo = 0;
      
                    await firestore.collection("CompApostas")
                    .doc(IdAposta)
                    .get().then(async(doc) => {
                    Id1nivel = doc.data().IdCri;
                    ValorApo =parseInt(doc.data().ValorAposta);
      
      
                if(Id1nivel === IdUser){
      
                  if(doc.data().Pago === true){
      
                  if(doc.data().Cambista === true){
      
                      let currentDate25 = '';
                      let now25 =new Date(Time);
                      let hours25 = now25.getHours();
                      let minutes25 = now25.getMinutes();
                      let Dia25 = now25.getDate();
                      let Mes25 = (now25.getMonth()+1);
                      let Ano25 = now25.getFullYear(); 
                      hours25 = hours25 < 10 ? '0'+hours25 : hours25;
                      minutes25 = minutes25 < 10 ? '0'+minutes25 : minutes25;
                      Dia25 = Dia25 < 10 ? '0'+Dia25 : Dia25;
                      Mes25 = Mes25 < 10 ? '0'+Mes25 : Mes25;
                      currentDate25 = Dia25+'/'+Mes25+'/'+Ano25;
                      currentDate25 += ' ';
                      currentDate25 += hours25+':'+minutes25;
      
                        var Msg = ""
      
                        Msg = Msg + `----- Boleto de Aposta PixBetCash -----\n`
                        Msg = Msg + `Nome: ${doc.data().NomeComp}\n`
                        Msg = Msg + `Telefone: ${doc.data().TelComp}\n`
                        Msg = Msg + `Pagamento Aprovado\n`
                        Msg = Msg + `Data: ${currentDate25}\n`
                        Msg = Msg + `----------------------------------------------\n`
                        
                        for(let i in doc.data().Bets){
      
                        let currentDate = '';
                        let now =new Date((doc.data().Bets[i].dataJogo) * 1000);
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
                        currentDate += ' ';
                        currentDate += hours+':'+minutes;
      
      
                        Msg = Msg + `⚽${doc.data().Bets[i].CasaTime.name.substr(0, 15)} X  ${doc.data().Bets[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${doc.data().Bets[i].Casa} | Cota: ${doc.data().Bets[i].Olds} \n 🥅 (${doc.data().Bets[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                        }
      
                        Msg = Msg + `Cota Total: ${doc.data().CotaGeral}\n`;
                        Msg = Msg + `Valor Prêmio: R$ ${doc.data().ValorPremio}\n`;
                        Msg = Msg + `Valor Pago: ${doc.data().valorAposSimb}\n`;
                        Msg = Msg + `Cambista: --------------------\n`;
                        Msg = Msg + `Nome: ${doc.data().Nome}\n`;
                        Msg = Msg + `Telefone: ${doc.data().Tel}\n`;
                        Msg = Msg + `Cambista Ganhará 10% em Cima do Prêmio:\n`;
                        Msg = Msg + `Valor: R$ ${doc.data().ValCambis}\n`;
                        
      
      
                        var ver = doc.data().TelComp.replace("(", "55");
                        var par1 = ver.replace(")", "");
                        var par3 = par1.replace("-", "");
      
                        var data={
                          "phone": par3,
                          "message": Msg,
                        }   
                        const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                        {
                              method: 'POST',
                              headers:{
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data),
                           });
      
      
                      } else {
      
                      let currentDate25 = '';
                            let now25 =new Date(Time);
                            let hours25 = now25.getHours();
                            let minutes25 = now25.getMinutes();
                            let Dia25 = now25.getDate();
                            let Mes25 = (now25.getMonth()+1);
                            let Ano25 = now25.getFullYear(); 
                            hours25 = hours25 < 10 ? '0'+hours25 : hours25;
                            minutes25 = minutes25 < 10 ? '0'+minutes25 : minutes25;
                            Dia25 = Dia25 < 10 ? '0'+Dia25 : Dia25;
                            Mes25 = Mes25 < 10 ? '0'+Mes25 : Mes25;
                            currentDate25 = Dia25+'/'+Mes25+'/'+Ano25;
                            currentDate25 += ' ';
                            currentDate25 += hours25+':'+minutes25;
      
                        var Msg = ""
      
                        Msg = Msg + `----- Boleto de Aposta PixBetCash -----\n`
                        Msg = Msg + `Nome: ${doc.data().Nome}\n`
                        Msg = Msg + `Telefone: ${doc.data().Tel}\n`
                        Msg = Msg + `Pagamento Aprovado\n`
                        Msg = Msg + `Data: ${currentDate25}\n`
                        Msg = Msg + `----------------------------------------------\n`
                        
                        for(let i in doc.data().Bets){
      
                        let currentDate = '';
                        let now =new Date((doc.data().Bets[i].dataJogo) * 1000);
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
                        currentDate += ' ';
                        currentDate += hours+':'+minutes;
      
      
                        Msg = Msg + `⚽${doc.data().Bets[i].CasaTime.name.substr(0, 15)} X  ${doc.data().Bets[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${doc.data().Bets[i].Casa} | Cota: ${doc.data().Bets[i].Olds} \n 🥅 (${doc.data().Bets[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                        }
      
                        Msg = Msg + `Cota Total: ${doc.data().CotaGeral}\n`;
                        Msg = Msg + `Valor Premio: R$ ${doc.data().ValorPremio}\n`;
                        Msg = Msg + `Valor Pago: ${doc.data().valorAposSimb}\n`;
                        
      
      
                        var ver = doc.data().Tel.replace("(", "55");
                        var par1 = ver.replace(")", "");
                        var par3 = par1.replace("-", "");
      
                        var data={
                          "phone": par3,
                          "message": Msg,
                        }   
                        const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                        {
                              method: 'POST',
                              headers:{
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data),
                           });
      
                        
      
      
      
                        }
      
      
      
      
          //1° nivel ------
          
          var cash1 = 0;
          var TemV1 = 0;
          var NewTemV1 = 0;
          var NewCash1 = 0;
          
          await firestore.collection("users")
          .doc(Id1nivel)
          .get().then((doc11) => {
           cash1 = doc11.data().Cash; 
           TemV1 = doc11.data().DataVenc;
          });
          
          if(TemV1 < tempReal){
          
           NewTemV1 = tempReal+(86400000*ValorApo);
           NewCash1 = cash1 + (9*ValorApo);
          
          }else {
          
          NewTemV1 = TemV1+(86400000*ValorApo);
          NewCash1 = cash1 + (9*ValorApo);
          
          }
          
          await firestore.collection("users")
          .doc(Id1nivel)
          .update({
              Cash:NewCash1,
              DataVenc:NewTemV1,
              Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Ganhou", Nivel:"1", Valor:(9*ValorApo), Moeda:"Cash", IdInf: IdAposta })
          })
      
      
           //2° Nivel ----
           var cash2 = 0;
           var TemV2 = 0;
           var NewTemV2 = 0;
           var NewCash2 = 0;
           var Status2 = "";
           
           await firestore.collection("users")
           .where("Indicados", "array-contains", Id1nivel)
           .get().then(async (querySnapshot12) => {
             if(querySnapshot12.size  !== 0){
           
           
            await querySnapshot12.forEach((doc12) => {
                 Id2nivel = doc12.id;
               })
           
           await firestore.collection("users")
           .doc(Id2nivel)
           .get().then((doc13) => {
            cash2 = doc13.data().Cash; 
            TemV2 = doc13.data().DataVenc;
           });
           
           if(TemV2 < tempReal){
               NewCash2 = cash2;
               Status2 = "Perdeu";
              
              }else {
              
              NewCash2 = cash2 + (6*ValorApo);
              Status2 = "Ganhou";
              
              }
           
              await firestore.collection("users")
              .doc(Id2nivel)
              .update({
                  Cash:NewCash2,
                  Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:Status2, Nivel:"2", Valor:(6*ValorApo), Moeda:"Cash", IdInf:IdAposta })
              })
              
           
       
           
           
             } 
           })
          
         
      
      
          
      
             //3° Nivel ----
             var cash3 = 0;
             var TemV3 = 0;
             var NewTemV3 = 0;
             var NewCash3 = 0;
             var Status3 = "";
      
             await firestore.collection("users")
             .where("Indicados", "array-contains", Id2nivel)
             .get().then(async (querySnapshot13) => {
               if(querySnapshot13.size  !== 0){
             
             
              await querySnapshot13.forEach((doc131) => {
                   Id3nivel = doc131.id;
                 })
             
             await firestore.collection("users")
             .doc(Id3nivel)
             .get().then((doc132) => {
              cash3 = doc132.data().Cash; 
              TemV3 = doc132.data().DataVenc;
             });
             
             if(TemV3 < tempReal){
                 NewCash3 = cash3;
                 Status3 = "Perdeu";
                }else {
                
                NewCash3 = cash3 + (3*ValorApo);
                Status3 = "Ganhou";
                }
             
                await firestore.collection("users")
                .doc(Id3nivel)
                .update({
                    Cash:NewCash3,
                    Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:Status3, Nivel:"3", Valor:(3*ValorApo), Moeda:"Cash", IdInf:IdAposta })
                })
            
                
             
             
               } 
             })
      
      
      
      
      
      
              
                //4° Nivel ----
                var cash4 = 0;
                var TemV4 = 0;
                var NewTemV4 = 0;
                var NewCash4 = 0;
                var Status4 = "";
                
                await firestore.collection("users")
                .where("Indicados", "array-contains", Id3nivel)
                .get().then(async (querySnapshot14) => {
                  if(querySnapshot14.size  !== 0){
                
                
                 await querySnapshot14.forEach((doc141) => {
                      Id4nivel = doc141.id;
                    })
                
                await firestore.collection("users")
                .doc(Id4nivel)
                .get().then((doc142) => {
                 cash4 = doc142.data().Cash; 
                 TemV4 = doc142.data().DataVenc;
                });
                
                if(TemV4 < tempReal){
                    NewCash4 = cash4;
                    Status4 = "Perdeu";
                   }else {
                   
                   NewCash4 = cash4 + (1*ValorApo);
                   Status4 = "Ganhou";
                   }
                
                   await firestore.collection("users")
                   .doc(Id4nivel)
                   .update({
                       Cash:NewCash4,
                       Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:Status4, Nivel:"4", Valor:(1*ValorApo), Moeda:"Cash", IdInf:IdAposta })
                   })
                   
                
                
                  } 
                })
      
      
                  }
      
      
                  }
      
                  });
                 
                  setCarre(false);
                  setAlert("Aposta Paga com Sucesso!");
                  setAlertTipo("success");
                  setModalCalend(true);
                  setVerNotajogo(false);
                  setSimAp([]);
                  setValCambis("");
                  setValorReal(0);
                  setValPremi(0);
                  setTelCli("");
                  setNomeCli("");
                  setCambis(false);
                  setValPreDemos("");
                  setVaToCo(0)
                  setIdAposta("");
                  setPgCash(false);
                  setDCash(0);
                  setValApos("R$000,00")
                  setVCash(0);
                  setCodG(false)
                  setTentativa(0)
                  setSenha("")
                  setRobo(true)
                 
                 
                 
                 
                  })
      
      
                  
              //     var data = new URLSearchParams();
              //     data.append('DataEnt', DataEnt);
              //     data.append('Tel', Tel);
              //     data.append('IdApos', IdAposta);
            
              // const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoCash", {
              //   method: 'POST',
              //   headers:{
              //     'Content-Type': 'application/x-www-form-urlencoded'
              //   },
              //   body: data.toString(),
              //   json: true,
              // });
             
              // const json = await req.json();
            
              // if(json){
            
             
      
                
       
               
              //  }
                })
                 
                 
      
              
             } 
         

         
         
         
        } else {
          setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
          setAlertTipo("danger")
          setVerNotajogo(false)
          setModalCalend(true)
          setCarre(false);
        }
      })
         
         
           
           },
           
  

}