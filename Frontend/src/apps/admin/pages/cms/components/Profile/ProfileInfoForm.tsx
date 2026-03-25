import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Button, Card, Divider, Grid, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';

import { gray } from '../../../../../../shared/common/colors';
import type { ProfileFormValues } from '../../../../../user/types';

interface ProfileInfoFormProps {
  formik: FormikProps<ProfileFormValues>;
  isSaving: boolean;
}

const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({ formik, isSaving }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 3,
        boxShadow: 'none',
        border: `1px solid ${gray[300]}`,
      }}
    >
      <Typography variant="h1" sx={{ mb: 3, fontSize: 24 }}>
        Personal Information
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Full name — read-only (backend không có endpoint đổi tên) */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Full Name"
              value={formik.values.fullName}
              fullWidth
              disabled
              size="small"
              InputProps={{ readOnly: true }}
              sx={{ '& .MuiInputBase-root': { bgcolor: '#fafafa' } }}
            />
          </Grid>

          {/* Email — read-only */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              value={formik.values.email}
              fullWidth
              disabled
              size="small"
              InputProps={{ readOnly: true }}
              sx={{ '& .MuiInputBase-root': { bgcolor: '#fafafa' } }}
              helperText="Email cannot be changed"
            />
          </Grid>
        </Grid>

        {/* Submit */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={isSaving ? undefined : <SaveRoundedIcon />}
            disabled={isSaving || !formik.dirty}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              bgcolor: '#00ceb5',
              '&:hover': { bgcolor: '#00b8a2' },
              '&:disabled': { bgcolor: '#b2dfdb', color: '#fff' },
            }}
          >
            {isSaving ? 'Save...' : 'Save Changes'}
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default ProfileInfoForm;
