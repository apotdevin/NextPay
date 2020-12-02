import QRcode from 'qrcode.react';
import { useQuery } from 'react-query';
import { fetchInfo } from 'src/api/rest';
import BounceLoader from 'react-spinners/BounceLoader';
import { IndexStyles as S } from './index.styles';

export const IndexView = () => {
  const { isLoading, error, data } = useQuery<{
    url: string;
    max: number;
    min: number;
    name: string;
  }>('info', fetchInfo);

  if (isLoading) {
    return (
      <S.wrapper>
        <BounceLoader color={'white'} />
      </S.wrapper>
    );
  }

  if (error || !data) {
    return (
      <S.wrapper>
        <S.card>
          <S.cardTop>Error</S.cardTop>
          <S.cardBottom>
            Sorry for that! Please try loading the page again.
          </S.cardBottom>
        </S.card>
      </S.wrapper>
    );
  }

  return (
    <S.wrapper>
      <S.card>
        <S.cardTop>
          <S.title>{data.name}</S.title>
        </S.cardTop>
        <S.cardBottom>
          <QRcode value={data.url} size={240} />
        </S.cardBottom>
      </S.card>
      <S.by href={'https://github.com/apotdevin/NextPay'} target={'_blank'}>
        Powered by NextPay
      </S.by>
    </S.wrapper>
  );
};
