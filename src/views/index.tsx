import QRcode from 'qrcode.react';
import { useQuery } from 'react-query';
import { fetchInfo } from 'src/api/rest';
import BounceLoader from 'react-spinners/BounceLoader';
import { useState } from 'react';
import { IndexStyles as S } from './index.styles';
import { Manual } from './Manual';
import useCopyClipboard from 'src/hooks/UseClipboardCopy';
import { useEffect } from 'react';

export const IndexView = () => {
  const [host, setHost] = useState<string>('');
  const [method, setMethod] = useState<number>(0);
  const [isCopied, copy] = useCopyClipboard({ successDuration: 3000 });

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const { isLoading, error, data } = useQuery<{
    url: string;
    max: number;
    min: number;
    name: string;
    addressUser: string;
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
    if (method === 2) {
      return <Manual max={data.max} min={data.min} />;
    }
    if (method === 1) {
      return (
        <>
          <S.copyButton onClick={() => copy(data.url)}>
            {isCopied ? (
              <S.copySuccess>Copied</S.copySuccess>
            ) : (
              <S.copy>Click QR to copy</S.copy>
            )}
            <QRcode value={data.url} size={240} />
          </S.copyButton>
          <S.info>Scan with any lnurl compatible wallet</S.info>
        </>
      );
    }

    if (!host) {
      return null;
    }

    const address = `${data.addressUser}@${host}`;
    return (
      <>
        <S.addressWrapper>
          <S.copyButton onClick={() => copy(address)}>
            {isCopied ? (
              <S.copySuccess>Copied</S.copySuccess>
            ) : (
              <S.copy>Click address to copy</S.copy>
            )}
            <S.address>{address}</S.address>
          </S.copyButton>
          <S.by2 href={'https://lightningaddress.com/'} target={'_blank'}>
            What is a Lightning Address?
          </S.by2>
        </S.addressWrapper>
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
          <S.button selected={method === 0} onClick={() => setMethod(0)}>
            Address
          </S.button>
          <S.button selected={method === 1} onClick={() => setMethod(1)}>
            LNURL
          </S.button>
          <S.button selected={method === 2} onClick={() => setMethod(2)}>
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
