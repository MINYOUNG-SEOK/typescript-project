import React, { useState, KeyboardEvent, useEffect } from 'react'
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    Chip,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    styled,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import useGetCategories from '../../hooks/useGetCategories'
import { Category } from '../../models/browse'

// 검색 페이지 각 섹션 간 간격을 주기 위한 styled
const Section = styled('section')(({ theme }) => ({
    marginTop: theme.spacing(4),
}))

// 최근 검색어 영역 가로 스크롤
const HorizontalScroll = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    paddingBottom: 8,
    gap: 12,
})


// 카테고리 그리드: 반응형으로 열 수 조정
const CategoryGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: 'repeat(2, 1fr)',
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(6, 1fr)',
    },
}))

const SearchPage: React.FC = () => {
    const [input, setInput] = useState('')
    const [recent, setRecent] = useState<string[]>([])
    const navigate = useNavigate()
    const { data: categories, isLoading: catLoading } = useGetCategories()

    // 로컬스토리지에 저장된 최근 검색어 불러오기
    useEffect(() => {
        const stored = localStorage.getItem('recentSearches')
        if (stored) setRecent(JSON.parse(stored))
    }, [])

    // 검색 수행 함수
    const doSearch = (q: string) => {
        const keyword = q.trim()
        if (!keyword) return
        navigate(`/search/${encodeURIComponent(keyword)}`)

        // 로컬스토리지에 중복 없이 최대 5개까지 저장
        setRecent(prev => {
            const next = [keyword, ...prev.filter(x => x !== keyword)].slice(0, 5)
            localStorage.setItem('recentSearches', JSON.stringify(next))
            return next
        })
    }

    // Enter 키로 검색
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') doSearch(input)
    }

    return (
        <Box p={2} maxWidth={1400} mx="auto">
            {/* 1) 검색 입력 */}
            <TextField
                fullWidth
                placeholder="곡, 아티스트, 앨범명을 입력 후 Enter"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => doSearch(input)} edge="end">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {/* 2) 최근 검색어 섹션 */}
            {recent.length > 0 && (
                <Section>
                    <Typography variant="subtitle1" gutterBottom>
                        최근 검색
                    </Typography>
                    <HorizontalScroll>
                        {recent.map(q => (
                            <Chip key={q} label={q} onClick={() => doSearch(q)} />
                        ))}
                    </HorizontalScroll>
                </Section>
            )}

            {/* 3) 카테고리 둘러보기 섹션 */}
            <Section>
                <Typography variant="subtitle1" gutterBottom>
                    카테고리 둘러보기
                </Typography>

                {catLoading ? (
                    <Typography>로딩 중…</Typography>
                ) : (
                    <CategoryGrid>
                        {categories?.map((cat: Category) => (
                            <Card
                                key={cat.id}
                                sx={{
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    aspectRatio: '16/9',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(`/search/${encodeURIComponent(cat.id)}`)}
                            >
                                <CardActionArea sx={{ height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        image={cat.icons?.[0]?.url}
                                        alt={cat.name}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            bgcolor: 'rgba(0,0,0,0.4)',
                                            color: '#fff',
                                            py: 1,
                                            px: 1.5,
                                        }}
                                    >
                                        <Typography variant="subtitle2" noWrap>
                                            {cat.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </CategoryGrid>
                )}
            </Section>
        </Box>
    )
}

export default SearchPage