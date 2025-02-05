import { Text, View, Image, TextInput  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArrowDownUp } from 'lucide-react-native';
import logo from "@assets/logo.png"


export default function Home() {
    return (
        <SafeAreaView className='flex-1 w-full items-center justify-center bg-gray-400'>   
            <Image source={logo} className='mt-[40px] w-[140px] h-[32px]'/>
            
            <View className='flex-1 w-full mt-[120px] px-[20px]'>
                <View className='w-full h-[340px] px-[24px] pt-[24px] pb-[28px] bg-white shadow-xl shadow-black/50 rounded-xl'>
                    <View className='gap-[8px]'>
                        <Text className='text-md font-semibold text-gray-100'>Conversor de moedas</Text>
                        <Text className='text-sm font-regular text-gray-200'>Digite o valor e escolha as moedas de conversão</Text>
                    </View>

                    <View className='w-full mt-[40px] items-center'>
                        <View className='w-full h-[56px] rounded-xl border border-gray-100'>
                            
                        </View>
                        
                        <View className='mt-[16px] mb-[16px]'>
                            <ArrowDownUp color="#0F172A"/>
                        </View>

                        <View className='w-full h-[56px] rounded-xl border border-gray-100'>

                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}