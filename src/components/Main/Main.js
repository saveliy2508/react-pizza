import React from "react";
import ContentLoader from "react-content-loader";

import s from './main.module.scss';

import Pizza from "./Pizza/Pizza";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from './../../redux/actions/filters';
import {fetchPizzas} from './../../redux/actions/pizzas';
import {setPizzaCart} from "../../redux/actions/cart";

function Main(props) {
  const dispatch = useDispatch();
  
  const {items} = useSelector(({pizza}) => {
    return {
      items: pizza.items,
    }
  });
  
  const {isLoaded} = useSelector(({pizza}) => {
    return {
      isLoaded: pizza.isLoaded
    }
  });
  const {category, sortBy} = useSelector(({filter}) => filter);
  
  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
  }, []);
  
  
  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);
  
  const sortingButton = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  
  const subMenu = [
    {name: 'популярности'},
    {name: 'цене'},
    {name: 'алфавиту'}
  ]
  
  const onSortButton = (index) => {
    dispatch(setCategory(index))
  }
  
  const [isSubMenu, setIsSubMenu] = React.useState(false);
  
  const toggleSubMenu = () => {
    setIsSubMenu(!isSubMenu)
  }
  
  const onActiveSubMenu = (index) => {
    dispatch(setSortBy(subMenu[index].name))
    setIsSubMenu(false)
  }
  
  const sortRef = React.useRef();
  
  const handleOutsideClick = (e) => {
    if (!e.path.includes(sortRef.current)) {
      setIsSubMenu(false)
    }
  }
  
  const onAddCartItem = (newItem) => {
    dispatch(setPizzaCart(newItem))
  }
  
  return (
    <div className={s.main}>
      <div className={s.sorting}>
        <div className={s.sortingLeft}>
          {sortingButton.map((item, index) => (
            <div key={`Btn${index}`} className={category === index ? s.active : null}
                 onClick={() => onSortButton(index)}>{item}</div>
          ))}
        </div>
        <div className={s.sortingRight} ref={sortRef}>
          <div className={s.menu} onClick={toggleSubMenu}>
            <img src='./img/arrowTop.svg' alt="arrow"/>
            <p>Сортировка по:</p>
            <p><span>{sortBy}</span></p>
          </div>
          {isSubMenu ? <div className={s.subMenu}>
            <div className={s.features}>
              {subMenu.map((item, index) => (
                <p onClick={() => onActiveSubMenu(index)} key={'subMenuItem' + index}
                   className={subMenu.findIndex(item => item.name == sortBy) == index ? s.activeSubItem : null}>{item.name}</p>
              ))}
            </div>
          </div> : null}
        </div>
      </div>
      <div className={s.pizzasTitle}>Все пиццы</div>
      <div className={s.pizzas}>
        {isLoaded ?
          items.map((item, index) => (
            <Pizza
              key={`${item.name}${index}`}
              parentId={item.parentId}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              types={item.types}
              sizes={item.sizes}
              onAddCartItem={onAddCartItem}
            />
          )) :
          Array(4).fill(
            <ContentLoader
              className={s.fakePizzaBlock}
              speed={2}
              width={280}
              height={460}
              viewBox="0 0 280 460"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <circle cx="132" cy="142" r="115"/>
              <rect x="0" y="273" rx="6" ry="6" width="280" height="26"/>
              <rect x="0" y="310" rx="6" ry="6" width="280" height="84"/>
              <rect x="0" y="418" rx="6" ry="6" width="91" height="31"/>
              <rect x="137" y="408" rx="25" ry="25" width="140" height="46"/>
            </ContentLoader>)}
      </div>
    </div>
  )
}


export default Main;