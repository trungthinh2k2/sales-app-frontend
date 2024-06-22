import {Box, Input} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButtonGradient from "../../common/IconButtonGradient";

type Props = {
    placeHolder?: string
}

const SearchInput = ({placeHolder}: Props) => {
    return <Box sx={{display: "flex", width:'100%'}}>
        <Input
            sx={{flex: 1}}
            placeholder={placeHolder}
        />
        <IconButtonGradient type="button" aria-label="search">
            <SearchIcon/>
        </IconButtonGradient>
    </Box>
}
export default SearchInput;