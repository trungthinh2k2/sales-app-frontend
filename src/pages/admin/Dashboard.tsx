import { Box } from "@mui/material";
import CardGradientBackground, { CardGradientProps } from "../../components/admin/cards/CardGradientBackground";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { InsertChart } from "@mui/icons-material";
import CardContent, { CardContentProps } from "../../components/admin/cards/CardContent";

type CardItem = CardContentProps & CardGradientProps;

const Dashboard = () => {

    const cards: CardItem[] = [
        {
            color: "blue",
            icon: <InsertChart />,
            content: {
                text: "15000",
                icon: <AttachMoneyIcon />
            },
            title: "Hello"
        },
        {
            color: "green",
            icon: <InsertChart />,
            content: {
                text: "15000",
                icon: <AttachMoneyIcon />
            },
            title: "Hello"
        },
        {
            color: "pink",
            icon: <InsertChart />,
            content: {
                text: "15000",
                icon: <AttachMoneyIcon />
            },
            title: "Hello"
        },
    ]

    return (
        <Box sx={{
            display: "flex", width: "100%", justifyContent: "space-between",
            flexWrap: "wrap",
            p: 2,
            pl: 3,
            pr: 3,
            gap: '16px',
            backgroundColor: "background.paper"
        }}>
            {cards.map((cardItem, index: number) => {
                return (
                    <Box sx={{
                        flexBasis: '30%',
                        flexGrow: 1,
                        flexShrink: 1,
                        height: '200px',
                    }} key={index}>
                        <CardGradientBackground color={cardItem.color}>
                            <CardContent title={cardItem.title}
                                content={cardItem.content}
                                icon={cardItem.icon} />
                        </CardGradientBackground>
                    </Box>
                )
            })}
        </Box>
    )
}
export default Dashboard;