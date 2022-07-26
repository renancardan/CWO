import React, { useState, useContext, useEffect } from 'react';
import { Text, FlatList, StyleSheet, Image, Modal, ImageBackground,  View, } from 'react-native';
import {
 Container,
 TextFrase,
 TextFrase2,
 TextDate,
 Titulo,
 AdioArea,
 Btnplay,
 LoadingIcon,
 BtnFechar,
 BtnX, 
 TextFechar,
 BtnVideo,
 BtnLoc,
 AreaInfComp,
 TextDate1,
 TextDate2,
 TextDate3,
 BtnCatalogo,
 BtnModal,
InputArea,
CustomButton2,
CustomButtonText,
CustomButtonText6,
CustomButtonText1,
CustomButton3,
CustomButton4,
Box,
Box1,
AreaBoty,
Areatitulo,
Texto1,
Texto2,
} from './styles';
//import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Play from '../../assets/play.svg';
import PararAudio from '../../assets/stop.svg';
import AbrirVideo from '../../assets/video.svg';
import FecharQ from '../../assets/fechar.svg';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import Maps from '../../assets/google-maps.svg';
import CampoText from '../../components/campTextPos';
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
    const [NomeUse, setNomeUse] = useState(userState.InforContaUser.nome);

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
          alert(
            "AVISO",
            "Preencha o Nome Da Posição!")
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
        <Container style={{backgroundColor: data.item.autor === user ?"#98ABE1":"#A9CFE1", alignSelf: data.item.autor === user ?"flex-end":"flex-start", textAlign: data.item.autor === user ? "right":"left"}} >
             <Modal
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


          </Modal>
            { data.item.autor !== user &&
                <Titulo style={{color: data.item.autor === user ?"#FFF":"green"}}>{data.item.nome}</Titulo>
            }
             {data.item.type === "text" &&
                <TextFrase  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase>
            }

        {data.item.type === "BtnEntrega" &&
        <>
         <TextFrase  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase>
         { data.item.date <= temp2 ?
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 1 hora, por isso não tem acesso a seus botões. Caso queira ter acesso Inicie o Pedido de entrega!</TextDate>
              : 
              <>
              <BtnLoc onPress={()=>SimEntrega()}>
                <TextFrase2 >Sim</TextFrase2> 
                </BtnLoc> 
                <BtnLoc style={{backgroundColor:"red"}} onPress={()=>NaoEntrega()}>
                <TextFrase2 >Não</TextFrase2> 
                </BtnLoc> 
              
              </>
         }
               
                
        
        </>
               
            }

      {data.item.type === "BtnAcomp" &&
        <>
         <TextFrase  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase>
         { data.item.date <= temp ?
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 1 hora, por isso não tem acesso a seus botões. Caso queira ter acesso Inicie o Pedido de entrega!</TextDate>
              : 
              <>
              <BtnLoc onPress={()=>EntrarAtendimento()}>
                <TextFrase2 >Acompanhar o Atendimento</TextFrase2> 
                </BtnLoc> 
              
              </>
         }
               
                
        
        </>
               
          }

      {data.item.type === "TicketAvulso" &&
        <>
           <Box1 onPress={null}   style={{backgroundColor:"#B553BE" }}>
                  <ImageBackground source={require("../../assets/ticket.png")} 
                  resizeMode='cover' 
                  style={styles.image2} >
                    <AreaBoty>
               
    
                     <Areatitulo>
                     <Texto2>Ticket Entrega Avulsa</Texto2>
                     <Texto1>Pagamento Para O Serviço do Dia:</Texto1> 
                      <Texto1>{data.item.body.Data}</Texto1>
                     <Texto1>Valor da Entrega: R$ {data.item.body.ValorCha.toFixed(2).toString().replace("." , ",")}</Texto1>
                   
                  
                     
                    
                    
                     </Areatitulo>
                   
                 </AreaBoty>
                 </ImageBackground>
                   </Box1>
         { data.item.date <= temp ?
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 1 hora, por isso não tem acesso a seus botões. Caso queira ter acesso Inicie o Pedido de entrega!</TextDate>
              : 
              <>
              <BtnLoc onPress={()=>EntrarFinanceiro()}>
                <TextFrase2 >Ir Para O Financeiro</TextFrase2> 
                </BtnLoc> 
              
              </>
         }
               
                
        
        </>
               
          }

    {data.item.type === "BtnInicio" &&
        <>
         <TextFrase  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase>
             { data.item.date <= temp2 ?
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 1 hora, por isso não tem acesso a seus botões. Caso queira ter acesso Inicie o Pedido de entrega!</TextDate>
              : 
              <BtnLoc style={{backgroundColor:"#000"}} onPress={()=>PosiInicial()}>
              <TextFrase2 style={{color:"#FFF"}} >Enviar Posição Inicial</TextFrase2> 
              </BtnLoc> 
              }
               
              
                
        
        </>
               
            }
              {data.item.type === "BtnFim" &&
        <>
         <TextFrase  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase>
             { data.item.date <= temp2 ?
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 1 hora, por isso não tem acesso a seus botões. Caso queira ter acesso Inicie o Pedido de entrega!</TextDate>
              : 
              <BtnLoc style={{backgroundColor:"#20AA55"}} onPress={()=>PosiFinal()}>
              <TextFrase2 style={{color:"#FFF"}} >Enviar Posição Final</TextFrase2> 
              </BtnLoc> 
              }
               
              
                
        
        </>
               
            }

      {data.item.type === "BtnEntAvus" &&
        <>
         <TextFrase  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase>
             { data.item.date <= temp2 ?
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 1 hora, por isso não tem acesso a seus botões. Caso queira ter acesso Inicie o Pedido de entrega!</TextDate>
              : 
              <BtnLoc onPress={()=>EntrarFila(data.item.extra)}>
             <TextFrase2  >Sim</TextFrase2>
              </BtnLoc> 
              }
               
              
                
        
        </>
               
            }

      {data.item.type === "BtnEmpr" &&
        <>
         <TextFrase  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase>
             { data.item.date <= temp2 ?
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 1 hora, por isso não tem acesso a seus botões. Caso queira ter acesso Inicie o Pedido de entrega!</TextDate>
              : 
              <BtnLoc style={{backgroundColor:"#2e64e5"}}  onPress={()=>PedidoDeEntrega()}>
              <TextFrase2  >Iniciar</TextFrase2> 
              </BtnLoc> 
              }
               
              
                
        
        </>
               
            }
             {data.item.type === "botao" &&
             <>
             <BtnLoc onPress={()=>inicial()}>
             <TextFrase2  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase2> 
             </BtnLoc>
            </>
            }

            {data.item.type === "image" &&
             <BtnVideo onPress={()=>{AbrirModalImg(data.item.body)}}>
                <Image  source={{uri:`${data.item.body}`}} style={styles.ImageVer } />
             </BtnVideo>
            }

            {data.item.type === "Foto" &&
             <BtnVideo onPress={()=>{Entrar(data.item.body)}}>
                  <TextDate>Foto da Conta</TextDate>
                <Image  source={{uri:`${data.item.body.imageUrl}`}} style={styles.ImageVer2 } />
                
                {data.item.body.Evento &&
                <>
                <TextDate>Evento Participativo</TextDate>
                <Image  source={{uri:`${data.item.body.Evento.imageUrl}`}} style={styles.ImageVer3 } />
                </>

                }


              
             </BtnVideo>
            }

          {data.item.type === "Nota" &&
       
             <BtnCatalogo onPress={()=>{Entrar(data.item.body)}}>
                  <TextDate>Nota Da Compra</TextDate>
             
                <AreaInfComp>
                {data.item.body.map((item, index)=>(
                     <CustomButton4  key={index}>
                     <CustomButton3>
                            <Box>
                             <CustomButtonText1>Nome do Item ||</CustomButtonText1>
                           
                           
                             <CustomButtonText6 >{item.Nome.substring(0,18)}</CustomButtonText6>
        
                             </Box>
                             <Box>
                             <CustomButtonText1>Q ||</CustomButtonText1>
                           
                           
                             <CustomButtonText6 >1</CustomButtonText6>
        
                             </Box>
                             <Box>
                             <CustomButtonText1>Valor      ||</CustomButtonText1>
                           
                           
                             <CustomButtonText6 >R$ {item.Valor}</CustomButtonText6>
        
                             </Box>
                             <Box>
                             <CustomButtonText1>Desc. ||</CustomButtonText1>
                           
                           
                             <CustomButtonText6 >{item.Desconto}</CustomButtonText6>
        
                             </Box>
                             <Box>
                             <CustomButtonText1>Valor Real</CustomButtonText1>
                             <CustomButtonText6 >R$ {item.ValDesc}</CustomButtonText6>
        
                             </Box >
                             </CustomButton3>
                             </CustomButton4>

                ))

                }
             <CustomButton4>
               
             <CustomButtonText1>Valor Total: R$ {data.item.extra?data.item.extra.toFixed(2).toString().replace("." , ","):0}</CustomButtonText1>
             </CustomButton4>
             </AreaInfComp>
             </BtnCatalogo>
            
            }

            {data.item.type === 'Catalogo' &&
             <BtnCatalogo onPress={()=>{Entrar(data.item.body)}}>
                  <TextDate>Item do Catálago</TextDate>
                <Image  source={{uri:`${data.item.body.imageUrl}`}} style={styles.ImageVer2 } />
                <AreaInfComp>
                { data.item.date <= temp &&
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 12 horas, por isso não tem acesso aos seus botões. Caso queira ter acesso Envie a Mensagem Novamente!</TextDate>
                }
                <TextDate1>Nome: {data.item.body.NomePro} </TextDate1>
                {data.item.body.Desconto === true ?
                <>
                 <TextDate1  style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color:"#000", fontWeight:"bold"}}>Valor: R$ {data.item.body.Valor} </TextDate1>
                 <TextDate1>Item Com Desconto</TextDate1>
                <TextDate1 style={{fontWeight:"bold"}}>Valor: R$ {data.item.body.ValorDesc} </TextDate1>
                </>

                :
                <>
                 <TextDate1 style={{fontWeight:"bold"}}>Valor: R$ {data.item.body.Valor} </TextDate1>
                </>

                }
                {/* Esse aqui é pra limitar o botão de compra até 12 horas antes, pois pode fica*/}
            { data.item.date >= temp &&
               <>
                { idOuvi === data.item.body.IdUser ?
               <>
                <BtnLoc onPress={()=>ComprarProduto(data.item.body.DescPro, data.item.body.NomePro, data.item.body.Valor, data.item.body.ValorDesc, data.item.body.Desconto, data.item.body.imageUrl,  data.item.body.id)}>
                <TextFrase2 >Comprar</TextFrase2> 
                </BtnLoc> 
                 <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarProduto(data.item.body)}>
                 <TextFrase2 >Ir Ao Item</TextFrase2> 
                 </BtnLoc> 
                 </>
                :
                <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarProduto(data.item.body)}>
                <TextFrase2 >Ir Ao Item</TextFrase2> 
                </BtnLoc> 
               }
               
               </>
               }
              
               
                <TextDate1>Descrição: {data.item.body.DescPro} </TextDate1>
                
           
             </AreaInfComp>
             </BtnCatalogo>
            
            }

            {data.item.type === 'Posicao' &&
             <BtnCatalogo onPress={()=>{Entrar(data.item.body)}}>
                  <TextDate>Posição</TextDate>
                  <Maps  width="100" height="100"/>
                <AreaInfComp>
              
                <TextDate1>{data.item.body.Nome} </TextDate1>
                <TextDate1>Cidade: {data.item.body.Cidade} </TextDate1>
                <TextDate1>Estado: {data.item.body.Estado} </TextDate1>
                {/* Esse aqui é pra limitar o botão de compra até 12 horas antes, pois pode fica*/}

             
                 <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarMap(data.item.body)}>
                 <TextFrase2 >Ver Mapa</TextFrase2> 
                 </BtnLoc> 
               
                <BtnLoc style={{backgroundColor:"#2e64e5"}} onPress={()=>AbrirModalCri(data.item.body)}>
                 <TextFrase2 >Guarda Posição</TextFrase2> 
                 </BtnLoc> 
                 <BtnLoc onPress={()=>Compartilhando(data.item.body)}>
                <TextFrase2 >Compatilhar Posição</TextFrase2> 
                </BtnLoc> 
                
                
              
               
              
              
               
             
                
           
             </AreaInfComp>
             </BtnCatalogo>
            
            }






        {data.item.type === 'Anuncio' &&
             <BtnCatalogo onPress={()=>{Entrar(data.item.body)}}>
                  {data.item.body.tipo === "EIEMtUHNoSTbZVRmgrEM" &&
                    <TextDate>Anúncio Itens Usados</TextDate>
                    }

                {data.item.body.tipo === "hE9AsRvNKFwi4M2BgC9o" &&
                    <TextDate>Anúncio Itens Novos</TextDate>
                    }
            {data.item.body.tipo === "nniZYaejVLgPjvnQVizz" &&
                    <TextDate>Anúncio Promoções</TextDate>
                    }
            {data.item.body.tipo === "AiBlUlfbFp9ium9jbQ9C" &&
                    <TextDate>Anúncio Eventos</TextDate>
                    }
                  
                <Image  source={{uri:`${data.item.body.imageUrl}`}} style={styles.ImageVer2 } />
                {data.item.body.DatFinTime < Time ?
                <>
                <TextDate  style={{ color:"red", textAlign:"left" }}>Esse Anúncio já venceu, não tem como ser utilizado!</TextDate>
                </>
                :
                <>
                {/*Itens Usados */}
                 {data.item.body.tipo === "EIEMtUHNoSTbZVRmgrEM" &&
                <>
                  <AreaInfComp>
                { data.item.date <= temp &&
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 12 horas, por isso não tem acesso aos seus botões. Caso queira ter acesso Envie a Mensagem Novamente!</TextDate>
                }
                <TextDate1>Nome: {data.item.body.Nome} </TextDate1>
              
                <>
                 <TextDate1 style={{fontWeight:"bold"}}>Valor: R$ {data.item.body.Valor} </TextDate1>
                </>

            
                {/* Esse aqui é pra limitar o botão de compra até 12 horas antes, pois pode fica*/}
            { data.item.date >= temp &&
               <>
                { idOuvi === data.item.body.IdUser ?
               <>
                <BtnLoc onPress={()=>ComprandoItens(data.item.body.id, data.item.body.Descricao, data.item.body.Nome, data.item.body.Valor, data.item.body.DatFinTime, data.item.body.imageUrl)}>
                <TextFrase2 >Comprar</TextFrase2> 
                </BtnLoc> 
                 <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarAnuncio(data.item.body)}>
                 <TextFrase2 >Ir Ao Item</TextFrase2> 
                 </BtnLoc> 
                 </>
                :
                <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarAnuncio(data.item.body)}>
                <TextFrase2 >Ir Ao Item</TextFrase2> 
                </BtnLoc> 
               }
               
               </>
               }
              
               
                <TextDate1>Descrição: {data.item.body.Descricao} </TextDate1>
                
           
             </AreaInfComp>
                
                
                </>

                }
                {/* Itens Novos */}
            {data.item.body.tipo === "hE9AsRvNKFwi4M2BgC9o" &&
                <>
                  <AreaInfComp>
                { data.item.date <= temp &&
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 12 horas, por isso não tem acesso aos seus botões. Caso queira ter acesso Envie a Mensagem Novamente!</TextDate>
                }
                <TextDate1>Nome: {data.item.body.Nome} </TextDate1>
              
                <>
                 <TextDate1 style={{fontWeight:"bold"}}>Valor: R$ {data.item.body.Valor} </TextDate1>
                </>

                
                {/* Esse aqui é pra limitar o botão de compra até 12 horas antes, pois pode fica*/}
            { data.item.date >= temp &&
               <>
                { idOuvi === data.item.body.IdUser ?
               <>
                <BtnLoc onPress={()=>ComprandoItens(data.item.body.id, data.item.body.Descricao, data.item.body.Nome, data.item.body.Valor, data.item.body.DatFinTime, data.item.body.imageUrl)}>
                <TextFrase2 >Comprar</TextFrase2> 
                </BtnLoc> 
                 <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarAnuncio(data.item.body)}>
                 <TextFrase2 >Ir Ao Item</TextFrase2> 
                 </BtnLoc> 
                 </>
                :
                <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarAnuncio(data.item.body)}>
                <TextFrase2 >Ir Ao Item</TextFrase2> 
                </BtnLoc> 
               }
               
               </>
               }
              
               
                <TextDate1>Descrição: {data.item.body.Descricao} </TextDate1>
                
           
             </AreaInfComp>
                
                
                </>

                }
            {/*  Promoções*/}
            {data.item.body.tipo === "nniZYaejVLgPjvnQVizz" &&
                <>
                  <AreaInfComp>
                { data.item.date <= temp &&
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 12 horas, por isso não tem acesso aos seus botões. Caso queira ter acesso Envie a Mensagem Novamente!</TextDate>
                }
                <TextDate1>Nome: {data.item.body.Nome} </TextDate1>
              {data.item.body.TipoDesc === "Um só item" ?
            <>
            <TextDate1 style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color:"#000", fontWeight:"bold"}}>Valor do Item: R$ {data.item.body.Valor} </TextDate1>
            <TextDate1 style={{fontWeight:"bold"}}>Desconto {data.item.body.Desconto} </TextDate1>
            <TextDate1 style={{fontWeight:"bold"}}>Valor: R$ {(parseFloat(data.item.body.Valor)-(parseFloat(data.item.body.Valor)*(parseFloat(data.item.body.Desconto)/100))).toFixed(2).toString().replace("." , ",") }</TextDate1>
            </>
              :
              <>
              <TextDate1 style={{fontWeight:"bold"}}>Toda a Loja</TextDate1>
              <TextDate1 style={{fontWeight:"bold"}}>Desconto: {data.item.body.Desconto} </TextDate1>
             </>

              }
              

                
                {/* Esse aqui é pra limitar o botão de compra até 12 horas antes, pois pode fica*/}
            { data.item.date >= temp &&
               <>
                { idOuvi === data.item.body.IdUser ?
               <>
               {data.item.body.TipoDesc === "Um só item" ?
                <BtnLoc onPress={()=>ComprarPromcao(data.item.body.id, data.item.body.Nome, data.item.body.Descricao, data.item.body.imageUrl, data.item.body.Valor, data.item.body.Desconto, data.item.body.DatFinTime)}>
                <TextFrase2 >Comprar</TextFrase2> 
                </BtnLoc>
                :
                <BtnLoc onPress={()=>UtilDesconto(data.item.body.DatFinTime, data.item.body.Desconto, data.item.body.Nome, data.item.body.Descricao, data.item.body.imageUrl, data.item.body.id  )}>
                <TextFrase2 >Usar Desconto</TextFrase2> 
                </BtnLoc>
                
                }
                 <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarAnuncio(data.item.body)}>
                 <TextFrase2 >Ir Ao Anúncio</TextFrase2> 
                 </BtnLoc> 
                 </>
                :
                <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarAnuncio(data.item.body)}>
                <TextFrase2 >Ir Ao Anúncio</TextFrase2> 
                </BtnLoc> 
               }
               
               </>
               }
              
               
                <TextDate1>Descrição: {data.item.body.Descricao} </TextDate1>
                
           
             </AreaInfComp>
                
                
                </>

                }
{/* Enventos */}
        {data.item.body.tipo === "AiBlUlfbFp9ium9jbQ9C" &&
                <>
                  <AreaInfComp>
                { data.item.date <= temp &&
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 12 horas, por isso não tem acesso aos seus botões. Caso queira ter acesso Envie a Mensagem Novamente!</TextDate>
                }
                <TextDate1>Nome: {data.item.body.Nome} </TextDate1>
                <TextDate1>Tipo: {data.item.body.TipoEve} </TextDate1>
                <TextDate1>Data do Evento: {data.item.body.dataFin.replace("23:59:59", "")} </TextDate1>
                <>
                {data.item.body.ValorEv === true &&
                 <TextDate1 style={{fontWeight:"bold"}}>Valor da Entrada: R$ {data.item.body.Valor} </TextDate1>
                }
               
                </>

                
                {/* Esse aqui é pra limitar o botão de compra até 12 horas antes, pois pode fica*/}
            { data.item.date >= temp &&
               <>
                { idOuvi === data.item.body.IdUser ?
               <>
                 {data.item.body.ValorEv === true &&
                <BtnLoc onPress={()=>ComprandoItens(data.item.body.id, data.item.body.Descricao, data.item.body.Nome, data.item.body.Valor, data.item.body.DatFinTime, data.item.body.imageUrl)}>
                <TextFrase2 >Comprar</TextFrase2> 
                </BtnLoc> 
                    }
                 <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarEvento(data.item.body)}>
                 <TextFrase2 >Ir Ao Evento</TextFrase2> 
                 </BtnLoc> 
                 </>
                :
                <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarEvento(data.item.body)}>
                <TextFrase2 >Ir Ao Evento</TextFrase2> 
                </BtnLoc> 
               }
               
               </>
               }
              
               
                <TextDate1>Descrição: {data.item.body.Descricao} </TextDate1>
                
           
             </AreaInfComp>
                
                
                </>

                }

                
                </>

                }
               
                
              
             </BtnCatalogo>
            
            }

            {data.item.type === 'Eventos' &&
             <BtnCatalogo onPress={()=>{Entrar(data.item.body)}}>
                  <TextDate>Evento</TextDate>
                <Image  source={{uri:`${data.item.body.imageUrl}`}} style={styles.ImageVer2 } />
                {data.item.body.DatFinTime < Time ?
                <>
                <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarEvento(data.item.body)}>
                <TextFrase2 >Ir Ao Evento</TextFrase2> 
                </BtnLoc> 
                <TextDate  style={{ color:"red", textAlign:"left" }}>Esse Evento já passou, não tem como ser utilizado!</TextDate>
                </>
                :
                <>
               
                 <AreaInfComp>
                { data.item.date <= temp &&
                <TextDate  style={{ color:"red", textAlign:"left" }}>Essa Mensagem Já foi Enviada a mais de 12 horas, por isso não tem acesso aos seus botões. Caso queira ter acesso Envie a Mensagem Novamente!</TextDate>
                }
                <TextDate1>Nome: {data.item.body.Nome} </TextDate1>
                <TextDate1>Tipo: {data.item.body.TipoEve} </TextDate1>
                <TextDate1>Data do Evento: {data.item.body.dataFin.replace("23:59:59", "")} </TextDate1>
                <>
                {data.item.body.ValorEv === true &&
                 <TextDate1 style={{fontWeight:"bold"}}>Valor da Entrada: R$ {data.item.body.Valor} </TextDate1>
                }
               
                </>
         
               <BtnLoc style={{backgroundColor:"#0AAC0B"}} onPress={()=>EntrarEvento(data.item.body)}>
                <TextFrase2 >Ir Ao Evento</TextFrase2> 
                </BtnLoc> 
               
                <TextDate1>Descrição: {data.item.body.Descricao} </TextDate1>
                
           
             </AreaInfComp>
                
                
              
                
                </>

                }
               
                
              
             </BtnCatalogo>
            
            }

            {data.item.type === "video" &&
                <>
                <BtnVideo onPress={()=>{AbrirModal(data.item.body)}}>
                <Titulo>Vídeo</Titulo>
                <AbrirVideo width="50" height="50" backgroundColor="#000" />
                </BtnVideo>
               
               </>
            }

            {data.item.type === "audio" &&
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
                
            }       
            
            {time &&
             <TextDate>{time}</TextDate>
            }
            
        </Container>
        
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