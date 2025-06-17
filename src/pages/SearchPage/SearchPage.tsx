import React, { useState, useEffect, useMemo, KeyboardEvent } from 'react'
import {
    Box,
    Typography,
    Chip,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    styled,
    useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import useGetCategories from '../../hooks/useGetCategories'
import { Category } from '../../models/browse'
import { SearchInput } from '../../common/components/SearchInput'

// 1) 섹션 마진
const Section = styled('section')(({ theme }) => ({
    marginTop: theme.spacing(4),
}))

// 2) 최근 검색 스크롤
const HorizontalScroll = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    paddingBottom: 8,
    gap: 12,
})

// 3) Chip 스타일
const RecentChip = styled(Chip)(({ theme }) => ({
    height: 40,
    padding: theme.spacing(1, 1),
    fontSize: '0.9rem',
    borderRadius: 20,
    '& .MuiChip-deleteIcon': {
        color: '#000',
        fontSize: 20,
    },
}))

// 4) 그리드
const CategoryGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: 'repeat(2, 1fr)',
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
    [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
    [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(5, 1fr)' },
}))

// 랜덤 컬러 함수
const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360)
    const s = 40 + Math.random() * 60
    const l = 30 + Math.random() * 55
    return `hsl(${h}, ${s}%, ${l}%)`
}


const SearchPage: React.FC = () => {
    const theme = useTheme()
    const [input, setInput] = useState('')
    const [recent, setRecent] = useState<string[]>([])
    const navigate = useNavigate()
    const { data: categories, isLoading: catLoading } = useGetCategories()


    // 카테고리별 랜덤 컬러 부여
    const colored = useMemo(
        () => categories?.map(cat => ({ ...cat, color: getRandomColor() })) ?? [],
        [categories]
    )

    // 로컬스토리지에서 최근 검색어 로드
    useEffect(() => {
        const stored = localStorage.getItem('recentSearches')
        if (stored) {
            try { setRecent(JSON.parse(stored)) }
            catch { setRecent([]) }
        }
    }, [])

    // 검색 함수
    const doSearch = (q: string) => {
        const kw = q.trim()
        if (!kw) return
        navigate(`/search/${encodeURIComponent(kw)}`)
        setRecent(prev => {
            const next = [kw, ...prev.filter(x => x !== kw)].slice(0, 10)
            localStorage.setItem('recentSearches', JSON.stringify(next))
            return next
        })
    }
    const handleDelete = (q: string) =>
        setRecent(prev => {
            const next = prev.filter(x => x !== q)
            localStorage.setItem('recentSearches', JSON.stringify(next))
            return next
        })
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') doSearch(input)
    }

    return (
        <Box p={2} maxWidth={1400} mx="auto">
            {/* 검색창 */}
            <SearchInput
                value={input}
                onChange={setInput}
                onSubmit={() => doSearch(input)}
                placeholder="곡, 아티스트, 앨범명을 입력한 후 Enter 키를 눌러 검색해보세요"
            />

            {/* 최근 검색어 */}
            {recent.length > 0 && (
                <Section>
                    <Typography
                        mb={1}
                        variant="h6"
                        fontWeight="bold"
                    >
                        최근 검색 항목
                    </Typography>
                    <HorizontalScroll>
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

            {/* 카테고리 */}
            <Section>
                <Typography
                    mb={1}
                    variant="h6"
                    fontWeight="bold"
                >
                    카테고리 둘러보기
                </Typography>

                {catLoading ? (
                    <Typography>로딩 중…</Typography>
                ) : (
                    <CategoryGrid>
                        {colored.map(cat => (
                            <Card
                                key={cat.id}
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    aspectRatio: '16/9',
                                    backgroundColor: !cat.imageUrl ? cat.color : undefined,
                                    color: '#fff',         // 텍스트는 흰색
                                }}
                            >
                                <CardActionArea
                                    sx={{ height: '100%' }}
                                    onClick={() =>
                                        navigate(`/category/${encodeURIComponent(cat.id)}`)
                                    }
                                >
                                    {/* 3) 이미지가 있을 때만 렌더 */}
                                    {cat.imageUrl && (
                                        <CardMedia
                                            component="img"
                                            image={cat.imageUrl}
                                            alt={cat.name}
                                            sx={{
                                                height: '100%',
                                                width: '100%',
                                                objectFit: 'cover',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                            }}
                                        />
                                    )}

                                    {/* 4) 텍스트는 항상 최상단에 */}
                                    <CardContent
                                        sx={{
                                            position: 'absolute',
                                            top: theme.spacing(1),
                                            left: theme.spacing(1),
                                            right: theme.spacing(1),
                                            p: 0,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 700 }}
                                        >
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