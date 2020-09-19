import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  //array destructuring
  const [dataLaunch, setDataLaunch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   fetch("https://launchlibrary.net/1.2/launch/next/10")
  //     .then(response => response.json())
  //     .then(dataLaunch => setDataLaunch(dataLaunch.launches));
  // }, []);

  useEffect(() => {
    async function fetchLaunches() {
      setError(false);
      setLoading(true);

      try {
        const response = await fetch(
          "https://launchlibrary.net/1.2/launch/next/10"
        );

        if (response.ok) {
          const dataLaunch = await response.json();
          setDataLaunch(dataLaunch.launches);
        } else {
          throw Error(`Error status ${response.status}`);
        }
      } catch (e) {
        setError(true);
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchLaunches();
  }, []);

  const renderLaunches = () => {
    return loading === true
      ? "loading..."
      : dataLaunch.map((launch) => (
          <ul key={launch.id}>
            <li>{launch.location.name}</li>
            <li>{launch.rocket.name}</li>
          </ul>
        ));
  };

  return (
    <div>
      {error && <div>Something went wrong...</div>}
      {renderLaunches()}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
