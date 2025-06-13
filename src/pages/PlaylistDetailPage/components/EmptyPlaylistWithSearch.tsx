import React, { useState, KeyboardEvent, useEffect } from 'react'
import {
    Box,
    Paper,
    TextField,
    InputAdornment,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useInView } from 'react-intersection-observer'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword'
import { SEARCH_TYPE } from '../../../models/search'

const EmptyPlaylistWithSearch: React.FC = () => {
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

    const items =
        data?.pages.flatMap(page => page.tracks?.items || []) ?? []

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setKeyword(inputValue.trim())
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                py: 6,
                bgcolor: '#ffffff',
            }}
        >
            <Paper elevation={1} sx={{ width: '100%', maxWidth: 600, p: 3, borderRadius: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="검색어를 입력하고 Enter"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {!isLoading && !keyword && (
                    <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                        검색어를 입력해 주세요
                    </Typography>
                )}

                {!isLoading && keyword && items.length === 0 && (
                    <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                        “{keyword}”에 맞는 검색 결과가 없습니다.
                    </Typography>
                )}

                {!isLoading && items.length > 0 && (
                    <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                        {items.map(track => (
                            <ListItem key={track.id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        src={track.album?.images?.[2]?.url}
                                        alt={track.name}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={track.name}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2">
                                                {track.artists.map(a => a.name).join(', ')}
                                            </Typography>
                                            {' — ' + track.album?.name}
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                        {hasNextPage && (
                            <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                {isFetchingNextPage ? <CircularProgress size={24} /> : null}
                            </Box>
                        )}
                    </List>
                )}
            </Paper>
        </Box>
    )
}

export default EmptyPlaylistWithSearch