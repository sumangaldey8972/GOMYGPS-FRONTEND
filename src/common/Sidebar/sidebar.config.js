
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DevicesIcon from '@mui/icons-material/Devices';

export const sidebarList = [
    {
        title: 'Manufacture',
        icon: <AccountBoxIcon />,
        path: '/manufacture'
    },
    {
        title: 'Order',
        icon: <ShoppingCartIcon />,
        path: '/order'
    },
    {
        title: 'Devices',
        icon: <DevicesIcon />,
        path: '/devices'
    }
]