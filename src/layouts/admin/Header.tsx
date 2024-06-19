import { Badge, Box, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButtonGradient from "../../components/common/IconButtonGradient";
import { useState } from "react";
import Navbar from "./Navbar";
import SearchInput from "../../components/admin/search-input/SearchInput";

const Header = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Navbar ></Navbar>
    );
    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", pl: 2, pr:2  }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {isMobile
                    ? <></>
                    : <Box>
                        <SearchInput placeHolder="Nhập nội dung cần tìm ..."/>
                        
                    </Box>
                }

            </Box>
            {/* <Box sx={{ width: "20%" }}></Box> */}
            <Box sx={{ display: "flex", width: isMobile ? "40%" : "20%", alignItems: "center", justifyContent: 'space-evenly' }}>
                

                {/* <IconButtonGradient type="button" sx={{ p: '10px' }} aria-label="mail">
                    <Badge badgeContent={4} color="primary">
                        <MailIcon fontSize="small" />
                    </Badge>
                </IconButtonGradient> */}
                <IconButtonGradient type="button" sx={{ p: '10px' }} aria-label="notify">
                    <Badge badgeContent={4} color="primary">
                        <NotificationsIcon fontSize="small" />
                    </Badge>
                </IconButtonGradient>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>T</Avatar>
                {isMobile ?
                    <Box>
                        <IconButtonGradient sx={{ p: '10px' }} aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButtonGradient>
                        <Drawer
                            open={open}
                            onClose={toggleDrawer(false)}
                        >
                            {DrawerList}
                        </Drawer></Box>

                    : <></>}
            </Box>
        </Box>
    )
}

export default Header;