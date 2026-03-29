import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box, Button, InputAdornment, TextField } from '@mui/material';

import { gray } from '../../../../../../shared/common/colors';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh,
  isLoading,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        mb: 2,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {/* Search */}
      <TextField
        size="small"
        placeholder="Search by name, email, or phone..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          flex: 1,
          minWidth: 260,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: '#fafafa',
            '& fieldset': { borderColor: gray[300] },
            '&:hover fieldset': { borderColor: gray[400] },
            '&.Mui-focused fieldset': { borderColor: '#00ceb5' },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: gray[400], fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Refresh */}
      <Button
        variant="outlined"
        size="small"
        startIcon={<RefreshRoundedIcon />}
        onClick={onRefresh}
        disabled={isLoading}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          borderColor: gray[300],
          color: gray[600],
          height: 40,
          '&:hover': { borderColor: gray[400], bgcolor: gray[50] },
        }}
      >
        Refresh
      </Button>
    </Box>
  );
};

export default UserFilters;
