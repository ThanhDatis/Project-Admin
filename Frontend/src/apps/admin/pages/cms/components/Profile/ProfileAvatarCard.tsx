import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Avatar, Badge, Box, CircularProgress, IconButton, Tooltip } from '@mui/material';

import { cyan, secondaryTextColor } from '../../../../../../shared/common/colors';

interface ProfileAvatarCardProps {
  avatarPreview: string | null;
  displayName: string;
  isUploading: boolean;
  onTriggerUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileAvatarCard: React.FC<ProfileAvatarCardProps> = ({
  avatarPreview,
  displayName,
  isUploading,
  onTriggerUpload,
  fileInputRef,
  onFileChange,
}) => {
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Tooltip title="Change Avatar" placement="bottom">
            <IconButton
              onClick={onTriggerUpload}
              disabled={isUploading}
              size="small"
              sx={{
                width: 34,
                height: 34,
                bgcolor: cyan[500],
                border: '2px solid #fff',
                '&:hover': { bgcolor: cyan[600] },
                '&:disabled': { bgcolor: secondaryTextColor },
              }}
            >
              {isUploading ? (
                <CircularProgress size={14} sx={{ color: secondaryTextColor }} />
              ) : (
                <CameraAltRoundedIcon sx={{ fontSize: 16, color: secondaryTextColor }} />
              )}
            </IconButton>
          </Tooltip>
        }
      >
        <Avatar
          src={avatarPreview ?? undefined}
          sx={{
            width: 96,
            height: 96,
            fontSize: 36,
            fontWeight: 700,
            bgcolor: cyan[500],
            color: secondaryTextColor,
            border: '3px solid #f0f0f0',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          }}
        >
          {!avatarPreview && avatarLetter}
        </Avatar>
      </Badge>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </Box>
  );
};

export default ProfileAvatarCard;
