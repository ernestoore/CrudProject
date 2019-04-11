import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';
import $ from 'jquery';




class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            isHidden: false
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
        // For binding all tha table details using Ajax call logic
        $.ajax({
            type: "GET",
            url: '/Product/GetProductList',
            dataType: 'json',
            contentType: 'application/json'

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
            url: '/Product/Createproduct',
            data: dataJSON,
            success: (event) => {
                this.componentDidMount();
            }
            
        });
    }

    handleChange(e) {
        let convert = "";        
        if (e.target.name === "price") {
            convert = parseFloat(e.target.value).toFixed(1); // convert to decimal
           this.setState({ [e.target.name]: convert});
        }
        if (e.target.name === "name"); {
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
            url: '/Product/UpdateProduct',
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
            url: '/Product/DeleteProduct',
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
                    <Table.Cell textAlign="center">{"$ " + parseFloat(service.price)} </Table.Cell>
                    <Table.Cell textAlign="center">
                        <Modal id="updatemodal" trigger={<Button color="yellow"><Icon name="edit" />Edit</Button>}>
                            <Modal.Header as='h3'> Details product </Modal.Header>
                            <Modal.Content>
                                <Form ref="form" method="POST" onSubmit={this.update}>
                                    <Form.Field>
                                        <input type="hidden" name="id" defaultValue={service.id} />
                                    </Form.Field>
                                    <Form.Field>
                                        <Label color="grey">Product Name</Label>
                                        <input type="text" name="name" onChange={this.handleChange} required defaultValue={service.name} /><br />
                                    </Form.Field>
                                    <br/>
                                    <Form.Field>
                                        <Label color="grey">Product Price</Label>
                                        <input type="number" step="0.1" name="price" min="0" onChange={this.handleChange} required defaultValue={service.price} /><br />
                                    </Form.Field>
                                    <br/>
                                    <Button type='submit' color="green"><Icon name="save" />Save</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        <Modal id="deleteModal" trigger={<Button onClick={() => this.setState({ isHidden: true })}><Icon name="trash" />Delete</Button>}>
                            <Modal.Header> Delete product </Modal.Header>
                            <Modal.Content>
                                {this.state.isHidden && <Label>Are you sure, you want to delete?</Label>}
                                {!this.state.isHidden && <Label >Sorry!you can not delete this product</Label>}
                                <Button primary id="btnDelete" onClick={this.delete.bind(this, service.id)}><Icon name="trash" />Delete</Button>
                            </Modal.Content>
                        </Modal>
                       
                            

                    </Table.Cell>
                </Table.Row>

            );
           
        }



        
        return (
            <React.Fragment>
                
                    <Modal id="modal" trigger={<Button color="blue" id="buttonModal">Add a new product</Button>}  >
                        <Modal.Header as='h3'>Add a new product</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.add} ref="form" method="POST">
                                <Form.Field>
                                    <Label color="grey">Name: </Label>
                                    <input type="text" placeholder="Type a Product name" name="name" required />
                                </Form.Field>
                                <br/>
                                <Form.Field>
                                    <Label color="grey">Price</Label>
                                    <input type="number" step="0.1" min="0" placeholder="Type Product price" name="price" /><br />
                                </Form.Field>
                                <br/>
                                <Button type='submit' color='red'><Icon name="save" required />save</Button>
                            </Form>
                        </Modal.Content>
                    </Modal>

                    <Table className="ui striped table">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell className="five wide" textAlign="center">Product name</Table.HeaderCell>
                            <Table.HeaderCell className="five wide" textAlign="center">Price</Table.HeaderCell>
                            <Table.HeaderCell className="four wide" textAlign="center">Action (Edit)</Table.HeaderCell>
                            <Table.HeaderCell className="four wide" textAlign="center">Action (Delete)</Table.HeaderCell>
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

/* rendering the component */ 
const app = document.getElementById('products');
ReactDOM.render(<Product />, app);
export default Product;
          