import { useState } from "react";
import { Text, View, Image, TextInput, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowDownUp } from "lucide-react-native";
import logo from "@assets/logo.png";
import Divider from "@components/Divider";
import SelectDropdown from "react-native-select-dropdown";

export default function Home() {
    const [borderStyleTopInput, setBorderStyleTopInput] = useState("border border-gray-300");

    const currencies = [
        { simbol: "R$", code: "BRL", flag: "🇧🇷" }, // Real brasileiro
        { simbol: "$", code: "USD", flag: "🇺🇸" }, // Dólar americano
        { simbol: "€", code: "EUR", flag: "🇪🇺" }, // Euro
        { simbol: "£", code: "GBP", flag: "🇬🇧" }, // Libra esterlina
        { simbol: "CHF", code: "CHF", flag: "🇨🇭" }, // Franco suíço
        { simbol: "¥", code: "JPY", flag: "🇯🇵" }, // Iene japonês
        { simbol: "$", code: "CAD", flag: "🇨🇦" }, // Dólar canadense
        { simbol: "¥", code: "CNY", flag: "🇨🇳" }, // Yuan chinês
        { simbol: "₹", code: "INR", flag: "🇮🇳" } // Rupia indiana
    ];
    
    const [selectedCurrencyTop, setSelectedCurrencyTop] = useState(currencies[1]); // USD padrão
    const [selectedCurrencyBottom, setSelectedCurrencyBottom] = useState(currencies[0]); // BRL padrão

    const [inputValue, setInputValue] = useState(""); // Valor digitado
    const [convertedValue, setConvertedValue] = useState(""); // Valor convertido
    const [loading, setLoading] = useState(false);

    // Função que faz a conversão diretamente após carregar as taxas
    const handleConversion = async () => {
        if (!inputValue) {
            Alert.alert("Campo vazio", "Digite um valor a ser convertido.");
            return;
        }

        try {
            setLoading(true);

            // Requisição da API para obter as taxas
            const codeToCode = `${selectedCurrencyTop.code}-${selectedCurrencyBottom.code}`;
            const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${codeToCode}`);
            const data = await response.json();

            const rateKey = `${selectedCurrencyTop.code}${selectedCurrencyBottom.code}`; // Ex: "USDBRL"
            const rate = parseFloat(data[rateKey]?.bid); // Pega a taxa de venda (bid)

            if (!rate) {
                Alert.alert("Erro", "Taxa de câmbio não encontrada.");
                setConvertedValue("");
                return;
            }

            // Fazendo a conversão
            const result = (parseFloat(inputValue) * rate).toFixed(2);
            setConvertedValue(result);

        } catch (error) {
            console.error("Erro durante a conversão:", error);
            Alert.alert("Erro", "Falha ao buscar dados de conversão.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center bg-gray-400">
            <Image source={logo} className="mt-[40px] w-[140px] h-[32px]" />

            <View className="flex-1 w-full mt-[120px] px-[20px]">
                <View className="w-full px-[24px] py-[40px] bg-white shadow-xl shadow-black/50 rounded-xl">
                    <View className="gap-[8px]">
                        <Text className="text-md font-semibold text-gray-100">Conversor de moedas</Text>
                        <Text className="text-sm font-regular text-gray-200">
                            Digite o valor e escolha as moedas de conversão
                        </Text>
                    </View>

                    
                    <View className="w-full mt-[40px] items-center">
                        {/* INPUT */}
                        <View className={`w-full h-[56px] py-[16px] pl-[16px] rounded-xl flex-row items-center ${borderStyleTopInput}`}>
                            <Text>{selectedCurrencyTop.simbol}</Text>

                            <TextInput
                                className="flex-1 h-[56px] font-regular color-gray-100 text-[15px] ml-1"
                                placeholder="Digite um valor"
                                placeholderTextColor="#0F172A"
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
                                    setSelectedCurrencyTop(selectedItem)
                                }}
                                renderButton={(selectedItem) => (
                                    <View className="flex-row items-center justify-center h-[56px] w-[112px] rounded-xl">
                                        <Text>{selectedItem?.flag ?? "🌎"}</Text>
                                        <Text className="ml-2 text-[15px]">{selectedItem?.code ?? "Selecione"}</Text>
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
                                className="flex-row h-[40px] w-[150px] px-3 my-[5px] bg-purple-base items-center shadow-lg shadow-black/80 rounded-xl"
                                onPress={handleConversion} // Chama a função que faz a conversão
                                disabled={loading} // Desabilita o botão quando está carregando
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
                            <Text className="font-regular">{selectedCurrencyBottom.simbol}</Text>

                            <Text className="flex-1 font-regular color-gray-100 text-[15px] ml-2">
                                { convertedValue ? convertedValue : "Resultado" }
                            </Text>

                            <Divider />

                            <SelectDropdown
                                data={currencies}
                                defaultValue={selectedCurrencyBottom}
                                dropdownStyle={{ borderRadius: 10, marginTop: -30, height: 160 }}
                                onSelect={(selectedItem) => {
                                    setSelectedCurrencyBottom(selectedItem);
                                }}
                                renderButton={(selectedItem) => (
                                    <View className="flex-row items-center justify-center h-[56px] w-[112px] rounded-xl">
                                        <Text>{selectedItem?.flag ?? "🌎"}</Text>
                                        <Text className="ml-2 text-[15px]">{selectedItem?.code ?? "Selecione"}</Text>
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
        </SafeAreaView>
    );
}
