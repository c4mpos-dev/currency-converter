import { View, ActivityIndicator } from "react-native";

export function Loading() {
    return (
        <View className="flex-1 w-screen justify-center bg-gray-400">
            <ActivityIndicator size="large" className="text-purple-base" />
        </View>
    );
}