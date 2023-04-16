import { useLocale } from "../contexts/LocaleContext";

const dict = {
  ko: {
    "ok button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
    "LoadMore button": "더보기",
    "calorie order": "칼로리순",
    "createdAt order": "최신순",
    "menu list": "메뉴",
    "calorie list": "칼로리",
    "date list": "날짜",
    "content list": "비고",
  },
  en: {
    "ok button": "OK",
    "cancel button": "Cancel",
    "edit button": "Edit",
    "delete button": "Delete",
    "LoadMore button": "Load More",
    "calorie order": "High Calorie",
    "createdAt order": "Most Recent",
    "menu list": "Menu",
    "calorie list": "Calorie",
    "date list": "Date",
    "content list": "Content",
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || "";
  return translate;
}

export default useTranslate;
