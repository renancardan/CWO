import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';
import Panico from '../assets/panico.svg';
import ChatIcon from '../assets/chat.svg';
import Lista from '../assets/lista.svg';
import Finan from '../assets/financeiro.svg';
import Botao from '../assets/botao.svg';
import Feeds from '../assets/feed.svg';
import Pesquisa from '../assets/search.svg';
import Api from '../Api';



const TabArea = styled.View`
    height: 50px;
    background-color: #000;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width: 90px;
    height: 90px;
    justify-content: center;
    align-items: center;
    background-color:#FFF;
    border-radius: 45px;
    border: 1px solid #FFF;
    margin-top: -40px;
`;
const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

const CaixaDadosChat = styled.View`
        display: flex; 
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius:10px;
        background-color: red;
        margin-left:-30px;
        margin-top:-20px;
       
`;

 const  TextCha = styled.Text`
    font-size: 12px;
    color: #FFF;
`;
//79-todosos botões da tab
export default ({ state, navigation }) => {
    //83-vai puxar qual usuario está logado vai pegaro avatar.
    const { state:user } = useContext(UserContext);
    const [Opac, setOpac] = useState("Mural");
    const [Quant, setQuant] = useState(0)
    const [Vizu, setVizu] = useState(0)
    const [IdUser, setIdUser] = useState("");
    useEffect(() => {
            VendoVizu();
      }, []);

  
     
    //     const MudarIdUser = async  ()=>{
    //         var IdUse = await AsyncStorage.getItem('Id');
    //         setIdUser(IdUse)
    //         }

    const VendoVizu = async  ()=>{
         Api.QuantVizu(IdUser, setQuant, setVizu)
    }
         
//81-criando a função de click nas tabs 
    const goTo = (screenName) => {
        navigation.navigate(screenName);
        setOpac(screenName);
    }

    return (
        //82 - criando a opacidade ,tamanbho e cor das tabs 
        <TabArea>
           <TabItem onPress={()=>goTo("Mural")}>
                <Feeds style={{opacity: Opac==="Mural"? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo("Chat")}>
          
                <ChatIcon style={{opacity: Opac==="Chat"? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
               {Quant !== Vizu &&
                <CaixaDadosChat>
                <TextCha>{Quant - Vizu}</TextCha>
                </CaixaDadosChat>
               }
             
            </TabItem>
            <TabItem onPress={()=>goTo("Pesquisa")}>
                <Pesquisa style={{opacity: Opac==="Pesquisa"? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
            </TabItem>
        
            <TabItem onPress={()=>goTo("Rotas")}>
                <Lista style={{opacity: Opac==="Rotas"? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
            </TabItem>

            <TabItem onPress={()=>goTo("Chamada")}>
                <Botao style={{opacity: Opac==="Chamada" ? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
            </TabItem>
            
        </TabArea>
    );
}