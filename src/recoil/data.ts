import { atom, selector, selectorFamily } from "recoil";

export interface HomeDataStateI {
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
