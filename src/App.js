import React from "react";
import { useState } from "react";
import styled from "styled-components";

export function App() {
  const [inputVal, setInputVal] = useState("");
  const [colNum, setColNum] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const handleAddAnItem = () => {
    if (colNum === "") {
      alert("Please select which column you want to add.");
    }
  };

  return (
    <Box>
      <Container>
        <Title>Marvelous!</Title>
        <IntroText>
          Lorem ipsum is simply dummy text of the printing <br />
          and typesetting industy. Lorem Ipsum has been <br />
          the industry's standard dummy text ever since.
        </IntroText>
        <p>{inputVal}</p>
        <p>{colNum}</p>
        <p>{searchVal}</p>
        <Header>ADD AN ITEM</Header>
        <Content>
          <Left>
            <Input
              placeholder="ENTER ITEM"
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            ></Input>
            <Select
              onChange={(e) => {
                setColNum(e.target.value);
              }}
            >
              <Option value="" disabled selected>
                CHOOSE COLUMN
              </Option>
              <Option value="col1">COLUMN 1</Option>
              <Option value="col2">COLUMN 2</Option>
            </Select>
            <AddItemButton onClick={() => handleAddAnItem()}>
              ADD ITEM
            </AddItemButton>
            <SearchWrapper>
              <SearchText>SEARCH AN ITEM</SearchText>
              <Search
                placeholder="SEARCH"
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
              ></Search>
              <SearchImage src="https://github.com/chaozhangdev/src/blob/master/search.png?raw=true" />
            </SearchWrapper>
          </Left>
          <Right>
            <ColWrapper>
              <Col1>
                <ColTitle>COLUMN 1</ColTitle>
                <Item>
                  <ItemText>ITEM</ItemText>
                  <ItemX>X</ItemX>
                </Item>
              </Col1>
              <Col2>
                <ColTitle>COLUMN 2</ColTitle>
                <Item>
                  <ItemText>ITEM</ItemText>
                  <ItemX>X</ItemX>
                </Item>
              </Col2>
            </ColWrapper>
          </Right>
        </Content>
      </Container>
    </Box>
  );
}

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #79818f;
  padding-top: 40px;
`;

const Container = styled.div`
  width: 800px;
  margin: auto;
`;

const Title = styled.i`
  font-weight: 300;
  font-size: 50px;
  color: #fff;
`;

const IntroText = styled.p`
  color: #8fffee;
  font-weight: 300;
  font-size: 18px;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const Header = styled.p`
  color: #fff;
  font-weight: 400;
  font-size: 18px;
  background-image: linear-gradient(to bottom, #c1cad5, #8290a3);
  text-align: center;
  padding: 15px 0px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  width: 33%;
`;

const Right = styled.div`
  width: 67%;
`;

const Input = styled.input`
  border: 2px solid #fff;
  outline: none;
  background-color: #9aa0ab;
  padding: 15px;
  width: 95%;
  font-size: 16px;
  margin-bottom: 10px;
  color: #fff;
`;

const Select = styled.select`
  border: 2px solid #fff;
  outline: none;
  background-color: #9aa0ab;
  padding: 15px;
  width: 95%;
  font-size: 16px;
  margin-bottom: 10px;
  color: #fff;
  :hover {
    cursor: pointer;
  }
`;

const Option = styled.option`
  font-size: 16px;
`;

const AddItemButton = styled.div`
  border: 2px solid #fff;
  outline: none;
  padding: 15px;
  width: 95%;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
  color: #fff;
  margin-bottom: 100px;
  :hover {
    cursor: pointer;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 10px;
`;

const SearchImage = styled.img`
  position: absolute;
  width: 20px;
  right: 27px;
  bottom: 27px;
`;

const Search = styled(Input)``;

const ColWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 2px solid #fff;
`;

const Col1 = styled.div`
  width: 50%;
  border: 2px solid #fff;
`;

const Col2 = styled.div`
  width: 50%;
  border: 2px solid #fff;
`;

const ColTitle = styled(Header)`
  margin-bottom: 0px;
  background-image: linear-gradient(to bottom, #c1cad5, #4a566a);
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f3f4;
  color: #79818f;
  padding: 10px 30px;
  /* #BCC0C7  */
`;

const ItemText = styled.p``;

const ItemX = styled.p`
  font-size: 14px;
  border: 1px solid #79818f;
  border-radius: 8px;
  padding: 5px 10px;
  :hover {
    cursor: pointer;
  }
`;
