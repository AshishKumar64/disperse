import React, { useMemo, useRef } from "react";
import styled, { css } from "styled-components";

const StyledTextareaWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 2px;
  width: 100%;
  height: 220px;
  margin: 5px 0;
`;

const sharedStyle = css`
  margin: 0;
  padding: 10px 0;
  height: 200px;
  border-radius: 0;
  resize: none;
  outline: none;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.2;
  &:focus-visible {
    outline: none;
  }
`;

const StyledTextarea = styled.textarea`
  ${sharedStyle}
  padding-left: 3.5rem;
  width: calc(100% - 3.5rem);
  border: none;
  &::placeholder {
    color: grey;
  }
`;

const StyledNumbers = styled.div`
  ${sharedStyle}
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  text-align: right;
  box-shadow: none;
  position: absolute;
  color: grey;
  border: none;
  background-color: lightgrey;
  padding: 10px;
  width: 1.5rem;
`;

const StyledNumber = styled.div`
  color: ${(props) => (props.active ? "blue" : "inherit")};
`;

export const Textarea = ({
  value,
  numOfLines,
  onValueChange,
  placeholder = "Address amount",
  name,
}) => {
  const lineCount = useMemo(() => value.split("\n").length, [value]);
  const linesArr = useMemo(
    () =>
      Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  );

  const lineCounterRef = useRef(null);
  const textareaRef = useRef(null);

  const handleTextareaChange = (event) => {
    onValueChange(event.target.value);
  };

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <StyledTextareaWrapper>
      <StyledNumbers ref={lineCounterRef}>
        {linesArr.map((count) => (
          <StyledNumber active={count <= lineCount} key={count}>
            {count}
          </StyledNumber>
        ))}
      </StyledNumbers>
      <StyledTextarea
        name={name}
        onChange={handleTextareaChange}
        onScroll={handleTextareaScroll}
        placeholder={placeholder}
        ref={textareaRef}
        value={value}
      />
    </StyledTextareaWrapper>
  );
};
