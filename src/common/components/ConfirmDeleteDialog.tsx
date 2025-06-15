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

const DeleteButton = styled(Button)({
    textTransform: 'none',
    fontWeight: 600,
    backgroundColor: '#f44336', // MUI red[500]
    color: '#fff',
    boxShadow: 'none',
    borderRadius: 8,
    '&:hover': {
        backgroundColor: '#d32f2f', // MUI red[700]
        boxShadow: 'none',
    },
})

interface ConfirmDeleteDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    open,
    onClose,
    onConfirm,
}) => (
    <ConfirmDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <Title>정말 삭제하시겠어요?</Title>
        <Content>
            <Typography>
                삭제된 곡은 플레이리스트에서 제거됩니다.<br />
                계속 진행하시겠습니까?
            </Typography>
        </Content>
        <Actions>
            <CancelButton variant="text" onClick={onClose}>
                취소
            </CancelButton>
            <DeleteButton
                variant="contained"
                onClick={() => {
                    onConfirm()
                    onClose()
                }}
                autoFocus
            >
                삭제
            </DeleteButton>
        </Actions>
    </ConfirmDialog>
)