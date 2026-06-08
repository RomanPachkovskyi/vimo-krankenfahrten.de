import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";
import config from "@/config";

const Datenschutz = () => {
  useEffect(() => {
    document.title = `${config.legal.datenschutz.title} — ${config.company.name}`;
  }, []);

  return (
    <LegalLayout title={config.legal.datenschutz.title}>
      <div dangerouslySetInnerHTML={{ __html: config.legal.datenschutz.html }} />
    </LegalLayout>
  );
};

export default Datenschutz;
