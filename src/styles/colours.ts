const colours = {
  diamond: {
    50: { default: "#FBFBFB", _dark: "#525151" },
    75: { default: "#F7F7F7", _dark: "#080808" },
    100: { default: "#E7ECEF", _dark: "#383838" },
    200: { default: "#CBD5E0", _dark: "#030303" },
    300: { default: "#39435E", _dark: "#5f709e" },
    400: { default: "#9BBBFA", _dark: "#030405" },
    500: { default: "#fcd021", _dark: "#050401" },
    600: { default: "#385BBD", _dark: "#101a36" },
    700: { default: "#1040A1", _dark: "#071d4a" },
    800: { default: "#001d55", _dark: "#023496" },
  },
};

const fillColours = ["#ff5733", "#19D3FF", "#FF9B40", "#FF2677", "#FF9B40"];

const getFillColour = (j: number) => fillColours[j % fillColours.length];

export { colours, getFillColour };
