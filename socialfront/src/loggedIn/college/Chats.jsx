import { ChatEngine } from "react-chat-engine";

const ChatsPage = ({ username, secret }) => {
  return (
    <ChatEngine
      projectID={import.meta.env.VITE_PROJECT_ID}
      userName={username}
      userSecret={secret}
      height="88vh"
      renderPhotosSettings={(chat) => {}}
      renderOptionsSettings={(creds, chat) => {}}
    />
  );
};

export default ChatsPage;
