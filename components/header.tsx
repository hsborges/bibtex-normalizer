/**
 * @author Hudson Silva Borges
 */

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, HTMLAttributes } from 'react';

import { CodeIcon, GearIcon, HomeIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';

const Header = styled('header', {
  display: 'inline-flex',
  backgroundColor: 'White',
  margin: '1.5em 0',
  flexFlow: 'column',
  alignItems: 'center',
  rowGap: 8,
});

const Logo = styled('a', {
  fontSize: '3em',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontWeight: 'bolder',

  '& img': {
    paddingRight: '0.25em',
    height: '1em',
  },
});

const Menu = styled('div', {
  marginLeft: '0.5em',
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '1.1em',
  opacity: 0.75,
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
    color: '$violet9',
    fontWeight: 'bolder',
  },
});

export default function HeaderComponemt(props: HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  return (
    <Header {...props}>
      <Link href="/" passHref>
        <Logo>
          <img src="/images/logo.png" alt="Bibtex normalizer logo" />
          Bibtex-normalizer
        </Logo>
      </Link>
      <Menu>
        <MenuItem
          href="/"
          title="Home"
          icon={HomeIcon}
          className={`${router.pathname === '/' ? 'active' : ''}`}
        />
        <MenuItem
          href="/settings"
          title="Settings"
          icon={GearIcon}
          className={`${router.pathname === '/settings' ? 'active' : ''}`}
        />
        <MenuItem
          href="/editor"
          title="Editor"
          icon={CodeIcon}
          className={`${router.pathname === '/editor' ? 'active' : ''}`}
        />
        <MenuItem
          href="/about"
          title="About"
          icon={InfoCircledIcon}
          className={`${router.pathname === '/about' ? 'active' : ''}`}
        />
      </Menu>
    </Header>
  );
}
