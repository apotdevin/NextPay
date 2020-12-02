import styled from 'styled-components';

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
    max-width: 320px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    background: white;
  `,
  cardTop: styled.div`
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    width: 100%;
    background: #0b53a7;
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
  by: styled.a`
    text-decoration: none;
    color: white;
    font-size: 14px;
    margin-top: 8px;

    &:hover {
      color: #0b53a7;
    }
  `,
};
