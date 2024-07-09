function DeleteAccount(){
    const show = true;
    const ctx = React.useContext(UserContext);
    let i = ctx.user.length - 1;
    const account = ctx.user[i];
    const header = `Delete account: ${account.email}`
    
    return(<>
    <Card
    bgcolor="warning"
    txtcolor="dark"
    header={header}
    body={show ? 
      <DeleteAccountForm/> :
      <DeleteAccountMsg/>}
      />
      </>
      );  
    }
    
function DeleteAccountForm(){
const ctx = React.useContext(UserContext);
let i = ctx.user.length - 1;
const account = ctx.user[i];
const email = account.email;

function handle(){
const url = `account/destroy/${email}`;
(async() => {
var res = await fetch(url); // catchs the response with url data from the database(user)
var data = await res.json(); //set that user equal to 'data'
console.log(data);

if(data.email == email){
  location.href = "#";
  location.reload();
  alert("Your Badbank account has been deleted.");
}
  })();

}

return(<>
     <button type="submit" 
     className="btn btn-light" 
     onClick={handle}>Delete my account</button>
</>);
}