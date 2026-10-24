import { useLocale } from "./locale-context";
import { workshop } from "@/content/workshop-data";

export function useWorkshopCopy() {
  const { locale } = useLocale();
  return workshop[locale];
}
