function Logout(){
    const [show,setShow] = React.useState(true);
    const [user, setUser] = React.useState('');
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    return (<>
      <Card
      bgcolor="primary"
      header={account.email}
      body={show ? 
        <LogoutForm  setShow={setShow}  setUser={setUser}/> :
        <LogoutMsg  setShow={setShow}  user={user}/>}
        />
        </>
        )
      }
      
      function LogoutMsg(props){
        const ctx = React.useContext(LoginContext);
  
      function goodbye(){
          props.setUser('');
          props.setShow(true);
          
        }
  
        return(<>
        <h5>Are you sure you want to log out {props.user.name}?</h5>
        <button type="submit" className="btn btn-light" onClick={goodbye}>Confirm Log-out</button>
      </>);
    }
    
    function LogoutForm(props){
  
      const ctx = React.useContext(UserContext);
      let i = ctx.user.length - 1;
      const account = ctx.user[i];
  
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
      