export interface conversationHeaderProps {
    nameUser: string;
    nameContact: string;
    foneContact: string;
    onBack?: () => void;
    onToggleContact: () => void;
}