import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    boxShadow: "rgb(43, 52, 69 / 10%) 0px 4px 16px;",
    borderRadius: 5,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    marginTop:'20px'
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    marginTop:'40px', marginBottom:'40px' ,

    backgroundColor: '#f5fafd',
    [theme.breakpoints.down('xs')]: {
      flexDirection: '',
    },
  },
}));