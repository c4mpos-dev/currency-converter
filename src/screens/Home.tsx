import { useState } from "react";
import { Text, View, Image, TextInput, ActivityIndicator, TouchableOpacity, StatusBar, Switch, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import { ArrowDownUp, MoveRight, Sun, Moon } from "lucide-react-native";

import logo from "@assets/logo.png";

import Divider from "@components/Divider";
import Modal from "@components/Modal";

import { useTheme } from "@context/ThemeProvider";

export default function Home() {
    const [borderStyleTopInput, setBorderStyleTopInput] = useState("border border-gray-300");

    const currencies = [
        { simbol: "R$", code: "BRL", flag: "🇧🇷", name: "Real brasileiro" },
        { simbol: "$", code: "USD", flag: "🇺🇸", name: "Dólar americano" },
        { simbol: "€", code: "EUR", flag: "🇪🇺", name: "Euro" },
        { simbol: "£", code: "GBP", flag: "🇬🇧", name: "Libra esterlina" },
        { simbol: "CHF", code: "CHF", flag: "🇨🇭", name: "Franco suíço" },
        { simbol: "¥", code: "JPY", flag: "🇯🇵", name: "Iene japonês" },
        { simbol: "$", code: "CAD", flag: "🇨🇦", name: "Dólar canadense" },
        { simbol: "¥", code: "CNY", flag: "🇨🇳", name: "Yuan chinês" },
        { simbol: "₹", code: "INR", flag: "🇮🇳", name: "Rupia indiana" }
    ];
    
    const [selectedCurrencyTop, setSelectedCurrencyTop] = useState(currencies[1]); // USD PADRÃO
    const [selectedCurrencyBottom, setSelectedCurrencyBottom] = useState(currencies[0]); // BRL PADRÃO

    const [inputValue, setInputValue] = useState(''); // Valor digitado
    const [convertedValue, setConvertedValue] = useState(''); // Valor convertido

    const [isModalVisible, setModalVisible] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [descriptionModal, setDescriptionModal] = useState('');

    const [loading, setLoading] = useState(false);

    const { theme, toggleTheme } = useTheme();
    const colorFixed = theme === "dark" ? "#FFF" : "#0F172A";

    async function handleConversion() {
        if (!inputValue) {
            setTitleModal("Campo vazio")
            setDescriptionModal("Informe um valor a ser convertido.")
            setModalVisible(true);
            return;
        }

        try {
            setLoading(true);

            const codeToCode = `${selectedCurrencyTop.code}-${selectedCurrencyBottom.code}`;
            const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${codeToCode}`);
            const data = await response.json();

            const rateKey = `${selectedCurrencyTop.code}${selectedCurrencyBottom.code}`;
            const rate = parseFloat(data[rateKey]?.bid); // Pega a taxa de venda (bid)

            if (!rate) {
                setTitleModal("Erro")
                setDescriptionModal("Taxa de câmbio não encontrada.")
                setModalVisible(true);
                return;
            }

            // Conversion
            const result = (parseFloat(inputValue) * rate).toFixed(3);
            setConvertedValue(result);

        } catch (error) {
            setTitleModal("Erro")
            setDescriptionModal("Falha ao buscar dados de conversão.")
            setModalVisible(true);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center bg-gray-400 dark:bg-gray-80">
            <StatusBar 
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor="transparent"
                translucent
            />

            <Image source={logo} className="w-[140px] h-[32px] mt-[30px]"/>
            
            <TouchableOpacity 
                onPress={toggleTheme} 
                className="p-3 rounded-full bg-purple-base ml-auto mr-5 mt-[-37px] mb-10"
            >
                {theme === "dark" ? <Moon color="white" size={24} /> : <Sun color="white" size={24} />}
            </TouchableOpacity>
            
            {/* MODAL */}
            <Modal  
                isModalVisible={isModalVisible} 
                setModalVisible={setModalVisible} 
                title={titleModal}
                description={descriptionModal}
            />

            <ScrollView contentContainerStyle={{flexGrow: 1, width: "100%", alignItems: "center"}} fadingEdgeLength={50}>
                {/* QUADRADO PRINCIPAL */}
                <View className="flex-1 w-full justify-center px-[20px] mb-[140px]">
                    {/* DESCRIÇÃO DA CONVERSÃO */}
                    <View className="flex-row items-center justify-center gap-4 mb-5">
                        <Text className="font-bold text-md text-gray-100 dark:text-white">{selectedCurrencyTop.name}</Text>
                        <MoveRight color={colorFixed}/>
                        <Text className="font-bold text-md text-gray-100 dark:text-white">{selectedCurrencyBottom.name}</Text>
                    </View>

                    <View className="w-full px-[24px] py-[40px] bg-white shadow-xl shadow-black/50 rounded-xl dark:bg-gray-90 dark:shadow-white/70 dark:border-[0.1px] dark:border-white">
                        {/* TITULO e SUBTITULO */}
                        <View className="gap-[8px]">
                            <Text className="text-md font-semibold text-gray-100 dark:text-white">Conversor de moedas</Text>
                            <Text className="text-sm font-regular text-gray-200 dark:text-gray-400">
                                Digite o valor e escolha as moedas de conversão
                            </Text>
                        </View>
                        
                        <View className="w-full mt-[40px] items-center">
                            {/* INPUT */}
                            <View className={`w-full h-[56px] py-[16px] pl-[16px] rounded-xl flex-row items-center ${borderStyleTopInput}`}>
                                <Text className="dark:text-white">{selectedCurrencyTop.simbol}</Text>

                                <TextInput
                                    className="flex-1 h-[56px] font-regular color-gray-100 text-[15px] ml-1 dark:text-white"
                                    placeholder="Digite um valor"
                                    placeholderTextColor={colorFixed}
                                    keyboardType="numeric"
                                    value={inputValue}
                                    onChangeText={(text) => {
                                        setInputValue(text);
                                    }}
                                    onFocus={() => setBorderStyleTopInput("border-[1.5px] border-purple-base")}
                                    onBlur={() => setBorderStyleTopInput("border border-gray-300")}
                                />
                
                                <Divider />

                                <SelectDropdown
                                    data={currencies}
                                    defaultValue={selectedCurrencyTop}
                                    dropdownStyle={{ borderRadius: 10, marginTop: -30, height: 160 }}
                                    onSelect={(selectedItem) => {
                                        setSelectedCurrencyTop(selectedItem);
                                        setInputValue('');
                                        setConvertedValue('');
                                    }}
                                    renderButton={(selectedItem) => (
                                        <View className="flex-row items-center justify-center h-[56px] w-[112px] rounded-xl">
                                            <Text>{selectedItem?.flag ?? "🌎"}</Text>
                                            <Text className="ml-2 text-[15px] dark:text-white">{selectedItem?.code ?? "Selecione"}</Text>
                                        </View>
                                    )}
                                    renderItem={(item) => (
                                        <View className="flex-row items-center justify-center h-[35px]">
                                            <Text>{item.flag}</Text>
                                            <Text className="ml-2 text-[15px]">{item.code}</Text>
                                        </View>
                                    )}
                                />
                            </View>

                            {/* BUTTON */}
                            <View className="mt-[16px] mb-[16px]">
                                <TouchableOpacity 
                                    className={`flex-row h-[40px] w-[150px] px-3 my-[5px] items-center shadow-lg shadow-black/80 rounded-xl ${loading ? 'bg-purple-500' : 'bg-purple-base'}`}
                                    disabled={loading} 
                                    onPress={handleConversion}
                                >
                                    { loading ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        <ArrowDownUp color="white" size={20} />
                                    )}
                                    <Text className="text-white font-bold ml-[15px]">Converter</Text>
                                </TouchableOpacity>
                            </View>

                            {/* RESULT */}
                            <View className={`w-full h-[56px] py-[16px] pl-[16px] rounded-xl flex-row items-center border border-gray-300`}>
                                <Text className="dark:text-white">{selectedCurrencyBottom.simbol}</Text>

                                <Text className="flex-1 font-regular color-gray-100 text-[15px] ml-2 dark:text-white">
                                    { convertedValue ? convertedValue : "Resultado" }
                                </Text>

                                <Divider />

                                <SelectDropdown
                                    data={currencies}
                                    defaultValue={selectedCurrencyBottom}
                                    dropdownStyle={{ borderRadius: 10, marginTop: -30, height: 160 }}
                                    onSelect={(selectedItem) => {
                                        setSelectedCurrencyBottom(selectedItem);
                                        setInputValue('');
                                        setConvertedValue('');
                                    }}
                                    renderButton={(selectedItem) => (
                                        <View className="flex-row items-center justify-center h-[56px] w-[112px] rounded-xl">
                                            <Text>{selectedItem?.flag ?? "🌎"}</Text>
                                            <Text className="ml-2 text-[15px] dark:text-white">{selectedItem?.code ?? "Selecione"}</Text>
                                        </View>
                                    )}
                                    renderItem={(item) => (
                                        <View className="flex-row items-center justify-center h-[35px]">
                                            <Text>{item.flag}</Text>
                                            <Text className="ml-2 text-[15px]">{item.code}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>    
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
