function CreateAccount(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [user, setUser]     = React.useState('none');
  
    return (<>
      <Card
        bgcolor="warning"
        txtcolor="dark"
        header="Create an Account"
        status={status}
        body={show ? 
          <CreateForm setUser={setUser} setShow={setShow}/> : 
          <CreateMsg user={user} setShow={setShow}/>}
          />
          </>
    )
  }
  
  function CreateMsg(props){
    
    function handleCreate() {  
      location.href = "#";
      //alert('Account created. Please Login');
    }
  
    return(<>
      <h6>Account created: {props.user}</h6><br/>
      <h6>Proceed to login.</h6><br/>
      <button type="submit" 
        className="btn btn-light" 
        onClick={handleCreate}>Return to Home</button>
    </>);
  }
  
  function CreateForm(props){
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);  
  
    function handle(){
      console.log(`Creating account: ${name}, ${email}, ${password}, balance: 0`);
      const balance = 0;
      //console.log(ctx)
      
      const url = `account/create/${name}/${email}/${password}`;
      (async () => {
        var res = await fetch(url); // catchs the response with url data from the database(user)
        var data = await res.json(); //set that user equal to 'data'
        //console.log(data);
        
        if(data.email != ''){
          ctx.user.push({
            name: data.name,
            email: data.email,
            password: data.password,
            balance: data.balance,
          });
          props.setUser(data.email);
          console.log(`Account created and logged in: ${email}`);
          props.setShow(false);
          return;
        }
        if(data.email == ''){
          props.setUser('please enter a valid email address')
          console.log('please enter a valid email address');
          return;
        }
      })();
    }    
  
    return (<>
  
      Name:<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter name" 
        value={name} 
        onChange={e => setName(e.currentTarget.value)} /><br/>
  
      Email address:<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password:<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Create Account</button>
  
    </>);
  }