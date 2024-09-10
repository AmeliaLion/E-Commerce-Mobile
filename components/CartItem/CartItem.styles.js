import { StyleSheet, Text, View } from 'react-native';

export default StyleSheet.create({
    contener:{
        justifyContent: 'center',
        marginTop:10,
        backgroundColor:'white',
        width:'90%',
        borderRadius:'15%'

    },
    cartLine:{
        flexDirection:'row',
    },
    cartDescription:{
        flexDirection:'col',
        marginLeft: 30,
        marginVertical:10,
    },
    image: {
        height: 100,
        width: 100,
        margin: 10,
    },
    imageModal:{
        height: 250,
        width: 250,
    },
    textModal:{
        alignItems:'flex-end'
    },
    text: {
        justifyContent : 'flex-start' ,
        color:'green',
        fontSize:20,
        margin:10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin:10,
        width: 350,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        height:'100%',
        width:'100%',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems:'flex-start'
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop:10,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      buttonModal:{
        flexDirection:'col',
        borderWidth: 1,
        borderColor: 'red',
      },
      buttonOpacityContainer: {
        flexDirection:'row',
        alignItems: 'center',
        padding: 10,
        width:'50%',
      },
      buttonOpacity:{
        backgroundColor: '#DDDDDD',
        justifyContent:'center',
        alignItems:'center',
        width: 50,
        height:50,
        marginRight: 20,
        marginLeft:0,
      }


  });
  