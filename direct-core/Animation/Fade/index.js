import makeAnimation from '../../makeAnimation';
import fade from 'style';

const timeout = {
  enter: 300,
  exit: 200
};

export default makeAnimation( fade , timeout );
