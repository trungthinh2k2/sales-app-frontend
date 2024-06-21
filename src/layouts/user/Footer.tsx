import { Box, useColorScheme } from "@mui/material"
import ButtonGrandient from "../../components/common/ButtonGrandient";

const Footer = () => {
    const { mode, setMode } = useColorScheme();
    return (
        <Box sx={{ backgroundColor: "primary.dark", bottom:0, height: 100 }}>
            Footer

            <ButtonGrandient
                onClick={() => {
                    setMode(mode === 'light' ? 'dark' : 'light');
                }}
            >
                {mode === 'light' ? 'Turn dark' : 'Turn light'}
            </ButtonGrandient>
        </Box>
    )
}

export default Footer;
