import { Stack, MenuItem, TextField, Button } from '@mui/material'
import { role } from 'src/constants/role'

const UserSearch = () => {

    return (
        <Stack direction={'row'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            <TextField size='small' sx={{ width: '200px' }} placeholder='Nhập tên' />
            <TextField size='small' sx={{ width: '200px' }} placeholder='Nhập username' />
            <TextField size='small' sx={{ width: '200px' }} select placeholder='Chọn role'>
                {
                    role.map(option => (
                        <MenuItem key={option.id} value={option.role}>
                            {option.role}
                        </MenuItem>
                    ))
                }
            </TextField>
            <Button variant='contained'>Tìm kiếm</Button>
        </Stack>
    )
}

export default UserSearch