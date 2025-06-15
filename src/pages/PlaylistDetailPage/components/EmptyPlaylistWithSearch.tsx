import React, { useState, KeyboardEvent, useEffect } from 'react'
import { Avatar, Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Typography, styled } from '@mui/material'
import { SearchInput } from '../../../common/components/SearchInput'
import CloseIcon from '@mui/icons-material/Close'
import { useInView } from 'react-intersection-observer'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword'
import { SEARCH_TYPE } from '../../../models/search'
import { SearchResponse } from '../../../models/search'
import { Artist } from '../../../models/artist'
import { InfiniteData } from '@tanstack/react-query'
import { Track } from '../../../models/track'

interface EmptyPlaylistWithSearchProps {
    onClose?: () => void
    onAddTrack: (trackUri: string) => void
}

const AddTrackButton = styled('button')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    color: '#1db954',
    border: '1px solid #1db954',
    borderRadius: '9999px',
    padding: '8px 16px',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: '#f0faf1',
    },
}))


const EmptyPlaylistWithSearch: React.FC<EmptyPlaylistWithSearchProps> = ({ onClose, onAddTrack }) => {
    const [inputValue, setInputValue] = useState('')
    const [keyword, setKeyword] = useState('')

    const { ref, inView } = useInView()
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSearchItemsByKeyword({ q: keyword, type: [SEARCH_TYPE.Track] }) as {
        data: InfiniteData<SearchResponse> | undefined,
        isLoading: boolean,
        fetchNextPage: () => void,
        hasNextPage: boolean | undefined,
        isFetchingNextPage: boolean,
    }

    const items: Track[] = data?.pages.flatMap(page => page.tracks?.items ?? []) ?? []
    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage()
    }, [inView, hasNextPage, fetchNextPage])

    const handleSearch = () => setKeyword(inputValue.trim())

    return (
        <Box sx={{ width: '100%', bgcolor: '#ffffff', position: 'relative', minHeight: 500 }}>


            {/* 공통 SearchInput */}
            <SearchInput
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSearch}
                placeholder="곡, 아티스트, 앨범명을 입력한 후 Enter 키를 눌러 검색해보세요"
            />

            {isLoading && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <CircularProgress sx={{ color: "#d9d9d9" }} />
                </Box>
            )}

            {!isLoading && keyword && items.length === 0 && (
                <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                    “{keyword}”에 맞는 검색 결과가 없습니다.
                </Typography>
            )}

            {items.length > 0 && (
                <List
                    sx={{
                        maxHeight: 400,
                        overflow: 'auto',
                        px: 0,
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    {items.map(track => (
                        <ListItem
                            key={track.id}
                            // disableGutters
                            alignItems="flex-start"
                            sx={{ '& .MuiListItemText-root': { pr: '60px' } }}
                            secondaryAction={
                                <AddTrackButton type="button" onClick={() => onAddTrack(track.uri)}>
                                    추가
                                </AddTrackButton>
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
                                secondary={
                                    track.artists?.map((a: Artist) => a.name).join(', ') + ' — ' + track.album?.name

                                }
                                // slotProps로 typography 설정 전달
                                slotProps={{
                                    primary: {
                                        noWrap: true,
                                        sx: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            fontSize: '1rem',
                                            '@media (max-width:600px)': {
                                                fontSize: '0.875rem',
                                            },
                                        },
                                    },
                                    secondary: {
                                        noWrap: true,
                                        sx: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        },
                                    },
                                }
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