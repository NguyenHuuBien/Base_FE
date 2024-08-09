import React from 'react'
import { TextField, Stack, InputAdornment, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const NameSearchBar = (props) => {
    const { onSearch, value, onChange, onReset, placeholder } = props

    return (
        <Stack alignItems={'center'} justifyContent={'end'} gap={1} direction={'row'}>
            <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder={placeholder}
                variant="outlined"
                size="small"
                value={value}
                onChange={onChange}
                sx={{ borderRadius: 1000, width: 320 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Button variant='outlined' onClick={onSearch}>Tìm kiếm</Button>
            <Button variant='outlined' color='error' onClick={onReset}>Reset</Button>
        </Stack>
    )
}

export default NameSearchBar