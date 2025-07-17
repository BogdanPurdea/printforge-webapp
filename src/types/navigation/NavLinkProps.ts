export type NavLinkProps = {
    href: {
        pathname: string,
        query?: { [key: string]: string | string[] }
    },
    isActive?: boolean,
    children: React.ReactNode,
    onClick?: () => void
}