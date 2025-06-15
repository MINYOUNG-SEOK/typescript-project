import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    styled,
} from '@mui/material'

const ConfirmDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 16,
        padding: theme.spacing(2),
        backgroundColor: '#ffffff',
    },
}))

const Title = styled(DialogTitle)({
    textAlign: 'center',
    fontSize: '1.25rem',
    fontWeight: 700,
    padding: '8px 0',
})

const Content = styled(DialogContent)({
    textAlign: 'center',
    padding: '8px 16px',
    '& .MuiTypography-root': {
        lineHeight: 1.6,
    },
})

const Actions = styled(DialogActions)({
    justifyContent: 'center',
    gap: 12,
    padding: '12px 16px',
})

const CancelButton = styled(Button)({
    textTransform: 'none',
    fontWeight: 500,
    boxShadow: 'none',
    borderRadius: 8,
})

const ConfirmButton = styled(Button)({
    textTransform: 'none',
    fontWeight: 600,
    backgroundColor: '#1db954',
    color: '#fff',
    boxShadow: 'none',
    borderRadius: 8,
    '&:hover': {
        backgroundColor: '#1aa34a',
        boxShadow: 'none',
    },
})

interface ConfirmAddDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export const ConfirmAddDialog: React.FC<ConfirmAddDialogProps> = ({
    open,
    onClose,
    onConfirm,
}) => (
    <ConfirmDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <Title>이미 추가된 곡입니다</Title>
        <Content>
            <Typography>
                이 곡은 이미 플레이리스트에 추가되어 있습니다.<br />
                계속 추가하시겠습니까?
            </Typography>
        </Content>
        <Actions>
            <CancelButton variant="text" onClick={onClose}>
                취소
            </CancelButton>
            <ConfirmButton variant="contained" onClick={onConfirm}>
                무시하고 추가
            </ConfirmButton>
        </Actions>
    </ConfirmDialog>
)