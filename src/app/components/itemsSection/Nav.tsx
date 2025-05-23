

interface NavProps {
    category: string,
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

const Nav = ({ category, selected, setSelected }: NavProps) => {
    return (
        <li
            className={category === selected ? 'selectedCategoryOption' : ''}
            onClick={() => setSelected(category)}>
                {category.toUpperCase()}
        </li>
    )
}

export default Nav;