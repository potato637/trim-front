import { atom, selector, selectorFamily } from "recoil";

interface HomeDataStateI {
  category: string;
  title: string;
  content: string;
  createDate: string;
  view: number;
  comment: number;
  solved: boolean | null;
}
export const homeDataState = atom<HomeDataStateI[] | null>({
  key: "homeData",
  default: null,
});

export type CategoryStateI =
  | "all"
  | "question"
  | "community"
  | "share"
  | "survey";
export const categoryState = atom<CategoryStateI>({
  key: "category",
  default: "all",
});
export const getData = selectorFamily({
  key: "getData",
  get:
    (category: CategoryStateI) =>
    ({ get }) => {
      const data = get(homeDataState);

      if (category === "all") {
        return data;
      }

      return data?.filter((item) => item.category === category);
    },
});

// selector function 추가하기
// tab의 상태를 관리하는 atom을 만들어서 tab들을 클릭 했을 때 atom을 바꿔주고 atom의 상태에 따라 컨텐츠를 나열해 주면 될 듯?
