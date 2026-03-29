import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Button, Card, Typography } from '@mui/material';

import { CustomTable } from '../../../../shared/components/table';
import type { AdminUser } from '../../types';

import { UserFilters, UserStatsCards, UserTabs } from './components/Users';
import { useUsers } from './hooks/useUser';
import { getUserColumns } from './tableColumns/userColumns';

function UsersPage() {
  const {
    activeTab,
    handleTabChange,
    searchTerm,
    handleSearchChange,
    users,
    totalCount,
    isLoading,
    page,
    pageSize,
    handlePageChange,
    stats,
    isLoadingStats,
    handleRefresh,
  } = useUsers();

  const handleEdit = (user: AdminUser) => {
    // TODO: mở dialog edit user
    console.log('Edit:', user);
  };

  const handleDelete = (user: AdminUser) => {
    // TODO: mở dialog xác nhận xoá
    console.log('Delete:', user);
  };

  const columns = getUserColumns(handleEdit, handleDelete);

  return (
    <Box>
      {/* ── Page header ── */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#1a1a1a', mb: 0.5 }}>
            User Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            Manage and monitor all hotel staff and customer accounts.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            borderRadius: 2.5,
            textTransform: 'none',
            px: 2.5,
            bgcolor: '#00ceb5',
            fontWeight: 600,
            '&:hover': { bgcolor: '#00b8a2' },
          }}
        >
          + Create New User
        </Button>
      </Box>

      {/* ── Stats cards ── */}
      <UserStatsCards stats={stats} isLoading={isLoadingStats} />

      {/* ── Table card ── */}
      <Card
        sx={{
          borderRadius: 3,
          border: '1px solid #f0f0f0',
          boxShadow: 'none',
          overflow: 'hidden',
          p: 2.5,
        }}
      >
        {/* Tabs */}
        <UserTabs activeTab={activeTab} onChange={handleTabChange} />

        {/* Search + filters */}
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        {/* Table */}
        <CustomTable<AdminUser>
          items={users}
          columnHeaders={columns}
          totalCount={totalCount}
          currentPage={page}
          maxPageSize={pageSize}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          getRowId={(row) => row.id}
          rowHeight={64}
          noDataMessage="No users found"
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: '#fafafa',
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              fontSize: '0.72rem',
              color: '#888',
              letterSpacing: 0.5,
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: '#f8fffe',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f8f8f8',
            },
          }}
        />

        {/* Footer hint */}
        {!isLoading && totalCount > 0 && (
          <Typography variant="caption" sx={{ color: '#aaa', mt: 1, display: 'block' }}>
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, totalCount)} of{' '}
            {totalCount.toLocaleString()} users
          </Typography>
        )}
      </Card>
    </Box>
  );
}

export default UsersPage;
