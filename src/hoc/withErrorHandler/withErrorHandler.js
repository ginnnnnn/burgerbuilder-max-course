import React,{ Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler =(WrappedComponent, axios)=>{
    return class extends Component{
        state ={
            error:null
        }
            componentWillMount(){
                this.reqInterceptor = axios.interceptors.request.use(req=>{
                    this.setState({error:null});
                    return req;
                })
                this.resInterceptor = axios.interceptors.response.use(res=>res,err=>{
                    this.setState({error:err})
                })
            }
            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }
            errorComfirmedHandler=()=>{
                this.setState({error:null})
            };

        render(){
            return (
            <Aux>
            <Modal
            canceled={this.errorComfirmedHandler} 
            show={this.state.error} >
            {this.state.error?this.state.error.message:null}
            </Modal>
            <WrappedComponent {...this.props} />
            </Aux>
        )
        }
    }
};

export default withErrorHandler;