import { Button, styled } from "@mui/material";
import { primaryGradient, secondaryGradient } from "../../theme";

export const ButtonPrimaryGrandient = styled(Button)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    ":hover": {
        background: primaryGradient,
        color: "white",
        cursor: "pointer",
    }
})

export const ButtonSecondaryGrandient = styled(Button)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    ":hover": {
        background: secondaryGradient,
        color: "white",
        cursor: "pointer",
    }
})
