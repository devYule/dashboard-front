import styled from "styled-components";

export interface SelectedWidget {
  id: string;
  gridRow: string;
  gridColumn: string;
}

// ---

export const WidgetBtn = styled.button`
  display: grid;
  grid-template-columns: repeat(2, 120px);
  grid-template-rows: repeat(5, 120px);
  gap: 10px 10px;
  justify-content: center;
`;
export const WidgetBookmarkContainer = styled.div<SelectedWidget>`
  display: flex;
  flex-direction: column;
  grid-column: ${(w) => w.gridColumn};
  grid-row: ${(w) => w.gridRow};
  width: 100%;
  height: 100%;
`;
export const BookmarkList = styled.p`
  font-family: "Inter";
  text-align: left;
  font-weight: 400;
  font-size: 13px;
  color: black;
`;
export const BookmarkNotExists = styled.p<{ topVal?: string }>`
  font-family: "Inter";
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  position: relative;
  font-style: italic;
  top: ${(props) =>
    props.topVal && props.topVal.length > 0 ? props.topVal : "35%"};
  color: black;
`;
export const WidgetDelBtn = styled.button`
  z-index: 1;
  position: relative;
  bottom: 8px;
  right: 8px;
  background: inherit;
  border: none;
`;

export const OvalBtn = styled.button`
  margin-left: 30px;
  border-radius: 15px;
  border: 1px solid #000000;
  background-color: #000000;
  color: rgb(245, 245, 245);

  align-self: center;

  width: 35px;
  height: 20px;

  font-family: "Inter";
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 19.5px;
`;
