import { Dispatch, SetStateAction } from 'react';
import { Modal as ReactNativeModal, TouchableOpacity, View, Text } from 'react-native';
import { Check } from 'lucide-react-native';

type ModalProps = {
    isModalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    title: string;
    description: string;
}

export default function Modal({ isModalVisible, setModalVisible, title, description }: ModalProps) {
    return (
        <ReactNativeModal
            animationType='fade'
            transparent={true}
            visible={isModalVisible}
            statusBarTranslucent
            onRequestClose={() => setModalVisible(false)}
        >  
            <View className='flex-1 bg-black/50 items-center justify-center dark:bg-black/80'>
                <View className='w-[355px] h-[225px] py-7 px-6 justify-between bg-gray-400 rounded-lg dark:bg-gray-90 dark:border-[0.1px] dark:border-white'>
                    <Text className='font-bold text-[20px] text-gray-200 mt-[-10px] ml-[-2px] dark:text-white'>{title}</Text>
                    <Text className='font-regular text-md text-gray-200 text-center px-7 dark:text-white'>{description}</Text>
                    
                    <View className='flex-row justify-center w-full'>
                        <TouchableOpacity className='flex-row items-center justify-center gap-3 py-4 w-40 bg-purple-base rounded-md' onPress={() => setModalVisible(false)}>
                            <Check color="white"/>
                            <Text className='font-bold text-md text-white'>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>    
        </ReactNativeModal>
    );
}