
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';

export default function List({list, deleteItem, editItem}) {
    return (
        list.map((item) => {
            return (
                <li className="list-item" key={item.id}>
                    <p>
                        {item.value}
                    </p>
                    <div className="btns-container" >
                        <button className="edit-btn" onClick={() => editItem(item.id)}>
                            <MdOutlineEdit className='edit-icon'/>
                        </button>
                        <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                            <FaRegTrashAlt className='trash-icon'/>
                        </button>
                    </div>
                </li>
            )
        })
    )
}
