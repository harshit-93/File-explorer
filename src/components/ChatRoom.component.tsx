import { useMemo, useRef, useState } from "react";
import {
  TelepartyClient,
  SocketEventHandler,
  SocketMessageTypes,
} from "teleparty-websocket-lib";

import {
  ChatContainer,
  ChatList,
  Container,
  CreateButton,
  InputMessage,
  JoinButton,
  JoinContainer,
  Message,
  Name,
  SendButton,
  SendContainer,
  TitleId,
} from "./ChatRoom.styles";

export default function ChatRoom() {
  const [chatList, setChatList] = useState<any[]>([]);
  const [roomId, setRoomId] = useState("");
  const [tempRoomId, setTempRoomId] = useState("");
  const [nickName, setNickName] = useState("");
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const [socketCheck, setSocketCheck] = useState(true);

  const addMessage = (newMessage: any) => {
    setChatList((prevState) => [...prevState, newMessage]);
  };

  const eventHandler: SocketEventHandler = {
    onConnectionReady: () => {
      console.log("Connection has been established");
    },
    onClose: () => {
      console.log("Socket has been closed");
      setSocketCheck((prev) => !prev);
    },
    onMessage: (message) => {
      console.log("Received message: ", message);
      addMessage(message.data);
    },
  };

  const client = useMemo(() => {
    return new TelepartyClient(eventHandler);
  }, [socketCheck]);

  const createRoom = async () => {
    if (nickName !== "") {
      let tempId = await client.createChatRoom(nickName);
      setRoomId(tempId);
    }
  };

  const joinRoom = () => {
    if (nickName !== "" && tempRoomId !== "") {
      client.joinChatRoom(nickName, tempRoomId);
      setRoomId(tempRoomId);
    }
  };

  const onMessageSend = () => {
    if (
      messageInputRef.current?.value &&
      messageInputRef.current?.value !== ""
    ) {
      client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: messageInputRef.current?.value,
      });
      messageInputRef.current.value = "";
    }
  };

  return (
    <Container>
      {roomId === "" && (
        <JoinContainer>
          <input
            value={nickName}
            type="text"
            placeholder="Enter your Nickname"
            onChange={(e) => setNickName(e.target.value)}
          />

          <input
            value={tempRoomId}
            type="text"
            placeholder="Enter your RoomId"
            onChange={(e) => setTempRoomId(e.target.value)}
          />
          <JoinButton onClick={joinRoom}>Join Room</JoinButton>

          <CreateButton onClick={createRoom}>Create Room</CreateButton>
        </JoinContainer>
      )}

      {roomId !== "" && (
        <ChatContainer>
          <TitleId>Room ID: {roomId}</TitleId>
          <ChatList>
            {chatList.map((text, index) => {
              return (
                text.body && (
                  text?.isSystemMessage ? <Message key={index} align={text?.isSystemMessage}>
                    {text.userNickname + " " + text.body}
                  </Message> :
                    <Message key={index} align={text?.isSystemMessage}>
                      <Name>{text.userNickname}</Name>
                      {text.body}
                    </Message>
                )
              );
            })}
          </ChatList>
          <SendContainer>
            <InputMessage
              ref={messageInputRef}
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onMessageSend();
                }
              }}
            />
            <SendButton onClick={onMessageSend}>Send</SendButton>
          </SendContainer>
        </ChatContainer>
      )}
    </Container>
  );
}
