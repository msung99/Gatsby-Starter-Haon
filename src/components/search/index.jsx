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
  margin-bottom: 100px;
  cursor: text;
  max-width: 95%;
`;

const Title = styled.h1`
  color: ${props => props.theme.main.text}; 
  font-size: 45px;
  font-style: italic;
  font-weight: 700;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.main.border}; 
`

const Input = styled.input`
  font-size: 18px;
  color: ${props => props.theme.main.text};
  width: 95%;
  height: 60px;
  border: none;
  border-bottom: solid ${props => props.theme.search.input.bottom} 2px;
  padding-left: 40px;
  background-color: ${props => props.theme.search.input.bg};
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
  width: ${({ isFocused }) => (isFocused ? '100.5%' : '0')};
  height: 1.5px;
  background-color: ${props => props.theme.search.underline};
  opacity: ${({ isFocused }) => (isFocused ? 1 : 0)};
  transition: width 1s ease, opacity 1s ease-in-out; 
`;

const ResultCount = styled.div`
  position: absolute;
  top: 170px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 30px;
  color: ${props => props.theme.main.text};
  opacity: ${({ count }) => (count === 0 ? 0 : 1)};
  transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
  visibility: ${({ count }) => (count === 0 ? 'hidden' : 'visible')}; 

  &:before {
    content: '${props => (props.count === 0 ? 'No matching posts were found.' : (props.count === 1 ? 'There is 1 post found.' : `There are ${props.count} posts found.`))}';
  }
`;