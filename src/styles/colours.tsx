const colours = {
  diamond: {
    50: { default: "#FBFBFB", _dark: "#525151" },
    75: "#F7F7F7",
    100: { default: "#E7ECEF", _dark: "#383838" },
    200: { default: "#CBD5E0", _dark: "#030303" },
    300: "#39435E",
    400: "#9BBBFA",
    500: "#fcd021",
    600: "#385BBD",
    700: "#1040A1",
    800: "#001d55",
  },
};

const fillColours = ["#ff5733", "#19D3FF", "#FF9B40", "#FF2677", "#FF9B40"];

const getFillColour = (j: number) => fillColours[j % fillColours.length];

export { colours, getFillColour };
