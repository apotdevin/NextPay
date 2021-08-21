import QRcode from 'qrcode.react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { getInvoice } from 'src/api/rest';
import useCopyClipboard from 'src/hooks/UseClipboardCopy';
import styled from 'styled-components';
import { IndexStyles } from './index.styles';

const S = {
  separation: styled.div`
    margin: 0 0 16px;
  `,
  singleLine: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
  `,
  darkTitle: styled.div`
    color: grey;
  `,
  input: styled.input`
    font-size: 14px;
    padding: 5px;
    height: 38px;
    margin: 8px 0;
    border: 1px solid black;
    background: none;
    border-radius: 4px;
    width: 100%;
  `,
  button: styled.button`
    width: 100%;
    margin: 16px 0 0;
    background: #0b53a8;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    padding: 8px;
    cursor: pointer;
    border: 2px solid #0b53a8;

    &:hover {
      background: white;
      color: black;
    }
  `,
};

export const Manual = ({ max, min }: { max: number; min: number }) => {
  const [amount, setAmount] = useState<number>(Math.max(0, min));
  const [isCopied, copy] = useCopyClipboard({ successDuration: 3000 });

  const mutation = useMutation(getInvoice);

  if (mutation.error) {
    return <div>Error getting invoice. Please try again</div>;
  }

  if (mutation.data?.pr) {
    return (
      <>
        <IndexStyles.copyButton onClick={() => copy(mutation.data.pr)}>
          {isCopied ? (
            <IndexStyles.copySuccess>Copied</IndexStyles.copySuccess>
          ) : (
            <IndexStyles.copy>Click QR to copy</IndexStyles.copy>
          )}
          <QRcode value={mutation.data.pr} size={240} />
        </IndexStyles.copyButton>
        <IndexStyles.info>Scan with any lightning wallet</IndexStyles.info>
      </>
    );
  }

  return (
    <>
      <S.separation>
        <S.singleLine>
          <S.darkTitle>Max</S.darkTitle>
          <div>{`${max} sats`}</div>
        </S.singleLine>
        <S.singleLine>
          <S.darkTitle>Min</S.darkTitle>
          <div>{`${min} sats`}</div>
        </S.singleLine>
      </S.separation>
      <S.singleLine>
        <S.darkTitle>Amount</S.darkTitle>
        <div>{`${amount} sats`}</div>
      </S.singleLine>
      <S.input
        onBlur={() => {
          if (amount < min) {
            setAmount(min);
          } else if (amount > max) {
            setAmount(max);
          }
        }}
        placeholder={'Sats'}
        value={amount}
        type={'number'}
        onChange={e => setAmount(Number(e.target.value))}
      />
      <S.button
        disabled={mutation.isLoading}
        onClick={() => mutation.mutate({ amount })}
      >
        Get Invoice
      </S.button>
    </>
  );
};
