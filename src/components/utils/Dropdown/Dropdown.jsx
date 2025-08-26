import Provider from "./Provider";
import List from "./List";
import Item from "./Item";
import Root from "./Root";

function Dropdown({children}) {
    return(
        <Provider>
            {children}
        </Provider>
    )
}

Dropdown.List = List;
Dropdown.Item = Item;
Dropdown.Root = Root;

export default Dropdown;