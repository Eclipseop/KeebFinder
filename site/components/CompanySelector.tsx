import Checkbox from "./Checkbox";

type Props = {
    companies: string[],
    selectedCompanies: string[]
    click: (company: string) => void;
}

const CompanySelector = ({companies, selectedCompanies, click}: Props) => {
  return (
    <div className="flex gap-2">
      {
        companies.map(company => (
          <Checkbox 
            key={company}
            array={selectedCompanies}
            value={company}
            click={() => click(company)}
          />
        ))
      }
    </div>
  );
};

export default CompanySelector;