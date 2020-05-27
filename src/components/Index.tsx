import { React, axios } from "../../dep.ts";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      h2: any;
      header: any;
      p: any;
      input: any;
    }
  }
}

const App = () => {
  const [query, setQuery] = (React as any).useState(
    "SELECT sql_calc_found_rows SN FROM ml_switch WHERE Test_Station='总检' AND Test_Require='以管理板为主' AND Product_Model='S5750-24GT8SFP-P' ORDER BY Record_Time DESC limit 0,50",
  );
  const [text, setText] = (React as any).useState("");
  const handlePost = async () => {
    const res = await axios.post("/mysql", {
      query,
    });
    setText(JSON.stringify(res.data));
  };

  return (
    <div style={{ padding: 15 }}>
      <h1 className="title">Deno MYSQL</h1>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            查询
          </p>
        </header>
        <div className="card-content">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Find a repository"
                value={query}
                onChange={(e: any) => {
                  setQuery(e.target.value);
                }}
                onKeyUp={(e: any) => {
                  if(e.keyCode === 13) {
                    handlePost();
                  }
                }}
              />
            </div>
            <div className="control">
              <button className="button is-info" onClick={handlePost}>
                查询
              </button>
            </div>
          </div>
        </div>
      </div>
      {text && <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            结果
          </p>
        </header>
        <p className="card-content">{text}</p>
      </div>}
    </div>
  );
};

export default App;
