import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';
import $ from 'jquery';


class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            isHidden: true
        };

        this.loadData = this.loadData.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.delete = this.delete.bind(this);

    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        $.ajax({
            url: '/Store/GetStoreList',
            type: 'GET',
            dataType: 'json'

        }).done((data) => {
            this.setState({ serviceList: data });
        });
    }

    add(event) {

        const formData = new FormData(event.target);
        let dataJSON = {};

        event.preventDefault();

        for (let entry of formData.entries()) {
            dataJSON[entry[0]] = entry[1];
        }
        console.log(dataJSON);
        $.ajax({
            type: "POST",
            url: '/Store/CreateStore',
            data: dataJSON,
            success: (event) => {
                this.componentDidMount();
            }

        });
    }

    handleChange(e) {
        if (e.target.name === "name") {
            this.setState({ [e.target.name]: e.target.value });
        }
        if (e.target.name === "address"); {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    update(event) {
        const formData = new FormData(event.target);
        let dataJSON = {};
        console.log(formData);
        console.log(event.target);

        for (let entry of formData.entries()) {
            dataJSON[entry[0]] = entry[1];
        }

        console.log(dataJSON);
        $.ajax({
            url: '/Store/UpdateStore',
            type: 'POST',
            data: dataJSON,
            success: (event) => {
                this.componentDidMount();
            },
            error: function () {
                console.log("No se pudieron guardar los datos");
            }
        });
    }

    delete(id) {
        console.log(id);
        $.ajax({
            url: '/Store/DeleteStore',
            type: 'POST',
            data: { 'id': id },
            success: (event) => {
                this.componentDidMount();
            }
        });

    }


    render() {
        let serviceList = this.state.serviceList;
        let tableData = null;
        if (serviceList !== null) {
            tableData = serviceList.map(service =>

                <Table.Row key={service.id}>
                    <Table.Cell textAlign="center"> {service.name}</Table.Cell>
                    <Table.Cell textAlign="center">{service.address} </Table.Cell>
                    <Table.Cell textAlign="center">
                        <Modal id="updatemodal" trigger={<Button color="yellow"><Icon name="edit" />Edit</Button>}>
                            <Modal.Header as='h3'> Store Details </Modal.Header>
                            <Modal.Content>
                                <Form ref="form" method="POST" onSubmit={this.update}>
                                    <Form.Field>
                                        <input type="hidden" name="id" defaultValue={service.id} />
                                    </Form.Field>
                                    <Form.Field>
                                        <Label color="grey">Store Name</Label>
                                        <input type="text" name="name" onChange={this.handleChange} required defaultValue={service.name} /><br />
                                    </Form.Field>
                                    <br />
                                    <Form.Field>
                                        <Label color="grey"> Store Address</Label>
                                        <input type="text" name="address" onChange={this.handleChange} required defaultValue={service.address} /><br />
                                    </Form.Field>
                                    <br />
                                    <Button type='submit' color="green"><Icon name="save" />save</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        <Modal id="deleteModal" trigger={<Button onClick={() => this.setState({ isHidden: true })}><Icon name="trash" />Delete</Button>}>
                            <Modal.Header> Delete customer </Modal.Header>
                            <Modal.Content>
                                {this.state.isHidden && <Label>Are you sure, you want to delete?</Label>}
                                <br />
                                {!this.state.isHidden && <Label >Sorry!you can not delete this customer</Label>}
                                <br />
                                <Button primary id="btnDelete" onClick={this.delete.bind(this, service.id)}><Icon name="trash" />Delete</Button>
                            </Modal.Content>
                        </Modal>



                    </Table.Cell>
                </Table.Row>
            );
        }

        return (
            <React.Fragment>

                <Modal id="modal" trigger={<Button color="blue" id="buttonModal">Add a new store</Button>}  >
                    <Modal.Header as='h3'>Add a new store</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.add} ref="form" method="POST">
                            <Form.Field>
                                <Label color="grey">Name: </Label>
                                <input type="text" placeholder="Type Store name" name="name" required />
                            </Form.Field>
                            <br />
                            <Form.Field>
                                <Label color="grey">Address</Label>
                                <input type="text" placeholder="Type Store address" name="address" /><br />
                            </Form.Field>
                            <br />
                            <Button type='submit' color='red'><Icon name="save" required />save</Button>
                        </Form>
                    </Modal.Content>
                </Modal>

                <Table className="ui striped table">
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell className="five wide">Store name</Table.HeaderCell>
                            <Table.HeaderCell className="five wide">Store address</Table.HeaderCell>
                            <Table.HeaderCell className="four wide">Action (Edit)</Table.HeaderCell>
                            <Table.HeaderCell className="four wide">Action (Delete)</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        {tableData}
                    </Table.Body>

                </Table>

            </React.Fragment>
        );

    }




}

const app = document.getElementById('store');
ReactDOM.render(<Store />, app);
export default Store;