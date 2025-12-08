import { useTranslation } from "react-i18next";

const HelloWorld = () => {
  const { t } = useTranslation();
  return (
    <div>
      <p>{t("hello_world")}</p>
    </div>
  );
};

export default HelloWorld;
