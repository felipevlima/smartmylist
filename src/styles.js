import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 720px;
  font-family: 'Poppins';
  text-align: left;
  color: #3c3c3c;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 32px);
  /* overflow-y: auto; Enable vertical scrolling */
  position: relative;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 12px;
    color: #999;
  }

  button {

  }
`

export const AIButton = styled.button`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #357ded;
  color: white;
  font-weight: bold;
  gap: 8px;
  height: 44px;
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 16px;

  transition: background 0.2s ease-in-out;

  ${props => props.disabled === true && css`
      cursor: default;
      background-color: gray;
  `}
`

export const Subheadline = styled.span`
  font-size: 12px;
  color: #aaa;
  margin-bottom: 16px;
`

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  border-radius: 8px;
  gap: 8px;

  input {
    flex: 1;
    padding: 0 20px;
    border-radius: 8px;
    height: 44px;
    outline: none;
    border: none;
    background: #fff;
    border: 1px solid #eee;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    height: 44px;
    gap: 8px;
    min-width: 96px;
    border-radius: 8px;
    border: none;
    overflow: none;
    background: #087e8b;
    color: white;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;

    transition: filter 0.2s ease-in-out;

    &:hover {
      /* transform: translateY(-8px); */
      filter: brightness(0.9);
    }
  }
`

export const List = styled.ul`

  list-style: none;
  padding: 0px;
  flex: 1;
  overflow-y: scroll;

  height: 100%;
  
  div + div {
    margin-top: 16px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;

    li {
      flex: 1;
      background: white;
      height: 44px;
      padding: 0px 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      font-size: 14px;
      border: 1px solid #eee;
    }

    button {
      width: 44px;
      height: 44px;
      background: #ff5a5f;
      color: white;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  }
`

export const Info = styled.p`
  font-size: 12px;
  color: #aaa;
  text-align: center;
  width: 100%;
  margin-right: 136px;
`

export const EmptyText = styled.div`
  padding-top: 64px;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 12px;
    color: #999;
    text-align: center;
  }
`