import React from "react";
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  margin-left: 50px;
  margin-top: 20px; /* Adjusted margin for better visibility */
`;

const Input = styled.input`
  font-size: 15px;
  color: #222222;
  width: 300px;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  padding-left: 10px;
  position: relative;
  background: none;
  z-index: 5;

  &::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    outline: none;
  }

  &:focus ~ span {
    width: 100%;
  }
`;

const Underline = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0%;
  background-color: #666;
  width: 0;
  height: 2px;
  border-radius: 2px;
  transition: 0.5s;
`;

const Label = styled.label`
  position: absolute;
  color: #aaa;
  left: 10px;
  font-size: 20px;
  bottom: 8px;
  transition: all 0.2s;
`;

const ResultCount = styled.div`
  position: absolute;
  bottom: -20px;
  left: 10px;
  font-size: 14px;
  color: #666;
`;

const Search = ({ onChange, placeholder, count }) => {
  return (
    <SearchContainer>
      <Input type="text" onChange={onChange} placeholder={placeholder} />
      <Label>Name</Label>
      <Underline />
      <ResultCount>{count} posts found</ResultCount>
    </SearchContainer>
  );
};

export default Search;
