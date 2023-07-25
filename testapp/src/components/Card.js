import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Card(props) {

    let dispatch=useDispatchCart()
    let navigate=useNavigate()
    let data=useCart()
    const priceRef=useRef()
    let options = props.options
    let priceOptions = Object.keys(options)
    const [qty,setQty]=useState(1)
    const [size,setSize]=useState("")

    const handleClick = () => {
        if (!localStorage.getItem("token")) {
          navigate("/login")
        }
      }

    const handeAddToCart=async()=>{
        let food=[]
        for(const item of data){
            if(item.id===props.foodItem._id){
                food=item;
                break;
            }
        }
        if(food!==[]){
            if(food.size===size){
                await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty})
                return
            }
            else if(food.size!==size){
                await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
        //await console.log(data)
                return
            }
            return
        }
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})

        
    }
    let finalPrice=qty*parseInt(options[size])

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div>
            <div>
                <div
                    className="card mt-3"
                    style={{ width: "16rem", maxHeight: "360px" }}
                >
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        {/* <p className="card-text">This is some important text.</p> */}
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    );
                                })}
                            </select>

                            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onClick={handleClick} onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((i) => {
                                    return <option key={i} value={i}>{i}</option>
                                })}
                            </select>

                            <div className="d-inline ms-2 h-100 w-20 fs-5">₹{finalPrice}/-</div>
                        </div>
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-center mx-2'} onClick={handeAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
