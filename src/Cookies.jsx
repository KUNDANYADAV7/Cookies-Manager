import React, { useState } from "react";
import Cookies from "js-cookie";
import "./Cookies.css";

const Cookie = () => {
  const [dataEntries, setDataEntries] = useState([]);
  console.log(dataEntries);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const setCookie = () => {
    if (keyInput && valueInput) {
      Cookies.set(keyInput, valueInput, { expires: 7 });
      setKeyInput("");
      setValueInput("");
    }
  };

  const getCookie = () => {
    const keys = Object.keys(Cookies.get());
    console.log(keys);
    const entries = keys.map((key) => ({ key, value: Cookies.get(key) }));
    console.log(entries);
    setDataEntries(entries);
  };

  const removeCookie = (key) => {
    Cookies.remove(key);
    getCookie();
  };

  const removeAllCookies = () => {
    const keys = Object.keys(Cookies.get());
    keys.forEach((key) => Cookies.remove(key));
    setDataEntries([]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Cookie Manager</h3>

      <div>
        <input
          type="text"
          placeholder="Enter Key"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Value"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
        <button onClick={setCookie}>Set Cookie</button>
      </div>

      <div>
        <br />
        <button onClick={getCookie}>Get Cookies</button>
      </div>

      <div>
        <h4>Current Cookies</h4>
        <table style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataEntries.map((entry) => (
              <tr key={entry.key}>
                <td>{entry.key}</td>
                <td>{entry.value}</td>
                <td>
                  <button onClick={() => removeCookie(entry.key)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        {dataEntries.length !== 0 && (
          <button onClick={removeAllCookies}>Remove All Cookies</button>
        )}
        {dataEntries.length === 0 && <p>No cookies set</p>}
      </div>
    </div>
  );
};

export default Cookie;
