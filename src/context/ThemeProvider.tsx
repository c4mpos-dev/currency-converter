import { createContext, useContext, useState } from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [theme, setTheme] = useState(colorScheme || "light");

    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setColorScheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <View className={theme}>{children}</View> 
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}