import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Menu from "./pages/menu"
import Login from "./pages/login"
import Transaksi from "./pages/transaksi";
import Middleware from "./pages/middleware";
import Sidebar from "./pages/sidebar";
import Meja from "./pages/meja";
import User from "./pages/user";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={
          <Middleware roles={['admin','manajer','kasir']}>
            <Sidebar title="Daftar Menu">
              <Menu />
            </Sidebar>
          </Middleware>
        } />
        <Route path="/meja" element={
          <Middleware roles={['admin','kasir']}>
            <Sidebar title="Daftar meja">
              <Meja />
            </Sidebar>
          </Middleware>
        } />
        <Route path="/user" element={
          <Middleware roles={['admin','manajer']}>
            <Sidebar title="Daftar user">
              <User />
            </Sidebar>
          </Middleware>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/transaksi" element={
          <Middleware roles={['kasir','manajer']}>
            <Sidebar title="Daftar Transaksi">
              <Transaksi />
            </Sidebar>
          </Middleware>
        } />

        <Route path="/test" element={<Sidebar />} />
        
      </Routes>
    </BrowserRouter>
  )
}