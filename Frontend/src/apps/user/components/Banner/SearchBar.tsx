import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Divider,
  InputBase,
  Popover,
  Typography,
  IconButton,
  type SxProps,
  type Theme,
} from '@mui/material';
import React, { useState } from 'react';

import {
  disabledTextColor,
  dividerColor,
  gray,
  primaryBackground,
  teal,
  withAlpha,
} from '../../../../shared/common/colors';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SearchValues {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface SearchBarProps {
  onSearch?: (values: SearchValues) => void;
}

// ─── Shared tokens / styles ──────────────────────────────────────────────────
const accentColor = teal[400];
const accentHoverColor = teal[500];

const searchBarWrapperSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: primaryBackground,
  borderRadius: '60px',
  boxShadow: `0 4px 24px ${withAlpha(gray[900], 0.14)}`,
  maxWidth: { xs: '100%', md: 780 },
  width: '100%',
  overflow: 'hidden',
  mx: 'auto',
  p: { xs: 1.5, md: 1.25 },
};

const dividerSx: SxProps<Theme> = {
  my: 1.5,
  borderColor: dividerColor,
};

const fieldContentTextSx: SxProps<Theme> = {
  fontSize: '0.875rem',
};

const placeholderTextSx: SxProps<Theme> = {
  ...fieldContentTextSx,
  color: disabledTextColor,
};

const activeTextSx: SxProps<Theme> = {
  ...fieldContentTextSx,
  color: 'text.primary',
  fontWeight: 500,
};

const searchButtonSx: SxProps<Theme> = {
  backgroundColor: accentColor,
  color: primaryBackground,
  borderRadius: '40px',
  px: { xs: 2.5, md: 3 },
  py: 1.5,
  fontWeight: 600,
  fontSize: '0.9rem',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  boxShadow: `0 4px 14px ${withAlpha(accentColor, 0.4)}`,
  '&:hover': {
    backgroundColor: accentHoverColor,
    boxShadow: `0 6px 20px ${withAlpha(accentColor, 0.5)}`,
  },
  transition: 'all 0.2s ease',
};

const counterButtonSx: SxProps<Theme> = {
  width: 28,
  height: 28,
  border: '1px solid',
  borderColor: gray[300],
  borderRadius: '50%',
  fontSize: '1rem',
  '&:hover': {
    borderColor: accentColor,
    color: accentColor,
  },
};

const inputResetSx: SxProps<Theme> = {
  '& input': {
    padding: 0,
  },
};

const dateInputSx = (hasValue: boolean): SxProps<Theme> => ({
  fontSize: '0.8rem',
  color: hasValue ? 'text.primary' : 'text.disabled',
  fontWeight: 500,
  width: 115,
  '& input': {
    padding: 0,
    cursor: 'pointer',
  },
});

// ─── Guest Counter Sub-component ──────────────────────────────────────────────
interface GuestCounterProps {
  count: number;
  onChange: (count: number) => void;
}

const GuestCounter: React.FC<GuestCounterProps> = ({ count, onChange }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      py: 0.5,
    }}
  >
    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 60 }}>
      Guests
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        size="small"
        onClick={() => onChange(Math.max(0, count - 1))}
        sx={counterButtonSx}
      >
        −
      </IconButton>

      <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{count}</Typography>

      <IconButton size="small" onClick={() => onChange(count + 1)} sx={counterButtonSx}>
        +
      </IconButton>
    </Box>
  </Box>
);

// ─── Field Wrapper ────────────────────────────────────────────────────────────
interface SearchFieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  flex?: number;
}

const SearchField: React.FC<SearchFieldProps> = ({ label, icon, children, onClick, flex = 1 }) => (
  <Box
    onClick={onClick}
    sx={{
      flex,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      px: { xs: 2, md: 2.5 },
      py: 0.75,
      cursor: onClick ? 'pointer' : 'default',
      borderRadius: 2,
      transition: 'background 0.15s',
      '&:hover': onClick ? { backgroundColor: withAlpha(gray[900], 0.04) } : undefined,
      minWidth: 0,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <Box sx={{ color: accentColor, display: 'flex', alignItems: 'center', fontSize: 16 }}>
        {icon}
      </Box>

      <Typography
        variant="h6"
        sx={{
          //   fontSize: '0.65rem',
          fontWeight: 700,
          // letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: gray[800],
          // lineHeight: 1.5,
        }}
      >
        {label}
      </Typography>
    </Box>

    {children}
  </Box>
);

// ─── Main SearchBar ───────────────────────────────────────────────────────────
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [values, setValues] = useState<SearchValues>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
  });

  const [guestAnchor, setGuestAnchor] = useState<HTMLElement | null>(null);
  const guestOpen = Boolean(guestAnchor);

  const handleSearch = () => {
    onSearch?.(values);
  };

  const guestLabel =
    values.guests === 0 ? 'Add guest' : `${values.guests} guest${values.guests > 1 ? 's' : ''}`;

  const dateLabel =
    values.checkIn && values.checkOut
      ? `${values.checkIn} → ${values.checkOut}`
      : values.checkIn
        ? values.checkIn
        : 'Add dates';

  return (
    <Box sx={searchBarWrapperSx}>
      <SearchField label="Location" icon={<LocationOnOutlinedIcon />}>
        <InputBase
          value={values.location}
          onChange={(e) => setValues((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="Where do you want to go?"
          sx={{
            ...inputResetSx,
            '& input::placeholder': {
              color: disabledTextColor,
              fontSize: '0.875rem',
            },
          }}
        />
      </SearchField>

      <Divider orientation="vertical" flexItem sx={dividerSx} />

      <SearchField label="Travel Dates" icon={<CalendarMonthOutlinedIcon />} flex={1.2}>
        <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
          <InputBase
            type="date"
            value={values.checkIn}
            onChange={(e) => setValues((prev) => ({ ...prev, checkIn: e.target.value }))}
            sx={dateInputSx(!!values.checkIn)}
          />

          {values.checkIn ? (
            <>
              <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>→</Typography>

              <InputBase
                type="date"
                value={values.checkOut}
                inputProps={{ min: values.checkIn }}
                onChange={(e) => setValues((prev) => ({ ...prev, checkOut: e.target.value }))}
                sx={dateInputSx(!!values.checkOut)}
              />
            </>
          ) : (
            <Typography sx={placeholderTextSx}>{dateLabel}</Typography>
          )}
        </Box>
      </SearchField>

      <Divider orientation="vertical" flexItem sx={dividerSx} />

      <SearchField
        label="Guest"
        icon={<PersonOutlineOutlinedIcon />}
        onClick={(e) => setGuestAnchor(e.currentTarget)}
        flex={1}
      >
        <Typography sx={values.guests > 0 ? activeTextSx : placeholderTextSx}>
          {guestLabel}
        </Typography>
      </SearchField>

      <Popover
        open={guestOpen}
        anchorEl={guestAnchor}
        onClose={() => setGuestAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 1,
            p: 2,
            borderRadius: 3,
            boxShadow: `0 8px 32px ${withAlpha(gray[900], 0.12)}`,
            minWidth: 200,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 700,
            mb: 1,
            // color: 'text.secondary',
          }}
        >
          HOW MANY GUESTS?
        </Typography>

        <GuestCounter
          count={values.guests}
          onChange={(count) => setValues((prev) => ({ ...prev, guests: count }))}
        />
      </Popover>

      <Box sx={{ p: 0.5, flexShrink: 0 }}>
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          sx={searchButtonSx}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
