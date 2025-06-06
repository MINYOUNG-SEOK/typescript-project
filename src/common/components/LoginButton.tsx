import { Button } from '@mui/material'
import React from 'react'
import { getSpotifyAuthUrl } from '../../utils/auth'

const LoginButton = () => {
    const login = async () => {
        await getSpotifyAuthUrl();
    }

    return (
        <Button
            variant="contained"
            onClick={login}
            sx={{
                backgroundColor: '#1db954',
                color: '#fff',
                fontWeight: 600,
                borderRadius: 999,
                textTransform: 'none',
                px: 3,
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#17a74a',
                    boxShadow: 'none',
                },
            }}
        >
            로그인
        </Button>
    )
}

export default LoginButton
