function Spa() {
    return (
      <HashRouter>
        <div>
          <UserContext.Provider value = {{user:[{name: null, email: 'none', password: null, balance: Number(null)}]}}>
          <NavBar/>     
            <div className="container" style={{padding: "20px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route path="/login/" component={Login} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              {/* <Route path="/transactions/" component={Transactions} /> */}
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
              <Route path="/userdata/" component={UserData} />
              <Route path="/deleteaccount/" component={DeleteAccount} />
            </div>
          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  }
  
  ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
  );