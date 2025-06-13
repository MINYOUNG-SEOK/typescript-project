import React, { useState, KeyboardEvent, useEffect } from 'react'
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useInView } from 'react-intersection-observer'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword'
import { SEARCH_TYPE } from '../../../models/search'

interface EmptyPlaylistWithSearchProps {
    onClose?: () => void
}

const EmptyPlaylistWithSearch: React.FC<EmptyPlaylistWithSearchProps> = ({ onClose }) => {
    const [inputValue, setInputValue] = useState('')
    const [keyword, setKeyword] = useState('')

    const { ref, inView } = useInView()
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSearchItemsByKeyword({ q: keyword, type: [SEARCH_TYPE.Track] })

    const items = data?.pages.flatMap(page => page.tracks?.items || []) ?? []

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage()
    }, [inView, hasNextPage, fetchNextPage])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') setKeyword(inputValue.trim())
    }
    const handleSearchClick = () => setKeyword(inputValue.trim())

    return (
        <Box sx={{ width: '100%', bgcolor: '#ffffff', position: 'relative' }}>


            <Box sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
                <TextField
                    fullWidth
                    placeholder="곡, 아티스트, 앨범 검색"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearchClick} edge="end" aria-label="검색">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 2 },
                    }}
                />
            </Box>

            {isLoading && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <CircularProgress sx={{ color: "#d9d9d9" }} />
                </Box>
            )}

            {!isLoading && keyword && items.length === 0 && (
                <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                    “{keyword}”에 맞는 결과가 없습니다.
                </Typography>
            )}

            {items.length > 0 && (
                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {items.map(track => (
                        <ListItem
                            key={track.id}
                            secondaryAction={
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => console.log('추가:', track.id)}
                                >
                                    추가
                                </Button>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    src={track.album?.images?.[2]?.url}
                                    alt={track.name}
                                    sx={{ width: 48, height: 48, mr: 2 }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={track.name}
                                secondaryTypographyProps={{ noWrap: true }}
                                secondary={
                                    track.artists?.map(a => a.name).join(', ') + ' — ' + track.album?.name
                                }
                            />
                        </ListItem>
                    ))}
                    {hasNextPage && (
                        <Box ref={ref} sx={{ textAlign: 'center', py: 2 }}>
                            {isFetchingNextPage && <CircularProgress size={20} sx={{ color: "#d9d9d9" }} />}
                        </Box>
                    )}
                </List>
            )}
        </Box>
    )
}

export default EmptyPlaylistWithSearch