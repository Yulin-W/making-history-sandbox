import React from 'react';
import {divIcon} from "leaflet";
import PropTypes from 'prop-types';
import {Marker} from "react-leaflet";
import Popup from 'react-leaflet-editable-popup';

// Component that gives a 
class JsxMarkerContent extends React.Component {

    onRef(ref) {

        if (ref) {
            const html = ref.innerHTML;
            if (html !== this.previousHtml) {
                this.props.onRender(html);
                this.previousHtml = html;
            }

        }
    }

    render() {
        return (
            <div className="jsx-marker" style={{ display: 'none' }} ref={this.onRef.bind(this)}>
                {this.props.children}
            </div>
        );
    }

}

class JsxMarker extends React.Component {

    static propTypes = {
        position: PropTypes.object,
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            html: null
        };
    }

    onInsideRender(html) {

        // Set it
        this.setState({ html });

    }

    render() {

        const { html } = this.state;
        let marker = false;
        if (html) {

            // Create divIcon
            const icon = divIcon({
                className: this.props.className,
                html,
                iconSize: [this.props.size, this.props.size],
            });
            marker = <Marker draggable position={this.props.position} icon={icon} {...this.props}>
                <Popup editable removable open>
                    Hello there
                </Popup>
            </Marker>
        
        }


        return (<React.Fragment>

            <JsxMarkerContent onRender={html => this.onInsideRender(html)}>
                {this.props.children}
            </JsxMarkerContent>

            {marker}

        </React.Fragment>);

    }

}

export default JsxMarker;