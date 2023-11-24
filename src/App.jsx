import { useState, useEffect } from "react";
import OpenAI from 'openai'
import "./styles.css";
import { AIButton, Container, EmptyText, Header, InputContainer, List, Subheadline } from "./styles";

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);

  const openai = new OpenAI({ 
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true, 
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText !== "") {
      setList([...list, inputText]);
    }
  };

  const handleOnRemoveItem = (taks) => {
    const listWithoutItem = list.filter((item) => item !== taks);
    setList(listWithoutItem);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (inputText !== "") {
        setList([...list, inputText]);
      }
    }
  };

  async function handleOpenAI() {
    setIsLoading(true)
    const assistant = await openai.beta.assistants.create({
      name: "SmartListAPI",
      instructions: "You will help users to find priority in a list of tasks. I need you return only a list of reorganized tasks by the priority. Return example: ['priority 1', 'Priority 2'].If task contains word 'pagar', every time is being the hight priority",
      model: "gpt-3.5-turbo-16k"
    });
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: list.join(", ")
        },
      )

    const run = await openai.beta.threads.runs.create(
      thread.id,
      { 
        assistant_id: assistant.id,
        instructions:"You will help users to find priority in a list of tasks. I need you return only a list of reorganized tasks by the priority. Return example: 'priority 1', 'Priority 2'.If task contains word 'pagar', every time is being the hight priority. Dont put number after task, and dont put '-'. return only name of tasks separated by ,",
      }
    );

    setTimeout(async () => {  
      await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
  
      const list = await openai.beta.threads.messages.list(
        thread.id,
      )
      const response = list.data[0].content[0].text.value
      setList(response.split(','))
      setIsLoading(false)
    }, 5000)
  }

//   
  
  useEffect(() => {
    setInputText("");
  }, [list]);

  return (
    <Container>
      <Header>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-layout-list"
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
            <path d="M14 4h7" />
            <path d="M14 9h7" />
            <path d="M14 15h7" />
            <path d="M14 20h7" />
          </svg>
          <h1>Smart MyList</h1>
        </div>
        <AIButton disabled={isLoading} onClick={() => list.length > 1 && handleOpenAI()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-wand-2"
          >
            <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
            <path d="m14 7 3 3" />
            <path d="M5 6v4" />
            <path d="M19 14v4" />
            <path d="M10 2v2" />
            <path d="M7 8H3" />
            <path d="M21 16h-4" />
            <path d="M11 3H9" />
          </svg>
          AI Assistant
        </AIButton>
      </Header>
      <Subheadline>Improve your peformance with SmartMyList. Define your tasks and let AI shows what is your priority or not.</Subheadline>
      <InputContainer>
        <input
          placeholder="What i need to do today?"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-check"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Add
        </button>
      </InputContainer>
      {list.length > 0 ? (
        <div>
          <Header style={{  margin: "32px 0px 16px" }}>
            <h4>Today tasks</h4>
            <p>Total: {list.length}</p>
          </Header>
          <List>
            {list.map((item, index) => (
              <div key={index}>
                <li>{item}</li>
                <button onClick={() => handleOnRemoveItem(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </List>
        </div>
      ) : (
        <EmptyText>
          <p>
            There are no registered tasks! <br /> Add one to view.
          </p>
        </EmptyText>
      )}
    </Container>
  );
}
