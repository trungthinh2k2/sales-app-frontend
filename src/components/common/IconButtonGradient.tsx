import {styled, IconButton } from "@mui/material";
import { primaryGradient } from "../../theme";

const IconButtonGradient = styled(IconButton)( {
    ":hover": {
        background: primaryGradient,
        color: "white",
        transition: "background 0.3s ease-in-out",
    }
})

export default IconButtonGradient;