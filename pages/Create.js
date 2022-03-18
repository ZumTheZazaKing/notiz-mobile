import { SafeAreaView, ScrollView, TextInput, Text, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { createStyles } from '../styles/createStyles';
import { useState, useContext } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import { NoteContext } from '../context/noteContext';

export const Create = ({navigation, route}) => {

    const { notes } = useContext(NoteContext);

    const [noteData, setNoteData] = useState({
        title: '',
        content: '',
        createdAt: new Date().toUTCString(),
    })

    const createNote = () => {
        if(noteData.title.length === 0)return showMessage({message:"Title is required",type:"danger",duration:3000});
        if(noteData.content.length === 0)return showMessage({message:"Content is required",type:"danger",duration:3000});
        const noteId = uuid.v4();
        storeNote({...noteData, title:noteData.title.trim(), id:`@${noteId}`});
        notes.current.push({...noteData, title:noteData.title.trim(), id:`@${noteId}`});
    }

    const storeNote = async(value) => {
        try {
            await AsyncStorage.setItem(value.id, JSON.stringify(value));
            setNoteData({title:'', content:'', createdAt:new Date().toUTCString()});
            showMessage({message:"Note created",type:"success",duration:3000});
            navigation.navigate('Home');
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
                <Button title="Create" onPress={() => createNote()}/>
            </ScrollView>
        </SafeAreaView>
    );
}