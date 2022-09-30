import React from 'react'
import { Route, Routes } from 'react-router-dom'

import s from './App.module.scss'

import Header from './components/Header'
import Main from './components/Main'
import Cart from './components/Cart'

function App() {
	return (
		<div className={s.App}>
			<div className={s.wrapper}>
				<Header />
				<Routes>
					<Route path="react-pizza/" element={<Main />} />
					<Route path="react-pizza/cart" element={<Cart />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
