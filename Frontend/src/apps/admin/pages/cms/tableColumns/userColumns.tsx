import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Avatar, Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';

import { green, gray, red } from '../../../../../shared/common/colors';
import { ROLE_CONFIG } from '../../../../../shared/config/constant';
import type { AdminUser } from '../../../types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatPhone = (phone: string | null) => {
  if (!phone) return '—';
  const s = phone.replace(/\D/g, '');
  if (s.startsWith('0') && s.length === 10) {
    return `+84 ${s.slice(1, 4)} ${s.slice(4, 7)} ${s.slice(7)}`;
  }
  return phone;
};

const getAvatarLetter = (name: string) => name.charAt(0).toUpperCase();

// ─── Column definitions ───────────────────────────────────────────────────────

export const getUserColumns = (
  onEdit?: (user: AdminUser) => void,
  onDelete?: (user: AdminUser) => void,
): GridColDef[] => [
  // ── Fullname + avatar ──
  {
    field: 'fullName',
    headerName: 'FULLNAME',
    flex: 1.8,
    minWidth: 180,
    renderCell: ({ row }: { row: AdminUser }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
        <Avatar
          src={row.avatarUrl ?? undefined}
          sx={{
            width: 36,
            height: 36,
            fontSize: 14,
            fontWeight: 600,
            bgcolor: '#00ceb5',
            flexShrink: 0,
          }}
        >
          {!row.avatarUrl && getAvatarLetter(row.fullName)}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3, color: '#1a1a1a' }}>
            {row.fullName}
          </Typography>
        </Box>
      </Box>
    ),
  },

  // ── Email ──
  {
    field: 'email',
    headerName: 'EMAIL',
    flex: 2,
    minWidth: 200,
    renderCell: ({ row }: { row: AdminUser }) => (
      <Typography variant="body2" sx={{ color: gray[700] }}>
        {row.email}
      </Typography>
    ),
  },

  // ── Role badge ──
  {
    field: 'role',
    headerName: 'ROLE',
    width: 140,
    renderCell: ({ row }: { row: AdminUser }) => {
      const cfg = ROLE_CONFIG[row.role] ?? { label: row.role, color: gray[700], bg: gray[100] };
      return (
        <Chip
          label={cfg.label}
          size="small"
          sx={{
            bgcolor: cfg.bg,
            color: cfg.color,
            fontWeight: 700,
            fontSize: '0.7rem',
            height: 22,
            border: `1px solid ${cfg.color}30`,
          }}
        />
      );
    },
  },

  // ── Status ──
  {
    field: 'isActive',
    headerName: 'STATUS',
    width: 110,
    renderCell: ({ row }: { row: AdminUser }) => (
      <Chip
        label={row.isActive ? 'Active' : 'Inactive'}
        size="small"
        sx={{
          bgcolor: row.isActive ? '#e8f5e9' : '#fafafa',
          color: row.isActive ? green[700] : gray[500],
          fontWeight: 600,
          fontSize: '0.7rem',
          height: 22,
          border: `1px solid ${row.isActive ? green[200] : gray[300]}`,
        }}
      />
    ),
  },

  // ── Phone ──
  {
    field: 'phoneNumber',
    headerName: 'PHONE',
    width: 150,
    renderCell: ({ row }: { row: AdminUser }) => (
      <Typography variant="body2" sx={{ color: gray[700] }}>
        {formatPhone(row.phoneNumber)}
      </Typography>
    ),
  },

  // ── Actions ──
  {
    field: 'actions',
    headerName: 'ACTIONS',
    width: 100,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }: { row: AdminUser }) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Edit user">
          <IconButton size="small" onClick={() => onEdit?.(row)}>
            <EditRoundedIcon sx={{ fontSize: 16, color: '#00ceb5' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete user">
          <IconButton size="small" onClick={() => onDelete?.(row)}>
            <DeleteOutlineRoundedIcon sx={{ fontSize: 16, color: red[400] }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];
