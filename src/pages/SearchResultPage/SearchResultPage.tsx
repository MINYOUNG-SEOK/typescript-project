import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography
} from '@mui/material'
import { useInView } from 'react-intersection-observer'
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword'
import { SEARCH_TYPE } from '../../models/search'

const SearchResultPage: React.FC = () => {
    const { keyword } = useParams<{ keyword: string }>()
    const q = decodeURIComponent(keyword || '')

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSearchItemsByKeyword({
        q,
        type: [SEARCH_TYPE.Track],
    })
    const items = data?.pages.flatMap(p => p.tracks?.items || []) || []

    // 무한 스크롤
    const { ref, inView } = useInView()
    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage()
    }, [inView, hasNextPage, fetchNextPage])

    if (isLoading) {
        return (
            <Box textAlign="center" py={4}>
                <CircularProgress />
            </Box>
        )
    }

    if (!items.length) {
        return (
            <Box textAlign="center" py={4}>
                <Typography>“{q}” 검색 결과가 없습니다.</Typography>
            </Box>
        )
    }

    return (
        <Box p={2} maxWidth={1400} mx="auto">
            <Typography variant="h6" gutterBottom>
                “{q}” 검색 결과
            </Typography>
            <List disablePadding>
                {items.map(track => (
                    <ListItem key={track.id} divider>
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
                            secondary={
                                track.artists?.map(a => a.name).join(', ') ?? ''
                            } />
                    </ListItem>
                ))}
                {hasNextPage && (
                    <div ref={ref} style={{ textAlign: 'center', padding: 16 }}>
                        {isFetchingNextPage && <CircularProgress size={20} sx={{ color: "#d9d9d9" }} />}
                    </div>
                )}
            </List>
        </Box>
    )
}

export default SearchResultPage