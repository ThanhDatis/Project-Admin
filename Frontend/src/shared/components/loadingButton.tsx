import { Button, CircularProgress, type ButtonProps } from '@mui/material';
import React from 'react';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText,
  children,
  disabled,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={disabled || loading}
      sx={{
        position: 'relative',
        ...buttonProps.sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={20}
          sx={{
            position: 'absolute',
            left: '50%',
            marginLeft: '-10px',
            color: 'inherit',
          }}
        />
      )}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {loading && loadingText ? loadingText : children}
      </span>
    </Button>
  );
};

export default LoadingButton;
