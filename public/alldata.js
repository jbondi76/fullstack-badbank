function AllData(){
    const [data, setData] = React.useState('');
    
    fetchData().then(res => {
      setData(res)
    });

    const styleTr = {
      color: "#D68910",
      border: "1px solid grey",
      padding: "8px",
      background:"black"
    }

    const styleTd = {
      color: "#D68910",
      border: "1px solid grey",
      padding: "5px",
      background: "black"
    }
    
    

    return (
      Array.isArray(data) ? 
      <>
      <h5>All Data in Store:</h5>
      <table>
        <tr style={styleTr}><th style={styleTd}>id</th><th style={styleTd}>name</th><th style={styleTd}>email</th><th style={styleTd}>password</th><th style={styleTd}>balance</th></tr>
        {data.map(d => {
        return (
          <tr key={d._id}  style={styleTr}><td style={styleTd}>{d._id}</td><td style={styleTd}>{d.name}</td><td style={styleTd}>{d.email}</td><td style={styleTd}>{d.password}</td><td style={styleTd}>${d.balance}</td></tr>
        )
      })}
      </table>

      {/* {data} */}
      </> : <h2>loading data.....</h2>
    );
  }
  
  async function fetchData(){
    return await fetch('/account/all')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // setData(JSON.stringify(data));
      return data;
  });
}
