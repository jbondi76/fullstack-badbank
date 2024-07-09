function NavBar(){
    const [show,setShow] = React.useState(true);
    const [account, setAccount] = React.useState('');
  
    return( show ?
      <NavLoggedOut setShow={setShow}/>:
      <NavLoggedIn show={show} setShow={setShow} setAccount={setAccount} account={account}/>
      );
    }
    
    function NavLoggedIn(props){
      const ctx = React.useContext(UserContext);
      let i = ctx.user.length - 1;
      const account = ctx.user[i];
      const email = account.email;
  
      
      function handleLogout() {  
        location.href = "#";
        location.reload();
        alert('BadBank: Logout Successful.');
      }
  
      return(
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Home</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/userdata/">My-Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">All-Data</a>
          </li>
        </ul>
      </div>
          <li className="nav justify-content-end">
            <a className="nav-link disabled">Logged in: {email}</a>
          </li>
        <ul className="nav justify-content-end">
        <button type="submit" className="btn btn-light" onClick={handleLogout}>Logout</button>
        </ul>
    </nav>
  
  );
  }
  
  function NavLoggedOut(props){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);
    
    function handle(){
      const url = `account/login/${email}/${password}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        const user = data;
        console.log(data);
        console.log(email, password);
        //setEmail(user.email);
        //setPassword(user.password); 
        
        if (!user) {
          console.log('User does not exist!');
          alert(`Sorry, but ${email} is not associated with any accounts.`)
          return;      
        }
        if (user.password == password) {
          ctx.user.push({
            name    : user.name,
            email   : user.email,
            password: user.password,
            balance : user.balance,
          });
          console.log('Login successful!')
          props.setShow(false);
          //alert(`Hello ${user.name} thank you for logging in`)
          //privileges.status = 'true';
          return;      
        }
        console.log('Password incorrect')          
        //props.setStatus('sorry, no user was found, please try again');        
      })();
    }
  
    return(
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
          </ul>
        </div>
        <li className="nav justify-content-end">
            <a className="nav-link disabled">Login Here:</a>
          </li>
        <ul className="navbar-nav">
        <input type="input" 
        className="form-control" 
        placeholder="email" 
        size="20"
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/>
        </ul>
        <ul className="navbar-nav">
        <input type="password" 
        className="form-control" 
        placeholder="password" 
        size="20"
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/>
        </ul>
        <ul className="navbar-nav">
        <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
        </ul>
      </nav>
    );
  }