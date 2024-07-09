function Savings(){
    const [show, setShow]       = React.useState(true);
    const [status, setStatus]   = React.useState(''); 
    const [deposit, setDeposit] = React.useState('');
    const [balance,setBalance]  = React.useState('');
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    const header  = `current user: ${account.email}`
    return (<>
      <Card
        bgcolor="primary"
        header={header}
        status={status}
        body={show ? 
          <SavingsForm setBalance={setBalance} setDeposit={setDeposit} setShow={setShow} setStatus={setStatus}/> :
          <SavingsMsg balance={balance} deposit={deposit} setShow={setShow}/>}
          />
          </>
    )
  }
  
  function SavingsMsg(props){
    return (<>
      <h7>Deposit of ${props.deposit} complete.</h7><br/>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Deposit Again
      </button><br/>
      <h7>New Balance: ${props.balance}</h7><br/><br/>
    </>);
  } 
  
  function SavingsForm(props){
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);
  
    function handle(){
      let i = ctx.user.length - 1;
      const account = ctx.user[i];
      console.log(account.email, amount)
      const url = `account/savings/${account.email}/${amount}`;
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
        account.savings = account.savings + Number(amount);
        props.setDeposit(amount);
        props.setBalance(account.balance);
        console.log(user);
        console.log(user.balance);    
        props.setShow(false);
      })();
      }
    
  
    return(<>
        
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Deposit</button>
  
    </>);
  }