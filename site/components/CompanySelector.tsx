import Checkbox from "./Checkbox";

type Props = {
    companies: string[],
    selectedCompanies: string[]
    click: (company: string) => void;
}

const CompanySelector = ({companies, selectedCompanies, click}: Props) => {
  return (
    <div className="flex flex-col bg-gray-100 rounded p-2 mt-1">
      <h2 className="font-semibold">Companies</h2>
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