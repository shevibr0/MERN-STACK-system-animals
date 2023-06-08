import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/general/header'
import Home from './components/home'
import Page404 from './components/page404'
import AnimalsList from './components/animals/animalsList'
import AddAnimalsForm from './components/animals/addAnimalsForm'
import EditAnimalsForm from './components/animals/editAnimalForm'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/animals" element={<AnimalsList />} />
                <Route path="/animals/add" element={<AddAnimalsForm />} />
                <Route path="/animals/edit/:id" element={<EditAnimalsForm />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
