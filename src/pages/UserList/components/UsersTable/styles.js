export default theme => ({
  root: {},
  tableRow: {
    height: '64px'
  },
  tableCell: {
    whiteSpace: 'nowrap'
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: "#ffa8a4",
    display: 'inline-flex',
    fontSize: '14px',
    fontWeight: 500,
    height: '36px',
    width: '36px'
  },
  nameText: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
    fontWeight: 500,
    cursor: 'pointer'
  },
  button:{
    marginTop: theme.spacing(3),
    borderRadius:"50%",
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
    color:"#ffffff",
  }
});
