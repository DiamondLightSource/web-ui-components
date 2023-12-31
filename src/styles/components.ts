import {
  defineStyleConfig,
  defineStyle,
  createMultiStyleConfigHelpers,
  UseToastOptions,
} from "@chakra-ui/react";
import {
  cardAnatomy,
  tabsAnatomy,
  inputAnatomy,
  numberInputAnatomy,
  selectAnatomy,
} from "@chakra-ui/anatomy";

const baseToast: UseToastOptions = {
  id: "main-toast",
  status: "success",
  duration: 6000,
  isClosable: true,
};

const baseInput = {
  field: {
    bg: "white",
    border: "solid 1px",
    borderColor: "diamond.200",
    borderRadius: 0,
  },
};

const Accordion = defineStyleConfig({
  baseStyle: {
    container: {
      border: "1px solid var(--chakra-colors-diamond-100)",
    },
  },
});

const Text = defineStyleConfig({
  variants: {
    infoGroupText: {
      wordBreak: "break-all",
      display: "inline",
      fontSize: "xs",
    },
  },
});

const Checkbox = defineStyleConfig({
  sizes: {
    sm: {
      control: {
        height: "16px",
        width: "16px",
      },
      icon: {
        height: "16px",
        fontSize: "10px",
      },
      label: {
        fontSize: "14px",
        height: "16px",
      },
    },
  },
  baseStyle: {
    control: {
      borderColor: "diamond.600",
      backgroundColor: "#FFF",
      _checked: {
        backgroundColor: "diamond.600",
        borderColor: "diamond.600",
      },
    },
  },
});

const Table = defineStyleConfig({
  variants: {
    diamondStriped: {
      tbody: {
        tr: {
          _odd: {
            bg: "diamond.100",
          },
          _even: {
            bg: "diamond.50",
          },
          _hover: {
            bg: "diamond.200",
          },
        },
      },
    },
  },
});

const CardHeader = defineStyleConfig({
  baseStyle: {
    p: "10px !important",
    h: "10%",
  },
});

const CardBody = defineStyleConfig({
  baseStyle: {
    p: 2,
    h: "90%",
  },
});

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys,
);

const baseCardStyle = definePartsStyle({
  container: {
    p: 1,
    borderWidth: "1px",
    borderRadius: "lg",
    borderColor: "diamond.200",
    _hover: {
      borderColor: "diamond.400",
      cursor: "pointer",
    },
    _selected: {
      bg: "diamond.100",
      fontWeight: "600",
      borderBottomWidth: "3px",
    },
  },
  header: {
    p: 2,
    cursor: "pointer",
    _hover: {
      color: "diamond.300",
    },
  },
  body: {
    px: 2,
    height: "90%",
  },
});

const Card = defineMultiStyleConfig({
  baseStyle: baseCardStyle,
  defaultProps: { variant: "outline" },
});

const Button = defineStyleConfig({
  defaultProps: {
    variant: "default",
  },
  baseStyle: {
    borderBottom: "2px solid rgba(0,0,0,0.2)",
  },
  variants: {
    default: {
      color: "diamond.50",
      bg: "diamond.600",
      _hover: {
        bgImage: "linear-gradient(rgb(0 0 0/30%) 0 0)",
        _disabled: {
          bg: "diamond.600",
        },
      },
    },
    pgSelected: {
      bg: "diamond.600",
      color: "diamond.50",
      cursor: "default",
    },
    pgNotSelected: {
      bg: "gray.200",
      color: "charcoal",
      fontSize: "sm",
      _hover: {
        bg: "diamond.200",
      },
    },
    onBlue: {
      color: "diamond.500",
      borderColor: "diamond.500",
      border: "1px solid",
      fontSize: "sm",
      _hover: {
        color: "diamond.300",
        bg: "diamond.500",
      },
    },
  },
});

const notFound = defineStyle({
  textAlign: "center",
  color: "diamond.300",
});

const Heading = defineStyleConfig({
  variants: {
    collection: {
      fontSize: 20,
      py: "4px",
    },
    notFound,
    notFoundSubtitle: {
      ...notFound,
      fontWeight: 200,
      fontSize: 20,
      paddingBottom: 10,
    },
  },
});

const { definePartsStyle: defineInputStyle, defineMultiStyleConfig: defineInputConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const hiContrastInput = defineInputStyle({
  field: {
    borderWidth: "1px",
    borderColor: "diamond.800",
    borderRadius: 0,
    _invalid: {
      borderColor: "red.500",
    },
  },
});

const baseInputStyle = defineInputStyle({
  ...baseInput,
  addon: {
    border: "solid 1px",
    borderColor: "diamond.200",
    background: "diamond.100",
  },
});

const Input = defineInputConfig({
  baseStyle: baseInputStyle,
  variants: { "hi-contrast": hiContrastInput, default: baseInputStyle },
  defaultProps: { variant: "default" },
});

const { defineMultiStyleConfig: defineNumberInputConfig } = createMultiStyleConfigHelpers(
  numberInputAnatomy.keys,
);

const NumberInput = defineNumberInputConfig({
  defaultProps: { variant: "default" },
  variants: { default: baseInput },
});

const { defineMultiStyleConfig: defineSelectConfig } = createMultiStyleConfigHelpers(
  selectAnatomy.keys,
);

const Select = defineSelectConfig({
  defaultProps: { variant: "default" },
  variants: { default: baseInput, "hi-contrast": hiContrastInput },
});

const { definePartsStyle: defineTabsStyle, defineMultiStyleConfig: defineTabsConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseTabsStyle = defineTabsStyle({
  tab: {
    border: "1px solid",
    borderColor: "diamond.200",
    bg: "diamond.75",
    borderBottom: "none",
    _selected: {
      bg: "diamond.50",
      color: "diamond.700",
      borderColor: "inherit",
      borderBottom: "none",
      borderTopColor: "diamond.700",
      mb: "-2px",
    },
  },
  tablist: {
    borderBottom: "none",
  },
  tabpanel: {
    p: "2",
    bg: "diamond.50",
    border: "1px solid",
    borderColor: "inherit",
  },
});

const Tabs = defineTabsConfig({
  baseStyle: baseTabsStyle,
  defaultProps: { variant: "none" },
});

const Code = defineStyleConfig({
  baseStyle: {
    backgroundColor: "diamond.100",
    color: "diamond.800",
  },
});

const Textarea = defineStyleConfig({
  variants: { "hi-contrast": hiContrastInput.field },
});

export {
  Accordion,
  Button,
  Table,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  baseToast,
  Checkbox,
  Code,
  Input,
  Textarea,
  NumberInput,
  Select,
};
