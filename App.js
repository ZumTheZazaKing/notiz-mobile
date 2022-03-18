import { lazy, Suspense, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import FlashMessage from "react-native-flash-message";
import { NoteContext } from './context/noteContext';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Create = lazy(() => import('./pages/Create').then(module => ({ default: module.Create })));
const Settings = lazy(() => import('./pages/Settings').then(module => ({ default: module.Settings })));
const Read = lazy(() => import('./pages/Read').then(module => ({ default: module.Read })));
const Update = lazy(() => import('./pages/Update').then(module => ({ default: module.Update })));

const Stack = createNativeStackNavigator();

export default function App() {

  const notes = useRef([])

  return (
    <NavigationContainer>
      <Suspense fallback={<Loading/>}>
        <NoteContext.Provider value={{notes}}>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#222222',
              },
              headerTintColor: '#fff',
            }}
          >
            <Stack.Screen name="Home" component={Home} options={{title:"Notiz"}}/>
            <Stack.Screen name="Create" component={Create} options={{title:"Create Note"}}/>
            <Stack.Screen name="Settings" component={Settings} options={{title:"Settings"}}/>
            <Stack.Screen name="Read" component={Read} options={({ route }) => ({ title: route.params.note.title })}/>
            <Stack.Screen name="Update" component={Update} options={{title:"Edit Note"}}/>
          </Stack.Navigator>
        </NoteContext.Provider>
        <FlashMessage position="bottom"/>
      </Suspense>
    </NavigationContainer>
  );
}
