# Expo Download Demo

This app demonstrates how `expo-dev-client@~2.4.8` interferes with `expo-file-system@~15.4.3`. Namely, running the 
following code results in a 0-sized file on android devices.


```javascript
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
```

### Reproducing

```sh
npm run android
```

Click the download button. An error wil lbe presented.

### Running without expo-dev-clietn

```sh
npm uninstall expo-dev-client
```

and re-launch the app

```sh
npm run android
```

Click the download button. You'll notice there's no error.