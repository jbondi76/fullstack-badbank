function Deposit(){
    const [show, setShow]       = React.useState(true);
    const [status, setStatus]   = React.useState(''); 
    const [deposit, setDeposit] = React.useState('');
    const [balance,setBalance]  = React.useState('');
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    const header  = `Deposit to account: ${account.email}`
    return (<>
      <Card
        bgcolor="warning"
        txtcolor="dark"
        header={header}
        status={status}
        body={show ? 
          <DepositForm setBalance={setBalance} setDeposit={setDeposit} setShow={setShow} setStatus={setStatus}/> :
          <DepositMsg balance={balance} deposit={deposit} setShow={setShow}/>}
          />
          </>
    )
  }
  
  function DepositMsg(props){
    return (<>
      <h6>Deposit complete: ${props.deposit}.</h6><br/>
      <h7>New Balance: ${props.balance}</h7><br/><br/>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Deposit again
      </button><br/>
    </>);
  } 
  
  function DepositForm(props){
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);
  
    function handle(){
      let i = ctx.user.length - 1;
      const account = ctx.user[i];
      console.log(account.email, amount)
      const url = `account/deposit/${account.email}/${amount}`;
      (async ()=> {
        var res = await fetch(url); // catchs the response with url data from the database(user)
        var data = await res.json(); //set that user equal to 'data'
        const user = data;
        console.log(data);
        console.log(ctx);
        props.setShow(false);
      
      if(!user) {
        props.setStatus('You are not logged in.');
        return;      
      }
        account.balance = account.balance + Number(amount);
        props.setDeposit(amount);
        props.setBalance(account.balance);
        console.log(user);
        console.log(user.balance);    
        props.setShow(false);
      })();
      }
    
  
    return(<>
        
      Deposit amount:<br/><br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Deposit</button>
  
    </>);
  }