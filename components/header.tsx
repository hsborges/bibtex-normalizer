/**
 * @author Hudson Silva Borges
 */

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, HTMLAttributes } from 'react';
import { IoBook, IoCodeSlash, IoHomeSharp, IoInformationCircleOutline } from 'react-icons/io5';

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
    paddingTop: '0.5em',
    width: 'calc(100% + 15px)',
    borderBottom: '1px solid $teal3',
    paddingBottom: '1em',
    rowGap: 2,
  },
});

const Logo = styled('a', {
  fontSize: '2.5em',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontWeight: 'bolder',
  color: '$gray11',

  [`& svg`]: { marginRight: '0.25em' },

  '@sm': {
    '& > span': { display: 'none' },
    [`& svg`]: { marginRight: 0, marginBottom: 5 },
  },
});

const Menu = styled('div', {
  display: 'flex',
  fontSize: 'calc(1em + 2px)',
  color: '$gray9',
});

type MenuItemProps = { href: string; title: string; icon: FunctionComponent };
const MenuItem = styled(
  function (props: MenuItemProps & HTMLAttributes<HTMLAnchorElement>) {
    const { icon: Icon, href, ...aProps } = props;
    return (
      <Link href={href} shallow>
        <a {...aProps}>
          <Icon /> {props.title}
        </a>
      </Link>
    );
  },
  {
    display: 'inline-flex',
    padding: '0 0.5em',

    '& svg': { marginRight: '2px' },
    '&.active': { color: '$teal9', fontWeight: 'bolder' },

    '@sm': { padding: '0 0.5em' },
  }
);

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
