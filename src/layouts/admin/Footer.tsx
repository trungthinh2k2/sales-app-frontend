import { Box, useColorScheme } from "@mui/material"
import { ButtonPrimaryGrandient } from "../../components/common/ButtonGrandient";

const Footer = () => {
    const { mode, setMode } = useColorScheme();
    return (
        <Box sx={{ backgroundColor: "primary.dark", bottom:0, height: 100 }}>
            Footer

            <ButtonPrimaryGrandient
                onClick={() => {
                    setMode(mode === 'light' ? 'dark' : 'light');
                }}
            >
                {mode === 'light' ? 'Turn dark' : 'Turn light'}
            </ButtonPrimaryGrandient>
        </Box>
    )
}

export default Footer;
