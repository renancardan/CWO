
import React, { Component } from 'react'
import {Modal, Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import {FontAwesome} from "@expo/vector-icons";


export default class main extends Component {
  render() {
    return (
      <View style={styles.Container}>
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

              <TouchableHighlight  style={styles.CaixaDados}>
              <FontAwesome name="bell"  size={30} color="#fff" />
              </TouchableHighlight>

              <TouchableHighlight  style={styles.CaixaDados}>
              <FontAwesome name="gear" size={30} color="#fff" />
              </TouchableHighlight>

             
           
            </View>
            <View  style={styles.Post}>
              <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>Deportivo Maldonado</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:"https://media.api-sports.io/football/leagues/239.png"}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:"https://media.api-sports.io/football/leagues/239.png"}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>Deportivo Maldonado</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:"https://media.api-sports.io/football/leagues/239.png"}}  style={styles.ImageCamp } />
                <Text style={styles.TexMais}>Chile-Primera Division</Text>
                <Text style={styles.TexMais}>Hoje 18:00</Text>
                </View>

              </View >
              <View style={styles.Botoes}>
               <TouchableHighlight style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>CASA</Text>
                </View>

                <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>1.7</Text>
                </View>
                </>
               </TouchableHighlight>

               <TouchableHighlight style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>EMPATE</Text>
                </View>

                <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>2.7</Text>
                </View>
                </>
               </TouchableHighlight>

               <TouchableHighlight style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>FORA</Text>
                </View>

                <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>3.7</Text>
                </View>
                </>
               </TouchableHighlight>

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

            <View  style={styles.Post}>
              <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>Deportivo Maldonado</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:"https://media.api-sports.io/football/leagues/239.png"}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:"https://media.api-sports.io/football/leagues/239.png"}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>Deportivo Maldonado</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:"https://media.api-sports.io/football/leagues/239.png"}}  style={styles.ImageCamp } />
                <Text style={styles.TexMais}>Chile-Primera Division</Text>
                <Text style={styles.TexMais}>Hoje 18:00</Text>
                </View>

              </View >
              <View style={styles.Botoes}>
               <TouchableHighlight style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>CASA</Text>
                </View>

                <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>1.7</Text>
                </View>
                </>
               </TouchableHighlight>

               <TouchableHighlight style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>EMPATE</Text>
                </View>

                <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>2.7</Text>
                </View>
                </>
               </TouchableHighlight>

               <TouchableHighlight style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>FORA</Text>
                </View>

                <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>3.7</Text>
                </View>
                </>
               </TouchableHighlight>

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




        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({

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
       },

  TextInfo: {
    fontSize: 25,
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