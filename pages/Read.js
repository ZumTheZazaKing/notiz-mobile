import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { readStyles } from "../styles/readStyles";
import { useLayoutEffect, useContext } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { showMessage } from "react-native-flash-message";
import { NoteContext } from "../context/noteContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const Read = ({ route, navigation }) => {

    const { notes } = useContext(NoteContext);
    const goToUpdate = () => navigation.navigate("Update", { note: route.params.note });
    const deleteNote = async() => {
        try {
            await AsyncStorage.removeItem(route.params.note.id);
            showMessage({message:"Note deleted", type:"success", duration:3000});
            const removedNote = notes.current.indexOf(route.params.note);
            notes.current.splice(removedNote, 1);
            navigation.navigate("Home");
        } catch (error) {
            showMessage({message:`Error deleting note: ${error.name}`, type:"danger", duration:3000});
        }
    }
    const triggerDeleteAlert = () => {
        Alert.alert(
            'Delete this note?',
            'Once deleted, it can\'t be recovered',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => deleteNote(),
                },
            ],
            {cancelable: false},
        );
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={readStyles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => goToUpdate()}
                        style={{marginRight: 10}}>
                        <Text style={readStyles.icon}>
                            <FontAwesome5 size={20} name='edit'/>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => triggerDeleteAlert()}
                        style={{marginRight: 10}}>
                        <Text style={readStyles.icon}>
                            <AntDesign size={23} name='delete'/>
                        </Text>
                    </TouchableOpacity>
                </View>
            ), 
        })
    })

    return (
        <SafeAreaView style={[globalStyles.background,readStyles.container]}>
            <ScrollView>
                <Text style={readStyles.text}>
                    <Text style={readStyles.faint}>{route.params.note.updatedAt ? `Edited on ${moment.utc(route.params.note.createdAt).format("Do MMM YYYY")}\n\n` : ""}</Text>
                    <Text>{route.params.note.content}</Text>{"\n"}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}