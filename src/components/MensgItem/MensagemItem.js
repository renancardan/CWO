import React, { useState, useContext, useEffect } from 'react';
import {Modal, Text,FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'

//import Video from 'react-native-video';
//import Slider from '@react-native-community/slider';
import Play from '../../assets/play.svg';
import PararAudio from '../../assets/stop.svg';
import AbrirVideo from '../../assets/video.svg';
import FecharQ from '../../assets/fechar.svg';
//import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import Maps from '../../assets/google-maps.svg';
//import CampoText from '../../components/campTextPos';
import Fechar from '../../assets/fechar.svg';

let rever = '';
//tempo atual menos 12 hrs
var Time = new Date().getTime()
var temp = Time - 43200000;
var temp2 = Time - 3600000;




export default ({data, user,  setInfoAudi, InfoAudi, Mudar, setMudar, modalVisible, setModalVisible, Bady,  setBady, ModalImg, setModalImg, inicial,  idOuvi, Ocorre, Desc, idDesc, idCar, SimEntrega, NaoEntrega, PosiInicial, PosiFinal, LocIni, LocFin, PedidoDeEntrega, FechaQuadro, setModalLoad, NomeOuvi  }) => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
    
    const navigation = useNavigation();
    const [time, setTime] = useState();
    const [Loading, setLoading] = useState(false);
    const [Varia, setVaria] = useState(userState.variTemp)
    const [ListSegAnu, setListSegAnu] = useState(userState.SegAnun)
    const [SegAnun, setSegAnun] = useState("");
    const [ModalCri, setModalCri] = useState(false);
    const [NomeEd, setNomeEd] = useState("");
    const [Log, setLog] = useState(0);
    const [Lat, setLat] = useState(0);
    const [Estado, setEstado] = useState("");
    const [Cidade, setCidade] = useState("");
    const [Carreg, setCarreg] = useState(true);
   

    const tempo = ()=>{
        let currentDate = '';
        let now =new Date(data.item.date);
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
        setTime(currentDate);
    }
    
    useEffect(()=>{
        tempo();
    }, []);

    useEffect(() => {
        ColocarSegAnun();
        }, []);
   
 
    const ColocarSegAnun = ()=>{
        if(data.item.body){
            for(let i in ListSegAnu){
                if(ListSegAnu[i].id === data.item.body.tipo ){
                  setSegAnun(ListSegAnu[i].nome);
                }
               }

        }
       
      }

      const AbrirModalCri = (item)=>{
          
        setNomeEd(item.Nome)
        setLat(item.Loc.lat)
        setLog(item.Loc.lng)
        setCidade(item.Cidade);
        setEstado(item.Estado);
        setCarreg(false);
        setModalCri(true);
      }
    

      const FechaModalCri = ()=>{
       
        setModalCri(false);
      }

      const CriandoPosicao = () =>{
        
        if(NomeEd !== ""){
            FechaModalCri();
          Api.CriarPosicao(NomeEd, Lat, Log, Estado, Cidade, setNomeEd, setCarreg, setLat, setLog, setCidade, setEstado );
        } else{
         
        }
       
      }

       

    const ouvirAudi = async (data, key)=>{
     
      

        await setLoading(true);
        await setInfoAudi(key);
         rever = await new Player(data, 
            {
                autoDestroy : true,
            }).play(()=>{
              
                setLoading(false);
                setMudar(true);
             }).on('ended', () => {
                setInfoAudi('');
                setMudar(false); 
             });
            
    }
    const AbrirModalImg = (data)=>{
        setBady(data);
        setModalImg(true);
    }

   
       const AbrirModal = (data)=>{
           setModalVisible(true);
           setBady(data);
       }

    const parar = ()=>{

        rever.stop((err) => {
           setInfoAudi('');
           setMudar(false); 
        });
    }

    const Entrar = (item)=>{
        navigation.navigate('FotoTeu', {
          item:item,
          idRo:item.IdUser,
      })
      }

      const EntrarProduto = (item)=>{
        navigation.navigate("Produto", {
            item:item,
            idRo:item.IdUser,
        })
      }

      const EntrarAnuncio = (item)=>{
        navigation.navigate("Anuncio", {
          item:item,
          idRo: item.IdUser,
      })
      }

      const EntrarEvento = (item)=>{
        navigation.navigate("Evento", {
          item:item,
          idRo: item.IdUser,
      })
      }

      const EntrarMap = (item)=>{
    
        navigation.navigate("LocArea4" , { 
          item: item,
         
        });
      }

      const Compartilhando = (item)=>{
        
  
        navigation.navigate("Compartilhar", {
          item:item,
          Tip:'Posicao'
        });
          }

      const EntrarAtendimento = ()=>{
        
        navigation.navigate("Atendimento",
        {
          IdOc:Ocorre,
          LocFin:LocFin,
          LocIni:LocIni,
          idOuvi:idOuvi,
          NomeOuvi:NomeOuvi
        })
      }

      const EntrarFinanceiro = ()=>{
        navigation.navigate("financeiro")
      }
     
      const UtilDesconto = (DataFim, Desconto, Nome, Descr, Img, id, Use)=>{
        console.log(idDesc);
        console.log(user);
        if( idDesc === user || idDesc === ""){
        if(idCar === user || idCar === "" ){
          if(DataFim > Time){
            setModalLoad(true);
            Api.UtiliDesconto(Varia, NomeUse, Time, user, Ocorre, DataFim, Desconto, Nome, Descr, Img, id )
         } else {
             alert("AVISO",
             "Esse Desconto Já Passou da Data de Validade!"
             )
         }

        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
      
        
      }

      const ComprarPromcao = (id, NomePro, DescPro,  imageUrl, Valor, Descont,  DatFinTime,)=>{
        let Valo1 = parseFloat(Valor.replace("," , "."));
        let Cal = Valo1-(Valo1*(parseFloat(Descont)/100));
        if( idDesc === user || idDesc === ""){
          if(idCar === user || idCar === "" ){
        if(DatFinTime > Time){
            let PorcDesc = Descont;
            let ValDesc = Cal.toFixed(2).toString().replace("." , ",");;
            let Val = Valor;
            let ValReal = Cal;
            setModalLoad(true);
            Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)
          } else {
              alert(
                  "AVISO",
                  "Esse Item Não tem mais Validade de Compra!"
              )
          }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }

    }

      const ComprarProduto = (DescPro, NomePro, Valor, ValorDesc, Desconto, imageUrl, id)=>{
      
       let Valo1 = parseFloat(Valor.replace("," , "."));
       let Valo2 = parseFloat(ValorDesc.replace("," , "."));
       if( idDesc === user || idDesc === ""){
        if(idCar === user || idCar === "" ){

        if(Desconto === true){
        let Valor3 = parseInt((Valo2/Valo1)*100);


         let PorcDesc = Valor3+"%";
         let ValDesc = ValorDesc;
         let Val = Valor;
         let ValReal = Valo2;
         setModalLoad(true);
        Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)

        } else {
            if(Desc === "0%"){

                let PorcDesc = "0%";
                let ValDesc = Valor;
                let Val = Valor;
                let ValReal = Valo1;
                setModalLoad(true);
                Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)
             
            } else {
               let Cal = Valo1-(Valo1*(parseFloat(Desc)/100));
                let PorcDesc = Desc;
                let ValDesc = Cal.toFixed(2).toString().replace("." , ",");
                let Val = Valor;
                let ValReal = Cal;
                setModalLoad(true);
             Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)
             
            }
        }
            } else {
              alert("AVISO",
              "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
              )
          }
            } else {
              alert("AVISO",
              "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
              )
          }
      }

      const ComprandoItens = (id, DescPro, NomePro, Valor, DatFinTime, imageUrl)=>{
        if( idDesc === user || idDesc === ""){
          if(idCar === user || idCar === "" ){

        if(DatFinTime > Time){
           setModalLoad(true);
            let PorcDesc = "0%";
            let ValDesc = Valor;
            let Val = Valor;
            let ValReal = parseFloat(Valor.replace("," , "."));
            Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)
          } else {
              alert(
                  "AVISO",
                  "Esse Item Não tem mais Validade de Compra!"
              )
          }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
        
      }

      const EntrarFila = (Extra)=>{
        setModalLoad(true);
        Api.ChamarAvulso(NomeOuvi, idOuvi, NomeUse, user, Varia, Ocorre, Extra, setModalLoad )
      }
    
  
    return (
        <View style={{marginTop:5, marginBottom:5, marginLeft:10,  marginRight:10, padding:10, alignSelf:"baseline", maxWidth:"80%", borderRadius:5, backgroundColor: data.item.autor === user ?"#98ABE1":"#A9CFE1", alignSelf: data.item.autor === user ?"flex-end":"flex-start", textAlign: data.item.autor === user ? "right":"left"}} >
             {/* <Modal
           animationType="slide"
           visible={ModalCri}
          >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <BtnModal onPress={()=>FechaModalCri()}>
          <Text style={styles.modalText3}>
          <Fechar width="20" height="20" backgroundColor="#000"/>
          </Text>
          </BtnModal>
          <InputArea>
                <CampoText
                        
                        placeholder="Digite o Nome da Posição" 
                        value={NomeEd}
                        onChangeText={t=>setNomeEd(t)}
                        autoCapitalize="none"
                        keyboardType={"default"}
                        posi={24}
                    />
                    {Carreg === true ?
                    <>
                    <LoadingIcon size="large" color="#fff" />
                    </>
                    
                    :
                    <>
                      <Text style={styles.modalText2}>Posição Encontrada</Text>
                      <Text style={styles.modalText2}>Latitude: {Lat}</Text>
                      <Text style={styles.modalText2}>Longitude: {Log}</Text>
                      <Text style={styles.modalText2}>Cidade: {Cidade}</Text>
                      <Text style={styles.modalText2}>Estado: {Estado}</Text>    
                    
                    </>

                              }
                       
                </InputArea>
               
               
             <CustomButton2 onPress={()=>CriandoPosicao()} >
                               <CustomButtonText>Guarda a Posição</CustomButtonText>
                       </CustomButton2>
        
          
          </View>
          </View>


          </Modal> */}
            { data.item.autor !== user &&
                <Text style={{fontSize:10, fontWeight:"bold", color: data.item.autor === user ?"#FFF":"green"}}>{data.item.nome}</Text>
            }
             {data.item.type === "text" &&
                <Text  style={{   fontSize:16, textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</Text>
            }

      

            {data.item.type === "image" &&
             <TouchableHighlight style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}} onPress={()=>{AbrirModalImg(data.item.body)}}>
                <Image  source={{uri:`${data.item.body}`}} style={styles.ImageVer } />
             </TouchableHighlight>
            }

          

            {/* {data.item.type === "video" &&
                <>
                <BtnVideo onPress={()=>{AbrirModal(data.item.body)}}>
                <Titulo>Vídeo</Titulo>
                <AbrirVideo width="50" height="50" backgroundColor="#000" />
                </BtnVideo>
               
               </>
            } */}

            {/* {data.item.type === "audio" &&
            <AdioArea>
                {Loading === true ?
               <LoadingIcon size="large" color="#FFFFFF" />
               :
               <>
               {Mudar === false  ?
                <Btnplay  onPress={()=>{ouvirAudi(data.item.body, data.index)}}>
                    <Play width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                :
                <>
                {data.index !== InfoAudi ?
                <Btnplay  >
                    <Play width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                :
                <Btnplay  onPress={()=>{parar()}}>
                    <PararAudio width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                }
                </>
               }
              
                {data.index === InfoAudi &&
                    <Image 
                    source={require('../../assets/sonora.gif')}  
                    style={{width: 200, height: 50 }}
                    />
                    }
                </>
                }
               

            </AdioArea>
                
            }        */}
            
            {time &&
             <Text style={{marginTop:5, fontSize:10, textAlign:"right"}}>{time}</Text>
            }
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    ImageVer:{
        width:100,
        height:100,
        margin: 5,
      },
      ImageVer2:{
        width:200,
        height:200,
        margin: 5,
      },
      ImageVer3:{
        width:100,
        height:100,
        margin: 5,
        borderRadius:10,
      },
      centeredView: {
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        margin: 20,
        backgroundColor: "#000",
        width: '100%',
        height: '100%',
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText2: {
        fontSize: 20,
        textAlign: "center",
        color:"#fff"
      },
      modalText3: {
        fontSize: 20,
        textAlign: "center",
        color:"red",
      },
      image2: {
        width: 200,
        height: 100,
         flex: 1 ,
         alignItems:"center",
         justifyContent:"center",
         margin: 5,
  
      },
});