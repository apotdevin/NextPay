import QRcode from 'qrcode.react';
import { useQuery } from 'react-query';
import { fetchInfo } from 'src/api/rest';
import BounceLoader from 'react-spinners/BounceLoader';
import { useState } from 'react';
import { IndexStyles as S } from './index.styles';
import { Manual } from './Manual';

export const IndexView = () => {
  const [isManual, setIsManual] = useState<boolean>(false);

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

  const renderContent = () => {
    if (isManual) {
      return <Manual max={data.max} min={data.min} />;
    }
    return (
      <>
        <QRcode value={data.url} size={240} />
        <S.info>Scan with any lnurl compatible wallet</S.info>
      </>
    );
  };

  return (
    <S.wrapper>
      <S.card>
        <S.cardTop>
          <S.title>{data.name}</S.title>
        </S.cardTop>
        <S.buttonRow>
          <S.button selected={!isManual} onClick={() => setIsManual(false)}>
            LNURL
          </S.button>
          <S.button selected={isManual} onClick={() => setIsManual(true)}>
            Manual
          </S.button>
        </S.buttonRow>
        <S.cardBottom>{renderContent()}</S.cardBottom>
      </S.card>
      <S.by href={'https://github.com/apotdevin/NextPay'} target={'_blank'}>
        Powered by NextPay
      </S.by>
    </S.wrapper>
  );
};
