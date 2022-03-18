import { SafeAreaView, ScrollView, StatusBar, Button, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import { homeStyles } from '../styles/homeStyles';
import { globalStyles } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useContext, useState, useCallback, useLayoutEffect } from 'react';
import { showMessage } from "react-native-flash-message";
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NoteContext } from '../context/noteContext';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const Home = ({navigation}) => {

    const { notes } = useContext(NoteContext);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getNotes();
    },[notes])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                    style={{marginRight: 10}}>
                    <Text style={homeStyles.settingsIcon}>
                        <Ionicons size={20} name='settings-sharp'/>
                    </Text>
                </TouchableOpacity>
            ), 
        })
    })

    const getNotes = async() => {
        try {
            const notesTitles = await AsyncStorage.getAllKeys();
            const notesData = await AsyncStorage.multiGet(notesTitles);
            for(let i = 0; i < notesData.length; i++) {
                notes.current.push(JSON.parse(notesData[i][1]));
            }
        } catch (error) {
            showMessage({message:`Error loading notes: ${error.name}`, type:"danger", duration:3000});
        }
    }

    const goToCreate = () => navigation.navigate('Create');
    const readNote = (note) => navigation.navigate('Read',{note:note});

    return (
        <SafeAreaView style={[homeStyles.container, globalStyles.background]}>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <StatusBar barStyle="light-content" backgroundColor="#222222" />
                <Button title="Create Note" onPress={() => goToCreate()}/>
                <Text>{'\n'}</Text>
                {notes.current.map((note, index) => 
                    <View key={index} style={homeStyles.note}>
                        <Text onPress={() => readNote(note)} style={homeStyles.text}>
                            <Text style={homeStyles.title}>{note.title}{'\n'}</Text>
                            <Text>
                                {moment.utc(note.createdAt).format("Do MMM YYYY")} {note.updatedAt ? `, edited ${moment.utc(note.updated).fromNow()}`: ""}
                            </Text>
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}