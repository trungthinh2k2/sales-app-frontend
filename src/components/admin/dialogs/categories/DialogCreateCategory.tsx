import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { CategoryModel } from "../../../../models/category.model";
import { createCategory } from "../../../../services/category.service";
import { ResponseSuccess } from "../../../../dtos/responses/response.susscess";

type Props = {
    open: boolean,
    handleClose: () => void
    addCategory: (category: CategoryModel) => void
    showAlert: (status: string, message: string) => void
}
const DialogCreateCategory = ({ open, handleClose, addCategory, showAlert }: Props) => {
    const [categoryName, setCategoryName] = useState('')
    const [errorText, setErrorText] = useState('')

    const handleSubmit = async () => {
        if (categoryName === "") {
            setErrorText("Loại sản phẩm không được để trống")
        } else {
            try {
                const response: ResponseSuccess<CategoryModel> = await createCategory({ categoryName });
                addCategory(response.data);
                showAlert('success', 'Thêm loại sản phẩm thành công');
                handleClose();
            } catch (error) {
                showAlert('error', 'Thêm loại sản phẩm thất bại');
                handleClose();
                console.log(error);
            }
            
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                Component: "form",
            }}
        >
            <DialogTitle style={{ cursor: 'move' }}>Thêm loại sản phẩm</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    name="category_name"
                    label="Tên loại sản phẩm"
                    error={errorText !== ''}
                    helperText={errorText}
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setCategoryName(e.target.value);
                        setErrorText('');
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSubmit}>Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogCreateCategory;