import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin-bottom: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Textarea = styled.textarea`
  border: 1.6px solid white;
  background-color: black;
  resize: none;
  border-radius: 5px;
  min-height: 50px;
  outline: none;
  color: white;
  padding: 10px;
  width: 90%;
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: none;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const PostButton = styled(DeleteButton)`
  background-color: #1d9bf9;
`;

const EditButton = styled(DeleteButton)`
  background-color: gray;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [content, setContent] = useState(tweet);
  const [edit, setEdit] = useState(false);
  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const onEdit = async () => {
    if (user?.uid !== userId) return;
    try {
      await updateDoc(doc(db, "tweets", id), { tweet: content });
      setEdit(false);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {edit ? (
          <Textarea
            required
            rows={5}
            maxLength={180}
            onChange={onChange}
            value={content}
            placeholder={content}
          />
        ) : (
          <Payload>{content}</Payload>
        )}
        {user?.uid === userId ? (
          <ButtonBox>
            {edit ? (
              <PostButton onClick={onEdit}>Post</PostButton>
            ) : (
              <EditButton onClick={() => setEdit(!edit)}>Edit</EditButton>
            )}
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          </ButtonBox>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
