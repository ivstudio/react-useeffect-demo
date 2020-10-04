import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [dataLaunch, setDataLaunch] = useState([]);
  const [status, setStatus] = useState("loading");

  const url = "https://launchlibrary.net/1.2/launch/next/10";

  useEffect(() => {
    async function fetchLaunches() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw Error(`Error status ${response.status}`);
        }

        const dataLaunch = await response.json();
        setDataLaunch(dataLaunch.launches);
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    }

    fetchLaunches();
  }, []);

  if (status === "error") {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      {status === "loading"
        ? "loading..."
        : dataLaunch.map((launch) => (
            <ul key={launch.id}>
              <li>{launch.location.name}</li>
              <li>{launch.rocket.name}</li>
            </ul>
          ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
