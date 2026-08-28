export interface ItemCallProps {
  isCollapsed: boolean;
  isSelected: boolean;
  index: number;
  name: string;
  text: string;
  hour: string;
  selectCall: (indice: number) => void
}