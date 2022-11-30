import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [question, setQuestion] = useState("");
  const [userName, setUserName] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, userName, question }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const onUserChangedText2 = (event) => {
    setUserName(event.target.value);
  };

  const onUserChangedText3 = (event) => {
    setQuestion(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <img src="bakeneko.png" width="300rem" alt="Bakeneko Logo" />
          <div className="header-title">
            <h1>Bakeneko-chan</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Who I'll be today? Just gimme some data <b>*meow*</b>
            </h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <h3 style={{ color: "white" }}> How's the name? uwu</h3>

        <textarea
          placeholder="What's the name? *lick its paw*"
          className="prompt-box2"
          value={userName}
          onChange={onUserChangedText2}
        />

        <h3 style={{ color: "white" }}> Tell me more about it</h3>

        <textarea
          placeholder="start typing here"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />

        <h3 style={{ color: "white" }}> What do you want to ask?</h3>

        <textarea
          placeholder="State yourrr question"
          className="prompt-box2"
          value={question}
          onChange={onUserChangedText3}
        />
        <div className="prompt-buttons">
          <a
            className={
              isGenerating ? "generate-button loading" : "generate-button"
            }
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? (
                <span className="loader"></span>
              ) : (
                <p>Generate</p>
              )}
            </div>
          </a>
        </div>

        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
