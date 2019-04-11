import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Icon, Form, Table, Label, Dropdown } from 'semantic-ui-react';
import $ from 'jquery';
import moment from 'moment';

class Sale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            isHidden: true,
            saleList: [],
            productList: [],
            costumerList: [],
            storeList: [],
            DateSold: ""    
        };

        this.loadData = this.loadData.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this); // dropdown to handle values;
        this.handleDate = this.handleDate.bind(this); // date
        this.fillCustomerDropdown = this.fillCustomerDropdown.bind(this);
        this.fillProductDropdown = this.fillProductDropdown.bind(this);
        this.fillStoreDropdown = this.fillStoreDropdown.bind(this);

    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        //for binding all tha table details using Ajax call logic
        const day = new Date().getDay() + 1;
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear;
        this.setState({
            curTime: day + "-" + month + "-" + year
        });

        // Fetch data of sales
        $.ajax({
            url: '/ProductSold/GetProductSoldList',
            type: 'GET',
            dataType: 'json'

        }).done((data) => {
            this.setState({
                saleList: data,
                serviceList: data
                           
            });
            
            
        });
       // Fetch Data of Products
        $.ajax({
            url: '/Product/GetProductList',
            type: 'GET',
            dataType: 'json'

        }).done((data) => {
            this.setState({
                productList: data

            });
            

            });
        // Fetch data of Costumers
        $.ajax({
            url: '/Customer/GetCustomerList',
            type: 'GET',
            dataType: 'json'

        }).done((data) => {
            this.setState({
                customerList: data

            });
            

            });

        // Fetch data of Stores
        $.ajax({
            url: '/Store/GetStoreList',
            type: 'GET',
            dataType: 'json'

        }).done((data) => {
            this.setState({
                storeList: data

            });
            

        });

    }
    
    
    // Add new sale (ajax call logic)
    add(event) {
        event.preventDefault();
        
        
        var data = {
            customerId: this.state.selectedCustomer[0].key,
            productId: this.state.selectedProduct[0].key,
            storeId: this.state.selectedStore[0].key,
            customerName: this.state.selectedCustomer[1].value,
            productName: this.state.selectedProduct[1].value,
            storeName: this.state.selectedStore[1].value,
            DateSold: this.state.selectDate
        };
        console.log(data);
       
        $.ajax({
            url: "/ProductSold/CreateSale",
            type: "post",
            dataType: "json",
            data: JSON.stringify(data),
            success: data => {
                console.log(data);
                this.componentDidMount();
            }
            
        });
            
    }

    
    //Handle Change Event to Set th Values into States

    handleChange(e, data) {
        console.log(data);
        e.preventDefault();
        const { value } = data;
        const { key } = data.options.find(o => o.value === value); // find id
        this.setState({ [data.name]: [{ key }, { value }] }); // create a list name of the field and [id,value]
        
    }

    // Handle update event with ajax call

    update(e) {
        console.log("hello from update");
    }

    //Handle delete event with ajax call
    delete(i) {
        console.log("Hello from delete");
    }

    // Handle date update
    handleDate(e) {

        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });

    }

     /*dynamic list to fill up the dropdow*/
    fillCustomerDropdown(list) {
        let result = [];
        for (var key in list) {
            result.push({ key: list[key]["id"], text: list[key]["name"], value: list[key]["name"] });
        }
        return result;
    }
    fillProductDropdown(list) {
        
        let result = [];
        for (var key in list) {
            result.push({ key: list[key]["id"], text: list[key]["name"], value: list[key]["name"] });
        }
        return result;
    }
    fillStoreDropdown(list) {


        let result = [];
        for (var key in list) {
            result.push({ key: list[key]["id"], text: list[key]["name"], value: list[key]["name"] });
        }
        return result;
    }
    




    render() {

        let saleList = this.state.saleList;
        let serviceList = this.state.serviceList;
        let tableData = null;
        let add_sale = null;

        if (serviceList !== null) {
            const { key, name, value } = this.state; // set the value which would be selected into the dropdown

            add_sale =
             <Modal id="addModal" trigger={<Button color="blue" id="buttonModal"> Add new sale record </Button>}>
                <Modal.Header> Add new sale </Modal.Header>
                <Modal.Content> 
                    <Form onSubmit={this.add.bind(this)} ref="form" method="POST">
                        <Form.Field>
                            <Label color="grey"> Customer Name </Label><br />
                            <Dropdown selection options={this.fillCustomerDropdown(this.state.customerList)} onChange={this.handleChange} name="selectedCustomer" placeholder="Select Customer" /><br />
                        </Form.Field>
                        <Form.Field>
                            <Label color="grey"> Product Name </Label><br />
                            <Dropdown selection options={this.fillProductDropdown(this.state.productList)} onChange={this.handleChange} name="selectedProduct" placeholder="Select Product" /><br />
                        </Form.Field>
                        <Form.Field>
                            <Label color="grey"> Store Name </Label><br />
                            <Dropdown selection options={this.fillStoreDropdown(this.state.storeList)} onChange={this.handleChange} name="selectedStore" placeholder="Select Store" /><br />
                        </Form.Field>
                        <Form.Field>
                            <Label color="grey">Sale Date</Label><br />
                            <input type="date" onChange={this.handleDate} name="selectDate" min={this.state.curTime} required /><br />
                        </Form.Field>
                        <Button type="submit" color="green">Save</Button>
                    </Form>
                </Modal.Content>
             </Modal>
            
        }

        if (saleList !== null) {
            tableData = saleList.map(service =>
                <Table.Row key={service.id}>
                    <Table.Cell textAlign="center">{service.customerName}</Table.Cell>
                    <Table.Cell textAlign="center">{service.productName}</Table.Cell>
                    <Table.Cell textAlign="center">{service.storeName}</Table.Cell>
                    <Table.Cell textAlign="center" >{moment(service.dateSold).format("DD/MM/YYYY")}</Table.Cell>
                    <Table.Cell>
                        <Modal id="updateModal" trigger={<Button color="yellow"><Icon name="edit" />Edit</Button>}>
                            <Modal.Header> Update Sale</Modal.Header>
                            <Modal.Content>
                                <Form ref="form" method="POST" onSubmit={this.update.bind(this, service.id)}>
                                    <Form.Field>
                                        <Label color="grey">Customer Name</Label><br />
                                        <Dropdown selection options={this.fillCustomerDropdown(this.state.customerList)} required onChange={this.handleChange} name="selectedCustomer" />
                                        <br/>
                                    </Form.Field>
                                    <Form.Field>
                                        <Label color="grey">Product Name</Label><br />
                                        <Dropdown selection options={this.fillCustomerDropdown(this.state.productList)} required onChange={this.handleChange} name="selectedProduct" />
                                        <br />
                                    </Form.Field>
                                    <Form.Field>
                                        <Label color="grey">Store Name</Label><br />
                                        <Dropdown selection options={this.fillCustomerDropdown(this.state.storeList)} required onChange={this.handleChange} name="selectedStore" />
                                        <br />
                                    </Form.Field>
                                    <Form.Field>
                                        <Label color="grey">Date Sold</Label><br />
                                        <input type="date" name="newDate" value={moment(service.DateSold).format("YYYY-MM-DD")} required onChange={this.handleDate} /><br />
                                        <br />
                                    </Form.Field>
                                    <Button type='submit' color="green"><Icon name="save" />Save</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </Table.Cell>
                </Table.Row>
                
                );

        }

        return (
            <React.Fragment>
                <div>
                    {add_sale}
                    <Table celled>
                        
                        <Table.Header>
                            
                            <Table.Row>
                                <Table.HeaderCell textAlign="center">Customer name</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Product name</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Store name</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Date sold</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Action (Edit)</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Action (Delete)</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {tableData}
                        </Table.Body>
                    </Table>
                </div>
            </React.Fragment>



        );
    }


}

// render component
const app = document.getElementById('sales');
ReactDOM.render(<Sale />, app);
export default Sale;