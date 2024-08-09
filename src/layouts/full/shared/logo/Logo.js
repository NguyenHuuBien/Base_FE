import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  width: '180px',
  overflow: 'hidden',
  display: 'block',
  marginTop: 20,
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={require('src/assets/images/logos/logo.png')} width={'100%'} alt='logo' />
    </LinkStyled>
  )
};

export default Logo;
