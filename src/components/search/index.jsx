import React, { useState } from "react";
import styled from 'styled-components';

const Search = ({ onChange, placeholder, count }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SearchContainer>
      <Input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isFocused={isFocused}
      />
      <Underline isFocused={isFocused} />
      <ResultCount count={count}/>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  margin-bottom: 100px;
  cursor: text;
`;

const Input = styled.input`
  font-size: 18px;
  color: #fff;
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: solid #888888 2px;
  padding-bottom: 10px;
  padding-left: 10px;
  background-color: #333;
  z-index: 5;
  border-radius: 5px; 
  transition: border-bottom 1.5s ease;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    border-bottom: solid #ffffff 2px;
  }
`;

const Underline = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ isFocused }) => (isFocused ? '100%' : '0')};
  height: 3px; 
  background-color: #fff;
  opacity: ${({ isFocused }) => (isFocused ? 1 : 0)};
  transition: width 1.5s ease, opacity 1.5s ease;
`;

const ResultCount = styled.div`
  position: absolute;
  left: 10px;
  top: 80px;
  font-size: 22px;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: ${({ count }) => (count === 0 ? 0 : 1)};
  transition: opacity 0.3s ease;

  &:before {
    content: '${props => (props.count === 0 ? 'No matching posts were found.' : (props.count === 1 ? 'There is 1 post found.' : `There are ${props.count} posts found.`))}';
  }
`;
