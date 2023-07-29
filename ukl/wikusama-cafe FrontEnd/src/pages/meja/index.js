import { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
const baseURL= `http://localhost:9000`
const header = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

const Meja = () => {
    const [id_meja, setIdMeja] = useState(0)
    const [nomor_meja, setNomorMeja] = useState("")
    const [status, setStatus] = useState(true)
    const [isEdit, setIsEdit] = useState(true)
    const [modal, setModal] = useState(null)
    const [meja, setMeja] = useState([])

    const getMeja = () => {
        const url = `${baseURL}/meja`
        axios.get(url, header).then(response => {
            setMeja(response.data.data)
        })
        .catch(error => console.log(error))
    }

    const addMeja = () => {
        setIdMeja(0)
        setNomorMeja("")
        setStatus(true)
        setIsEdit(false)
        modal.show()
    }

    const editMeja = item => {
        setIdMeja(item.id_meja)
        setNomorMeja(item.nomor_meja)
        setStatus(item.status)
        setIsEdit(true)
        modal.show()
    }

    const saveMeja = event => {
        event.preventDefault()
        modal.hide()

        let payload = {id_meja, nomor_meja, status}
        if(isEdit){
            // pross edit
            let url = `${baseURL}/meja/${id_meja}`
            axios.put(url, payload, header)
            .then(response => {
                window.alert(`Data meja berhasil di ubah`)

                // recall meja
                getMeja()
            })
            .catch(error => console.log(error))
        } else {
            // proses insert
            let url = `${baseURL}/meja`
            axios.post(url, payload, header)
            .then(response => {
                window.alert(`Data meja berhasil di ubah`)

                // recall meja
                getMeja()
            })
            .catch(error => console.log(error))
        }
    }

    const dropMeja = (item) => {
        if(window.confirm(`are u sure ?`)){
            const url = `${baseURL}/meja/${item.id_meja}`
            axios.delete(url, header)
            .then(response => {
                window.alert(`Data meja berhasil di ubah`)

                // recall meja
                getMeja()
            })
            .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        getMeja()
        setModal(new Modal(`#modal-meja`))
    }, [])

    return(
        <div style={{backgroundImage:"url(/BackgroundMenu.jpg)", backgroundFilter : "blur-5px", backgroundRepeat: false, backgroundSize:'cover'}} className="w-100 vh-100 p-4 m-1">
            <h4>Daftar Meja</h4>
            <button className="btn btn-success m-2" onClick={() => addMeja()}>
                Tambah Meja
            </button>
            <ul className="list-group">
                {meja.map(table => (
                    <li className=" list-group-item mb-2"
                        key={`keyMeja${table.id_meja}`}>
                        <div className="row">
                            <div className="col-md-3">
                                <small className="text-success">
                                    Nomor Meja
                                </small> <br/>
                                {table.nomor_meja}
                            </div>

                            <div className="col-md-3">
                                <small className="text-success">
                                    Status
                                </small> <br/>
                                {table.status ? 'available': 'in use'}
                            </div>

                            <div className="col-md-3">
                                <small className="text-success">
                                    Action
                                </small> <br/>
                                <button className="btn btn-sm btn-warning m-1" onClick={() => editMeja(table)}>
                                    <i className="bi bi-pencil">

                                    </i>
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => dropMeja(table)}>
                                    <i className="bi bi-trash">

                                    </i>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        {/* modal meja */}
        <div className="modal fade" id="modal-meja">
            <div className="modal-dialog modal-md">
                <div style={{backgroundColor:"#E9EDC9"}} className="modal-content">
                    <form onSubmit={saveMeja}>
                        <div style={{backgroundColor: "#B3C890"}} className="modal-header">
                            <h4 className="modal-title ">
                                Form Meja
                            </h4>
                        </div>

                        <div className="modal-body">
                            <small>
                                Nomor Meja
                            </small>
                            <input type="text" className="form-control mb-2" value={nomor_meja} onChange={e => setNomorMeja(e.target.value)}/>

                            <small>Status</small>
                            <select className="form-control mb-2" value={status} onChange={e => setStatus(e.target.value)}>
                                <option value="">Pilih Status</option>
                                <option value={true}>Available</option>
                                <option value={false}>In use</option>
                            </select>

                            <button type="submit" className="btn btn-success w-100">
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

export default Meja