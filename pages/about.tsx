/**
 * @author Hudson Silva Borges
 */
import { HTMLAttributes } from 'react';

import * as Avatar from '@radix-ui/react-avatar';

import { styled } from '../stitches.config';

const MemberComponent = styled(
  ({ member, ...props }: HTMLAttributes<HTMLDivElement> & { member: MemberInfoType }) => (
    <div {...props}>
      <ImageComponent src={`/images/${member.photo}`} />
      <span>{member.name}</span>
      <span>{member.email}</span>
    </div>
  ),
  {
    display: 'inline-flex',
    flexFlow: 'column',
    rowGap: 0,
    alignItems: 'center',
    '& > *:nth-child(2)': { fontWeight: 'bolder' },
    '& > span + span': { marginTop: -5 },
    fontSize: '0.9em',
    '@sm': { fontSize: '0.85em' },
  }
);

const Grid = styled('div', {
  margin: 'auto',
  marginTop: '4em',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '4em',
  lineHeight: '1.5em',
  width: '60%',

  '& > .section': {
    textAlign: 'center',

    [`& ${MemberComponent} + ${MemberComponent}`]: {
      marginLeft: '2em',
    },
  },

  '@sm': { width: '90%' },
});

const Link = styled('a', { color: '$teal9' });

type MemberInfoType = {
  name: string;
  photo: string;
  email: string;
};

const teamInfo: MemberInfoType[] = [
  {
    name: 'Hudson S. Borges',
    photo: 'hudson.jpg',
    email: 'hsborges[at]facom.ufms.br',
  },
  {
    name: 'Paulo H. de Carvalho',
    photo: 'paulo.jpg',
    email: 'paulocarvalho[at]dcc.ufmg.br',
  },
];

const ImageComponent = styled(
  ({ src, ...props }: HTMLAttributes<HTMLSpanElement> & { src: string }) => (
    <Avatar.Root {...props}>
      <Avatar.Image src={src} className="image" />
    </Avatar.Root>
  ),
  {
    '& > .image': {
      height: 125,
      padding: 4,
      margin: 4,
      border: '1px solid $gray6',

      '@sm': { height: 115 },
    },
  }
);

const SpacedGrid = styled('div', { display: 'flex', justifyContent: 'space-evenly' });

export default function SettingComponent() {
  return (
    <Grid>
      <div className="section">
        Bibtex Normalizer is maintained by{' '}
        <abbr title="Laboratório de Desenvolvimento de Software">LEDES</abbr>, from Federal
        University of Mato Grosso do Sul, and{' '}
        <Link href="http://aserg.labsoft.dcc.ufmg.br/" target="_blank" rel="noreferrer">
          Applied Software Engineering Research Group
        </Link>
        , from Federal University of Minas Gerais, Brazil.
      </div>
      <SpacedGrid className="section">
        {teamInfo.map((member) => (
          <MemberComponent key={member.email} member={member} />
        ))}
      </SpacedGrid>
    </Grid>
  );
}
