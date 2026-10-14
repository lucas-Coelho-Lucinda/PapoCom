export interface ItemCallProps {
  isSelected: boolean;
  id: number;
  name: string;
  text: string;
  hour: string;
  queue: string;
  user: string;
  selectCall: (indice: number) => void
}