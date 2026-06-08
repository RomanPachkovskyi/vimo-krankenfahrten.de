import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";
import config from "@/config";

const Impressum = () => {
  useEffect(() => {
    document.title = `${config.legal.impressum.title} — ${config.company.name}`;
  }, []);

  return (
    <LegalLayout title={config.legal.impressum.title}>
      <div dangerouslySetInnerHTML={{ __html: config.legal.impressum.html }} />
    </LegalLayout>
  );
};

export default Impressum;
