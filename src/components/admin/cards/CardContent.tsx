import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export type CardContentProps = {
    title: String,
    content: Content,
    icon: ReactNode
}

type Content = {
    text: String,
    icon?: ReactNode
}

const CardContent = ({ ...Props }: CardContentProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Box sx={{
                display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography component={"span"} variant={"h4"} sx={{ paddingLeft: '8px' }}>
                    {Props.title}
                </Typography>
                {Props.icon}
            </Box>
            <Box sx={{
                display: 'flex', width: '100%', justifyContent: 'flex-start',
                alignItems: 'center', mt: 2
            }}>
                <Typography component={"span"} variant={"h4"} sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {Props.content.icon}
                    {Props.content.text}
                </Typography>
            </Box>
        </Box>
    );
}
export default CardContent;