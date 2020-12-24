import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import Loader from './Loader';

const baseUrl = "";

class MenuConfig extends Component{
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            progress: false,
            completed: false,

            isEdit: false,
        };

        this.infiniteScroll = this.infiniteScroll.bind(this);
    }

    getInitialState(){
        this.setState(() => ({
            progress: true,
          }));

          axios.post(baseUrl + 'api/admin/menu-config/all', {'offset': this.state.menus.length })
          .then(response => {
              this.setState(() => ({
                  menus: response.data,
                  progress: false,
                  completed: response.data.length ? false : true
              }));
          })
          .catch(error => {
              console.log(error)
          });
    }

    infiniteScroll(){
        if (!this.state.completed &&  !this.state.progress) {
            this.setState(() => ({
              progress: true,
            }));

            axios.post(baseUrl + '/admin/menu-config/all', {
                'offset': this.state.menus.length
              })
              .then((response) => {
                this.setState((prevState) => ({
                  menus: prevState.menus.concat(response.data),
                  progress: false,
                  completed: response.data.length ? false : true
                }));
              })
              .catch((error) => {
                console.log(error);
              });
        }
    }

    componentDidMount() {
        this.getInitialState();
        window.addEventListener('scroll', this.infiniteScroll);
    }

    showModalCreate() {
        this.setState({
            id: 0,
            name: '',
            icon: '',
            url: '',
            has_notification: '',
            isEdit: false
        })
        $("#Modal").modal("show");
    }

    render() {
        {moment.locale('id')}
        const Menu = this.state.menus.map(menu => (
            <div className="col-md-4 mb-2" key={menu.id}>
                <div className="card">
                    <div className="card-body">
                        <i className="ni ni-active-40 ni-2x"></i>
                        <h4>{menu.name}</h4>
                        <small>{moment(menu.updated_at).format('MMMM Do YYYY, hh:mm:ss')}</small>
                    </div>
                </div>
            </div>
        ));

        return (
            <div>
                <button type="button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#Modal" onClick={() => this.showModalCreate()}>Register</button>
                <div className="row">
                    { Menu.length > 0 && Menu }
                    <div className="container text-center">
                        <Loader progress={this.state.progress} completed={this.state.completed} />
                    </div>
                </div>

            {/* Modal Register & Edit */}
                <div className="modal fade" id="Modal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLabel">Product Form</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Menu Name</label>
                                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleChangeName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Menu Icon</label>
                                    <textarea className="form-control" rows="3" value={this.state.icon} onChange={this.handleChangeDescription}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Menu Url</label>
                                    <input type="number" className="form-control" value={this.state.url} onChange={this.handleChangePrice} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Menu Has Notification</label>
                                    <input type="number" className="form-control" value={this.state.has_notification} onChange={this.handleChangeQuantity} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {
                                    this.state.isEdit ?
                                        <button type="button" className="btn btn-primary" onClick={() => this.sendNetworkUpdate()}>Edit</button>
                                        :
                                        <button type="button" className="btn btn-primary" onClick={() => this.createNewMenu()}>Register</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default MenuConfig;
