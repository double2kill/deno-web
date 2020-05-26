import { React, axios } from "../../dep.ts";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
      input: any;
    }
  }
}

const App = () => {
  const [query, setQuery] = (React as any).useState("");
  const [text, setText] = (React as any).useState("");
  const handlePost = async () => {
    const res = await axios.post("/mysql", {
      query,
    });
    setText(JSON.stringify(res.data));
  };

  return (
    <div>
      <h1>Deno mysql</h1>
      <div>
        <input
          style={{ width: "100%" }}
          value={query}
          onChange={(e: any) => {
            setQuery(e.target.value);
          }}
        >
        </input>
      </div>
      <button onClick={handlePost}>搜索</button>
      <p>{text}</p>
    </div>
  );
};

export default App;
