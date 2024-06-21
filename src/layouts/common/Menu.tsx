import { BackupTable, Equalizer, Home } from "@mui/icons-material";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const adminMenu = [
    {
        title: 'Dashboard',
        icon: <Home/>,
        href: '/admin/dashboard'
    },
    {
        title: 'Sản phẩm',
        icon: <LocalMallIcon/>,
        href: '/admin/products',
        child: [
            {
                title: 'Thêm sản phẩm',
                icon: <AddIcon fontSize={"small"}/>,
                href: '/admin/products/create'
            },
            {
                title: 'Danh sách sản phẩm',
                icon: <AddIcon fontSize={"small"}/>,
                href: '/admin/products'
            },
            {
                title: 'Loại sản phẩm',
                icon: <AddIcon fontSize={"small"}/>,
                href: '/admin/products/categories'
            },
            {
                title: 'Nhà cung cấp',
                icon: <AddIcon fontSize={"small"}/>,
                href: '/admin/products/providers'
            }
        ]
    },
    {
        title: 'Khách hàng',
        icon: <GroupIcon/>,
        href: '/admin/dashboard/1'
    },
    {
        title: 'Hóa đơn',
        icon: <BackupTable/>,
        href: '/admin/dashboard/1'
    },
    {
        title: 'Tin nhắn',
        icon: <MessageIcon/>,
        href: '/admin/dashboard/1'
    },
    {
        title: 'Khuyến mãi',
        icon: <BookmarkIcon/>,
        href: '/admin/dashboard/1'
    },
    {
        title: 'Thống kê',
        icon: <Equalizer/>,
        href: '/admin/dashboard/1'
    }
]

export const userMenu = [
    {
        title: 'Trang chủ',
        href: '/home'
    },
    {
        title: 'Sản phẩm',
        href: '/products'
    },
    {
        title: 'Khuyến mãi',
        href: '/promotions'
    },
    {
        title: 'Thương hiệu',
        href: '/brands'
    },
    {
        title: 'Giới thiệu',
        href: '/about'
    }

]