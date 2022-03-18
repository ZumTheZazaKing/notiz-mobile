import { StyleSheet } from "react-native";

export const createStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        paddingBottom:0,
    },
    textInput:{
        backgroundColor:"#fff",
        borderRadius:5,
        padding:10,
        paddingLeft:15
    },
    error:{
        borderWidth:2,
        borderColor:"red",
    }

})