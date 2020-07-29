import React, {useEffect, useState} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = ( WrappedComponent, axios ) => {
  return (props) => {

    const [error, setError] = useState(null)

    useEffect(() => {
      const reqInterceptor = axios.interceptors.request.use(req =>{
        setError(null)
        return req
      })
      const resInterceptor = axios.interceptors.response.use(res => res, error =>{
        setError(error)
      })

      return () =>{
        axios.interceptors.request.eject(reqInterceptor)
        axios.interceptors.response.eject(resInterceptor)
      }

    },[])

    return(
      <Aux>
        <Modal show={error !== null} modalClosed={() =>{setError(null)}}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    )
  }
}

export default withErrorHandler