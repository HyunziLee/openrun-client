import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { IMutation } from "../../../../commons/types/generated/types";
import { accessTokenState, userInfoValue } from "../../store";
import { LOGOUT } from "../layout.queries";
import * as s from "./navigation.styles";

export default function LayoutNavigation() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoValue);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const router = useRouter();
  const [logout] = useMutation<Pick<IMutation, "logout">>(LOGOUT);

  const onClickMoveToPage = (event: string) => () => {
    router.push(event);
  };
  const onClickLogout = async () => {
    try {
      const result = await logout();
      // console.log(result);
      if (result) {
        setAccessToken("");
        router.push("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <s.Wrapper>
        <s.MenuWrapper>
          {!userInfo ? (
            <s.MenuList>
              <s.Menu onClick={onClickMoveToPage(`/signIn`)}>로그인</s.Menu>
              <s.Menu onClick={onClickMoveToPage(`/signUp`)}>회원가입</s.Menu>

              <s.Menu>고객센터</s.Menu>
            </s.MenuList>
          ) : (
            <s.MenuList>
              <s.Menu onClick={onClickMoveToPage(`/myPage`)}>
                {userInfo.nickName}
              </s.Menu>
              <s.Menu onClick={onClickLogout}>로그아웃</s.Menu>

              <s.Menu onClick={onClickMoveToPage(`/myPage/favoriteList`)}>
                찜
              </s.Menu>
              {/* <s.Menu>관심글</s.Menu> */}
              <s.Menu>고객센터</s.Menu>
            </s.MenuList>
          )}
        </s.MenuWrapper>
      </s.Wrapper>
    </>
  );
}
