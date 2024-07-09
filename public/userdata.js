function UserData(){
    const [show,setShow] = React.useState(true);
    const [user, setUser] = React.useState('');
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    const header  = `Account Overview: ${account.email}`
  
    return (<>
      <Card
      bgcolor="warning"
      txtcolor="dark"
      header={header}
      body={show ? 
        <UserDataForm  setShow={setShow}  setUser={setUser}/> :
        <UserDataMsg  setShow={setShow}  user={user}/>}
        />
        </>
        )
      }
      
      function UserDataMsg(props){
        return(<>
        <h7>Name            : {props.user.name}</h7><br/>
        <h7>Email/Username  : {props.user.email}</h7><br/>
        <h7>Password        : {props.user.password}</h7><br/>
        <h7>Account Balance : ${props.user.balance}</h7><br/><br/>
        <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Hide Account Info</button>
      </>);
    }
    
    function UserDataForm(props){
  
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
      <button type="submit" className="btn btn-light" onClick={handle}>View Account Info</button>
      </>
        )
      }
      