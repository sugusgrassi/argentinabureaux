import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(100,190,240, 1)',
    fontFamily: 'Alegreya Sans',
    fontWeight: '900'
  },
  image: {
    marginLeft: '15px',
  },
}));