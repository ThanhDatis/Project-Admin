import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { FOOTER_LINKS, CONTACT_INFO, SOCIALS_LINKS } from '../../../../../shared/config/constant';
import type { FooterProps } from '../../../types';
import Logo from '../Header/Logo';

const Footer: React.FC<FooterProps> = ({
  variant = 'default',
  showSocial = true,
  showContact = true,
}) => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return <FacebookIcon />;
      case 'instagram':
        return <InstagramIcon />;
      case 'twitter':
        return <TwitterIcon />;
      default:
        return null;
    }
  };

  if (variant === 'minimal') {
    return (
      <Box
        component="footer"
        sx={{
          bgcolor: '#1a1a1a',
          color: '#ffffff',
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" color="grey.400">
              © {currentYear} TravelSocial. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a1a',
        color: '#ffffff',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Column 1: Logo + Description */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Logo size="medium" />
            </Box>
            <Typography variant="body2" color="grey.400" sx={{ mb: 3, lineHeight: 1.7 }}>
              A new-generation travel platform that helps you explore the world through the shared
              experiences, helping you create the most memorable trips.
            </Typography>

            {/* Social Icons */}
            {showSocial && (
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {SOCIALS_LINKS.map((social) => (
                  <Link
                    key={social.name}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: '#00ceb5',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {getSocialIcon(social.icon)}
                  </Link>
                ))}
              </Box>
            )}
          </Grid>

          {/* Column 2: About Us */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: '1rem',
              }}
            >
              {FOOTER_LINKS.about.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {FOOTER_LINKS.about.links.map((link) => (
                <Box component="li" key={link.path} sx={{ mb: 1.5 }}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: '#00ceb5',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Column 3: Explore */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: '1rem',
              }}
            >
              {FOOTER_LINKS.explore.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {FOOTER_LINKS.explore.links.map((link) => (
                <Box component="li" key={link.path} sx={{ mb: 1.5 }}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: '#00ceb5',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Column 4: Support */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: '1rem',
              }}
            >
              {FOOTER_LINKS.support.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {FOOTER_LINKS.support.links.map((link) => (
                <Box component="li" key={link.path} sx={{ mb: 1.5 }}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: '#00ceb5',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>

            {/* Contact Info */}
            {showContact && (
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <PhoneIcon sx={{ fontSize: 18, color: '#00ceb5' }} />
                  <Typography variant="body2" color="grey.300">
                    {CONTACT_INFO.phone}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="grey.500" sx={{ textAlign: 'center' }}>
            © {currentYear} TravelSocial™. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              component={RouterLink}
              to="/privacy"
              sx={{
                color: 'grey.500',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#00ceb5',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              sx={{
                color: 'grey.500',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#00ceb5',
                },
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              component={RouterLink}
              to="/sitemap"
              sx={{
                color: 'grey.500',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#00ceb5',
                },
              }}
            >
              Sitemap
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
