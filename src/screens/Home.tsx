import { useEffect, useState } from "react";
import { Text, View, Image, TextInput, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowDownUp } from "lucide-react-native";
import logo from "@assets/logo.png";
import Divider from "@components/Divider";
import SelectDropdown from "react-native-select-dropdown";

export default function Home() {
    const [borderStyleBottomInput, setBorderStyleBottomInput] = useState("border border-gray-300");
    const [borderStyleTopInput, setBorderStyleTopInput] = useState("border border-gray-300");

    const currencies = [
        { code: "BRL", flag: "🇧🇷" },
        { code: "USD", flag: "🇺🇸" },
        { code: "EUR", flag: "🇪🇺" },
        { code: "GBP", flag: "🇬🇧" },
        { code: "CHF", flag: "🇨🇭" },
        { code: "JPY", flag: "🇯🇵" },
        { code: "CAD", flag: "🇨🇦" },
        { code: "CNY", flag: "🇨🇳" },
        { code: "INR", flag: "🇮🇳" },
    ];

    const [selectedCurrencyTop, setSelectedCurrencyTop] = useState(currencies[0]); // USD padrão
    const [selectedCurrencyBottom, setSelectedCurrencyBottom] = useState(currencies[1]); // BRL padrão

    const [inputValue, setInputValue] = useState(""); // Valor digitado
    const [convertedValue, setConvertedValue] = useState(""); // Valor convertido
    const [exchangeRates, setExchangeRates] = useState<any>({});
    const [loading, setLoading] = useState(false);

    // Atualize o estado para aguardar a resposta da API
    const [isExchangeRatesLoaded, setIsExchangeRatesLoaded] = useState(false);

    const fetchExchangeRates = async () => {
        try {
            setLoading(true);

            const codeToCode = `${selectedCurrencyTop.code}-${selectedCurrencyBottom.code}`;
            const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${codeToCode}`);
            const data = await response.json();
            
            console.log(data);
            setExchangeRates(data);
            setIsExchangeRatesLoaded(true); // Marca a API como carregada
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setIsExchangeRatesLoaded(false); // Se houver erro, marca como não carregado
        } finally {
            setLoading(false);
        }
    };

    // UseEffect para chamar a API quando as moedas mudarem
    useEffect(() => {
        fetchExchangeRates();
    }, [selectedCurrencyTop, selectedCurrencyBottom]); // Recarrega as taxas quando as moedas mudam

    // Função de conversão que aguarda a resposta da API
    const convertCurrency = (value: string) => {
        if (!isExchangeRatesLoaded || !exchangeRates) {
            setConvertedValue(""); // Limpa o valor convertido se as taxas não estiverem carregadas
            console.log("Erro: Taxas de câmbio não carregadas ainda.");
            return;
        }

        const from = selectedCurrencyTop.code; // Moeda de origem
        const to = selectedCurrencyBottom.code; // Moeda de destino
        const rateKey = `${from}${to}`; // Ex: "USDBRL"

        console.log("Taxa buscada:", rateKey);
        console.log("Exchange Rates:", exchangeRates);

        if (!exchangeRates[rateKey]) {
            setConvertedValue(""); // Limpar o valor convertido
            console.log("Erro: Taxa não encontrada!");
            return;
        }

        // Pegando a cotação de venda (bid)
        const rate = parseFloat(exchangeRates[rateKey].bid);
        console.log("Cotação encontrada:", rate);

        if (!rate) {
            setConvertedValue("");
            console.log("Erro: bid não encontrado!");
            return;
        }

        // Fazendo a conversão
        const result = (parseFloat(value) * rate).toFixed(2);
        console.log("Valor convertido:", result);
        setConvertedValue(result);
    };

    // UseEffect para converter quando o valor do input mudar
    useEffect(() => {
        if (!inputValue || isNaN(Number(inputValue))) {
            setConvertedValue("");
            Alert.alert("Valor vazio.", "Digite um valor para ser convertido.");
            return;
        }
        if (isExchangeRatesLoaded) {
            convertCurrency(inputValue);
        }
    }, [inputValue, isExchangeRatesLoaded]); // Dispara quando o valor ou a resposta da API mudarem

    
    return (
        <SafeAreaView className="flex-1 w-full items-center justify-center bg-gray-400">
            <Image source={logo} className="mt-[40px] w-[140px] h-[32px]" />

            <View className="flex-1 w-full mt-[120px] px-[20px]">
                <View className="w-full h-[340px] px-[24px] pt-[24px] pb-[28px] bg-white shadow-xl shadow-black/50 rounded-xl">
                    <View className="gap-[8px]">
                        <Text className="text-md font-semibold text-gray-100">Conversor de moedas</Text>
                        <Text className="text-sm font-regular text-gray-200">
                            Digite o valor e escolha as moedas de conversão
                        </Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#8B5CF6" />
                    ) : (
                        <View className="w-full mt-[40px] items-center">
                            {/* Input de CIMA */}
                            <View className={`w-full h-[56px] py-[16px] pl-[16px] rounded-xl flex-row items-center ${borderStyleTopInput}`}>
                                <TextInput
                                    className="flex-1 h-[56px] font-regular color-gray-100 text-[15px]"
                                    placeholder="Digite um valor"
                                    placeholderTextColor="#0F172A"
                                    keyboardType="numeric"
                                    value={inputValue}
                                    onChangeText={(text) => {
                                        setInputValue(text);
                                        if(text != "" || isNaN(Number(text))) {
                                            convertCurrency(text);
                                        }
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

                            <View className="mt-[16px] mb-[16px]">
                                <ArrowDownUp color="#0F172A" />
                            </View>

                            {/* Input de BAIXO */}
                            <View className={`w-full h-[56px] py-[16px] pl-[16px] rounded-xl flex-row items-center ${borderStyleBottomInput}`}>
                                <TextInput
                                    className="flex-1 h-[56px] font-regular color-gray-100 text-[15px]"
                                    placeholder="Resultado"
                                    placeholderTextColor="#0F172A"
                                    keyboardType="numeric"
                                    value={convertedValue}
                                    editable={false}
                                    onFocus={() => setBorderStyleBottomInput("border-[1.5px] border-purple-base")}
                                    onBlur={() => setBorderStyleBottomInput("border border-gray-300")}
                                />

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
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}