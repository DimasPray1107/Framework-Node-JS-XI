import React from 'react'
import { useState, useEffect } from 'react'
import MenuItem from './menuItem'
/** axios adalah library for connect to another server */
import axios from "axios"
import { Modal } from 'bootstrap'

const baseURL = "http://localhost:9000"
const header = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default function Menu() {
    /** define state for stone menu */
    const [menus, setMenus] = useState([])

    /** define state to store prop of menu */
    const [id_menu, setIDMenus] = useState(0)
    const [nama_menu, setNamaMenu] = useState("")
    const [jenis, setJenis] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [harga, setHarga] = useState(0)
    const [gambar, setGambar] = useState(undefined)

    /** define state to store modal */
    const [modal, setModal] = useState(undefined)

    /** define state to store status of edit */
    const [isEdit, setIsEdit] = useState(true)

    /** define state to store status of search */
    const [keyword, setkeyword] = useState("")

    async function getMenu() {
        try {
            let url = `${baseURL}/menu`
            let { data } = await axios.get(url, header)
            setMenus(data.data)

        } catch (error) {
            console.log(error)
        }
    }

    async function searching(e) {
        try {
            if (e.keyCode === 13) {
                let url = `${baseURL}/menu/find`
                let dataSearch = {
                    keyword: keyword
                }
                let { data } = await axios.post(url, dataSearch, header)
                setMenus(data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function addMenu() {
        /** show modal */
        modal.show()

        /** reset state of menu */
        setIDMenus(0)
        setNamaMenu("")
        setDeskripsi("")
        setHarga(0)
        setJenis("")
        setGambar(undefined)
        setIsEdit(false)
    }

    async function edit(menu) {
        /** open modal */
        modal.show()
        setIsEdit(true)
        setIDMenus(menu.id_menu)
        setNamaMenu(menu.nama_menu)
        setDeskripsi(menu.deskripsi)
        setJenis(menu.jenis)
        setHarga(menu.harga)
        setGambar(undefined)
    }

    async function saveMenu(e) {
        try {
            e.preventDefault()
            /** close the modal */
            modal.hide()
            if (isEdit) {
                /** ini untuk edit */
                let form = new FormData()
                form.append("nama_menu", nama_menu)
                form.append("harga", harga)
                form.append("jenis", jenis)
                form.append("deskripsi", deskripsi)

                if (gambar !== undefined) {
                    form.append("gambar", gambar)
                }

                /** send to backend */
                let url = `${baseURL}/menu/${id_menu}`
                let result = await axios.put(
                    url, form, header
                )
                if (result.data.status === true) {
                    /** refresh data menu */
                    getMenu()
                }
                window.alert(result.data.message)

            } else {
                /** ini untuk tambah */
                let form = new FormData()
                form.append("nama_menu", nama_menu)
                form.append("harga", harga)
                form.append("jenis", jenis)
                form.append("deskripsi", deskripsi)
                form.append("gambar", gambar)

                /** send to backend */
                let url = `${baseURL}/menu`
                let result = await axios.post(
                    url, form, header
                )
                if (result.data.status === true) {
                    /** refresh data menu */
                    getMenu()
                }
                window.alert(result.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function drop(menu) {
        try {
            /**  */
            if (window.confirm(`Apakah Anda Yakin Menghapus ${menu.nama_menu}?`)) {
                let url = `${baseURL}/menu/${menu.id_menu}`
                axios.delete(url, header)
                    .then(result => {
                        if (result.data.status === true) {
                            window.alert(result.data.message)
                        }
                        /** referesh data */
                        getMenu()
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

        } catch (error) {
            console.log(error);
        }
    }

    /** useEffect menjalanan aksi saat 
     *  komponen ini dimuat */
    useEffect(() => {
        /** initializing modal */
        setModal(new Modal(`#modalMenu`))
        getMenu()
    }, [])

    return ( 
        <div style={{backgroundImage:"url(/BackgroundMenu.jpg)", backgroundFilter : "blur-5px", backgroundRepeat: false, backgroundSize:'cover'}} className='container-fluid p-4'> 
            <h2><b><i className='bi bi-justify'></i>Daftar Menu</b></h2>
            <hr />
            <button className='btn btn-success' onClick={() => addMenu()}>
                Tambah Menu
            </button>

            <input
                type='text'
                className='form-control my-2 shadow bg-white bg-opacity-50'
                value={keyword}
                onChange={e => setkeyword(e.target.value)}
                onKeyUp={e => searching(e)} />

            <div className='row'>
                {menus.map(menu => (
                    <div key={`menu${menu.id_menu}`}
                        className="col-md-3 col-lg-3">
                        <MenuItem
                            img={`${baseURL}/menu_image/${menu.gambar}`}
                            nama_menu={menu.nama_menu}
                            deskripsi={menu.deskripsi}
                            harga={menu.harga}
                            jenis={menu.jenis}
                            onEdit={() => edit(menu)}
                            onDelete={() => drop(menu)} />
                    </div>
                ))}
            </div>

            {/* create div of modal */}
            <div className='modal fade' id='modalMenu'>
                <div className='modal-dialog modal-md'>
                    <div style={{backgroundColor:"#E9EDC9"}} className='modal-content'>
                        <form onSubmit={e => saveMenu(e)}>
                            <div className='modal-header' style={{ background: `lillac`, backgroundColor: "#B3C890" }}>
                                <h4><b>Form Menu</b></h4>
                            </div>
                            <div className='modal-body'>
                                <small>Nama Menu</small>
                                <input
                                    required={true}
                                    type='text'
                                    style={{backgroundColor:"#FEFAE0"}}
                                    className='form-control mb-2'
                                    value={nama_menu}
                                    onChange={e => setNamaMenu(e.target.value)}>
                                </input>

                                <small>Deskripsi</small>
                                <input
                                    required={true}
                                    type='text'
                                    style={{backgroundColor:"#FEFAE0"}}
                                    className='form-control mb-2'
                                    value={deskripsi}
                                    onChange={e => setDeskripsi(e.target.value)}>
                                </input>

                                <small>Harga</small>
                                <input
                                    required={true}
                                    type='number'
                                    style={{backgroundColor:"#FEFAE0"}}
                                    className='form-control mb-2'
                                    value={harga}
                                    onChange={e => setHarga(e.target.value)}>
                                </input>

                                <small>Gambar</small>
                                <input
                                    type='file'
                                    accept='image/*'
                                    style={{backgroundColor:"#FEFAE0"}}
                                    className='form-control mb-2'
                                    onChange={e => setGambar(e.target.files[0])}>
                                </input>

                                <small>Jenis Menu</small>
                                <select
                                    required={true}
                                    className='form-control mb-2'
                                    style={{backgroundColor:"#FEFAE0"}}
                                    value={jenis}
                                    onChange={e => setJenis(e.target.value)}>
                                    <option value="">-- Pilih Jenis Makanan --</option>
                                    <option value="makanan">Makanan</option>
                                    <option value="minuman">Minuman</option>
                                </select>
                            </div>
                            <div className='modal-footer'>
                                <button className='w-100 btn btn-success'>
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}