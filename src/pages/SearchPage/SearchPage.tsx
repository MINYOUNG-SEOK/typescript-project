import React, { useState, KeyboardEvent, useEffect } from 'react'
import {
    Box,
    Typography,
    Chip,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    styled,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import useGetCategories from '../../hooks/useGetCategories'
import { Category } from '../../models/browse'
import { SearchInput } from '../../common/components/SearchInput'

// 검색 페이지 각 섹션 간 간격
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

const RecentChip = styled(Chip)(({ theme }) => ({
    height: 40,
    padding: theme.spacing(1, 1),
    fontSize: '0.9rem',
    borderRadius: 20,
    '& .MuiChip-deleteIcon': {
        color: '#000',
        fontSize: 20,
    },
}));

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
        gridTemplateColumns: 'repeat(5, 1fr)',
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

        setRecent(prev => {
            const next = [keyword, ...prev.filter(x => x !== keyword)].slice(0, 10)
            localStorage.setItem('recentSearches', JSON.stringify(next))
            return next
        })
    }

    // 최근 검색어 삭제 함수
    const handleDelete = (q: string) => {
        setRecent(prev => {
            const next = prev.filter(x => x !== q)
            localStorage.setItem('recentSearches', JSON.stringify(next))
            return next
        })
    }

    // Enter 키로 검색
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') doSearch(input)
    }

    return (
        <Box p={2} maxWidth={1400} mx="auto">
            {/* 1) 공통 SearchInput 사용 */}
            <SearchInput
                value={input}
                onChange={setInput}
                onSubmit={() => doSearch(input)}
                placeholder="곡, 아티스트, 앨범명을 입력한 후 Enter 키를 눌러 검색해보세요"
            />

            {/* 2) 최근 검색어 섹션 */}
            {recent.length > 0 && (
                <Section>
                    <Typography variant="subtitle1" gutterBottom>
                        최근 검색
                    </Typography>
                    <HorizontalScroll sx={{ py: 1 }}>
                        {recent.map(q => (
                            <RecentChip
                                key={q}
                                label={q}
                                onClick={() => doSearch(q)}
                                onDelete={() => handleDelete(q)}
                                deleteIcon={<CloseIcon />}
                                clickable
                            />
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
                                onClick={() => navigate(`/category/${encodeURIComponent(cat.id)}`)}
                            >
                                <CardActionArea sx={{ height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        image={cat.icons?.[0]?.url}
                                        alt={cat.name}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
