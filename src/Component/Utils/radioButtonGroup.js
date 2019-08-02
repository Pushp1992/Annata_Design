import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// Custom import
import '../Utils/radioButtonGroup.css';

function ColorRadioButton() {
    return (
        <div>
            <Label for="select_color">Select Color</Label>
            <Form className="btnStyle">
                <button type="button" id="blue" />
                <button type="button" id="green" />
                <button type="button" id="orange" />
                <button type="button" id="red" />
                <button type="button" id="brown" />
                <button type="button" id="pink" />
                <button type="button" id="lime" />
                <button type="button" id="grey" />
                <button type="button" id="white" />
                <button type="button" id="black" />
                <button type="button" id="orange" />
            </Form>
        </div>

    )
}

function SizeRadioButton() {
    return (
        <div>
            <Label for="select_color">Select Size</Label>
            <Form className="btnStyle">
                <button type="button" id="blu">05</button>
                <button type="button" id="gree">5.5</button>
                <button type="button" id="orang">06</button>
                <button type="button" id="re">6.5</button>
                <button type="button" id="brow">07</button>
                <button type="button" id="pin">7.5</button>
                <button type="button" id="lim">8.5</button>
                <button type="button" id="gre">09</button>
                <button type="button" id="whit">9.5</button>
                <button type="button" id="blac">10</button>
                <button type="button" id="orang">10.5</button>
            </Form>
        </div>
    )
}

export { ColorRadioButton, SizeRadioButton };