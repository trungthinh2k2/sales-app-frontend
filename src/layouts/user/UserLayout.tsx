import { Box } from "@mui/material"
import Footer from "../admin/Footer"
import { ReactNode } from "react";
import Header from "./Header";

type UserLayoutProps = {
    children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: '100vh'}}>
            <Box><Header /></Box>
            <Box sx={{flex: 1, marginTop: '120px'}}>
                {children}
            </Box>
            <Box sx={{ height: '60px'}}><Footer></Footer></Box>
        </Box>
    )
}

export default UserLayout;