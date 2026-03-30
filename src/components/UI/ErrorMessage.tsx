import {Component} from "react";
import type {ErrorMessageInterface} from "../../Model/error-message.ts";

export class ErrorMessage extends Component<ErrorMessageInterface> {
    constructor(props) {
        super(props);
    }


    render() {
        const {message} = this.props;
        return <span className="text-[#e72d2d] mt-[2px] text-sm">{message}</span>
    }
}