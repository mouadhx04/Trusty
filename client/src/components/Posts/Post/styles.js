import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
     paddingTop: '56.25%',
    marginTop: '54px',
    height: '80px',
    width: '100%'
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    width: '328px',
    background:'#fff',
    padding: '3px',
    position: 'relative',
    borderRadius: '8px',
    boxShadow: 'rgb(3 0 71 / 9%) 0px 1px 3px',
    margin: '4px'
  },
  overlay: {
    position: 'absolute',
    top: '-12px',
    left: '-11px',
    color: '#424242b0',
 
  },
  overlay2: {
    position: 'absolute',
  
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    
  },
  title: {
      },
  cardActions: {
     display: 'flex',
    justifyContent: 'space-between',
  },
  rightAlignItem: {
    marginLeft: "auto"
  },

  centerbtn: {
    width: 290,
    height: 10,
    display: 'flex',
    justifycontent: 'center',
    alignitems: 'center',
  },

});
