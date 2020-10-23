import React, { Component } from 'react'
import { Carousel, CarouselItem, Image } from 'react-bootstrap';
import { load, reset } from '../actions/opinions/list';
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Opinions extends Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.object,
        reset: PropTypes.func.isRequired
    };

    state={
        loading: true, 
        error: null,
        loaded: {}
    };

    componentDidMount() {
        this.props.loadData()
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.loaded !== nextProps.loaded){
            this.setState({
                loaded: nextProps.loaded,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
    }

    componentWillUnmount() {
        this.props.reset()
    }

    render() {
        if(this.state.loading){
            return (
                <div className="alert alert-info" role="status">
                    Loading...
                </div>
            );
        }else{
            const carouselInfo = this.props.loaded['hydra:member'].map(item => {
                return (
                    <CarouselItem key={item['@id']}>
                        <Carousel.Caption>
                            <div className="image-shadow-container">
                                <Image src={item['img']} alt="Author de la frase" className="image-carousel"/>
                            </div>
                            <p>{item['reviewText']}<br/>{item['autor']}</p>
                        </Carousel.Caption>
                    </CarouselItem>
                );
            })
            return (
                <section data-aos="fade-up" id="opinions" className="opinions-component container">
                    <h1 className="opinions-header">Sus opiniones cuentan!</h1>
                    <Carousel>
                        {carouselInfo}
                    </Carousel>
                </section>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    const {
        error,
        loading,
        loaded
    } = state.opinions.load

    return {error, loading, loaded};
}

const mapDispatchToProps = (dispatch) =>({
    loadData: data => dispatch(load(data)),
    reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Opinions);