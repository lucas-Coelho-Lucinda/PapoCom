import { ButtonLib } from "./components/button";
import { SelectLib } from "./components/select";

function App() {
  const options = [
    {
      label: "teste 1",
      value: "1",
    },
    {
      label: "teste 2",
      value: "2",
    },
    {
      label: "teste 3",
      value: "3",
    },
    {
      label: "teste 4",
      value: "4",
    },
  ];

  return (
    <>
      <div>
        <ButtonLib variant="info" textColor="warning" size="small">
          teste
        </ButtonLib>
      </div>
      <div className="flex flex-row justify-center">
        <SelectLib className="flex flex-row gap-5" options={options} size="small" variant="primary"  textColor="secondary" />
      </div>
    </>
  );
}

export default App;
