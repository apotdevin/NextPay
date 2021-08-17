import styled, { css } from 'styled-components';

export const IndexStyles = {
  wrapper: styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  card: styled.div`
    width: 290px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    background: white;
  `,
  cardTop: styled.div`
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    width: 100%;
    background: #0b53a8;
    color: white;
    padding: 24px;
  `,
  title: styled.h1`
    font-size: 24px;
    margin: 0;
  `,
  cardBottom: styled.div`
    padding: 24px;
  `,
  buttonRow: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
  `,
  button: styled.button<{ selected: boolean }>`
    background: white;
    border: none;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    padding: 8px;
    width: 100%;

    &:hover {
      background: #ffbc3c;
      color: white;
    }

    ${({ selected }) =>
      selected &&
      css`
        background: #ffbc3c;
        color: white;
      `}
  `,
  by: styled.a`
    text-decoration: none;
    color: white;
    font-size: 14px;
    margin-top: 8px;

    &:hover {
      color: #0b53a7;
    }
  `,
  by2: styled.a`
    text-decoration: none;
    color: rgba(0, 0, 0, 0.2);
    font-size: 12px;
    margin-top: 16px;

    &:hover {
      color: #0b53a7;
    }
  `,
  info: styled.div`
    margin: 8px 0 0;
    font-size: 14px;
    color: #686868;
    width: 100%;
    text-align: center;
  `,
  copy: styled.div`
    margin: 0 0 8px;
    font-size: 12px;
    color: #686868;
    width: 100%;
    text-align: center;
  `,
  copySuccess: styled.div`
    margin: 0 0 8px;
    font-size: 12px;
    color: #686868;
    width: 100%;
    text-align: center;
    color: green;
    font-weight: bolder;
  `,
  copyButton: styled.button`
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
  `,
  address: styled.div`
    font-size: 22px;
    font-weight: bold;
  `,
  addressWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
