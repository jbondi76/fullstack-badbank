function Withdraw(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [withdraw, setWithdraw] = React.useState('');
    const [balance,setBalance]  = React.useState('');
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    const header  = `Withdraw from account: ${account.email}`
    return (
      <Card
        bgcolor="warning"
        txtcolor="dark"
        header={header}
        status={status}
        body={show ? 
          <WithdrawForm setBalance={setBalance}setWithdraw={setWithdraw} setShow={setShow} setStatus={setStatus}/> :
          <WithdrawMsg balance={balance} withdraw={withdraw} setShow={setShow}/>}
          />
    )
  }
  
  function WithdrawMsg(props){
    return (<>
      <h6>Withdrawal complete: ${props.withdraw}.</h6><br/>
      <h7>Remaining Balance: ${props.balance}</h7><br/><br/>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Withdraw Again
      </button><br/>
    </>);
  } 
  
  function WithdrawForm(props){
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);
  
    function handle(){
      let i = ctx.user.length - 1;
      const account = ctx.user[i]
      console.log(account.email, amount)
      const url = `account/withdraw/${account.email}/${amount}`;
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
        account.balance = account.balance - Number(amount);
        props.setWithdraw(amount);
        props.setBalance(account.balance);
        console.log(user.balance);
        console.log(account.balance);
        props.setStatus('');      
        props.setShow(false);
      })();
      }
    
  
    return(<>
      Withdraw amount:<br/><br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Withdraw</button>
  
    </>);
  }