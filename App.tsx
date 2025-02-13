import { View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

import "./global.css";
import { ThemeProvider } from '@context/ThemeProvider';

import { Loading } from '@components/Loading';
import Home from "@screens/Home";

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold });

  return (
      <View className='flex-1 items-center justify-center'>
        <ThemeProvider>
          {fontsLoaded ? <Home/> : <Loading/>}
        </ThemeProvider>
      </View>
    
  );
}