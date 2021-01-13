import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReviewCard from "./ReviewCard";
import {opinionFetch} from '../../redux/opinion/list/opinionListActions';
import PaginationSystem from "../PaginationSystem";
import {
    getOpinionsFiltersURL,
    decodeLastPage,
    changePageNumberFromURL } from "../../redux/utiles";

function ReviewsContainer({userId}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const response = useSelector(state=> state.opinion.list.opinions);
    const error = useSelector(state=> state.opinion.list.error);
    const loading = useSelector(state=>state.opinion.list.loading);

    const dispatch = useDispatch();

    useEffect(()=>{
        //esta funcion crea una URL dependiendo de los parametros que le pases
        //segun los filtros que necesites para hacer la peticion mas pequeña
        dispatch(opinionFetch(getOpinionsFiltersURL(currentPage, userId)));
    }, []);

    useEffect(()=>{
        //aqui me quedo con la cantidad de paginas que hay totales ya que si miras
        //el hydra:view de la response veras que te da lo que necesitas para paginar
        if(response){
            setLastPage(decodeLastPage(response['hydra:view']['hydra:last']));
        }
    },[response])

    const goToPage = (pageNumber)=>{
        //con esta funcion se hace generico el goToPage ya que en [hydra:view][@id]
        //esta la URL con todos los filtros que utilizaste y es mas facil navegar entre
        //paginas ya que solo necesitas el numero
        dispatch(
            opinionFetch(
                changePageNumberFromURL(response['hydra:view']['@id'], pageNumber)
            )
        );
    }

    return (
        <div data-aos="fade-up" className="opinions-container container">
            {response &&
                <PaginationSystem
                    goToPage={goToPage} //la referencia a la funcion para que haga la ajax request
                    currentPage={currentPage} //la pagina actual en la que estoy
                    lastPage={lastPage} //el numero de la ultima pagina
                    loading={loading} // obvio jjj
                    totalItems={response['hydra:totalItems']} // cantidad de elementos
                />
            }
            {response
                ? (
                    response['hydra:member'].map(item =>{
                        return (
                            <ReviewCard
                                key={item['@id']}
                                title={item['title']}
                                date={item['datePublished']}
                                likes={item['likes']}
                                stars={item['stars']}
                                reviewText={item['reviewText']}
                                faded={false}
                            />
                        )
                    })
                 ) : (
                    <ReviewCard
                        faded={true}
                    />
                )
            }
            {response &&
                <PaginationSystem
                    goToPage={goToPage}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    loading={loading}
                    totalItems={response['hydra:totalItems']}
                />
            }
        </div>
    );
}

export default ReviewsContainer;