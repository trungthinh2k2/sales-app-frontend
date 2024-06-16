import { Button, styled } from "@mui/material";
import { primaryGradient } from "../../theme";

const ButtonGrandient = styled(Button)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    ":hover": {
        background: primaryGradient,
        color: "white",
        cursor: "pointer",
    }
})

export default ButtonGrandient;