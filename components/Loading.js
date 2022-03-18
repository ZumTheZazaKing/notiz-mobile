import { Text, View } from 'react-native';
import { loadingStyles } from '../styles/loadingStyles';

export default function Loading() {
    return (
        <View style={loadingStyles.container}>
            <Text style={loadingStyles.text}>Loading...</Text>
        </View>
    );
}