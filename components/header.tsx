/**
 * @author Hudson Silva Borges
 */

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, HTMLAttributes } from 'react';
import {
  IoBook,
  IoCodeSlash,
  IoCogOutline,
  IoHomeSharp,
  IoInformationCircleOutline,
} from 'react-icons/io5';

import { styled } from './../stitches.config';

const Header = styled('header', {
  display: 'inline-flex',
  backgroundColor: 'White',
  margin: '1.5em 0',
  flexFlow: 'column',
  alignItems: 'center',
  rowGap: 8,

  '@sm': {
    margin: 0,
    paddingTop: '1em',
    width: 'calc(100% + 15px)',
    borderBottom: '1px solid $teal3',
    paddingBottom: '1.5em',
    rowGap: 4,
  },
});

const Logo = styled('a', {
  fontSize: '2.5em',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontWeight: 'bolder',
  color: '$gray11',

  [`& svg`]: {
    marginRight: '0.25em',
    height: '1em',
  },

  '@sm': {
    '& > span': {
      display: 'none',
    },

    [`& svg`]: {
      height: '1em',
      marginRight: 0,
      marginBottom: 5,
    },
  },
});

const Menu = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '1.1em',
  color: '$gray9',

  '@sm': {
    fontSize: '1em',
  },
});

const MenuItemComponent: FunctionComponent<
  {
    href: string;
    title: string;
    icon: FunctionComponent;
  } & HTMLAttributes<HTMLAnchorElement>
> = ({ icon: Icon, href, ...props }) => (
  <Link href={href}>
    <a {...props}>
      <Icon /> <span>{props.title}</span>
    </a>
  </Link>
);

const MenuItem = styled(MenuItemComponent, {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 0.85em',
  borderRadius: 6,

  '& svg': {
    height: '1em',
    width: '1em',
    marginRight: '2px',
  },

  '&.active': {
    color: '$teal9',
    fontWeight: 'bolder',
  },

  '@sm': {
    padding: '0 0.5em',
  },
});

export default function HeaderComponemt(props: HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  return (
    <Header {...props}>
      <Link href="/" passHref>
        <Logo>
          <IoBook />
          <span>Bibtex-normalizer</span>
        </Logo>
      </Link>
      <Menu>
        <MenuItem
          href="/"
          title="Home"
          icon={IoHomeSharp}
          className={`${router.pathname === '/' ? 'active' : ''}`}
        />
        <MenuItem
          href="/settings"
          title="Settings"
          icon={IoCogOutline}
          className={`${router.pathname === '/settings' ? 'active' : ''}`}
          css={{ '@sm': { display: 'none' } }}
        />
        <MenuItem
          href="/editor"
          title="Editor"
          icon={IoCodeSlash}
          className={`${router.pathname === '/editor' ? 'active' : ''}`}
        />
        <MenuItem
          href="/about"
          title="About"
          icon={IoInformationCircleOutline}
          className={`${router.pathname === '/about' ? 'active' : ''}`}
        />
      </Menu>
    </Header>
  );
}
