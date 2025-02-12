import { View, ActivityIndicator } from "react-native";

export function Loading() {
    return (
        <View className="flex-1 w-full justify-center items-center bg-gray-400">
            <ActivityIndicator size="large" className="text-purple-base" />
        </View>
    );
}