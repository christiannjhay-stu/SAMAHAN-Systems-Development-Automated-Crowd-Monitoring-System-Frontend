import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button, Pressable, onPress } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home'
import CID from './screens/CodeInTheDark'
import VChampionship from './screens/ValorantChampionship'

export default function MyStack() {
const Stack = createNativeStackNavigator();
const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Please scan something...')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted')
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log('type=' + type + 'data=' + data )
  
  }

  //check permission
if(hasPermission === null) {
  return(
    <View style={styles.container}>
    <Text>Request to Open Camera</Text>
    </View>
  )
}
if(hasPermission === false) {

return(
  <View style={styles.container}>
  <Text style= {{ margin: 10 }}>No Access to Camera</Text>
  <Button  
      title={"Allow Camera"}
      color="#5837D0"
      onPress={() => askForCameraPermission()} />
  </View>
)
}
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        
        <Stack.Screen name="CodeInTheDark" component={CID} />
        <Stack.Screen name="ValorantChampionship" component={VChampionship} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

}
