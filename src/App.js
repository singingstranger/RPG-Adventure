import './App.css';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  InitStart();
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MyButton></MyButton>
        <br/>
        <MyButton></MyButton>
      </header>
    </div>*/
    <div>
      <div id="navigation"></div>
      <div style={{display: "inline-block", position: "relative"}}>
    
        <div 
        id="overlappingDiv"
        style={{
            backgroundColor: "black",
            position: "absolute", 
            top: 0,
            right:0, 
            bottom:0,
            left:0,
            opacity: 1, 
            pointerEvents: "none",
            zIndex: 10,
            }}>
        </div>

        <canvas></canvas>
        <div id="userInterface">

            <div id="playerStatusBar" 
              style={{
                  position: "absolute",
                  backgroundColor: "black", 
                  width: "25%",
                  height: "10%",
                  left: "10%",
                  top:"5%",
                  borderLeft: "5px blue solid"}}>
                  <div style={{margin:"5px", height: "100%"}}>
                      <h1 style={{margin: "5px"}}> Player </h1>
                      <div id="playerHealthBar" style={{position: "relative"}}>
                          <div 
                          id="playerPotentialHealthbar" 
                          style={{
                            height:"5px", 
                            backgroundColor: "white" 
                          }}>
                          
                          </div>

                          <div 
                          id="playerCurrentHealthbar" 
                          style={{
                            height:"5px", 
                            backgroundColor: "green", 
                            position: "absolute",
                            marginRight: "5px",
                            marginLeft: "0px",
                            top: 0
                            }}>
                              
                          </div>
                          <div id="enemyStatusBar"
                          style={{
                              position: "absolute", 
                              backgroundColor: "black",
                              width: "25%",
                              height: "10%", 
                              right: "10%", 
                              top:"5%",
                              borderLeft: "5px red solid"}}>
                              <div style={{margin:"5px", height: "100%"}}>
                                  <h1 style={{margin: "5px"}}> Enemy </h1>
                                  <div id="enemyHealthBar" style={{position: "relative"}}>
                                      <div 
                                      id="enemyPotentialHealthbar" 
                                      style={{
                                        height:"5px", 
                                        backgroundColor: "white"}} 
                                      >

                                      </div>

                                      <div 
                                      id="enemyCurrentHealthbar" 
                                      style={{
                                        height:"5px",
                                        backgroundColor: "green", 
                                        position: "absolute",
                                        marginRight: "5px",
                                        marginLeft: "0px",
                                        top: 0
                                      }}>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div style=
                             {{ backgroundColor: "black",
                              position: "absolute",
                              height: "140px",
                              left: 0,
                              right:0,
                              bottom: 0,
                              border: "5px blue solid",
                              display: "flex"
                              }}>
                              <div 
                              id="dialogueBox"
                              style=
                                  {{position: "absolute",
                                  color: "white", 
                                  fontSize: 30,
                                  top:0,
                                  right:0, 
                                  bottom:0, 
                                  left:0,
                                  padding: "20px",
                                  backgroundColor: "black",
                                  display:"none"
                                  }}>
                                  asjdflakjfdls
                              </div>
                              <div 
                              id="attacksBox" 
                              style=
                                  {{display: "grid",
                                  gridTemplateColumns:" repeat(2, 1fr)",
                                  width: "70%"}}
                                  >
                                  
                              </div>
                              <div 
                              id="attackType"
                              style=
                                  {{display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "30%",
                                  borderLeft: "5px blue solid"
                                  }}>
                                  <h1>Attack Type</h1>
                              </div>
                          </div>
                      </div>
                  </div>


                  </div>
              </div>
          </div>
    </div>
  );
}
function GetGSAP(){
  gsap.registerPlugin(useGSAP);

  const container = useRef();
  return container;
}
  
function InitStart(){
  const container = GetGSAP();
  useGSAP(
      () => {
        /*document.querySelector("#userInterface").style.display = "none";
        gsap.to("#overlappingDiv", {
            opacity:0,
            duration: 1
        });*/
          // gsap code here...
          gsap.to("#userInterface", { x: 360 }); // <-- automatically reverted
      },
      { scope: container }
  );
  return null;
}


/*function MyButton(){
  return (<button>
    I'm a button
  </button>)
}
*/
export default App;


/*




<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet">

    <style>
    
        *{
            font-family: "Amatic SC", sans-serif;
            color: white;
            font-size: 30px;
        }

        body{
            margin: 0;
            background-color: black;
        }

        h1{
            
            margin: 0;
            color: white;
        }

        button{
            font-size: 30px;
            color: white;
            background-color: black;
            border: 0;
            cursor: pointer;
        }

        button:hover {
            color: black;
            font-weight: bold;
            background-color: grey;
        }
    </style>
</head>
*/
