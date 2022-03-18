import { createContext, useState, useEffect } from "react";

export interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const getInitialTheme = (): string => {
    if (typeof window !== "undefined" && window.localStorage) {
        const storedPrefs = window.localStorage.getItem("color-theme");
        if (typeof storedPrefs === "string") {
            return storedPrefs;
        }

        const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
        if (userMedia.matches) {
            return "dark";
        }
        return "light" // light theme as the default;
    };
    return "light"
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: getInitialTheme(),
    setTheme: () => { }
});

export interface ThemeProviderProps {
    initialTheme: string;
    children: React.ReactNode
}


export const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<string>(getInitialTheme);

    const rawSetTheme = (rawTheme: string) => {
        const root = window.document.documentElement;
        const isDark = rawTheme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(rawTheme);

        localStorage.setItem('color-theme', rawTheme);
        window.dispatchEvent(new Event('storage'))
    };

    useEffect(() => {
        rawSetTheme(theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};