export const generateListOfCalls = (quantity: number) => {
  return Array.from({ length: quantity }, (_, index) => ({
    name: "Joana Prado",
    selected: index === 0,
    hour: "21:52",
    text: "Este é um texto muito longo que será cortado quando ultrapassa largura disponível do componente",
  }));
};