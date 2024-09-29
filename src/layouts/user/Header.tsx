import { AppBar, Avatar, Badge, Box, Drawer, ListItemButton, Menu, MenuItem, Tooltip, Typography, useMediaQuery } from "@mui/material";
import SearchInput from "../../components/admin/search-input/SearchInput";
import IconButtonGradient from "../../components/common/IconButtonGradient";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Notifications } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { primaryGradient } from "../../theme";
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from "../admin/Navbar";
import { useEffect, useState } from "react";
import logoIcon from "../../assets/logo/Logo-Owen.png";
import { userMenu } from "../common/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getUserFromLocalStorage, isLoginAccount, removeLocalStorage } from "../../services/user.service";
import { UserModel } from "../../models/user.model";
import { ButtonPrimaryGrandient } from "../../components/common/ButtonGrandient";
import { LoginResponse } from "../../dtos/responses/login-response";
import { getToken } from "../../services/token.service";
import { logout } from "../../services/auth.service";
import { getCartLocalStorage } from "../../utils/cart-handle";



const Header = () => {
    const location = useLocation();
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const isMedium: boolean = useMediaQuery('(max-width:1150px)');
    const [open, setOpen] = useState(false);
    const cart = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();
    const login: boolean = isLoginAccount();
    const user: UserModel | null = getUserFromLocalStorage();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const openE2 = Boolean(anchorE2);


    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = async () => {
        const token: LoginResponse | null = getToken();
        if (token) {
            try {
                await logout(token.accessToken);
                removeLocalStorage();
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    }

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
            <Box sx={{ display: 'flex', height: '250px', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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

                {!isMobile && <Box sx={{ display: 'flex', width: '60%' }}>
                    <SearchInput placeHolder="Nhập sản phẩm cần tìm ..." />
                </Box>}
                <Box sx={{
                    display: 'flex',
                    gap: '15px',
                }}>
                    <Tooltip title="giỏ hàng" onClick={() => navigate('/cart')}>
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
                    {login ? <>
                        <Tooltip title={user ? user.name : "tài khoản"}>
                            <IconButtonGradient onClick={handleClickAvatar}>
                                <Avatar alt={user?.name} src={user?.avatarUrl} sx={{
                                    width: 23,
                                    height: 23,
                                }} />
                                <></>
                            </IconButtonGradient>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem>Thông tin cá nhân</MenuItem>
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                        </Menu>
                    </>
                        : <ButtonPrimaryGrandient variant="contained"
                            onClick={() => {
                                localStorage.setItem("historyPath", location.pathname);
                                navigate('/auth/login', { state: { from: location.pathname } });
                            }}
                        >Đăng nhập</ButtonPrimaryGrandient>}
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