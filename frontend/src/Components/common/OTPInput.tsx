/* eslint-disable react/no-array-index-key */
import React, { useMemo } from "react";
import "./styles/OTPInput.scss";

export type OTPInputProps = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

export default function OTPInput({
  value,
  valueLength,
  onChange,
}: OTPInputProps) {
  const digitRegExp = /^\d+$/; // 정규표현식(숫자만허용)

  // input받는 값 숫자로 지정 -> 배열로 만들어서 4자리 숫자만 받기
  // [0-9]숫자만 들어올 수 있도록 정규표현식 활용
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i += 1) {
      const char = valueArray[i];

      if (digitRegExp.test(char)) {
        // (char)이 유효하다면
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [value, valueLength]);

  // input 타이핑할 수 있도록 onChange
  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ): void => {
    const { target } = e;
    const tagetValue = target.value;
    
    
    if (!digitRegExp.test(tagetValue)) {
      // targetValue가 유효하지 않다면 종료
      return;
    }
    const newValue =
      value.substring(0, idx) + tagetValue + value.substring(idx + 1);
    onChange(newValue);
    

    // input 받은 다음 요소에 focus
    const nextElement = target.nextElementSibling as HTMLInputElement | null;
    if (nextElement) { 
      nextElement.focus();
    }
    
  };

  return (
    <div className="otp-container">
      {valueItems.map((digit, idx) => (
        <input
          className="otp-input"
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
        />
      ))}
    </div>
  );
}
