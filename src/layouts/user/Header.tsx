import { AppBar, Badge, Box, Drawer, ListItemButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import SearchInput from "../../components/admin/search-input/SearchInput";
import IconButtonGradient from "../../components/common/IconButtonGradient";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Notifications } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { primaryGradient } from "../../theme";
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from "../admin/Navbar";
import { useState } from "react";
import logoIcon from "../../assets/logo/Logo-Owen.png";
import { userMenu } from "../common/Menu";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";



const Header = () => {
    const location = useLocation();
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const isMedium: boolean = useMediaQuery('(max-width:1150px)');
    const [open, setOpen] = useState(false);
    const cart = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <NavBar items={userMenu}></NavBar>
    );


    return (
        <AppBar elevation={0} color="secondary" sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'column',
            padding: '10px',
            pl: isMobile ? 1 : 6,
            pr: isMobile ? 2 : 6,
            backgroundColor: "background.paper"
        }}>
            <Box sx={{ display: 'flex', height: '250px', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <img src={logoIcon} alt={"logo"} style={{ width: "10%", height: '5%' }} />
                <Box sx={{ flex: isMobile ? 1 : '', display: 'flex', alignItems: 'center' }}>
                    {isMedium || isMobile ? <Box>
                        <IconButtonGradient onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButtonGradient>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </Box> : <></>}
                </Box>

                {!isMobile && <Box sx={{display: 'flex', width: '60%' }}>
                    <SearchInput placeHolder="Nhập sản phẩm cần tìm ..." />
                </Box>}
                <Box sx={{
                    display: 'flex',
                    gap: '15px',
                }}>
                    <Tooltip title="giỏ hàng" onClick={()=> navigate('/cart')}>
                        <IconButtonGradient>
                            <Badge badgeContent={cart.length} color="primary">
                                <ShoppingCartIcon fontSize="small" />
                            </Badge>
                        </IconButtonGradient>
                    </Tooltip>
                    <Tooltip title="thông báo">
                        <IconButtonGradient>
                            <Badge badgeContent={4} color="primary">
                                <Notifications fontSize="small" />
                            </Badge>
                        </IconButtonGradient>
                    </Tooltip>
                    <Tooltip title="tài khoản">
                        <IconButtonGradient>
                            <AccountCircleIcon />
                        </IconButtonGradient>
                    </Tooltip>
                </Box>
            </Box>
            <Box>
                {!isMobile && !isMedium ? <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: 'yellow',
                }}>
                    {userMenu.map((item: any, index: number) => (
                        <ListItemButton key={index} component={Link} to={item.href} sx={{
                            display: "flex",
                            ':hover': {
                                background: primaryGradient,
                                color: 'white'
                            },
                            background: location.pathname.startsWith(item.href) ? primaryGradient : 'none',
                            color: location.pathname.startsWith(item.href) ? 'white' : 'none',
                            textDecoration: 'none',
                            pl: 1, pr: 1,

                        }}>
                            <Typography>{item.title}</Typography>
                        </ListItemButton>
                    ))}
                </Box> : <></>}
            </Box>



        </AppBar>
    )
}

export default Header;