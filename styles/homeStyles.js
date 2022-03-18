import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      paddingBottom:0,
    },
    text:{
        color:"white",
        lineHeight:30,
    },
    note:{
        padding:10,
        paddingLeft:20,
        borderRadius:5,
        backgroundColor:"rgba(0,0,0,0.5)",
        marginBottom:20,
    },
    title:{
        fontSize:20,
    },
    settingsIcon:{
      color:"white"
    }
});