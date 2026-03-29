import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from '../../../../../shared/hooks/useDebounce';
import { userService } from '../../../services/userService';
import type { AdminUser, RoleStats, UserTab } from '../../../types';

const DEFAULT_PAGE_SIZE = 10;

const TABS: UserTab[] = ['Customer', 'HotelOwner', 'Receptionist', 'Housekeeping'];

export const useUsers = () => {
  const [activeTab, setActiveTab] = useState<UserTab>('Customer');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const [page, setPage] = useState(0); // 0-indexed (DataGrid)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [stats, setStats] = useState<RoleStats>({
    Customer: 0,
    HotelOwner: 0,
    Receptionist: 0,
    Housekeeping: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // ─── Fetch danh sách user theo tab hiện tại ───────────────────────────────
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await userService.getUsers({
        Role: activeTab,
        PageNumber: page + 1,
        PageSize: pageSize,
        SearchTerm: debouncedSearch || undefined,
      });

      if (response.success && response.data) {
        setUsers(response.data.items);
        setTotalCount(response.data.totalCount);
      }
    } catch (error) {
      console.error('[useUsers] fetchUsers error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, page, pageSize, debouncedSearch]);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoadingStats(true);
      const results = await Promise.allSettled(
        TABS.map((role) => userService.getUsers({ Role: role, PageNumber: 1, PageSize: 1 })),
      );

      const newStats = { ...stats };
      TABS.forEach((role, i) => {
        const result = results[i];
        if (result.status === 'fulfilled' && result.value.success && result.value.data) {
          newStats[role] = result.value.data.totalCount;
        }
      });
      setStats(newStats);
    } catch (error) {
      console.error('[useUsers] fetchStats error:', error);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  // ─── Effects ──────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setPage(0);
  }, [activeTab, debouncedSearch]);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleTabChange = (_: React.SyntheticEvent, newTab: UserTab) => {
    setActiveTab(newTab);
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleRefresh = () => {
    fetchUsers();
    fetchStats();
  };

  return {
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
  };
};
