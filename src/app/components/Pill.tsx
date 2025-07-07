import { PillProps } from "../types/PillProps";

export default function Pill({ children, className = "" }: PillProps) {
    return (
        <span
            className={`inline-block bg-secondary border border-border rounded-full px-3 py-1 text-sm text-secondary-foreground ${className}`}
        >
            {children}
        </span>
    )
}
