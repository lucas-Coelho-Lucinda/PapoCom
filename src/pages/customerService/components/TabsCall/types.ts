import type { CallSelected } from "../convertionPainel/types"

export interface TabsCallProps {
    onSelectCall?: () => void
    setSelectedCall: React.Dispatch<React.SetStateAction<CallSelected>>
}