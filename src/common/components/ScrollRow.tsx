import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface ScrollRowProps {
    title: string;
    children: React.ReactNode;
}

export default function ScrollRow({ title, children }: ScrollRowProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft);
        }
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (el) el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scrollBy = (amount: number) => {
        scrollRef.current?.scrollBy({
            left: amount,
            behavior: 'smooth',
        });
    };

    return (
        <Box mb={4} position="relative">
            <Typography variant="h6" mb={2}>{title}</Typography>

            {/* 왼쪽 화살표 (PC에서만) */}
            {canScrollLeft && (
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: 48,
                        zIndex: 2,
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        onClick={() => scrollBy(-300)}
                        sx={{
                            color: '#000',
                            background: 'rgba(255,255,255,0.8)',
                            ml: 1,
                            boxShadow: 1,
                        }}
                    >
                        <ChevronLeftIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                </Box>
            )}

            {/* 오른쪽 화살표 (PC에서만) */}
            {canScrollRight && (
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: 48,
                        zIndex: 2,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <IconButton
                        onClick={() => scrollBy(300)}
                        sx={{
                            color: '#000',
                            background: 'rgba(255,255,255,0.8)',
                            mr: 1,
                            boxShadow: 1,
                        }}
                    >
                        <ChevronRightIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                </Box>
            )}

            {/* 실제 리스트 */}
            <Box
                ref={scrollRef}
                sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollBehavior: 'smooth',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}