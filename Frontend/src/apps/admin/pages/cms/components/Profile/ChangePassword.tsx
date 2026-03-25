import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

interface ChangePasswordProps {
  open: boolean;
  email: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  open,
  email,
  isLoading,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.1rem', pb: 1 }}>Change Password</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            py: 2,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: '#e8f8f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MailOutlineRoundedIcon sx={{ color: '#00ceb5', fontSize: 28 }} />
          </Box>

          <Typography variant="body2" color="text.secondary" textAlign="center" lineHeight={1.7}>
            The system will send a password reset email to:
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              px: 2,
              py: 0.75,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              color: '#333',
              letterSpacing: 0.3,
            }}
          >
            {email}
          </Typography>

          <Typography variant="caption" color="text.disabled" textAlign="center">
            Check your inbox (including Spam) and follow the instructions in the email.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isLoading}
          sx={{ borderRadius: 2, textTransform: 'none', flex: 1 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isLoading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            flex: 1,
            bgcolor: '#00ceb5',
            '&:hover': { bgcolor: '#00b8a2' },
          }}
        >
          {isLoading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Gửi email'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassword;
