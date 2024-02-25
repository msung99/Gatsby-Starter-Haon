import React, { useState } from "react";
import styled from 'styled-components';
import { IoIosSearch } from "react-icons/io";

const Search = ({ onChange, placeholder, count }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SearchContainer>
      <Title>Search.</Title>
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

const Title = styled.h1`
  color: #fff;
  font-size: 40px;
  font-style: italic;
`

const Input = styled.input`
  font-size: 18px;
  color: #fff;
  width: 100%;
  height: 60px;
  border: none;
  border-bottom: solid #888888 2px;
  padding-left: 30px;
  background-color: #333;
  z-index: 5;
  border-radius: 5px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23888" viewBox="0 0 24 24"><path d="M21 19l-5-5a9 9 0 1 0-1.4 1.4l5 5 1.4-1.4zM17 9a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/></svg>');
  background-repeat: no-repeat;
  background-position: 5px center; 
  background-size: 20px; 

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
  }
`;

const Underline = styled.span`
  position: absolute;
  left: 0;  
  width: ${({ isFocused }) => (isFocused ? '100%' : '0')};
  height: 2px;
  background-color: #fff;
  opacity: ${({ isFocused }) => (isFocused ? 1 : 0)};
  transition: width 1s ease, opacity 1s ease-in-out; 
`;

const ResultCount = styled.div`
  position: absolute;
  top: 120px;
  font-size: 22px;
  margin-top: 30px;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: ${({ count }) => (count === 0 ? 0 : 1)};
  transition: opacity 1s ease-in-out, visibility 1s ease-in-out; /* Adjust the duration for appearance */
  visibility: ${({ count }) => (count === 0 ? 'hidden' : 'visible')}; /* Hide when count is 0 */

  &:before {
    content: '${props => (props.count === 0 ? 'No matching posts were found.' : (props.count === 1 ? 'There is 1 post found.' : `There are ${props.count} posts found.`))}';
  }
`;
