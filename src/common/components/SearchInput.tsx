import React, { KeyboardEvent } from 'react'
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    styled
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Container = styled(Box)({
    maxWidth: 600,
    width: '100%',
    margin: '0 auto',
})

interface SearchInputProps {
    value: string
    onChange: (v: string) => void
    onSubmit: () => void
    placeholder?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    onSubmit,
    placeholder = '검색어를 입력하세요',
}) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') onSubmit()
    }

    return (
        <Container mb={2}>
            <TextField
                fullWidth
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={onSubmit} edge="end" aria-label="검색">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: { borderRadius: 2 },
                }}
            />
        </Container>
    )
}