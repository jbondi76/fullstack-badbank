function Balance(){
    const [show, setShow]       = React.useState(true);
    const [status, setStatus]   = React.useState('');
    const [user, setUser] = React.useState('');  
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    const header  = `View balance for account: ${account.email}`
    return (<>
      <Card
        bgcolor="warning"
        txtcolor="dark"
        header={header}
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus} setUser={setUser}/> :
          <BalanceMsg setShow={setShow} user={user}/>}
          />
          </>
    )
  
  }
  
  function BalanceMsg(props){
    return(<>
      <h7>Your balance: ${props.user.balance}</h7><br/><br/>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Hide Balance
      </button><br/>
    </>);
  }
  
  function BalanceForm(props){
  
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    console.log(ctx.user.length);
  
  function handle(){
    props.setUser(account);
    props.setShow(false);
  }
  return (
    <>
    <button type="submit" className="btn btn-light" onClick={handle}>View Balance</button>
    </>
      )
    }