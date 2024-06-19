import { Delete, Edit } from "@mui/icons-material";
import AttachMoney from "@mui/icons-material/AttachMoney";
import { Box, Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";

type ProductCardProps = {
    productId: number;
    productName: string;
    productPrice: number;
    fNavigateUpdate?: (id: number) => void;
    fNavigateDelete?: (id: number) => void;
    thumbnail?: string;
}

const ProductCard = ({ productId, productName, productPrice, fNavigateUpdate, fNavigateDelete, thumbnail }: ProductCardProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 200, resizeMode: 'contain' }}
                image={thumbnail}
                // image="https://aokhoacnam.vn/upload/product/akn-062/ao-khoac-kaki-den-nam-tinh-0.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {productName}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" sx={{ display: "flex", alignItems: "center" }}>
                    <AttachMoney />
                    {productPrice}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Fab color="success" aria-label="edit" size="small" onClick={()=> {fNavigateUpdate && fNavigateUpdate(productId)}}>
                        <Edit />
                    </Fab>
                    <Fab color="warning" aria-label="delete" size="small" onClick={()=> {fNavigateDelete && fNavigateDelete(productId)}}>
                        <Delete />
                    </Fab>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductCard;