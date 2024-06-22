import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { CategoryModel } from "../../../../models/category.model";
import { ResponseSuccess } from "../../../../dtos/responses/response.susscess";
import { updateCategory as updateCategoryAPI } from "../../../../services/category.service";
import { useState } from "react";
import { Status } from "../../../../models/enum/status.enum";

type Props = {
    open: boolean,
    handleClose: () => void,
    updateCategory: (category: CategoryModel) => void,
    category?: CategoryModel,
    showwAlert: (status: string, message: string) => void
}

const DialogUpdateCategory = ({ open, handleClose, updateCategory, category, showwAlert}: Props) => {
    const [categoryName, setCategoryName] = useState<string>(category?.categoryName || '');
    const errorText = '';
    const [status, setStatus] = useState<string>(category?.status?.toString() || Status.ACTIVE.toString());



    const handleUpdateSubmit = async () => {
        let newStatus: Status = Status.ACTIVE;
        if (status === 'INACTIVE') {
            newStatus = Status.INACTIVE;
        }
        if (category?.categoryName !== categoryName || category?.status !== newStatus) {
            try {
                const response: ResponseSuccess<CategoryModel> = await updateCategoryAPI(
                    category?.id, {categoryName, status: newStatus});
                updateCategory(response.data);
                console.log("Response: ", response);
                if(response.status === 200) {
                    showwAlert('success', 'Cập nhật loại sản phẩm thành công');
                    handleClose();
                }else {
                    showwAlert('error', response.message);
                }
                
            } catch (error) {
                showwAlert('error', (error as Error).message);
                console.log(error);
            }
        }

    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: "form",
            }}
        >
            <DialogTitle style={{ cursor: 'move' }}>Cập nhật loại sản phẩm</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    disabled={true}
                    label="ID"
                    type="text"
                    value={category?.id}
                    fullWidth
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    name="category_name"
                    label="Tên loại sản phẩm"
                    value={categoryName}
                    error={errorText !== ''}
                    helperText={errorText}
                    type="text"
                    fullWidth
                    onChange={(e)=> {setCategoryName(e.target.value)}}
                    

                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                />

            </DialogContent>
            <DialogContent>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Trạng thái</InputLabel>
                    <Select
                        margin="dense"
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Trạng thái" />}
                        value={status}
                        onChange={(e) => {setStatus(e.target.value)}}
                    >
                        <MenuItem value={Status.ACTIVE.toString()}>Hoạt động</MenuItem>
                        <MenuItem value={Status.INACTIVE.toString()}>Ngưng hoạt động</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleUpdateSubmit}>Cập nhật</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogUpdateCategory;