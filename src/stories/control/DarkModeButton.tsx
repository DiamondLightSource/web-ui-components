import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export interface DarkModeButtonProps extends Omit<IconButtonProps, "aria-label"> { }

const DarkModeButton = ({ ...props }: DarkModeButtonProps) => {
    const { toggleColorMode } = useColorMode()

    const label = useColorModeValue('Light Mode', 'Dark Mode')
    const icon = useColorModeValue(<SunIcon color={'#2b2b2b'} />, <MoonIcon color={'white'} />)

    return (
        <IconButton
            aria-label={label}
            icon={icon}
            onClick={toggleColorMode}
            {...props}
        />
    )
}

export { DarkModeButton }
