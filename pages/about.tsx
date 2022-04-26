/**
 * @author Hudson Silva Borges
 */
import { HTMLAttributes } from 'react';

import * as Avatar from '@radix-ui/react-avatar';
import { styled } from '@stitches/react';

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
    rowGap: 2,
    alignItems: 'center',
    '& > *:nth-child(2)': { fontWeight: 'bolder' },
  }
);

const Grid = styled('div', {
  fontSize: 16,
  margin: 'auto',
  marginTop: '4em',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '4em',
  lineHeight: '1.5em',

  '& > .section': {
    textAlign: 'center',

    [`& ${MemberComponent} + ${MemberComponent}`]: {
      marginLeft: 50,
    },
  },
});

const Link = styled('a', { color: '$teal9' });

type MemberInfoType = {
  name: string;
  photo: string;
  email: string;
};

const teamInfo: MemberInfoType[] = [
  {
    name: 'Hudson Silva Borges',
    photo: 'hudson.jpg',
    email: 'hsborges[at]dcc.ufmg.br',
  },
  {
    name: 'Paulo Henrique de Carvalho',
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
      height: 150,
      padding: 4,
      margin: 4,
      border: '1px solid $gray6',
    },
  }
);

const SpacedGrid = styled('div', { display: 'flex', justifyContent: 'space-evenly' });

export default function SettingComponent() {
  return (
    <Grid>
      <div className="section">
        Bibtex Normalizer is maintained by <br />
        <abbr title="Laboratório de Desenvolvimento de Software">LEDES</abbr>, from Federal
        University of Mato Grosso do Sul, and <br />
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
