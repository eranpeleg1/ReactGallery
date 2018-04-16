import React, {Component} from 'react';
import './App.css'
import './Gallery.css'

class Gallery extends Component {
    render() {
        const HREF_PREFIX="https://www.reddit.com";
        return (
            <div className="gallery">
                {this.props.images.map((image,key) => {
                        return(
                            <div key={key} className="image-wrapper">
                                <a href={HREF_PREFIX+image.link} title={image.title} target="_blank" >
                                    <img src={image.url.startsWith("http")? image.url : "noimage.jpg" }  className="image"/>
                                </a>
                            </div>
                        )
                    }
                )
                }
            </div>
        );
    }
}
export default Gallery;