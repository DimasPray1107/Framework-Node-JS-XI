import React from 'react'

export default function menuItem(props) {
    return (
        <div style={{ backgroundColor: "#EAE7B1" }} className='w-100 m-2 rounded-4'>
            <img src={props.img} alt='img-menu' className='w-100 img-fluid rounded-4'
                style={{ height: `300px` }} />

            <div className='w-50  mt-1 p-2'>
                <h4 style={{fontFamily:"Arial Black", fontColor:"#3C6255"}} className='mb-1'><b>
                    {props.nama_menu}
                </b></h4>
                <h6 style={{fontFamily:"sans-serif"}} className='fw-normal mb-1'>
                    {props.jenis}
                </h6>
                <p style={{fontFamily:"Times New Roman"}} >
                    {props.deskripsi}
                </p>
                <h5 className='text-success'>
                    Rp {props.harga} 
                </h5>
            </div>
            <div className='w-100 p-2'>
                <button
                    className='btn btn-primary'
                    onClick={() => props.onEdit()}>
                    Edit
                </button>
                <button
                    className='btn btn-danger mx-1'
                    onClick={() => props.onDelete()}>
                    Hapus
                </button>
            </div>
        </div>
    )
}
