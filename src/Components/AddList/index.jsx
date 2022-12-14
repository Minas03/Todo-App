import { useState, useEffect } from 'react'
import List from '../List/index'
import AddSvg from '../../assets/img/add.png'
import './AddButtonList.scss'
import Badge from '../Badge'
import closeSvg from '../../assets/img/close.png'
import axios from 'axios'



const AddList = ({ colors, onAdd }) => {

  const [visiblePopup, setVisiblePopup] = useState(false)
  const [selectedColor, setSelectedColor] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id)
    }
  }, [colors])

  const onClose = () => {
    setVisiblePopup(false)
    setInputValue('')
    setSelectedColor(colors[0].id)
  }

  const addList = () => {
    if (!inputValue) {
      alert('Type name of list')
      return
    }
    setIsLoading(true)
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor
      })
      .then(({ data }) => {
        const color = colors.filter(c => c.id === selectedColor)[0]
        const listObj = { ...data, color, tasks: [] }
        onAdd(listObj)
        onClose()
      })
      .catch(() => {
        alert('Error at the adding List!');
      })
      .finally(() => {
        setIsLoading(false)
      })
  }


  return (
    <div className='add-list'>
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: <img src={AddSvg} alt='Add Svg' />,
            name: 'Add List'
          }
        ]}
      />
      {visiblePopup && (
        <div className='add-list__popup'>
          <img
            onClick={onClose}
            src={closeSvg}
            alt='closeSvg'
            className='add-list__popup-close-btn' />

          <input
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            className='field'
            type='text'
            placeholder='Name Of List' />

          <div className='add-list__popup-colors'>
            {colors.map(color => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'} />
            ))}
          </div>
          <button
            onClick={addList}
            className='button'>
            {isLoading ? 'Adding...' : 'Add List'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AddList