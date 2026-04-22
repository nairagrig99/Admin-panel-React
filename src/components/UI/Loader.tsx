import {Component} from "react";
import {createPortal} from "react-dom";
import {connect} from "react-redux";
import {RotatingLines} from "react-loader-spinner";
import type {RootState} from "../../Store/store.ts";

export class Loader extends Component<any> {
    render() {

        const {loader} = this.props;
        if (!loader) return null;
        return createPortal(
            <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
                <RotatingLines width="96"/>
            </div>,
            document.getElementById('load__spinner')!
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    loader:  state.user.isLoading
});


export default connect(mapStateToProps)(Loader);