import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { deleteSession } from '@API/requests';

const settings = [
  { label: 'Rated List', path: '/rated-list' },
  { label: 'For You', path: '/for-you' },
  { label: 'Preference', path: '/preference' },
];
const privatePaths = ['/', '/rated-list', '/for-you', '/search', '/preference'];

const Header: FC = () => {
  const router = useRouter();

  const [shouldShowOptions, setShouldShowOptions] = useState<boolean>(false);
  const [shouldShowSearchOptions, setShouldShowSearchOptions] =
    useState<boolean>(true);
  const [shouldHeaderBeBlack, setShouldHeaderBeBlack] =
    useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [searchString, setSearchString] = useState<string>('');

  useEffect(() => {
    window.addEventListener('scroll', e => {
      if (window.scrollY < 100) {
        setShouldHeaderBeBlack(false);
      } else {
        setShouldHeaderBeBlack(true);
      }
    });
  }, []);

  useEffect(() => {
    if (
      privatePaths.filter(privatePath => router.asPath.includes(privatePath))
        .length
    ) {
      setShouldShowOptions(true);
    }

    if (router.asPath === '/search') {
      setShouldShowSearchOptions(false);
    }
  }, [router]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearchString(e.target.value);
  };

  const redirect = (path: string) => {
    handleCloseUserMenu();
    router.push(path);
  };

  const moveToSearchPage = (e: React.FormEvent<HTMLFormElement>) => {
    router.push(`/search?keyword=${searchString}`);
    e.preventDefault();
  };

  const logout = async () => {
    const Cookie = (await import('js-cookie')).default;
    const sessionId = JSON.parse(Cookie.get('userToken') as string)?.session_id;
    await deleteSession(sessionId);
    Cookie.remove('userToken');
    router.push('/login');
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      className={`z-50 top-0 transition-all duration-500 ease-in-out top-0 w-full flex bg-background from-headerBackground to-transparent justify-between sm:justify-start ${
        shouldHeaderBeBlack ? 'bg-headerBackground' : ''
      }`}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className={`mr-50 ${!shouldShowSearchOptions ? 'flex-1' : ''}`}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={92}
                height={25}
                alt="Netflix"
              />
            </Link>
          </Box>

          {shouldShowOptions && (
            <>
              {shouldShowSearchOptions && (
                <Box className="ml-5 flex-1">
                  <Box
                    component="form"
                    className="bg-zinc-800 w-1/4 flex justify-between rounded px-2"
                    onSubmit={moveToSearchPage}
                  >
                    <InputBase
                      className="text-white"
                      placeholder="Search Movies"
                      onChange={handleSearchInputChange}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: '10px' }}
                      aria-label="search"
                      className="text-white"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(setting => (
                    <MenuItem
                      key={setting.label}
                      onClick={() => redirect(setting.path)}
                    >
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
