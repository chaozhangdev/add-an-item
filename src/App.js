import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

export function App() {
  /**
   * init values from localStorage before mounted
   */
  useEffect(() => {
    if (!localStorage.getItem("col1")) {
      localStorage.setItem("col1", JSON.stringify([]));
    }
    if (!localStorage.getItem("col2")) {
      localStorage.setItem("col2", JSON.stringify([]));
    }
    if (localStorage.getItem("colNum")) {
      setColNum(localStorage.getItem("colNum"));
    }
    if (localStorage.getItem("searchValue")) {
      setSearchVal(localStorage.getItem("searchValue"));
    }
  }, []);

  /**
   * @param {inputVal} string add an item input text
   * @param {colNum} string column selector
   * @param {searchVal} string search input text
   */
  const [inputVal, setInputVal] = useState("");
  const [colNum, setColNum] = useState("");
  const [searchVal, setSearchVal] = useState("");

  /**
   * @method handleAddAnItem()
   * pre-check1: if the item input is empty
   * pre-check2: if the col seletor has been selected
   * process:
   * step 1 - get the col1 or col2 from localStorage
   * step 2 - update the value in localStorage
   * step 3 - reload the page to show the changes
   */
  const handleAddAnItem = () => {
    if (inputVal === "") {
      alert("Item can not be empty.");
      return;
    }
    if (colNum === "") {
      alert("Please select which column you want to add.");
      return;
    }
    let whichCol = colNum === "col1" ? "col1" : "col2";
    let data = JSON.parse(localStorage.getItem(whichCol));
    data.push(inputVal);
    localStorage.setItem(whichCol, JSON.stringify(data));
    location.reload();
  };

  /**
   * @method handleRemoveAllItem()
   * clean localStorage data
   */
  const handleRemoveAllItem = () => {
    localStorage.setItem("col1", JSON.stringify([]));
    localStorage.setItem("col2", JSON.stringify([]));
    localStorage.setItem("colNum", "");
    location.reload();
  };

  /**
   * @method handleColChange()
   * @param {value} string
   * set the current col num value
   * update the localStorage
   */
  const handleColChange = (value) => {
    setColNum(value);
    localStorage.setItem("colNum", value);
  };

  /**
   * @method handleItemRemove()
   * @param {parentDiv} HTMLdiv
   * @param {whichCol} string
   * process:
   * step 1: get the parent html div
   * step 2: find the first `p` tag which is the item text(the second is 'X' icon)
   * step 3: filter the string fron the array and update the localStorage
   */
  const handleItemRemove = (parentDiv, whichCol) => {
    let value = parentDiv.getElementsByTagName("p")[0].innerText;
    let colData = JSON.parse(localStorage.getItem(whichCol));
    let newColData = colData.filter((el) => el !== value);
    localStorage.setItem(whichCol, JSON.stringify(newColData));
    location.reload();
  };

  /**
   * @method renderColContent()
   * @param {arr} array
   * @param {whichCol} string
   * @param {isLight} boolean
   * process:
   * step 1: whichCol shows col 1 or col 2 to render
   * step 2: map each item in col array and render the JSX content
   * noet: `isLight` is style component props to control the color & bgColor
   */
  const renderColContent = (arr, whichCol) => {
    if (arr) {
      return arr.map((el, index) => (
        <Item key={index} isLight={index % 2 === 0}>
          <ItemText>{el}</ItemText>
          <ItemX
            isLight={index % 2 === 0}
            onClick={(e) => handleItemRemove(e.target.parentElement, whichCol)}
          >
            X
          </ItemX>
        </Item>
      ));
    }
  };

  /**
   * @method handleSearch()
   * @param {value} string
   * remove the front space by trimStart
   */
  const handleSearch = (value) => {
    setSearchVal(value.trimStart());
    localStorage.setItem("searchValue", value);
  };

  /**
   * @method filterSearchData()
   * @param {arr} string
   * filter the search text in the col array
   */
  const filterSearchData = (arr) => {
    return arr.filter((el) => el.includes(searchVal));
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
              value={colNum}
              onChange={(e) => {
                handleColChange(e.target.value);
              }}
            >
              <Option value="" disabled selected>
                CHOOSE COLUMN
              </Option>
              <Option value="col1">COLUMN 1</Option>
              <Option value="col2">COLUMN 2</Option>
            </Select>
            <Button onClick={() => handleAddAnItem()}>ADD ITEM</Button>
            <Button onClick={() => handleRemoveAllItem()}>
              REMOVE ALL ITEM
            </Button>
            <SearchWrapper>
              <SearchText>SEARCH AN ITEM</SearchText>
              <Search
                value={searchVal}
                placeholder="SEARCH"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              ></Search>
              <SearchImage src="https://github.com/chaozhangdev/src/blob/master/search.png?raw=true" />
            </SearchWrapper>
          </Left>
          <Right>
            <ColWrapper>
              <Col1>
                <ColTitle>COLUMN 1</ColTitle>
                {searchVal === ""
                  ? renderColContent(
                      JSON.parse(localStorage.getItem("col1")),
                      "col1"
                    )
                  : renderColContent(
                      filterSearchData(
                        JSON.parse(localStorage.getItem("col1"))
                      ),
                      "col1"
                    )}
              </Col1>
              <Col2>
                <ColTitle>COLUMN 2</ColTitle>
                {searchVal === ""
                  ? renderColContent(
                      JSON.parse(localStorage.getItem("col2")),
                      "col2"
                    )
                  : renderColContent(
                      filterSearchData(
                        JSON.parse(localStorage.getItem("col2"))
                      ),
                      "col2"
                    )}
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
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  width: 800px;
  height: 100%;
  margin: auto;
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 33%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 67%;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  @media (max-width: 768px) {
    width: 100%;
  }
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Option = styled.option`
  font-size: 16px;
`;

const Button = styled.div`
  border: 2px solid #fff;
  outline: none;
  padding: 15px;
  width: 95%;
  font-size: 16px;
  text-align: center;
  color: #fff;
  margin-bottom: 10px;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-top: 40px;
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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Col1 = styled.div`
  width: 50%;
  border: 2px solid #fff;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Col2 = styled.div`
  width: 50%;
  border: 2px solid #fff;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  background-color: ${(props) => (props.isLight ? "#f2f3f4" : "#BCC0C7")};
  color: ${(props) => (props.isLight ? "#79818f" : "#fff")};
  padding: 10px 30px;
  /* #BCC0C7  */
`;

const ItemText = styled.p``;

const ItemX = styled.p`
  font-size: 14px;
  border: 1px solid;
  border-color: ${(props) => (props.isLight ? "#79818f" : "#fff")};
  border-radius: 8px;
  padding: 5px 10px;
  :hover {
    cursor: pointer;
  }
`;
