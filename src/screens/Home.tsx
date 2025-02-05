import { useState } from 'react';
import { Text, View, Image, TextInput  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArrowDownUp } from 'lucide-react-native';
import logo from "@assets/logo.png"

import Divider from '@components/Divider';


import SelectDropdown from 'react-native-select-dropdown';

export default function Home() {
    const [borderStyle, setBorderStyle] = useState("border border-gray-300");
    
    const currencies = [
        { code: "BRL", flag: "🇧🇷" },
        { code: "USD", flag: "🇺🇸" },
        { code: "EUR", flag: "🇪🇺" },
        { code: "GBP", flag: "🇬🇧" },
        { code: "CHF", flag: "🇨🇭" },
        { code: "JPY", flag: "🇯🇵" },
        { code: "CAD", flag: "🇨🇦" },
        { code: "CNY", flag: "🇨🇳" },
        { code: "INR", flag: "🇮🇳" }
      ];

    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

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
                        <View className={`w-full h-[56px] py-[16px] pl-[16px] rounded-xl flex-row items-center ${borderStyle}`}>
                            <TextInput 
                                className='flex-1 h-[56px] font-regular color-gray-100 text-[15px]'
                                placeholder='R$ 1.000,00'
                                placeholderTextColor="#0F172A"
                                // onChangeText={setTaskName}
                                // value={taskName}
                                onFocus={() => setBorderStyle("border-[1.5px] border-purple-base")}
                                onBlur={() => setBorderStyle("border border-gray-300")}
                            />

                            <Divider />

                            <SelectDropdown
                                data={currencies}
                                defaultValue={selectedCurrency}
                                dropdownStyle={{borderRadius: 10, marginTop: -30, height: 200}}
                                onSelect={(selectedItem) => setSelectedCurrency(selectedItem)}
                                renderButton={(selectedItem) => (
                                    <View className='flex-row items-center justify-center h-[56px] w-[112px] rounded-xl'>
                                        <Text>{selectedItem?.flag ?? "🌎"}</Text>
                                        <Text className='ml-2 text-[15px]'>{selectedItem?.code ?? "Selecione"}</Text>
                                    </View>
                                )}
                                renderItem={(item) => (
                                    <View className='flex-row items-center justify-center h-[35px]'>
                                        <Text>{item.flag}</Text>
                                        <Text className='ml-2 text-[15px]'>{item.code}</Text>
                                    </View>
                                )}
                            />
                        </View>
                        
                        <View className='mt-[16px] mb-[16px]'>
                            <ArrowDownUp color="#0F172A"/>
                        </View>

                        <View className='w-full h-[56px] p-[16px] rounded-xl border border-gray-300'>
                            <Divider />
                        </View>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}