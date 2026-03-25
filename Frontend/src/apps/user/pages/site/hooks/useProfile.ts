import { useProfileActions } from '../../../../../shared/hooks/useProfileActions';
import type { ProfileFormValues } from '../../../types';

/**
 * useProfile (User app)
 *
 * Thin wrapper trên useProfileActions — chỉ bổ sung logic riêng của User page:
 * - Build initialValues cho Formik từ store
 * - Có thể thêm: navigate sau khi save, redirect logic, v.v.
 */
export const useProfile = () => {
  const actions = useProfileActions();
  const { user } = actions;

  /** Initial values cho Formik form ở User profile page */
  const initialValues: ProfileFormValues = {
    fullName: user?.fullName ?? '',
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    dateOfBirth: '',
    gender: user?.gender ?? null,
    address: user?.address ?? '',
  };

  return {
    ...actions,
    initialValues,
  };
};
