import { Dimensions } from "react-native";
//import { StyleSheet, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    // primary: "#FC6D3F", // orange
    // secondary: "#CDCDD2",   // gray

    primary: "#FFFFFF",
    secondary: "#e5e7eb",

    // colors maim flow
    black: "#1E1F20",
    white: "#FFFFFF",
    tertiary: "#1f2937",
    darklight: "#9ca3af",
    //brand: "#5c0381",
    //orange: "#cf6006",
    yellow: "#FFD700",
    green: "#10b981",
    red: "#ef4444",



    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',

    //bang mau 2
    tim1: "#a29bfe",
    brand: "#6c5ce7",
    cam1: "#fab1a0",
    orange: "#e17055",
    xam1: "#dfe6e9",
    xam2: "#b2bec3",
    xam3: "#636e72",
    xam4: "#2d3436",
    do1: "#ff7675",
    do2: "#d63031",
    vang1: "#ffeaa7",
    vang2: "#fdcb6e",

};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

// export const FONTS = {
//     largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
//     h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
//     h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
//     h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
//     h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
//     body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
//     body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
//     body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
//     body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
//     body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
// };

const appTheme = { COLORS, SIZES };

export default appTheme;