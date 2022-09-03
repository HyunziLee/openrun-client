import * as s from "./datePicker.styles";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { currentDate } from "../function/currentDate";
import { v4 as uuidv4 } from "uuid";
import { useMediaQuery } from "react-responsive";

export default function DatePicker() {
  const oneWeek = currentDate();

  const date = [...oneWeek[0]];
  const day = [...oneWeek[1]];

  const isPc = useMediaQuery({
    query: "(min-width:1200px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1199px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <s.Wrapper>
      {isPc && (
        <s.Carousel>
          <s.ButtonWrapper>
            <ArrowLeftIcon style={{ fontSize: "40px", cursor: "pointer" }} />
            {date.map((el, index) => (
              <s.Button key={uuidv4()}>
                <s.TextDay>{day[index]}</s.TextDay>
                <s.TextDate>{el}</s.TextDate>
              </s.Button>
            ))}

            <ArrowRightIcon style={{ fontSize: "40px", cursor: "pointer" }} />
          </s.ButtonWrapper>
        </s.Carousel>
      )}
      {(isTablet || isMobile) && (
        <s.ButtonMobile>
          {/* <s.TextDay>sdf</s.TextDay> */}
          <s.TextDate>Today</s.TextDate>
        </s.ButtonMobile>
      )}
    </s.Wrapper>
  );
}
