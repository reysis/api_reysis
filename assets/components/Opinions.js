import React, { Component } from 'react'
import { Carousel, CarouselItem, Image } from 'react-bootstrap';
import { load, reset } from '../actions/opinions/list';
import { connect } from "react-redux";
import PropTypes from "prop-types";

// hasta q se haga el system file
import user_opinion from '../assets/opinion-img-1.jpg';

class Opinions extends Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.object,
        reset: PropTypes.func.isRequired
    };

    state = {
        loading: true,
        error: null,
        loaded: {}
    };

    componentDidMount() {
        this.props.loadData()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.loaded !== nextProps.loaded) {
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
        const prevIcon = <span aria-hidden="true" className="carousel-prev-icon-mod"></span>
        const nextIcon = <span aria-hidden="true" className="carousel-next-icon-mod"></span>

        if (this.state.loading) {
            return (
                <div className="alert alert-info" role="status">
                    Loading...
                </div>
            );
        } else {
            const carouselInfo = this.props.loaded['hydra:member'].map(item => {
                item['autor'] = "Pedrito Calvo";
                item['img'] = user_opinion;
                return (
                    <CarouselItem key={item['@id']}>
                        <Carousel.Caption>
                            <div className="image-shadow-container">
                                <Image src={item['img']} alt="Author de la frase" className="image-carousel" />
                            </div>
                            <p className="mt-3 mb-2">{item['reviewText']}</p>
                            <p className="my-2 text-muted">{item['autor']}</p>
                        </Carousel.Caption>
                    </CarouselItem>
                );
            })
            return (
                <section data-aos="fade-up" id="opinions" className="opinions-component container">
                    <h1 className="opinions-header">Sus opiniones cuentan!</h1>
                    <Carousel prevIcon={prevIcon} nextIcon={nextIcon}>
                        {carouselInfo}
                    </Carousel>
                </section>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const {
        error,
        loading,
        loaded
    } = state.opinions.load

    return { error, loading, loaded };
}

const mapDispatchToProps = (dispatch) => ({
    loadData: data => dispatch(load(data)),
    reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Opinions);