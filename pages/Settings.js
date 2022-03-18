import { View, Text, Alert } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { settingsStyles } from '../styles/settingsStyles';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { NoteContext } from '../context/noteContext';

export const Settings = ({route}) => {

    const { notes } = useContext(NoteContext);

    const deleteAll = async() => {
        try {
            const notesTitles = await AsyncStorage.getAllKeys();
            if(notesTitles.length === 0 || notesTitles === undefined)return showMessage({message:"No notes to delete", type:"danger", duration:3000});
            await AsyncStorage.multiRemove(notesTitles);
            showMessage({message:"All notes deleted", type:"success", duration:3000});
            notes.current = [];
        } catch (error) {
            showMessage({message:`Error deleting notes: ${error.name}`, type:"danger", duration:3000});
        }
    }

    const triggerDeleteAlert = () => {
        Alert.alert(
            'Delete all notes?',
            'Once deleted, they cannot be recovered',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => deleteAll(),
                },
            ],
            {cancelable: false},
        );
    }

    return (
        <View style={[globalStyles.background, settingsStyles.container]}>
            <Text onPress={() => triggerDeleteAlert()} style={settingsStyles.deleteAll}>
                Delete All Notes
            </Text>
        </View>
    )
}