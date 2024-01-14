import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DefaultPage from './components/DefaultPage'
import Gallery from './pages/Gallery'

export default function RouterApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DefaultPage />}>
                    <Route index element={<Home />} />
                    <Route path='/gallery' element={<Gallery />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}