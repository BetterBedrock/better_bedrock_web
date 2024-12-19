import React, { useEffect, useState } from "react";
import "./Loading.css";
import { useNavigate } from "react-router-dom";
import CircularProgressIndicator from "../components/bedrock/CircularProgressIndicator";
import { API_ADDRESS } from "../utils/Global";

const Loading: React.FC = () => {
  const [serverConnection, setServerConnection] = useState(false);

  const [serverStatus, setServerStatus] = useState(false);
  const [serverStatusMessage, setServerStatusMessage] = useState("");
  

  const navigate = useNavigate();

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        let headers = new Headers();

        // headers.append("Content-Type", "application/json");
        // headers.append("Accept", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        const response = await fetch(`${API_ADDRESS}/info`, {
          headers: headers,
          // mode: 'no-cors',
        });
        const jsonResponse = await response.json();

        // console.log(jsonResponse);

        localStorage.setItem("bbInfo", JSON.stringify(jsonResponse));
        // console.log(
        //   "LocalStorage of betterBedrock: ",

        // );
        console.log(JSON.parse(localStorage.getItem("bbInfo") ?? "{}"));

        if (jsonResponse.status !== undefined && jsonResponse.status_message !== undefined) {
          setServerConnection(true);
          if (response.ok) {
            setServerStatus(jsonResponse.status);
            setServerStatusMessage(jsonResponse.status_message)
            return;
          }
        } else {
          setServerConnection(false);
        }

        setServerStatusMessage("Bad message from server.");
        setServerStatus(false);

        // if (response.ok) {
        //   navigate("/home");
        // } else {
        //   console.error("Server is not reachable:", response.status);
        // }
      } catch (error) {
        setServerConnection(false);
        setServerStatusMessage("Could not connect to the server.");
        setServerStatus(false);
        console.error("Failed to fetch server status:", error);
      }
    };

    checkServerStatus();
  }, [navigate]);

  return (
    <>
    <p style={{color: "white"}}>{`You are ${serverConnection ? "Connected with" : "Disconnected from"} the server`}</p>
    <p style={{color: "white"}}>{`The server is ${serverStatus ? "open" : "closed"} for messages. Reason: ${serverStatusMessage}`}</p>
    </>
    // <CircularProgressIndicator
    //   width={"58px"}
    //   height={"58px"}
    // ></CircularProgressIndicator>
  );
};

export default Loading;
