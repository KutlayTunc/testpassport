import React, { useState } from "react"
import "./App.css"
import axios from "axios"

function App() {
  const [registerUserName, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginUserName, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [data, setData] = useState(null)

  const register = () => {
    axios({
      method: "post",
      data: {
        username: registerUserName,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:7070/register",
    }).then((res) => console.log(res))
  }
  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUserName,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:7070/login",
    }).then((res) => console.log(res))
  }
  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:7070/user",
    }).then((res) => setData(res.data))
  }

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeHolder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeHolder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input
          placeHolder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeHolder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome {data.username}</h1> : null}
      </div>
    </div>
  )
}

export default App
