import { Box, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { adminMenu } from "../common/Menu";

type AdminLayoutProps = {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <Box sx={{ display: "flex", flexDirection: "column", }}>
            
            <Box sx={{ display: "flex" }}>
                {isMobile ? <></> : <Navbar items={adminMenu}></Navbar>}
                <Box sx={{
                    display: 'flex', flexDirection: 'column',

                    flex: 1, borderLeft: '1px solid #e4e4e4'
                }}>
                    <Header></Header>
                    <Box sx={{ flex: 1 }}>{children}</Box>
                    <Footer></Footer>
                </Box>
            </Box>
            
        </Box>
    )
}

export default AdminLayout;