import { StatusBar, Text, View } from 'react-native';

import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import "./global.css";

import Home from "@screens/Home";

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold });

  return (
    <View className='flex-1 items-center justify-center'>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Home/> : <Home/>}
    </View>
  );
}