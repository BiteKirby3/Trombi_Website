import React from "react";

class Image extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <img src={this.props.url} alt="display image" />
                <img src={this.props.url} alt="display image" />

            </div>
        );
    }
}

export default Image;