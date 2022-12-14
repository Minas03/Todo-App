import closeSvg from '../../assets/img/close.png'
import classNames from 'classnames'
import Badge from '../Badge'
import React from 'react'
import axios from 'axios'
import './List.scss'

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem
}) => {
  const removeList = item => {
    if (window.confirm('do you want to delete a list')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id)
      })
    }
  }

  return (
    <ul onClick={onClick} className='list'>
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>
            {item.icon ? item.icon : <Badge color={item.color.name} />}
          </i>
          <span>
            {item.tasks && ` (${item.tasks.length})`}
            {item.name}
          </span>
          {isRemovable && (
            <img
              onClick={() => removeList(item)}
              src={closeSvg}
              alt='closeSvg'
              className='list__remove-icon'
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default List