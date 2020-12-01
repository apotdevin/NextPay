import QRcode from 'qrcode.react';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { fetchInfo } from 'src/api/rest';
import styled from 'styled-components';

const S = {
  wrapper: styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  title: styled.h1``,
};

const Index: FC = () => {
  const { isLoading, error, data } = useQuery<{
    url: string;
    max: number;
    min: number;
  }>('info', fetchInfo);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error || !data) {
    return <div>Error</div>;
  }

  console.log({ isLoading, error, data });

  return (
    <S.wrapper>
      <S.title>NextPay</S.title>
      <QRcode value={data.url} size={240} />
    </S.wrapper>
  );
};

export default Index;
