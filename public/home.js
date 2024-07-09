function Home(){
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    // if(ctx.user[i]) {
      console.log(ctx.user)
    // }
    const header  = `current user: ${account.email}`
    return (
      <Card
        txtcolor="dark"
        bgcolor="light"
        header="Full Stack Banking App"
        title="Welcome to JB Bank"
        text="You can move around using the navigation bar. Start by logging in or by creating a new account."
        body={(<img src="jbbank-png.jpeg" className="img-fluid" alt="Responsive image"/>)}
      />
    );  
  }