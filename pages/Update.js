import { SafeAreaView, ScrollView, TextInput, Text, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { createStyles } from '../styles/createStyles';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import { NoteContext } from '../context/noteContext';

export const Update = ({navigation, route}) => {

    const { notes } = useContext(NoteContext);

    const [noteData, setNoteData] = useState({
        title: route.params.note.title,
        content: route.params.note.content,
        createdAt: route.params.note.createdAt,
        updatedAt: new Date().toUTCString(),
        id: route.params.note.id
    })

    const updateNote = () => {
        if(noteData.title.length === 0)return showMessage({message:"Title is required",type:"danger",duration:3000});
        if(noteData.content.length === 0)return showMessage({message:"Content is required",type:"danger",duration:3000});
        storeNote({...noteData, title:noteData.title.trim()});
        const updatedNote = notes.current.indexOf(route.params.note);
        notes.current.splice(updatedNote, 1, {...noteData, title:noteData.title.trim()});
    }

    const storeNote = async(value) => {
        try {
            await AsyncStorage.setItem(value.id, JSON.stringify(value));
            showMessage({message:"Note updated",type:"success",duration:3000});
            navigation.navigate("Home");
        } catch (error) {
            showMessage({message:`Error saving note: ${error.name}`, type:"danger", duration:3000});
        }
    }

    return (
        <SafeAreaView style={[createStyles.container, globalStyles.background]}>
            <ScrollView>
                <TextInput 
                    style={createStyles.textInput}
                    placeholder={"Title"}
                    maxLength={50}
                    value={noteData.title}
                    onChangeText={(text) => setNoteData({...noteData, title: text})}
                />
                <Text>{'\n'}</Text>
                <TextInput 
                    style={createStyles.textInput}
                    placeholder={"Content"}
                    multiline={true}
                    value={noteData.content}
                    onChangeText={(text) => setNoteData({...noteData, content: text})}
                />
                <Text>{'\n'}</Text>
                <Button title="Update" onPress={() => updateNote()}/>
            </ScrollView>
        </SafeAreaView>
    );
}