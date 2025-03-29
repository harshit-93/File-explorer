import { styled } from "styled-components";

export const Container = styled.div`
  width: 30%;
  margin: 0 auto;
  @media (max-width: 767.98px) {
    width: 100%;
  }
`;

export const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

export const JoinButton = styled.button`
  width: 50%;
  height: 20px;
`;

export const CreateButton = styled.button`
  width: 50%;
  height: 20px;
`;

export const ChatContainer = styled.div`
  position: relative;
  height: 100vh;
`;

export const ChatList = styled.ul`
  width: 100%;
`;

export const Message = styled.li<{ align?: boolean }>`
  text-align: ${(props) => (props.align ? "center" : "right")};
  padding: 5px 10px;
`;

export const InputMessage = styled.input`
  width: 70%;
  font-size: 16px;
`;

export const SendContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
`;

export const TitleId = styled.p`
  padding: 10px 0;
`;

export const SendButton = styled.button`
  width: 30%;
`;
