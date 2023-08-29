import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Button} from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
    return (
        <View style={styles.container}>
            <Button title="Download PDF" onPress={async () => {
                console.log('downloading...');
                const downloadResumable = FileSystem.createDownloadResumable(
                    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                    FileSystem.documentDirectory + 'dummy.pdf',
                    {}
                );
                try {
                    const {uri} = await downloadResumable.downloadAsync();
                    console.log('Finished downloading to ', uri);
                    const fileInfo = await FileSystem.getInfoAsync(uri);
                    console.log(fileInfo);

                    if(fileInfo.size === 0) {
                        console.error(`${fileInfo.uri} has size ${fileInfo.size}`);
                    }
                } catch (e) {
                    console.error(e);
                }
            }}></Button>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
